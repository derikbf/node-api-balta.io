const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const router = express.Router();

// Connect BD
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@balta-io.52wjk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`);

// Loading Model
const Product = require('./models/product')
const Customer = require('./models/customer')

// Loading route
const indexRoute = require('./routes/index-route')
const productRoute = require('./routes/product-route')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', indexRoute);
app.use('/products', productRoute);

module.exports = app;
