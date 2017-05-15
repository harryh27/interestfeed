'use strict';

export default function routes($stateProvider) {
  'ngInject';

  $stateProvider.state('main', {
    url: '/',
    template: '<main></main>'
  });
  /* .state('topics/{mainTopicId:[^/]*}', {
    url: '/{mainTopicId}',
    template: '<main></main>'
  }); */
}
