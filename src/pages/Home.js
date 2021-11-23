import React from 'react';
import { Box } from '@mui/system';
import { useIdentityContext } from 'react-netlify-identity-gotrue'

const Home = () => {
    const identity = useIdentityContext()


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

    return (
        <Box sx={style}>
            {!identity.provisionalUser && !identity.user && (
                <h1>Welcome! Please login or sign up to continue.</h1>
            )}

            {identity.provisionalUser && (
                <h1>Thanks for signing up! Check your email to confirm.</h1>
            )}

            {identity.user && (
                <h1>Welcome back, {identity.user.user_metadata?.full_name}!</h1>
            )}
        </Box>
    )
}

export default Home