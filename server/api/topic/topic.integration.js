'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newTopic;

describe('Topic API:', function() {
  describe('GET /api/topics', function() {
    var topics;

    beforeEach(function(done) {
      request(app)
        .get('/api/topics')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          topics = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(topics).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/topics', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/topics')
        .send({
          name: 'New Topic',
          info: 'This is the brand new topic!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newTopic = res.body;
          done();
        });
    });

    it('should respond with the newly created topic', function() {
      expect(newTopic.name).to.equal('New Topic');
      expect(newTopic.info).to.equal('This is the brand new topic!!!');
    });
  });

  describe('GET /api/topics/:id', function() {
    var topic;

    beforeEach(function(done) {
      request(app)
        .get(`/api/topics/${newTopic._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          topic = res.body;
          done();
        });
    });

    afterEach(function() {
      topic = {};
    });

    it('should respond with the requested topic', function() {
      expect(topic.name).to.equal('New Topic');
      expect(topic.info).to.equal('This is the brand new topic!!!');
    });
  });

  describe('PUT /api/topics/:id', function() {
    var updatedTopic;

    beforeEach(function(done) {
      request(app)
        .put(`/api/topics/${newTopic._id}`)
        .send({
          name: 'Updated Topic',
          info: 'This is the updated topic!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedTopic = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedTopic = {};
    });

    it('should respond with the updated topic', function() {
      expect(updatedTopic.name).to.equal('Updated Topic');
      expect(updatedTopic.info).to.equal('This is the updated topic!!!');
    });

    it('should respond with the updated topic on a subsequent GET', function(done) {
      request(app)
        .get(`/api/topics/${newTopic._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let topic = res.body;

          expect(topic.name).to.equal('Updated Topic');
          expect(topic.info).to.equal('This is the updated topic!!!');

          done();
        });
    });
  });

  describe('PATCH /api/topics/:id', function() {
    var patchedTopic;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/topics/${newTopic._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Topic' },
          { op: 'replace', path: '/info', value: 'This is the patched topic!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedTopic = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedTopic = {};
    });

    it('should respond with the patched topic', function() {
      expect(patchedTopic.name).to.equal('Patched Topic');
      expect(patchedTopic.info).to.equal('This is the patched topic!!!');
    });
  });

  describe('DELETE /api/topics/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/topics/${newTopic._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when topic does not exist', function(done) {
      request(app)
        .delete(`/api/topics/${newTopic._id}`)
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
