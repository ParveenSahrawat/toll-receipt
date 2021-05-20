const express = require('express');
const router = new express.Router();

const TollReceipt = require('../models/tollReceipt');
const { getErrors } = require('../utils/errors');

const schemaFields = Object.keys(TollReceipt.schema.paths).filter(val => {
    return !['_id', '__v'].includes(val);
});

/**
 * To make a toll receipt for the vehicle
 */
router.post('/receipt', async (req, res) => {
    console.log(req.body);
    const receipt = new TollReceipt(req.body);
    
    try {
        if (receipt.journeyType === 'One Way')
            receipt.completed = true;
        receipt.createdOn = new Date().toLocaleDateString();
        await receipt.save();
        res.status(201).send(receipt);
    } catch (error) {
        console.log(error);
        const errors = getErrors(schemaFields, error.errors);
        res.status(400).send(errors);
    }
});

/**
 * Vehicle arrives at the toll for the second time, then get receipt
 */
router.get('/receipt/:vehicleNumber', async (req, res) => {
    console.log('get receipt');
    try {
        const receipt = await TollReceipt.findOne({
            "vehicleNumber": req.params.vehicleNumber.toLowerCase(),
            "createdOn": new Date().toLocaleDateString(),
            "completed": false,
            "journeyType": "Two Way"
        });

        if (!receipt)
            return res.status(404).send();
        const dateToday = new Date().toLocaleDateString();

        if (dateToday !== receipt.createdOn)
            throw new Error({ error: 'Receipt Expired!' });

        res.send(receipt);
    } catch (error) {
        res.status(400).send(error);
    }
});

/**
 * To update receipt info for vehicle doing second trip with Two Way receipt
 */
router.patch('/receipt/:vehicleNumber', async (req, res) => {
    try {
        const receipt = await TollReceipt.findOne({
            "vehicleNumber": req.params.vehicleNumber.toLowerCase(),
            "createdOn": new Date().toLocaleDateString(),
            "completed": false,
            "journeyType": "Two Way"
        });

        if (!receipt)
            return res.status(404).send();
        const dateToday = new Date().toLocaleDateString();

        if (dateToday !== receipt.createdOn)
            throw new Error({ error: 'Receipt Expired!' });

        receipt.completed = true;

        await receipt.save();
        res.send(receipt);
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;