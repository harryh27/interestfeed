'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('statuses', {
      url: '/statuses',
      template: '<statuses></statuses>'
    });
}
