import React from 'react';
import {
    Card,
    CardHeader, CardContent,
    CircularProgress,
    Backdrop
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    cardHeader: {
        textAlign: 'center',
        color: 'white'
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    }
}));

const Container = ({ title, ...props }) => {
    const classes = useStyles();

    return (
        <Card>
            <CardHeader className={`${classes.cardHeader} ${props.header}`} title={title} />
            <CardContent className={props.cardBody}>
                <Backdrop className={classes.backdrop} open={props.drop} >
                    <CircularProgress color="inherit" />
                </Backdrop>
                {props.children}
            </CardContent>
        </Card>
    )
}

export default Container;