import React, {useState, useEffect} from 'react';
import './_GetWeather.scss';
import axios from 'axios';

// require('dotenv').config();

export const GetWeather = () => {
  // const {API} = process.env;
  const [toggleStateDegrees, setToggleStateDegrees] = useState(false);
  const [toggleStatePressure, setToggleStatePressure] = useState(false);
  const [userLocation, setUserLocation] = useState({});
  const [userWeatherMain, setUserWeatherMain] = useState({});
  const [userWeather, setUserWeather] = useState({});
  const [weatherIcon, setWeatherIcon] = useState({});
  const [error, setError] = useState('');
  
  useEffect(() => {

    const getData = async () => {
      try {
        // AlbanyCanCode OpenWeather API
        const apiKey = `886705b4c1182eb1c69f28eb8c520e20`;
        const res = await axios.get(`https://ipapi.co/json/`) 
        setUserLocation(res.data)
        
        const lat = res.data.latitude;
        const long = res.data.longitude;
        // console.log(lat, long);
        
        
        const weather = await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}`);
        // Static lat & long for testing if API exceeds limit
        // const weather = await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=38.1891&lon=-85.6589&appid=${apiKey}`);
        setUserWeatherMain(weather.data.main);
        setUserWeather(weather.data.weather[0]);
        setWeatherIcon(weather.data.weather[0].icon);
        
        
        
        // const weatherIcon = await axios.get(`http://openweathermap.org/img/wn/03d@2x.png`);
        // console.log(weatherIcon);
        
        // setWeatherIcon(weatherIcon)
        
      } catch (err) {
        setError(err)
      }
    }
    getData()

  }, [])
  // console.log(userWeather);
  // console.log(userWeatherMain);
  
  const fahrenheit = Math.floor(((userWeatherMain.temp - 273.15) * 1.8) + 32);
  const celcius = Math.round((fahrenheit - 32) / 1.8);
  const pressureMb = userWeatherMain.pressure; 
  const pressureInches = (userWeatherMain.pressure * 0.0295301).toFixed(2);
  const humidity = userWeatherMain.humidity;
  // console.log(weatherIcon);
  
  const icon = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png` ;
  // console.log(icon);
  

  function toggleDegrees() {
    setToggleStateDegrees(toggleStateDegrees ? false : true);
  }
  
  function togglePressure() {
    setToggleStatePressure(toggleStatePressure ? false : true);
  }
  return (
    <div className='weather-container'>
      
      <h1 className='text'>The weather in {userLocation.city}, {userLocation.region} is:</h1>
      <img className='weather-icon' src={icon} alt='weather icon'/>
      <h2 className='description text'>{userWeather.description}</h2>
      <h2 className='degrees text'>{!toggleStateDegrees ? fahrenheit : celcius}{!toggleStateDegrees ? '° F' : '° C'}</h2>
  <h2 className='pressure text'>Pressure: {!toggleStatePressure ? pressureInches : pressureMb}{!toggleStatePressure ? 'in' : 'mb'}</h2>
      <h2 className='humidity text'>Humidity: {humidity}%</h2>

      <button onClick={toggleDegrees}>F / C</button>
      <button onClick={togglePressure}>in / mb</button>
    </div>
  );
};
