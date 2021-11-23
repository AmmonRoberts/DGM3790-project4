import { useCountryContext } from '../Contexts/CountryContext';
import CountryData from './CountryData';
import { useState } from 'react';
import React from 'react';
import { Box } from '@mui/system';
import Link from '@mui/material/Link';
import SearchForm from './SearchForm';
import { useIdentityContext } from 'react-netlify-identity-gotrue'
import { useHistory } from 'react-router-dom'


const CountryCards = (props) => {
    const identity = useIdentityContext()
    const history = useHistory()

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

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        backgroundColor: "white",
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    }

    const handleNavChoice = (choice) => {
        history.push(`/${choice}`)
    }

    return (
        <div className="container">
            {identity.user && (
                <>

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
                </>
            )}
            {!identity.provisionalUser && !identity.user && (
                <Box sx={style}>
                    <h1>You need to be <Link
                        onClick={() => handleNavChoice('login', false)}>
                        logged in </Link>
                        to view this page!</h1>
                </Box>
            )}
        </div>
    )
};

export default CountryCards;