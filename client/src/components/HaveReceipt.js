import React, { useState } from 'react';
import { Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Container from './Container';

const useStyles = makeStyles((theme) => ({
    cardHeader: {
        background: '#1b5e20',
    },
    cardBody: {
        background: '#e8f5e9'
    },
    text: {
        color: '#66bb6a'
    },
    btnContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 20
    }
}));

const HaveReceipt = ({ receipt, setShow, }) => {
    const classes = useStyles();
    const [drop, setDrop] = useState(false);
    const updateReceipt = async () => {
        try {
            setDrop(true);
            await axios.patch(`/receipt/${receipt.vehicleNumber}`);
            setDrop(false);
            setShow(prevState => ({
                ...prevState,
                haveReceipt: false,
                checkReceipt: true
            }));
        } catch (error) {
            setDrop(false);
            console.log(error);
        }
    }

    if (!receipt.vehicleNumber)
        return <></>;

    return (
        <Container
            title={'Receipt Exists'}
            header={classes.cardHeader}
            cardBg={classes.cardBody}
            drop={drop}
        >
            <Typography className={classes.text}>
                {`Vehicle with number plate ${receipt.vehicleNumber.replace(/_/g, ' ').toUpperCase()} already have 'Two Way' receipt.`}
            </Typography>
            <div className={classes.btnContainer}>
                <Button
                    onClick={() => updateReceipt()}
                    variant={"outlined"}
                    color={"primary"}
                >Let it go</Button>
            </div>
        </Container>
    )
}

export default HaveReceipt;