'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var topicCtrlStub = {
  index: 'topicCtrl.index',
  show: 'topicCtrl.show',
  create: 'topicCtrl.create',
  upsert: 'topicCtrl.upsert',
  patch: 'topicCtrl.patch',
  destroy: 'topicCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var topicIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './topic.controller': topicCtrlStub
});

describe('Topic API Router:', function() {
  it('should return an express router instance', function() {
    expect(topicIndex).to.equal(routerStub);
  });

  describe('GET /api/topics', function() {
    it('should route to topic.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'topicCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/topics/:id', function() {
    it('should route to topic.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'topicCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/topics', function() {
    it('should route to topic.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'topicCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/topics/:id', function() {
    it('should route to topic.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'topicCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/topics/:id', function() {
    it('should route to topic.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'topicCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/topics/:id', function() {
    it('should route to topic.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'topicCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
