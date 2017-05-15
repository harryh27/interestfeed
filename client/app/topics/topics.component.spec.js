'use strict';

describe('Component: TopicsComponent', function() {
  // load the controller's module
  beforeEach(module('interestfeedApp.topics'));

  var TopicsComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    TopicsComponent = $componentController('topics', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
