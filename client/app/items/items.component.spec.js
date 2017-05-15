'use strict';

describe('Component: ItemsComponent', function() {
  // load the controller's module
  beforeEach(module('interestfeedApp.items'));

  var ItemsComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    ItemsComponent = $componentController('items', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
