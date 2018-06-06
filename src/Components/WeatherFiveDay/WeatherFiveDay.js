import React from 'react';
import './WeatherFiveDay.css';

const WeatherFiveDay = props => (
    <div className='five-day-info'>
        { 
            props.city && props.country &&
            <div className='five-day-value'>
                <h5>Five Day Forecast for { props.city }</h5>
                <div className='five-day-flex'>
                    { 
                        props.weather.map((weather) => {
                            return(
                                <div className='mapped-five-day'>
                                    <p>
                                        <span className='five-day-date'>{ weather.oneDayDate }</span>
                                        <span>Outlook: { weather.description }</span> <span>HI: { weather.high }&deg;F - Humidity: { weather.humidity }%.</span>
                                    </p>
                                    <img src={`http://openweathermap.org/img/w/${weather.icon}.png`} alt='five-day-icon' className='five-day-icon' />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        }
        { 
            props.five_error && 
            <p className='five-day-key'>
                <span className='five-day-error'>{ props.five_error }</span>
            </p> 
        }
    </div>
);


export default WeatherFiveDay;