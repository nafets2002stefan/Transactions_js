const winston = require('winston');
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();

const transactions = require('./routes/transactions');

app.use(express.json());
app.use(cors());
app.use('/api/transactions', transactions);

const db = "mongodb://localhost/transaction_app";
mongoose.connect(db)
    .then(() => winston.info(`Connected to ${db}...`));


const port = process.env.port || 5000;
const server = app.listen(port, () => winston.info(`Server is listening on port ${port} ...`))

module.exports = server;