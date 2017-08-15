const expect = require('chai').expect;
const request = require('supertest');
const app = require('../app');
const Product = require('../models/product');
const Supplier = require('../models/supplier');


describe('basic model tests', function() {

  beforeEach(function(done) {
    Supplier.insertMany([
      {supplierName: 'Gatoraid', quantity: 7, totalCost: 4},
      {supplierName: 'Dr.Pepper', quantity: 43, totalCost: 50},
      {supplierName: 'Mr.Pib', quantity: 14, totalCost: 4},
      {supplierName: 'Starbucks', quantity: 5, totalCost: 64}
    ]).then(done());
  });

  afterEach(function(done) {
    Supplier.deleteMany({}).then(done());
  });

  it('test should clean up after itself', function(done) {
    const supplier = new Supplier().save().then(function(newSupplier) {
      Supplier.count().then(function(count){
        expect(count).to.equal(5);
      })
      .then(done());

    });
  });
});


describe('### BUY ITEM GET CHANGE ###', function() {

  beforeEach(function(done) {
    Product.insertMany([
      {name: 'Gatoraid', quantity: 7, cost: 5},
      {name: 'Dr.Pepper', quantity: 43, cost: 50},
      {name: 'Mr.Pib', quantity: 14, cost: 4},
      {name: 'Starbucks', quantity: 5, cost: 64}
    ]).then(done());
  });

  afterEach(function(done) {
    Product.deleteMany({}).then(done());
  });

  it('pay and get correct change', function(done) {
    request(app)
    .post('/api/Product/drinks/0/purchases')
    .send({})
    .expect(201)
    .expect(function(res) {
      expect(change).to.equal(95);
    });
    done();
  });

  it('choose an item', function(done) {

    request(app)
    .post('/api/Product/drinks/0/purchases')
    .send({})
    .expect(201)
    .expect(function(res) {
      Product.count().then(function(ount) {
        expect(ount).to.equal(4);
      });
    }).end(done());
  });
});





describe('#### CURRENT STOCK ####', function() {

  beforeEach(function(done) {
    Product.insertMany([
      {name: 'Gatoraid', quantity: 7, cost: 4},
      {name: 'Dr.Pepper', quantity: 43, cost: 50},
      {name: 'Mr.Pib', quantity: 14, cost: 4},
      {name: 'Starbucks', quantity: 5, cost: 64}
    ]).then(done());
  });

  afterEach(function(done) {
    Product.deleteMany({}).then(done());
  });

  it('customer api endpoint returns all items as json', function(done) {
    request(app)
    .get('/api/product/drinks')
    .expect(200)
    .expect(function(res) {
      expect(res.body[0].name).to.equal('Gatoraid');
      expect(res.body[1].name).to.equal('Dr.Pepper');
      expect(res.body[2].name).to.equal('Mr.Pib');
      expect(res.body[3].name).to.equal('Starbucks');
    }).end(done);
  });
});








describe('######## UPDATE PRODUCT #######', function() {

  beforeEach(function(done) {
    Product.insertMany([
      {name: 'Gatoraid', quantity: 7, cost: 5},
      {name: 'Dr.Pepper', quantity: 43, cost: 50},
      {name: 'Mr.Pib', quantity: 14, cost: 4},
      {name: 'Starbucks', quantity: 5, cost: 64}
    ]).then(done());
  });

  afterEach(function(done) {
    Product.deleteMany({}).then(done());
  });


  it('add a product', function(done) {
    var product = new Product().save().then(function(newProduct) {
      Product.count().then(function(ount) {
        expect(ount).to.equal(5);
        done();
      });
    });
  });

  it('Update a Product', function(done) {
    var product = new Product({name: 'Mountain Dew', quantity: 4, cost: 65}).save().then(function(newProduct) {
      request(app)
      .put('/api/product/drinks/' + newProduct._id)
      .send({name: "mountain dew", quantity: 3, cost: 10})
      .expect(function(res){
        console.log(newProduct._id);
        expect(res.body.name).to.equal("mountain dew");
        expect(res.body.cost).to.equal(10);
        expect(res.body.quantity).to.equal(3);

      }).end(done);
    });
  });
});

// describe('basic model tests', function() {
//
//   beforeEach(function(done) {
//     Product.insertMany([
//       {name: 'Gatoraid', quantity: 7, totalCost: 4},
//       {name: 'Dr.Pepper', quantity: 43, totalCost: 50},
//       {name: 'Mr.Pib', quantity: 14, totalCost: 4},
//       {name: 'Starbucks', quantity: 5, totalCost: 64}
//     ]).then(done());
//   });
//
//   afterEach(function(done) {
//     Product.deleteMany({}).then(done());
//   });
//
//   it('test should clean up after itself', function(done) {
//     const supplier = new Supplier().save().then(function(newSupplier) {
//       Product.count().then(function(count){
//         expect(count).to.equal(4);
//       })
//       .then(done());
//
//     });
//   });
// });
