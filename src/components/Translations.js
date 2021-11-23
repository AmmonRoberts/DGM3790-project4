import React from 'react';

const Translations = (props) => {
    const translationsArray = Object.keys(props.translations).map((key) => [key, props.translations[key]]);

    return (

        translationsArray.map((element) => {
            return <span><strong>{element[0].toUpperCase()}</strong> {element[1]}<br /></span>
        })
    );

};

export default Translations;