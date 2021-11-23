import { Card } from '@mui/material';
import MoneyIcon from '@mui/icons-material/Money';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import MyCountryModal from "./MyCountryModal";
import React from 'react';
import { useState } from 'react';
import { makeStyles } from '@mui/styles';


const CountryData = (props) => {

    const useStyles = makeStyles((theme) => ({
        countryCard: {
            width: '15em',
            margin: 'auto',
            padding: '.5em'
        },
        countryData: {
            height: '200px',
            cursor: 'pointer',
            "& p": {
                margin: '5px',
                paddingLeft: '10px',
                fontSize: '14px',
                display: 'flex',
                justifyContent: 'flex-start'
            },
            "& h4": {
                margin: '5px',
                fontSize: '18px',
                display: 'flex',
                justifyContent: 'flex-start'
            }
        },
    }));

    const classes = useStyles();

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div
            className={classes.countryCard}>
            <Card
                className={classes.countryData}
                onClick={handleOpen}
            >
                <h4>{props.country.name}</h4>
                <p>{props.country.subregion === "" ? "N/A" : props.country.subregion}, {props.country.region === "" ? "N/A" : props.country.region}</p>
                <p><LocationCityIcon />{props.country.capital}</p>
                <p><MoneyIcon />{props.country.currency_symbol} ({props.country.currency})</p>
            </Card>
            <MyCountryModal openState={open} handleClose={handleClose} country={props.country} />
        </div>
    );

};

export default CountryData;