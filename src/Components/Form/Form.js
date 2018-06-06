import React from 'react';
import './Form.css';


const Form = props => (

    <form onSubmit={props.getWeather}>
        <input type='text' name='zip' placeholder='Enter Zip code'></input>
        <input type='text' name='country' defaultValue='US' placeholder='Enter a Country'></input>
        <button>Get Weather</button>
    </form>

)

export default Form;