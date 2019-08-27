import React from 'react'

const WeatherTable =(props) =>{
    const {data, errorItems} = props.weatherData;

    if(!data){
        return <div>Loading...</div>
    }


    const renderWeatherData = () => {
        if(data.length > 0){
            console.log('length > 0')
        }else{
            console.log('length < 0')
        }
        console.log('renderWeatherData data',data)
        //console.log('renderWeatherData data',data.length)

            return data.map(item => {
                console.log(item.city)
                return (
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