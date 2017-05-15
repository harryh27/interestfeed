'use strict';

describe('Component: CategorysComponent', function() {
  // load the controller's module
  beforeEach(module('interestfeedApp.categorys'));

  var CategorysComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    CategorysComponent = $componentController('categorys', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
