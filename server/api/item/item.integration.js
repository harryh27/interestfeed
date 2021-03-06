'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newItem;

describe('Item API:', function() {
  describe('GET /api/items', function() {
    var items;

    beforeEach(function(done) {
      request(app)
        .get('/api/items')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          items = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(items).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/items', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/items')
        .send({
          name: 'New Item',
          info: 'This is the brand new item!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newItem = res.body;
          done();
        });
    });

    it('should respond with the newly created item', function() {
      expect(newItem.name).to.equal('New Item');
      expect(newItem.info).to.equal('This is the brand new item!!!');
    });
  });

  describe('GET /api/items/:id', function() {
    var item;

    beforeEach(function(done) {
      request(app)
        .get(`/api/items/${newItem._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          item = res.body;
          done();
        });
    });

    afterEach(function() {
      item = {};
    });

    it('should respond with the requested item', function() {
      expect(item.name).to.equal('New Item');
      expect(item.info).to.equal('This is the brand new item!!!');
    });
  });

  describe('PUT /api/items/:id', function() {
    var updatedItem;

    beforeEach(function(done) {
      request(app)
        .put(`/api/items/${newItem._id}`)
        .send({
          name: 'Updated Item',
          info: 'This is the updated item!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedItem = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedItem = {};
    });

    it('should respond with the updated item', function() {
      expect(updatedItem.name).to.equal('Updated Item');
      expect(updatedItem.info).to.equal('This is the updated item!!!');
    });

    it('should respond with the updated item on a subsequent GET', function(done) {
      request(app)
        .get(`/api/items/${newItem._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let item = res.body;

          expect(item.name).to.equal('Updated Item');
          expect(item.info).to.equal('This is the updated item!!!');

          done();
        });
    });
  });

  describe('PATCH /api/items/:id', function() {
    var patchedItem;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/items/${newItem._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Item' },
          { op: 'replace', path: '/info', value: 'This is the patched item!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedItem = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedItem = {};
    });

    it('should respond with the patched item', function() {
      expect(patchedItem.name).to.equal('Patched Item');
      expect(patchedItem.info).to.equal('This is the patched item!!!');
    });
  });

  describe('DELETE /api/items/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/items/${newItem._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when item does not exist', function(done) {
      request(app)
        .delete(`/api/items/${newItem._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
