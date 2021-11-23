import React from 'react'
import spinner from '../assets/spinner.gif'

const Spinner = () => {
    return (
        <div style={{ color: 'white', justifyItems: 'center', alignItems: 'center', display: 'grid', alt: 'Loading' }}>
            <img style={{ maxWidth: '100px' }} src={spinner} alt="Loading..." />
            <h1>Loading...</h1>
        </div>
    )
}

export default Spinner