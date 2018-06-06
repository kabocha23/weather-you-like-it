import React from 'react';
import './Weather.css';


const Weather = props => (
    <div className='weather-info'>
        { 
            props.city && props.country &&
            <div className='weather-value'>
                <p>The current temperature in {props.city}, {props.country} is {props.weather[0].temperature}&deg;F, with humidity of {props.weather[0].humidity}% <span>Outlook: {props.weather[0].description}</span>
                </p>
                <img src={`http://openweathermap.org/img/w/${props.weather[0].icon}.png`} alt='weather-icon' className='weather-icon' />
            </div>
        }
        { 
            props.error && 
            <p className='weather-key'>
                <span className='weather-error'>{ props.error }</span>
            </p> 
        }
    </div>
);


export default Weather;