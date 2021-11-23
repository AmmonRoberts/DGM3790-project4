import React from 'react';
import { Box } from '@mui/system';
import { useIdentityContext } from 'react-netlify-identity-gotrue'
import { useState } from 'react';
import { makeStyles } from '@mui/styles';

const Home = () => {
    const identity = useIdentityContext()

    const useStyles = makeStyles((theme) => ({
        paper: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5em',
            backgroundColor: "white",
            border: '2px solid #000',
            minWidth: "400px",
            zIndex: "0"
        },
    }));

    const classes = useStyles();

    return (
        <div className={classes.paper}>
            {!identity.provisionalUser && !identity.user && (
                <h1>Welcome! Please login or sign up to continue.</h1>
            )}

            {identity.provisionalUser && (
                <h1>Thanks for signing up! Check your email to confirm.</h1>
            )}

            {identity.user && (
                <h1>Welcome back, {identity.user.user_metadata?.full_name}!</h1>
            )}
        </div>
    )
}

export default Home