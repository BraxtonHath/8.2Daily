const expect = require('chai').expect;
const request = require('supertest');
const app = require('../app');
const Product = require('../models/product');



describe('#### CURRENT STOCK ####', function() {

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

  it('customer api endpoint returns all items as json', function(done) {
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





describe('### BUY ITEM GET CHANGE ###', function() {

  beforeEach(function(done) {
    Product.insertMany([
      {drink: 'Gatoraid', quantity: 7, cost: 5},
      {drink: 'Dr.Pepper', quantity: 43, cost: 50},
      {drink: 'Mr.Pib', quantity: 14, cost: 4},
      {drink: 'Starbucks', quantity: 5, cost: 64}
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
      expect(change).to.equal(100);
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








describe('######## UPDATE PRODUCT #######', function() {

  afterEach(function(done) {
    Product.deleteMany({}).then(done());
  });

  // it('Softreset product', function(done) {
  //   const product = new Product().save().then(function(newProduct) {
  //     Product.count().then(function(ount) {
  //       expect(ount).to.equal(1);
  //       done();
  //     });
  //   });
  // });

  it('Update a Product', function(done) {
    const product = new Product({drink: 'Mountain Dew', quantity: 4, cost: 65}).save().then(function(newProduct) {
      expect(newProduct.drink).to.equal('Mountain Dew');
      expect(newProduct.quantity).to.equal(4);
      expect(newProduct.cost).to.equal(65);
      done();
    });
  });
});
