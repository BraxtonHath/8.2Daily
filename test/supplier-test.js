const Supplier = require('../models/supplier');
const expect = require('chai').expect;
const request = require('supertest');
const app = require('../app');
// const Product = require('../models/product');








describe('###### DRINKS STOCKED #######', function() {

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

  it('checks numbers ', function(done) {
    var sampleItem = {supplierName: 'RedGatoraid', quantity: 7, totalCost: 4};
    request(app)
    .patch('/api/suppliers/drinks/' + sampleItem._id)
    .send({})
    .expect(200)
    .expect(function(res) {
      expect(sampleItem.supplierName).to.equal('RedGatoraid');
      expect(sampleItem.quantity).to.equal(7);
      expect(sampleItem.totalCost).to.equal(4);
    }).end(done);
  });
});




describe('####### TOTAL AMMOUNT OF MONEY #######', function() {

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

  it('total Function', function(done) {
    request(app)
    .get('/api/suppliers/cash')
    .expect(200)
    .expect(function(res) {
      expect(res.body.total).to.equal(122);
    }).end(done);
  });
});







describe('###### ADD A DRINK #####', function() {

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

  it('add a drink Function', function(done) {
    request(app)
    .post('/api/suppliers/drinks')
    .send({supplierName: 'Energy Drink', quantity: 6, totalCost: 9})
    .expect(201)
    .expect(function(res) {
      Supplier.count().then(function(count) {
        expect(count).to.equal(5);
      });
    }).end(done);
  });
});







describe('###### PURCHASES #####', function() {

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

  it('purchases Function', function(done) {
    request(app)
    .get('/api/suppliers/purchases')
    .expect(200)
    .expect(function(res) {
      expect(res.body[0].supplierName).to.equal('Gatoraid');
      expect(res.body[1].supplierName).to.equal('Dr.Pepper');
      expect(res.body[2].supplierName).to.equal('Mr.Pib');
      expect(res.body[3].supplierName).to.equal('Starbucks');
    }).end(done);
  });
});







describe('###### UPDATE SUPPLIER ########', function() {


  afterEach(function(done) {
    Supplier.deleteMany({}).then(done());
  });

  it('Soft reset', function(done) {
    const supplier = new Supplier().save().then(function(newSupplier) {
      Supplier.count().then(function(count) {
        expect(count).to.equal(1);
        done();
      });
    });
  });

  it('Update a supplier Function', function(done) {
    const supplier = new Supplier({supplierName: 'Gatoraid', quantity: 4, totalCost: 65}).save().then(function(newSupplier) {
      expect(newSupplier.supplierName).to.equal('Gatoraid');
      expect(newSupplier.quantity).to.equal(4);
      expect(newSupplier.totalCost).to.equal(65);
      done();
    });
  });
});
