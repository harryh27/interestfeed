'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('items', {
      url: '/items',
      template: '<items></items>'
    });
}
