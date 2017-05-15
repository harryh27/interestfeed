'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './items.routes';

export class ItemsComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('interestfeedApp.items', [uiRouter])
  .config(routes)
  .component('items', {
    template: require('./items.html'),
    controller: ItemsComponent,
    controllerAs: 'itemsCtrl'
  })
  .name;
