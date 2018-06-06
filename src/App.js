import React, { Component } from 'react';
import Header from './Components/Header/Header';
import Form from './Components/Form/Form';
import FormFiveDay from './Components/FormFiveDay/FormFiveDay';
import Weather from './Components/Weather/Weather';
import WeatherFiveDay from './Components/WeatherFiveDay/WeatherFiveDay';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import jQuery from 'jquery';
import './App.css';

class App extends Component {
  state = {
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    city: undefined,
    country: undefined,
    weather: [{
      oneDayDate: undefined,
      temperature: undefined,
      high: undefined,
      low: undefined,
      humidity: undefined,
      description: undefined,
      icon: undefined,
    }],
    date: undefined,
    error: undefined,
    five_error: undefined,
  }

  getWeather = async (e) => {
    e.preventDefault();
    const zip = e.target.elements.zip.value;
    const country = e.target.elements.country.value;
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${zip},${country}&appid=${process.env.REACT_APP_CALL_WEATHER}&units=imperial`);
    const data = await api_call.json();
    // const icon = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`
    let theDate = new Date(data.dt * 1000);
    const thisMonth = this.state.months[theDate.getMonth() - 1];
    let todaysDate = `${thisMonth} ${theDate.getDate()}, ${theDate.getFullYear()}`;
    if(zip && country) {
      this.setState({
        city: data.name,
        country: data.sys.country,
        weather: [{
          temperature: data.main.temp,
          humidity: data.main.humidity,
          description: data.weather[0].description,
          icon: data.weather[0].icon,
        }],
        date: todaysDate,
        error: "",
      });
    } else if(!zip && country) {
      this.setState({
        error: "Please enter a Zip code",
      });

    } else if(zip && !country) {
      this.setState({
        error: "Please enter a Country",
      });

    } else {
      this.setState({
        error: "Please enter both fields",
      });
    }
  }

  getFiveDayWeather = async (e) => {
    e.preventDefault();
    const zipFiveDay = e.target.elements.zipFiveDay.value;
    const countryFiveDay = e.target.elements.countryFiveDay.value;
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${zipFiveDay},${countryFiveDay}&appid=${process.env.REACT_APP_CALL_WEATHER}&units=imperial`);
    const data = await api_call.json();
    if(zipFiveDay && countryFiveDay) {
      let fiveDayForecast = [];
      for(let i = 0; i < data.list.length; i++){
        if(data.list[i].dt_txt.split(' ')[1] == "21:00:00") {
          fiveDayForecast.push({
            oneDayDate: `${this.state.months[(new Date(data.list[i].dt * 1000)).getMonth()-1]} ${(new Date(data.list[i].dt * 1000)).getDate()}, ${(new Date(data.list[i].dt * 1000)).getFullYear()}`,
            temperature: data.list[i].main.temp,
            high: data.list[i].main.temp_max,
            low: data.list[i].main.temp_min,
            humidity: data.list[i].main.humidity,
            description: data.list[i].weather[0].description,
            icon: data.list[i].weather[0].icon,
          });
        }
      };
    console.log("API call returned:", data)

      this.setState({
        city: data.city.name,
        country: data.city.country,
        weather: fiveDayForecast,
      });
    } else if(!zipFiveDay && countryFiveDay) {
      this.setState({
        five_error: "Please enter a City",
      });

    } else if(zipFiveDay && !countryFiveDay) {
      this.setState({
        five_error: "Please enter a Country",
      });

    } else {
      this.setState({
        five_error: "Please enter both fields",
      });
    }
  }


  render() {
    return (
      <div className="App">
        <div className="main-bg">
          <div className="main-content">
            <div className="main-container">
              <div className="title-container">
                <Header />
              </div>
              <div className="form-container">
                <h4 className='current-title'>Current Weather:</h4>
                <Form getWeather={this.getWeather} />
                {
                  (this.state.weather.length === 1 || this.state.error) && 
                  <Weather
                    city={this.state.city}
                    country={this.state.country}
                    weather={this.state.weather}
                    error={this.state.error}
                  />
                }
                <h4 className='five-day-title'>Five Day Forecast:</h4>
                <FormFiveDay getFiveDayWeather={this.getFiveDayWeather} />
                {
                  (this.state.weather.length > 1 || this.state.five_error) && 
                  <WeatherFiveDay 
                    city={this.state.city}
                    country={this.state.country}
                    weather={this.state.weather}
                    five_error={this.state.five_error}
                    months={this.state.months}
                  />
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

