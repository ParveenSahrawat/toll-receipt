import React, { } from 'react';
import { Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Container from './Container';

const useStyles = makeStyles((theme) => ({
    cardHeader: {
        background: '#bf360c',
    },
    cardBody: {
        background: '#fbe9e7'
    },
    text: {
        color: '#ff7043'
    },
    btnContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 20
    }
}));

const NoReceipt = ({ setShow, receipt }) => {
    const classes = useStyles();

    if (!receipt.vehicleNumber)
        return <></>;

    return (
        <Container
            title={"No Receipt Available"}
            cardBody={classes.cardBody}
            header={classes.cardHeader}
            drop={false}
        >
            <Typography className={classes.text}>
                {`Vehicle with number plate ${receipt.vehicleNumber.replace(/_/g, ' ').toUpperCase()} don't have any receipt.`}
            </Typography>
            <div className={classes.btnContainer}>
                <Button
                    variant={"outlined"}
                    color={"primary"}
                    onClick={() => {
                        setShow(prevState => ({
                            ...prevState,
                            noReceipt: false,
                            createReceipt: true
                        }));
                    }}
                >Create Receipt</Button>
            </div>
        </Container>
    )
}

export default NoReceipt;