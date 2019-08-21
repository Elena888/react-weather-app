import React from 'react';
import {connect} from 'react-redux'
import {getCurrentLocation, getWeatherByCity, deleteCity} from './actions'
import CitySearch from './components/CitySearch'
import WeatherTable from './components/WeatherTable'
import './styles/style.css'

class App extends React.Component{
    componentDidMount(){
        this.props.getCurrentLocation();
    }

    handleSearch = (city) => {
        this.props.getWeatherByCity(city)
    };

    deleteCity = (cityId) => {
        //console.log(cityId)
        this.props.deleteCity(cityId)
    };

    render(){
        const {temp, city, description, icon, country} = this.props.currentLocation;
       if(this.props.currentLocation.temp === ''){
            return <div>Loading</div>
        }
        //console.log('this.props.weather.error', this.props.weather)
        return(
            <div className="ui container">
                <div className="current-weather">
                    <h3>Current Location: <span>"{city}, {country}"</span></h3>
                    <h4><img src={`http://openweathermap.org/img/w/${icon}.png`} alt="icon"/> {temp}&deg;C - {description}</h4>
                </div>
                <CitySearch handleSearch={this.handleSearch} errorMatches={this.props.weather.errorMatches}/>
                <WeatherTable
                    weatherData={this.props.weather}
                    deleteCity={this.deleteCity}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => {

    return{
        currentLocation: state.currentLocation,
        weather: state.weather
    }
};

export default connect(mapStateToProps, {getCurrentLocation, getWeatherByCity, deleteCity})(App);
