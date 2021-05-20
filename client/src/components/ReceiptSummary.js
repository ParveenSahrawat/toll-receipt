import React from 'react';
import {
    Button,
    Divider,
    Table,
    TableBody,
    TableCell,
    TableRow,
    Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import Container from './Container';

const useStyles = makeStyles((theme) => ({
    cardHeader: {
        background: '#8bc34a',
    },
    cardContent: {
        background: '#fff'
    },
    thankText: {
        textAlign: 'center'
    },
    text: {
        color: '#000'
    },
    btnContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 20
    }
}));

const ReceiptSummary = ({ setShow, setData, data }) => {
    const classes = useStyles();

    const done = () => {
        setShow(prevState => ({
            ...prevState,
            receiptSummary: false,
            checkReceipt: true
        }));
        setData({});
    }

    if (!data)
        return <></>;

    return (
        <Container
            title={"Receipt Summary"}
            header={classes.cardHeader}
            cardBody={classes.cardBody}
        >
            <Typography>Receipt created successfully. Thanks for using our services</Typography>
            <Divider />
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell>Vehicle</TableCell>
                        <TableCell>{data.vehicleNumber.replace(/_/g, ' ').toUpperCase()}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Journey Type</TableCell>
                        <TableCell>{data.journeyType}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>{data.createdOn}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Time</TableCell>
                        <TableCell>{moment(data.createdAt).format('LT')}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Amount</TableCell>
                        <TableCell>Rs. {data.amount}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <div className={classes.btnContainer}>
                <Button
                    variant={"outlined"}
                    color={"primary"}
                    onClick={() => done()}
                >Done</Button>
            </div>
        </Container>
    )
}

export default ReceiptSummary;