import {combineReducers} from 'redux'
import CurrentLocationReducer from './CurrentLocationReducer'
import SearchByCityReducer from './SearchByCityReducer'

export default combineReducers({
    currentLocationWeather: CurrentLocationReducer,
    weather: SearchByCityReducer
})