'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './statuses.routes';

export class StatusesComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('interestfeedApp.statuses', [uiRouter])
  .config(routes)
  .component('statuses', {
    template: require('./statuses.html'),
    controller: StatusesComponent,
    controllerAs: 'statusesCtrl'
  })
  .name;
