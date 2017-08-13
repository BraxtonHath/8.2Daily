const expect = require('chai').expect;
const request = require('supertest');
const app = require('../app');
const Product = require('../models/product');




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


  it('Softreset product', function(done) {
    var product = new Product().save().then(function(newProduct) {
      Product.count().then(function(ount) {
        expect(ount).to.equal(1);
        done();
      });
    });
  });

  it('Update a Product', function(done) {
    var product = new Product({name: 'Mountain Dew', quantity: 4, cost: 65}).save().then(function(newProduct) {
      expect(newProduct.name).to.equal('Mountain Dew');
      expect(newProduct.quantity).to.equal(4);
      expect(newProduct.cost).to.equal(65);
      done();
    });
  });
});
