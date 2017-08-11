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





app.get('/api/product/drinks', function(req, res) {
  Product.find({}).then(function(drink) {
    // console.log(drink);
    res.json(drink);
  });
});






app.post('/api/Product/drinks/Gatoraid/purchases', function(req, res) {
  var amountBought = 1;
  var amountPaid = 100;
  var message = '';

  Product.findOne({drink: 'Gatoraid'}).then(function(result) {
    var totalPrice = amountBought * result.cost;
    if (!result || result.quantity === 0){
      message = 'no more';
      return message;
    } else if (amountBought > result.quantity) {
      message = 'not enough';
      return message;
    } else {
      result.quantity -= amountBought;
      result.save().then(function(newDrink) {
        if (amountPaid > totalPrice){
          var change = amountPaid - totalPrice;
          message = 'Your change is ' + change;
          return message;
        } else if (amountPaid < totalPrice) {
          var owed = totalPrice - amountPaid;
          message = 'You still need ' + owed;
          return message;
        } else if (amountPaid === totalPrice) {
          message = 'paid correct ammount';
          return message;
        }
        res.status(201).json({});
      });
    }
  });
});



app.get('/api/suppliers/cash', function(req, res) {
  Supplier.find({}).then(function(drinks) {
    // console.log(JSON.stringify(drinks, null, '\t'));
    var total = 0;

    for(var i = 0; i < drinks.length; i++) {
      total += drinks[i].totalCost;
    }

    res.json({total: total});
  });
});



app.get('/api/suppliers/purchases', function(req, res) {
  Supplier.find({}).then(function(supplier) {
    // console.log(JSON.stringify(supplier, null, '\t'));
    res.json(supplier);
  });
});


app.post('/api/suppliers/drinks', function(req, res) {
  const newSupplier = new Supplier(req.body).save().then(function(drink) {
    // console.log(JSON.stringify(drink, null, '\t'));
    res.status(201).json({});
  });
});



app.patch('/api/suppliers/drinks/:drinkId', function(req, res) {
  var id = "Gatoraid";
  Supplier.update({drinks: id}, {$set: {quantity: 7}}).then(function(drinks) {
    // console.log(JSON.stringify(id, null, '\t'));
    res.status(200).json({});
  });
});




app.listen(3000, function() {
  console.log('');
});

module.exports = app;
