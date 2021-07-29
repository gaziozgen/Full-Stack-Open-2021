import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {

  const api_key = process.env.REACT_APP_API_KEY
  const [name, setName] = useState('')
  const [countries, setCountries] = useState([])
  const [weather, setWeather] = useState(null)

  const countriesToShow = countries.filter(country => country.name.includes(name))

  useEffect(() => {
    console.log('cities')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  useEffect(() => {
    if ( countriesToShow.length === 1) {
      axios
      .get('http://api.weatherstack.com/current?access_key=' + api_key + '&query='+ countriesToShow[0].name)
      .then(response => {
        console.log(response.data)
        setWeather(response.data)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countriesToShow.length])

  const handleChange = (event) => {
    setName(event.target.value)
  }

  return (
    <div>
      {"find countries "}
      <input
        value={name}
        onChange={handleChange}
      />
      <ShowCountries countries={countriesToShow} setName={setName} weather={weather} />
    </div>
  );
}

const ShowCountries = ({ countries, setName, weather }) => {
  
  if (countries.length > 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  } else if (countries.length > 1) {
    return (
      <ul>
        {countries.map(country =>
          <li key={country.alpha3Code}>{country.name}
            <button onClick={() => setName(country.name)}>show</button></li>

        )}
      </ul>
    )
  } else if (countries.length === 1 && weather) {
    return (
      <div>
        <h2>{countries[0].name}</h2>
        <p>
          capital {countries[0].capital}
          <br />
          population {countries[0].population}
        </p>
        <h3>languages</h3>
        <ul>
          {countries[0].languages.map(language =>
            <li key={language.iso639_2}>{language.name}</li>
          )}
        </ul>
        <img src={countries[0].flag} alt="flag.svg" width="200px"></img>
          <h3>Weather in {weather.location.country}</h3>
        <b>temperature:</b> {weather.current.temperature} Celcius
        <br/>
        <img src={weather.current.weather_icons[0]} alt="weatherimage.svg" width="100px"></img>
        <br/>
        <b>wind:</b> {weather.current.wind_speed} mph direction {weather.current.wind_dir}
      </div>
    )
  } else {
    return (
      <div></div>
    )
  }
}

export default App;