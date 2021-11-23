import { useCountryContext } from '../Contexts/CountryContext';
import CountryData from './CountryData';
import { useState } from 'react';
import React from 'react';
import SearchForm from './SearchForm';


const CountryCards = (props) => {
    const CountriesJson = useCountryContext();
    // This is the problem with resetting the search string
    // const [searchString, setSearchString] = useState(null);
    const [filteredRegion, setFilteredRegion] = useState("None");
    const filterRegionChangeHandler = (event) => {
        // setSearchString(null);
        if (event.target.value === "None") {
            setFilteredRegion("None");
        }
        else {
            setFilteredRegion(event.target.value);
        }
    }

    const filteredCountries = CountriesJson.filter((country) => {
        if (filteredRegion === "None") {
            return CountriesJson
        }
        else if (filteredRegion === "N/A") {
            return country.region === "";
        }
        else {
            return country.region === filteredRegion;
        }
    })

    const createRow = () => {
        let rows = [];
        let counter = 1;
        filteredCountries.forEach((item, index) => {
            rows[counter] = rows[counter] ? [...rows[counter]] : [];
            if (index % 3 === 0 && index !== 0) {
                counter++;
                rows[counter] = rows[counter] ? [...rows[counter]] : [];
                rows[counter].push(item);
            } else {
                rows[counter].push(item);
            }
        });

        return rows;
    }

    return (
        <div className="container">
            <SearchForm
                filterRegionChangeHandler={filterRegionChangeHandler}
                CountriesJson={CountriesJson}
                filteredRegion={filteredRegion}
                filteredCountries={filteredCountries}
            />
            {createRow().map((row) => {
                return (
                    <div className="row">
                        {
                            row.map((country) => {
                                return (<CountryData
                                    country={country} />);
                            })
                        }
                    </div>
                )
            })}
        </div>
    )
};

export default CountryCards;