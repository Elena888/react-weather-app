import React from 'react';
import {connect} from 'react-redux'
import {getCurrentLocation, addCityWeather, deleteCity, initialState} from './actions'
import CitySearch from './components/CitySearch'
import WeatherTable from './components/WeatherTable'
import './styles/style.css'

class App extends React.Component{
    componentDidMount(){
        this.props.getCurrentLocation();
        this.props.initialState()
    }

    handleSearch = (city) => {
        this.props.addCityWeather(city)
    };

    deleteCity = (cityId) => {
        this.props.deleteCity(cityId)
    };

    render(){
        const {temp, city, description, icon, country} = this.props.currentLocationWeather;
        return(
            <div className="ui container">
                <div className="current-weather">
                    {this.props.errorBrowser || this.props.currentLocationWeather.length === 0 ?
                        <h3>{this.props.errorBrowser ? this.props.errorBrowser : 'Loading...'}</h3>
                        :
                        <React.Fragment>
                            <h3>Current Location: <span>"{city}, {country}"</span></h3>
                            <h4><img src={`http://openweathermap.org/img/w/${icon}.png`} alt="icon"/> {temp}&deg;C - {description}</h4>
                        </React.Fragment>
                    }

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
        currentLocationWeather: state.currentLocationWeather.data,
        errorBrowser: state.currentLocationWeather.error,
        weather: state.weather
    }
};

export default connect(mapStateToProps, {getCurrentLocation, addCityWeather, deleteCity, initialState})(App);
