import React from 'react'

const WeatherTable =(props) =>{

    if(!props.weatherData.data){
        return <div>Loading...</div>
    }
    const {data, errorItems} = props.weatherData;

    const renderWeatherData = () => {
        console.log('data',data)
        return data.map(item => {
            console.log(item.city)
            return(
                <tr key={item.id}>
                    <td>{item.city}, {item.country}</td>
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
                    <th/>
                </tr>
                </thead>
                <tbody>
                    {renderWeatherData()}
                </tbody>
            </table>
            {errorItems &&
                <div className="ui bottom attached orange message">
                    <i className="warning icon"/>
                    {errorItems}
                </div>
            }
        </div>
    )

};

export default WeatherTable