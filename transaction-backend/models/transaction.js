const Joi = require('joi');
const mongoose = require('mongoose');


const transactionSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    debitAmount:{
        type: Number,
        required: true,
        min: 0
    },
    creditAmount:{
        type: Number,
        required: true,
        min: 0
    },
    sender: {
        type: String,
        required: true,
    },
    reciever: {
        type: String,
        required: true
    }
});

const Transaction = mongoose.model('Transaction', transactionSchema);

function validateTransaction(transaction) {
    const schema = {
        debitAmount: Joi.number().min(0).required(),
        creditAmount: Joi.number().min(0).required(),
        sender:Joi.string().min(1).required(),
        reciever:Joi.string().min(1).required(),
    }

    return Joi.validate(transaction, schema);
}

module.exports.Transaction = Transaction;
module.exports.validateTransaction = validateTransaction;