'use strict';

// This is a module for cloud persistance in mongolab - https://mongolab.com
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