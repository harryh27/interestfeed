'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('categorys', {
      url: '/categorys',
      template: '<categorys></categorys>'
    });
}
