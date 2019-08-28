import { v4 } from 'node-uuid'
import _ from 'lodash'
import {
    CURRENT_LOCATION_WEATHER,
    CITY_WEATHER,
    ERROR_ITEMS,
    DELETE_CITY,
    ERROR_NO_MATCHES,
    ERROR_CLEAR,
    ERROR_DENIED_GEOLOCATION,
    ADD_CURRENT_LOCATION_WEATHER
} from "./types";

const API_KEY = 'f6b238cfbf1ab8f76d87a7f3ebcc799a';

export const getCurrentLocation = () => (dispatch, getState) => {
    const getLocation = new Promise( (res, rej) => {
        window.navigator.geolocation.getCurrentPosition(location => res(location.coords),
                                                        err => rej(err))
        }
    );

    getLocation
        .then( coords => fetch(`http://api.openweathermap.org/data/2.5/weather?units=metric&lat=${coords.latitude}&lon=${coords.longitude}&appid=${API_KEY}`))
        .then( response => response.json())
        .then( dataCurrentLocation => {
            dispatch({
                type: CURRENT_LOCATION_WEATHER,
                payload: {
                    city: dataCurrentLocation.name,
                    country: dataCurrentLocation.sys.country,
                    temp: dataCurrentLocation.main.temp,
                    icon: dataCurrentLocation.weather[0].icon,
                    description: dataCurrentLocation.weather[0].description
                }
            });

            return dataCurrentLocation
        })
        .then( dataCurrentLocation => {
            //Add current city weather to weather data array in table
            const cityWeatherCurrentLocation = {
                id: v4(),
                city: dataCurrentLocation.name,
                country: dataCurrentLocation.sys.country,
                temp: dataCurrentLocation.main.temp,
                humidity: dataCurrentLocation.main.humidity,
                wind: dataCurrentLocation.wind.speed
            };
            const weatherData = getState().weather.data;
            const cityCapitalized = dataCurrentLocation.name.charAt(0).toUpperCase() + dataCurrentLocation.name.slice(1);
            if(_.find(weatherData, ['city', cityCapitalized])){
                return;
            }
            dispatch({
                type: ADD_CURRENT_LOCATION_WEATHER,
                payload: cityWeatherCurrentLocation
            })
        })
        .catch( error => {
            console.log(error);
            dispatch({
                type: ERROR_DENIED_GEOLOCATION
            })
        })

};

export const addCityWeather = (city) => (dispatch, getState) => {
    const apiCall = fetch(`http://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${API_KEY}`);
    apiCall
        .then( response => {
            return response.json()
        })
        .then(data => {
            const weatherData = getState().weather.data;
            const cityWeather = {
                id: v4(),
                city: data.name,
                country: data.sys.country,
                temp: data.main.temp,
                humidity: data.main.humidity,
                wind: data.wind.speed
            };

            //Show only three items in table
            if(weatherData.length < 3){
                //Check the same city in weather array table
                const cityCapitalized = city.charAt(0).toUpperCase() + city.slice(1);
                if(_.find(weatherData, ['city', cityCapitalized])){
                    return;
                }
                dispatch({
                    type: CITY_WEATHER,
                    payload: cityWeather
                })
            }else{
                dispatch({
                    type: ERROR_ITEMS
                });

                setTimeout(() => {
                    dispatch({
                        type: ERROR_CLEAR
                    })
                }, 3000)
            }
        })
        .catch(error => {
            console.log('error', error)
            dispatch({
                type: ERROR_NO_MATCHES
            });

            setTimeout(() => {
                dispatch({
                    type: ERROR_CLEAR
                })
            }, 3000)
        })
};

export const deleteCity = (cityId) => {
    return {
        type: DELETE_CITY,
        payload: cityId
    }
};

export const initialState = () => {
    return{
        type: ERROR_CLEAR
    }
};
