import React from 'react';
import {connect} from 'react-redux'
import {getCurrentLocation, getWeatherByCity, deleteCity} from './actions'
import CitySearch from './components/CitySearch'
import WeatherTable from './components/WeatherTable'
import './styles/style.css'

class App extends React.Component{
    state = {
        temp: '',
        city: '',
        description: '',
        icon: ''
    };

    componentDidMount(){
        this.props.getCurrentLocation();
    }

    async componentDidUpdate(prevProps){
        if(prevProps.location !== this.props.location){
            const API_KEY = 'f6b238cfbf1ab8f76d87a7f3ebcc799a';
            const {lat, lon} = this.props.location;
            const api_call = await  fetch(`http://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${API_KEY}`);
            const response = await api_call.json();
            this.setState({
                temp: response.main.temp,
                city: response.name,
                description: response.weather[0].description,
                icon: response.weather[0].icon
            })
        }
    }

    handleSearch = (city) => {
        this.props.getWeatherByCity(city)
    };

    deleteCity = (cityId) => {
        //console.log(cityId)
        this.props.deleteCity(cityId)
    };

    render(){
        const {temp, city, description, icon} = this.state;
        if(this.state.temp === ''){
            return <div>Loading</div>
        }
        //console.log('this.props.weather.error', this.props.weather)
        return(
            <div className="ui container">
                <div className="current-weather">
                    <h3>Current Location: <span>"{city}"</span></h3>
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
        location: state.currentLocation,
        weather: state.weather
    }
};

export default connect(mapStateToProps, {getCurrentLocation, getWeatherByCity, deleteCity})(App);
