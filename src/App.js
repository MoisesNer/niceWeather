import React, { setState, useState } from 'react'

const api = {
  key: "50e1296e3896b8263fa592aaabec1a87",
  base: "http://api.openweathermap.org/data/2.5/",
  icon: "http://openweathermap.org/img/wn/"
}

function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({})
  let iconweather = '';

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery("");
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
          ? 'app warm' : 'app cold')
        : 'app'}>
      <main>
        <div className='search-box'>
          <input type='text' className='search-bar' placeholder='Enter the city to search'
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
              <img src={(typeof weather.main != 'undefined') ? `${api.icon}${weather.weather[0].icon}@4x.png` :''} />
            </div>
          </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
