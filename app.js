const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/product");
const Supplier = require("./models/supplier");
const path = require("path");
const bodyParser = require("body-parser");
const parseurl = require("parseurl");
mongoose.Promise = require("bluebird");

const app = express();

const nodeEnv = process.env.NODE_ENV || "development";
const config = require("./config.json")[nodeEnv];

app.use("/static", express.static("static"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
mongoose.connect(config.mongoURL);





app.get("/api/Product/drinks", function(req, res) {
  Product.find({}).then(function(drinks) {
    res.json(drinks);
  });
});






app.post("/api/Product/drinks/:drinkId/purchases", function(req, res) {
  var bought = 1;
  var paid = 100;
  var message = "";

  Product.findOne({}).then(function(result) {
    var total = bought * result.cost;
    console.log(result + " before being bought");


    if (!result || result.quantity === 0){
      message = "Error: no more drinks of this kind";
      return message;


    } else if (bought > result.quantity) {
      message = "Error: need more money to buy";
      return message;


    } else {
      result.quantity -= bought;
      console.log(result + " after being bought");
      result.save().then(function(newDrink) {

        const newProduct = new Product({name: newDrink.drink, quantity: bought, totalCost: total}).save().then(function() {


          if (paid > total){
            var change = paid - total;
            message = "Change: " + change;
            return message;


          } else if (paid < total) {
            var left = total - paid;
            message = "owed: " + left;
            return message;


          } else if (paid === total) {
            message = "correct";
            return message;
          }
          res.status(201).json({});
        });
      });
    }
  });
});




app.get("/api/suppliers/cash", function(req, res) {
  Supplier.find({}).then(function(supplierName) {
    // console.log(JSON.stringify(drinks, null, "\t"));
    var total = 0;

    for(var i = 0; i < supplierName.length; i++) {
      total += supplierName[i].totalCost;
    }

    res.json({total: total});
  });
});



app.get("/api/suppliers/purchases", function(req, res) {
  Supplier.find({}).then(function(supplier) {
    // console.log(JSON.stringify(supplier, null, "\t"));
    res.json(supplier);
  });
});


app.post("/api/suppliers/drinks", function(req, res) {
  const newSupplier = new Supplier(req.body).save().then(function(drink) {
    // console.log(JSON.stringify(drink, null, "\t"));
    res.status(201).json({});
  });
});


// app.patch("/api/suppliers/drinks/:drinkId", function(req, res) {
//   Supplier.update({name: req.params.drinkId}).then(function(drinks) {
//     // console.log(JSON.stringify(id, null, "\t"));
//     res.status(200).json({});
//   });
// });


app.put("/api/product/drinks/:drinkId", function(req, res) {
  Product.findOne({_id: req.params.drinkId}).then(function(drinks) {
    drinks.name = req.body.name;
    drinks.quantity = req.body.quantity;
    drinks.cost = req.body.cost;
    drinks.save().then(function(drinks){
      res.json(drinks);
  });
});
});




app.listen(3000, function() {
  console.log("");
});

module.exports = app;
