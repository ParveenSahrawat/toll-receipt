const mongoose = require('mongoose');

const tollReceiptSchema = new mongoose.Schema({
    vehicleNumber: {
        type: String,
        required: true,
        lowercase: true,
        match: [/^[A-Z]{2}_[0-9]{1,2}_[A-Z]{1,3}_\d{4}$/i, 'Vehicle number is invalid']
    },
    amount: {
        type: Number,
        required: true,
        min: [0, 'Please enter valid amount']
    },
    journeyType: {
        type: String,
        required: true,
        enum: {
            values: ['One Way', 'Two Way'],
            message: `Please enter either 'One Way' or 'Two Way'`
        },
        default: 'One Way'
    },
    completed: {
        type: Boolean,
        default: false
    },
    createdOn: {
        type: String,
    }
}, {
    timestamps: true
});

const TollReceipt = mongoose.model('TollReceipt', tollReceiptSchema);

module.exports = TollReceipt;