import Weather from './Weather'

const CountryDetail = ({ country }) => {
  const languages = Object.values(country.languages)

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <h3>languages:</h3>
      <ul>
        {languages.map(lang => <li key={lang}>{lang}</li>)}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt || `flag of ${country.name.common}`} width="150" />
      <Weather capital={country.capital} />
    </div>
  )
}

export default CountryDetail
