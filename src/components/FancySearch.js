import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import React from 'react';
// import { useState } from 'react';
// import MyModal from './MyModal';


const FancySearch = (props) => {
    return (
        <Autocomplete
            id="country-search"
            sx={{ width: 300 }}
            options={props.countries}
            getOptionLabel={(country) => country.name}
            renderInput={(params) => (
                <TextField {...params}
                    label="Countries" margin="normal" />
            )}
            renderOption={(props, country, { inputValue }) => {
                const matches = match(country.name, inputValue);
                const parts = parse(country.name, matches);

                return (
                    <li {...props}>
                        <div>
                            {parts.map((part, index) => (
                                <span
                                    // onClick={handleOpen}
                                    key={index}
                                    style={{
                                        fontWeight: part.highlight ? 700 : 400,
                                    }}>
                                    {part.text}
                                    {/* <MyModal openState={open} handleClose={handleClose} country={option} /> */}
                                </span>
                            ))}
                        </div>
                    </li>
                );
            }}
        />
    );
}


export default FancySearch;