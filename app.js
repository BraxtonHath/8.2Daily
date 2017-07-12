const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/product');
const Supplier = require('./models/supplier');
const path = require('path');
const bodyParser = require('body-parser');
const parseurl = require('parseurl');
mongoose.Promise = require('bluebird');

const app = express();

const nodeEnv = process.env.NODE_ENV || "development";
const config = require('./config.json')[nodeEnv];

app.use('/static', express.static('static'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
mongoose.connect(config.mongoURL);

//grabbing all the info from products
app.get('/api/product/drinks', function(req, res) {
  Product.find({}).then(function(products) {
    res.json(products);
  });
});

//grabbing the info from supplier
app.get('/api/supplier/purchases', function(req, res) {
  Supplier.find({}).then(function(suppliers) {
    res.json(suppliers);
  });
});


// gets the total cost from supplier
app.get('/api/supplier/cash', function(req, res) {
  Supplier.find({}).then(function(drinks) {
    var total = 0;
    for(var i = 0; i < drinks.length; i++) {
      total += drinks[i].totalCost;
    }
    res.json(total);
  });
});


//post the newproduct and saving it in the database
app.post('/api/supplier/drinks', function(req, res) {
  const newproduct = new Product(req.body).save().then(function(drink) {
    res.status(201).json({});
  });
});


module.exports = app;

app.listen(3000, function() {
  console.log('Successfully created express application');
});
