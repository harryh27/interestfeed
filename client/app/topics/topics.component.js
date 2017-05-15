'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './topics.routes';

export class TopicsComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('interestfeedApp.topics', [uiRouter])
  .config(routes)
  .component('topics', {
    template: require('./topics.html'),
    controller: TopicsComponent,
    controllerAs: 'topicsCtrl'
  })
  .name;
