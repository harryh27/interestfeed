'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './categorys.routes';

export class CategorysComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('interestfeedApp.categorys', [uiRouter])
  .config(routes)
  .component('categorys', {
    template: require('./categorys.html'),
    controller: CategorysComponent,
    controllerAs: 'categorysCtrl'
  })
  .name;
