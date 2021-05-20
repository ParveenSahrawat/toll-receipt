import React, { useState } from 'react';
import { Formik } from 'formik';
import {
    Button,
    FormControl,
    TextField,
    Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Container from './Container';

const useStyles = makeStyles((theme) => ({
    cardHeader: {
        background: '#1b5e20',
    },
    cardContent: {
        // background: '#e8f5e9'
    },
    form: {
        width: '100%'
    },
    formControl: {
        width: '100%'
    },
    text: {
        color: '#66bb6a'
    },
    errorText: {
        color: 'red'
    },
    btnContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 20
    }
}));

const CheckReceipt = ({ show, setShow, setData, ...props }) => {
    const classes = useStyles();
    const [drop, setDrop] = useState(false);

    const setVisibility = (d) => {
        setShow(state => ({ ...state, ...d }));
    }

    const checkReceipt = async (values, setSubmitting) => {
        let num = values.vehicleNumber.replace(/\s+/g, '_').toLowerCase();
        try {
            setDrop(true);
            const res = await axios.get(`http://localhost:3001/receipt/${num}`);
            if (res.data.vehicleNumber === num)
                setVisibility({ checkReceipt: false, haveReceipt: true })
            else
                setVisibility({ checkReceipt: false, noReceipt: true });

            setSubmitting(false);
            setDrop(false);
            setData((prevState) => ({
                ...prevState,
                vehicleNumber: num
            }));
        } catch (error) {
            setSubmitting(false);
            setDrop(false);
            if (error && error.response.status === 404) {
                setVisibility({ checkReceipt: false, noReceipt: true });
                setData((prevState) => ({
                    ...prevState,
                    vehicleNumber: num
                }));
            } else
                alert('Sorry, an error occured');
        }
    }

    return (
        <Container
            title={'Check Receipt'}
            drop={drop}
            header={classes.cardHeader}
        >
            <Typography>Check if there is aleady a Two Way Receipt for this vehicle</Typography>
            <Formik
                initialValues={{ vehicleNumber: '' }}
                validate={values => {
                    const errors = {};
                    if (!values.vehicleNumber) {
                        errors.vehicleNumber = 'Vehicle number is required';
                    } else if (
                        !(values.vehicleNumber).match(/^[A-Z]{2}\s[0-9]{1,2}\s[A-Z]{1,3}\s\d{4}$/i)
                    ) {
                        errors.vehicleNumber = 'Invalid vehicle number';
                    }
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => checkReceipt(values, setSubmitting)}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                }) => (
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <FormControl className={classes.formControl}>
                            <TextField
                                label="Vehicle Number"
                                type="text"
                                name="vehicleNumber"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.vehicleNumber}
                                helperText={"eg. DL 23 AB 7864"}
                            />
                            {errors.vehicleNumber
                                && touched.vehicleNumber
                                && <div className={classes.errorText}>{errors.vehicleNumber}</div>}
                        </FormControl>
                        <div className={classes.btnContainer}>
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                disabled={isSubmitting}
                            >Check</Button>
                        </div>
                    </form>
                )}
            </Formik>
        </Container>
    )
}

export default CheckReceipt;