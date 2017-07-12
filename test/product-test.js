const expect = require('chai').expect;
const request = require('supertest');
const app = require('../app');
const Product = require('../models/product');
const Supplier = require('../models/supplier');


describe('Product-product-test', function() {

  beforeEach(function(done) {
    Product.insertMany([
      {drink: 'Gatoraid', quantity: 7, cost: 4},
      {drink: 'Dr.Pepper', quantity: 43, cost: 50},
      {drink: 'Mr.Pib', quantity: 14, cost: 4},
      {drink: 'Starbucks', quantity: 5, cost: 64}
    ]).then(done());
  });

  afterEach(function(done) {
    Product.deleteMany({}).then(done());
    });

  it('See product Function', function(done) {
    request(app)
    .get('/api/product/drinks')
    .expect(200)
    .expect(function(res) {
      expect(res.body[0].drink).to.equal('Gatoraid');
      expect(res.body[1].drink).to.equal('Dr.Pepper');
      expect(res.body[2].drink).to.equal('Mr.Pib');
      expect(res.body[3].drink).to.equal('Starbucks');
    }).end(done);
  });
});


describe('Update Product-product-test', function() {

  afterEach(function(done) {
    Product.deleteMany({}).then(done());
    });

  it('Softreset product', function(done) {
    const product = new Product().save().then(function(newProduct) {
      Product.count().then(function(count) {
        expect(count).to.equal(1);
        done();
      });
    });
  });


  it('Update a Product', function(done) {
    const product = new Product({drink: 'Mountain Dew', quantity: 4, cost: 65}).save().then(function(newProduct) {
      expect(newProduct.drink).to.equal('Mountain Dew');
      expect(newProduct.quantity).to.equal(4);
      expect(newProduct.cost).to.equal(65);
      done();
    });
  });
});
