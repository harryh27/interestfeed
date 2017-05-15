'use strict';

describe('Component: StatusesComponent', function() {
  // load the controller's module
  beforeEach(module('interestfeedApp.statuses'));

  var StatusesComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    StatusesComponent = $componentController('statuses', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
