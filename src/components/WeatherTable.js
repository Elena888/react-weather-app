import React from 'react'

const WeatherTable =(props) =>{

    if(!props.weatherData){
        return <div>Loading...</div>
    }
    const {data, errorItems} = props.weatherData;
    const renderWeatherData = () => {
        return data.map(item => {
            return(
                <tr key={item.id}>
                    <td>{item.city}</td>
                    <td>{item.temp}</td>
                    <td>{item.humidity}</td>
                    <td>{item.wind}</td>
                    <td><i onClick={() => props.deleteCity(item.id)} className="window close outline icon"/></td>
                </tr>
            )
        })
    };
    return(
        <div>
            <table className="ui celled table">
                <thead>
                <tr>
                    <th>City</th>
                    <th>Temperature, &deg;C</th>
                    <th>Humidity, %</th>
                    <th>Wind Speed, mps</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                    {renderWeatherData()}
                </tbody>
            </table>
            {errorItems &&
                <div className="ui bottom attached orange message">
                    <i className="warning icon"></i>
                    {errorItems}
                </div>
            }
        </div>
    )

};

export default WeatherTable