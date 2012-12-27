'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', ['mongolab', 'myApp.filters', 'myApp.services', 'myApp.directives']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {templateUrl: 'partials/strategies.html', controller: StrategiesCtrl});
    $routeProvider.when('/new', {templateUrl: 'partials/strategy-edit.html', controller: StrategyNewCtrl});
    $routeProvider.when('/edit/:id', {templateUrl: 'partials/strategy-edit.html', controller: StrategyEditCtrl});
    $routeProvider.when('/view/:id', {templateUrl: 'partials/strategy-view.html', controller: StrategyViewCtrl});
    $routeProvider.otherwise({redirectTo: '/'});
  }]);

angular.module('mongolab', ['ngResource']).
    factory('Strategy', function($resource) {
      var Strategy = $resource('https://api.mongolab.com/api/1/databases' +
          '/strategymaker/collections/strategies/:id',
          { apiKey: '50d77e5ce4b078304a66df55' }, {
            update: { method: 'PUT' }
          }
      );
 
      Strategy.prototype.update = function(cb) {
        return Strategy.update({id: this._id.$oid},
            angular.extend({}, this, {_id:undefined}), cb);
      };
 
      Strategy.prototype.destroy = function(cb) {
        return Strategy.remove({id: this._id.$oid}, cb);
      };
 
      return Strategy;
    });