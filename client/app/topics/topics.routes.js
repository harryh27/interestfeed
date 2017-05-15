'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('topics', {
      url: '/topics',
      template: '<topics></topics>'
    });
}
