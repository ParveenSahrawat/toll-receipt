import React, { useState } from 'react';
import axios from 'axios';
import { Formik } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from '@material-ui/core';
import Container from './Container';

const useStyles = makeStyles((theme) => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        padding: 10,
        border: '1px solid #b39ddb',
        borderRadius: 5
    },
    formHeader: {
        backgroundColor: '#7e57c2'
    },
    formControl: {
        marginTop: theme.spacing(1),
        minWidth: '100%',
    },
    errorText: {
        color: 'red'
    },
    btnContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 20,
        width: '100%'
    }
}));

const ReceiptForm = ({ data, setShow, setData }) => {
    const classes = useStyles();
    const [drop, setDrop] = useState(false);
    const [receipt, setReceipt] = useState(data);

    const submitToll = async (submit, setSubmitting) => {
        const { vehicleNumber, amount, journeyType } = receipt;
        if (!vehicleNumber && !amount && !journeyType)
            return;
        try {
            setDrop(true);
            const res = await axios.post(`/receipt`, {vehicleNumber, amount, journeyType});
            setDrop(false);
            console.log(res.data);
            setData((prevState) => ({
                ...prevState,
                ...res.data
            }));
            setShow(prevState => ({
                ...prevState,
                receiptSummary: true,
                createReceipt: false
            }));
            setReceipt({});
            setSubmitting(false);
        } catch (error) {
            setDrop(false);
            setSubmitting(false);
            console.log(error);
            alert('Sorry, an error occured');
        }
    }

    // if (!receipt.vehicleNumber)
    //     return <div>Loading ...</div>

    return (
        <Container
            title={"Collect Toll"}
            header={classes.formHeader}
            drop={drop}
        >
            <Formik
                initialValues={receipt}
                validator={values => {
                    const errors = {};
                    if (!values.journeyType)
                        errors.journeyType = 'Journey type is required';
                    if (!values.amount)
                        errors.amount = "Amount is required"
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => submitToll(values, setSubmitting)
                }
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
                                value={values.vehicleNumber.replace(/_/g, ' ').toUpperCase()}
                                disabled={true}
                            />
                            <div className={classes.errorText}>{errors.vehicleNumber && touched.vehicleNumber && errors.vehicleNumber}</div>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="journeyType">Journey Type</InputLabel>
                            <Select
                                autoWidth={true}
                                label={"Journey Type"}
                                labelWidth={200}
                                inputProps={{
                                    name: "journeyType",
                                    id: "journeyType"
                                }}
                                value={values.journeyType}
                                onChange={(e) => setReceipt((prevState) => ({
                                    ...prevState,
                                    journeyType: e.target.value
                                }))}
                            >
                                <MenuItem value={"One Way"}>One Way</MenuItem>
                                <MenuItem value={"Two Way"}>Two Way</MenuItem>
                            </Select>
                            <div className={classes.errorText}>{errors.vehicleNumber && touched.vehicleNumber}</div>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="amount">Amount</InputLabel>
                            <Select
                                autoWidth={true}
                                label={"Amount"}
                                labelWidth={200}
                                inputProps={{
                                    name: "amount",
                                    id: "amount"
                                }}
                                value={values.amount}
                                onChange={(e) => setReceipt((prevState) => ({
                                    ...prevState,
                                    amount: e.target.value
                                }))}
                            >
                                <MenuItem value={100}>100</MenuItem>
                                <MenuItem value={200}>200</MenuItem>
                            </Select>
                            <div className={classes.errorText}>{errors.amount && touched.amount}</div>
                        </FormControl>
                        <div className={classes.btnContainer}>
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                disabled={isSubmitting}
                            >
                                Submit
                            </Button>
                        </div>
                    </form>
                )}
            </Formik>
        </Container>
    );
}

export default ReceiptForm;
