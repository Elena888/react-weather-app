import { v4 } from 'node-uuid'
import {CURRENT_LOCATION, CITY_WEATHER, ERROR_ITEMS, DELETE_CITY, ERROR_NO_MATCHES} from "./types";

export const getCurrentLocation = () => (dispatch, getState) => {
    const API_KEY = 'f6b238cfbf1ab8f76d87a7f3ebcc799a';
    const getLocation = new Promise( (res, rej) => {
        window.navigator.geolocation.getCurrentPosition(location => {
            res(location.coords)
        })
    });

    getLocation
        .then( coords => fetch(`http://api.openweathermap.org/data/2.5/weather?units=metric&lat=${coords.latitude}&lon=${coords.longitude}&appid=${API_KEY}`))
        .then( response => response.json())
        .then( dataCurrentLocation => {
            const cityWeatherCurrentLocation = {
                id: v4(),
                city: dataCurrentLocation.name,
                country: dataCurrentLocation.sys.country,
                temp: dataCurrentLocation.main.temp,
                humidity: dataCurrentLocation.main.humidity,
                wind: dataCurrentLocation.wind.speed
            };
            const weather = getState().weather.data;

            //weather.push(cityWeatherCurrentLocation) NOT Working,,,, WHY????
            weather[0] = cityWeatherCurrentLocation;

            return dispatch({
                type: CURRENT_LOCATION,
                payload: {
                    city: dataCurrentLocation.name,
                    country: dataCurrentLocation.sys.country,
                    temp: dataCurrentLocation.main.temp,
                    icon: dataCurrentLocation.weather[0].icon,
                    description: dataCurrentLocation.weather[0].description
                }
            })
        })
        .catch( error => console.log('Error', error))

};

export const getWeatherByCity = (city) => (dispatch, getState) => {
    const API_KEY = 'f6b238cfbf1ab8f76d87a7f3ebcc799a';
    const apiCall = fetch(`http://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${API_KEY}`);
    apiCall
        .then( response => {
            return response.json()
        })
        .then(data => {
            const weather = getState().weather.data;
            const cityWeather = {
                id: v4(),
                city: data.name,
                country: data.sys.country,
                temp: data.main.temp,
                humidity: data.main.humidity,
                wind: data.wind.speed
            };
            if(weather.length < 3){
                weather.push(cityWeather)
                dispatch({
                    type: CITY_WEATHER,
                    payload: weather
                })
            }else{
                dispatch({
                    type: ERROR_ITEMS
                })
            }
        })
        .catch(error => {
            console.log('error', error)
            dispatch({
                type: ERROR_NO_MATCHES
            })
        })
};

export const deleteCity = (cityId) => {
    return {
        type: DELETE_CITY,
        payload: cityId
    }
};

/*
export const getWeatherByCity = (city) => async dispatch => {
    const API_KEY = 'f6b238cfbf1ab8f76d87a7f3ebcc799a';
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${API_KEY}`);
    const response = await api_call.json();
console.log('response', response)
    dispatch({
        type: SEARCH_CITY,
        payload: response
    })
};*/
