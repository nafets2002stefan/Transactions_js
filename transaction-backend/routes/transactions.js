const {Transaction, validateTransaction} = require('../models/transaction');
const express = require('express');
const router = express();


router.get('/', async (req, res) => {
    const transactions = await Transaction.find();
    res.json(transactions);
});

router.post('/', async (req, res) => {
    const {error} = validateTransaction(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let transaction = new Transaction({
        debitAmount: req.body.debitAmount,
        creditAmount: req.body.creditAmount,
        sender: req.body.sender,
        reciever: req.body.reciever
    });

    transaction = await transaction.save();
    res.send(transaction);

});

router.get('/:id', async (req, res) => {
    const transaction = await Transaction.findById(req.params.id);

    if(!transaction) return res.status(404).send('The transaction with the given ID was not found');
    res.send(transaction);
});

module.exports = router;
