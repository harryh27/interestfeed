import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';

export class MainController {
  $http;
  socket;
  $stateParams;
  $sce;
  $timeout;
  mainTopicIdUnescaped;
  mainTopicId;
  awesomeThings = [];
  topic = [];
  newThing = '';
  busy = true;
  noMoreData = false;
  tweetslength = 0;
  allData = [];
  page = 0;
  step = 20;
  self = this;

  /*@ngInject*/
  constructor($http, $scope, socket, $stateParams, $sce, $timeout) {
    this.$http = $http;
    this.socket = socket;
	this.$stateParams = $stateParams;
	this.$sce = $sce;
	this.$timeout = $timeout;
	
	//this.angularGridInstance = angularGridInstance;
	this.mainTopicIdUnescaped = $stateParams.mainTopicId;
	this.mainTopicId = $stateParams.mainTopicId.replace(/-/g, ' ');
	document;
	
    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('thing');
    });
  }

  $onInit() {
	console.log("MainComponent onInit() mainTopicId=%1$s", this.mainTopicId);

	twttr.ready(function (twttr) {
		twttr.events.bind('loaded', function (event) {
			console.log("twttr.loaded");
			var msnry = new Masonry( '.grid', {
			  itemSelector: '.grid-item',
			  columnWidth: 300,
			  gutter: 20
			});	
		});
	});	
	
    this.$http.get("/api/topics/" + this.mainTopicId)
		.then(response => {
			this.allData = response.data[0];
			//console.log('allData\n=' + JSON.stringify(this.allData, null, 2))
			this.tweetslength = this.allData.tweets.length;
			document.title = response.data[0].title + " links";
			
			this.busy = false;
			this.nextPage();
			this.step = 3;
	});	
	  
  }
  
  nextPage = function() {
	  //console.log('nextPage() busy=', this.busy);
	  
	if(!this.busy) {  
		  this.busy = true;
		  
		  if(this.page === 0){
			this.topic = _.pick(this.allData, '_id', 'title', 'categories');
			this.topic.tweets = this.allData.tweets.slice(0, this.step);
		  } else {
			//console.log('tweets push\n page='+ this.page + '  step=' + this.step);
			this.topic.tweets = this.allData.tweets.slice(0, (this.page + 1) * this.step);
			 
			 if((this.page + 1) * this.step >= this.tweetslength)
				 this.noMoreData = true;
		  }	
		  
			console.log('tweets \n length='+ this.tweetslength + '  latest=' + (this.page + 1) * this.step);   
			  
			this.page++;
			this.socket.syncUpdates('topic', this.topic);
			  
			this.$timeout(function () {
					  twttr.widgets.load();
					}, 5);
			this.busy = false;
		}	  
		  
	}
	
	trustAsHtml = function(html, last) {
	  
	/* if(last) {
		console.log("trustAsHtml()2 last=" + last);
		//this.loadWidgets();
		
		twttr.widgets.load();
	} */	
	
	//console.log("trustAsHtml() last=" + last);
    return this.$sce.trustAsHtml(html);
  }	

  addThing() {
    if(this.newThing) {
      this.$http.post('/api/things', {
        name: this.newThing
      });
      this.newThing = '';
    }
  }

  deleteThing(thing) {
    this.$http.delete(`/api/things/${thing._id}`);
  }
}

export default angular.module('interestfeedApp.main', [uiRouter])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController,
	controllerAs: 'mainCtrl'
  })
  .name;
