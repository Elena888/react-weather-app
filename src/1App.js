import React from 'react';
import {connect} from 'react-redux'
import {getCurrentLocation} from './actions'
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
            console.log(response)
            this.setState({
                temp: response.main.temp,
                city: response.name,
                description: response.weather[0].description,
                icon: response.weather[0].icon
            })
        }
    }

    render(){
         const {temp, city, description, icon} = this.state;
        if(this.state.temp === ''){
            return <div>Loading</div>
        }

        return(
            <div className="ui container">
                <div className="current-weather">
                    <h3><img src={`http://openweathermap.org/img/w/${icon}.png`} alt="icon"/> {temp}</h3>
                    <h3>"{city}"</h3>
                    <h4>{description}</h4>

                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        location: state.currentLocation
    }
};

export default connect(mapStateToProps, {getCurrentLocation})(App);
