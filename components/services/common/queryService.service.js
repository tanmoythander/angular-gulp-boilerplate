;(function() {


  'use strict';


  /**
   * $http service abstraction to make API calls with any HTTP method,
   * custom url and data object to be sent as request.
   * Every REST API call is measured, you can see how much it took
   * in the console.
   *
   * @category  factory
   * @author    Tanmoy Thander
   * @example   Inject QueryService as the dependency and then use it this way:
   *
   * QueryService.query('GET', 'users/user/', {get: query}, {post: params})
      .then(function(data) {
        console.log(data);
      }, function(error) {
        console.log(error);
      });
   *
   * @param     {String} method HTTP method, eg. 'PUT', 'GET'...
   * @param     {String} url API endpoint, eg. 'users/user' or 'system-properties'
   * @param     {Object} params Map of strings or objects which will be turned
   *                     to `?key1=value1&key2=value2` after the url. If the value
   *                     is not a string, it will be
   *                     JSONified
   * @return    {Object} data Data to be sent as the request message data
   * @version   1.1
   *
   */


  angular
    .module('boilerplate')
    .factory('Query', [
      '$http', '$q', 'CONSTANTS', '$localStorage', Query
    ]);



  //////////////// factory



  function Query($http, $q, CONSTANTS, $localStorage) {


    var service = {
      make: make
    };

    return service;


    //////////////// definition


    function make(request) {

      var deferred = $q.defer();
      var token = undefined;
      if (request.addToken) token = $localStorage.token || undefined;

      $http({
        async: true,
        crossDomain: true,
        url: CONSTANTS.API_URL + request.url,
        method: request.method,
        params: request.params,
        data: request.data,
        headers: {
          "Content-Type": "application/json",
          "cache-control": "no-cache",
          "x-access-key": token
        }
      }).then(function(data) {
        if (!data.config) {
          console.log('Server error occured.');
        }
        deferred.resolve(data.data);
      }, function(error) {
        deferred.reject(error);
      });

      return deferred.promise;
    }

  }


})();
