import React, { useState } from 'react';
import './App.css';
import { Card} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import CheckReceipt from './components/CheckReceipt';
import ReceiptForm from './components/ReceiptForm';
import ReceiptSummary from './components/ReceiptSummary';
import HaveReceipt from './components/HaveReceipt';
import NoReceipt from './components/NoReceipt';

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1
  },
  main: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 70
  },
  card: {
    minWidth: 200,
    maxWidth: 350,
  }
}));

function App() {
  const classes = useStyles();
  const [show, setShow] = useState({
    checkReceipt: true,
    haveReceipt: false,
    noReceipt: false,
    createReceipt: false,
    receiptSummary: false
  });
  const [data, setData] = useState({});
  
  return (
    <div>
      <div className={classes.main}>
        <Card className={classes.card}>
          {show.checkReceipt && <CheckReceipt setData={setData} setShow={setShow} />}
          {show.haveReceipt && <HaveReceipt receipt={data} setShow={setShow} />}
          {show.noReceipt && <NoReceipt receipt={data} setShow={setShow} />}
          {show.createReceipt && <ReceiptForm data={data} setData={setData} setShow={setShow} />}
          {show.receiptSummary && <ReceiptSummary data={data} setData={setData} setShow={setShow} />}
        </Card>
      </div>
    </div>
  );
}

export default App;