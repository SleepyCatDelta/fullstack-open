import { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    const api_key = import.meta.env.VITE_WEATHER_API_KEY
    if (!api_key || !capital) return
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`)
      .then(response => {
        setWeather(response.data)
      })
  }, [capital])

  if (!weather) return null

  return (
    <div>
      <h3>Weather in {capital}</h3>
      <p>temperature {weather.main.temp} Celsius</p>
      {weather.weather[0] && (
        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt={weather.weather[0].description}
        />
      )}
      <p>wind {weather.wind.speed} m/s</p>
    </div>
  )
}

export default Weather
