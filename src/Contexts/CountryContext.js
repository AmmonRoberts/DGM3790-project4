import React from 'react';
import { useState, useEffect, useContext, createContext } from 'react';
import axios from 'axios'
import Spinner from '../components/Spinner';

const CountryContext = createContext({
  countries: [],
})

export const CountryContextProvider = (props) => {
  const [countries, setCountries] = useState([])
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCountries = async () => {
      const URL = `/.netlify/functions/countries`

      try {
        const response = await axios.get(URL)
        const countries = await response.data

        setCountries(countries)
        setLoading(false)
      } catch (error) {
        console.log(error)
      }
    }

    fetchCountries()
  }, [])

  return isLoading ? (<Spinner />) : (
    <CountryContext.Provider value={countries} isLoading={isLoading}>
      {props.children}
    </CountryContext.Provider>
  )
}

export const useCountryContext = () => useContext(CountryContext)