import { useState, useEffect } from 'react'
import axios from 'axios'
import CountryList from './components/CountryList'
import CountryDetail from './components/CountryDetail'

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleSearch = (event) => {
    setSearch(event.target.value)
    setSelectedCountry(null)
  }

  const showCountry = (country) => {
    setSelectedCountry(country)
  }

  const filtered = search
    ? countries.filter(c => c.name.common.toLowerCase().includes(search.toLowerCase()))
    : []

  let content = null

  if (selectedCountry) {
    content = <CountryDetail country={selectedCountry} />
  } else if (filtered.length > 10) {
    content = <p>Too many matches, specify another filter</p>
  } else if (filtered.length > 1) {
    content = <CountryList countries={filtered} onShow={showCountry} />
  } else if (filtered.length === 1) {
    content = <CountryDetail country={filtered[0]} />
  }

  return (
    <div>
      find countries <input value={search} onChange={handleSearch} />
      {content}
    </div>
  )
}

export default App
