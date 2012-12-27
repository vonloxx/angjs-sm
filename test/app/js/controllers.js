'use strict';

/* Controllers */

function StrategiesCtrl($scope, Strategy) {
  console.log($scope);
  $scope.strategies = Strategy.query();
}

function StrategyViewCtrl($scope, $location, $routeParams, Strategy) {
  var self = this;
 
  Strategy.get({id: $routeParams.id}, function(strategy) {
    //self.original = strategy;
    //$scope.strategy = new Strategy(self.original);
    $scope.strategy = strategy;
  });
}

function StrategyNewCtrl($scope, $location, $routeParams, Strategy) {
	$scope.save = function() {
	  Strategy.save($scope.strategy, function(strategy) {
	    $location.path('/view/' + strategy._id.$oid);
	  });
	}
}

function StrategyEditCtrl($scope, $location, $routeParams, Strategy) {
  var self = this;
 
  Strategy.get({id: $routeParams.id}, function(strategy) {
    self.original = strategy;
    $scope.strategy = new Strategy(self.original);
  });
 
  $scope.isClean = function() {
    return angular.equals(self.original, $scope.strategy);
  }
 
  $scope.destroy = function() {
    self.original.destroy(function() {
      $location.path('/');
    });
  };
 
  $scope.save = function() {
    $scope.strategy.update(function() {
      $location.path('/view/' + $scope.strategy._id.$oid);
    });
  };

}
