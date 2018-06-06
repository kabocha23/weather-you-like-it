import React from 'react';
import './FormFiveDay.css';


const FormFiveDay = props => (

    <form onSubmit={props.getFiveDayWeather}>
        <input type='text' name='zipFiveDay' placeholder='Enter Zip code'></input>
        <input type='text' name='countryFiveDay' defaultValue='US' placeholder='Enter a Country'></input>
        <button>Get Forecast</button>
    </form>

)

export default FormFiveDay;