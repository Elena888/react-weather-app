import { v4 } from 'node-uuid'
import {CURRENT_LOCATION, CITY_WEATHER, ERROR_ITEMS, DELETE_CITY, ERROR_NO_MATCHES} from "./types";

export const getCurrentLocation = () => {
    return async (dispatch) => {
        await window.navigator.geolocation.getCurrentPosition(location => {
            dispatch({
                type: CURRENT_LOCATION,
                payload: {
                    lat: location.coords.latitude,
                    lon: location.coords.longitude
                }
            })
        });
    }
};



export const getWeatherByCity = (city) => (dispatch, getState) => {
    const API_KEY = 'f6b238cfbf1ab8f76d87a7f3ebcc799a';
    const api_call = fetch(`http://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${API_KEY}`);
    api_call
        .then( response => {
            return response.json()
        })
        .then(data => {
            const weather = getState().weather.data;
            console.log(data)
            const cityWeather = {
                id: v4(),
                city: data.name,
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
