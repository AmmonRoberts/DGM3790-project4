import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import { makeStyles } from '@mui/styles';
import React from 'react';
import Translations from './Translations';

const MyCountryModal = (props) => {

    const useStyles = makeStyles((theme) => ({
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        paper: {
            padding: '1.5em',
            backgroundColor: "white",
            border: '2px solid #000',
            minWidth: "400px",
            zIndex: "0"
        },
    }));

    const classes = useStyles();

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={props.openState}
            onClose={props.handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={props.openState}>
                <div className={classes.paper}>
                    <h2 id="transition-modal-title"> {props.country.name}</h2>
                    <p><img src={`https://flagcdn.com/h40/${props.country.iso2.toLowerCase()}.png`} alt={`${props.country.name} flag`} /></p>
                    <h4 className={classes.language_list}>Translations:</h4>
                    <Translations translations={props.country.translations} />
                </div>
            </Fade>
        </Modal>
    )
}

export default MyCountryModal;