import React from 'react';
import { Box, Button, TextField } from '@mui/material'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useHistory } from 'react-router-dom'
import { useIdentityContext } from 'react-netlify-identity-gotrue'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
}

const Signup = (props) => {
    const history = useHistory()
    const identity = useIdentityContext()
    const handleClose = () => history.push('/')
    return (
        <Box sx={style}>
            <Formik
                initialValues={{
                    userName: '',
                    email: '',
                    password: '',
                }}
                validationSchema={Yup.object().shape({
                    userName: Yup.string()
                        .min(4, 'Must be at least 4 characters')
                        .max(50, 'Must be less than 50 characters')
                        .required('User name is required'),
                    email: Yup.string()
                        .email('Must be a valid email')
                        .max(255)
                        .required('Email is required'),
                    password: Yup.string()
                        .min(8, 'Must be at least 8 characters')
                        .max(255)
                        .required('Password is required'),
                })}
                onSubmit={async (value, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        setStatus({ success: true })
                        setSubmitting(false)
                        await identity.signup({
                            email: value.email, password: value.password, user_metadata: {
                                full_name: value.userName
                            }
                        }
                        ).then(() => {
                            handleClose()
                            console.log('Successfully submitted!')
                        })
                    } catch (err) {
                        console.error(err)
                        setStatus({ success: false })
                        setErrors({ submit: err.message })
                        setSubmitting(false)
                    }
                }}
            >
                {({
                    errors,
                    values,
                    handleSubmit,
                    handleBlur,
                    handleChange,
                    isSubmitting,
                    touched,
                }) => (
                    <form noValidate onSubmit={handleSubmit}>
                        <TextField
                            error={Boolean(touched.userName && errors.userName)}
                            fullWidth
                            helperText={touched.userName && errors.userName}
                            label="User Name"
                            margin="normal"
                            name="userName"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            type="text"
                            variant="outlined"
                            value={values.userName}
                        />
                        <TextField
                            error={Boolean(touched.email && errors.email)}
                            fullWidth
                            helperText={touched.email && errors.email}
                            label="Email Address"
                            margin="normal"
                            name="email"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            type="email"
                            variant="outlined"
                            value={values.email}
                        />
                        <TextField
                            error={Boolean(touched.password && errors.password)}
                            fullWidth
                            helperText={touched.password && errors.password}
                            label="Password"
                            margin="normal"
                            name="password"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            type="password"
                            variant="outlined"
                            value={values.password}
                        />
                        <Button
                            color="primary"
                            disabled={isSubmitting}
                            fullWidth
                            size="large"
                            variant="contained"
                            type="submit"
                        >
                            Sign Up
                        </Button>
                    </form>
                )}
            </Formik>
        </Box>
    )
}

export default Signup