import React, { useState } from 'react'

const api = {
  key: process.env.REACT_APP_WEATHER_API_KEY,
  // key: 'd0ddb3b6f9ee40dfafdd51fde00da8a4',
  base: "https://api.openweathermap.org/data/2.5/",
  icon: "http://openweathermap.org/img/wn/"
}

function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({})

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
      // fetch(`${api.base}weather?q=${query}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery("");
          console.log(result);
        });
      }
    }

  const dateBuilder = (d) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'june', 'July', 'August', 'September', 'August', 'December'];
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date} ${month} ${year}`
  }

  return (
    <div className={
      (typeof weather.main != "undefined")
        ? ((weather.main.temp > 15)
          ? ((weather.main.temp > 20) ? 
          'app hot' : 'app warm'  
          ) : ((weather.main.temp > 0) ? 
          'app cold' : 'app snowy'
          ))
        : 'app'}>
      <main>
        <div className='search-box'>
          
          <input type='text' className='search-bar' placeholder='ENTER A CITY NAME TO SEARCH'
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
          <div>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">
                {Math.round(weather.main.temp)}° C
              </div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
            <div className='weather-icon'>
              <img alt='' src={(typeof weather.main != 'undefined') ? `${api.icon}${weather.weather[0].icon}@4x.png` :''} />
            </div>
          </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
