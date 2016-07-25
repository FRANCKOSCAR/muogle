var services = angular.module('services',["ngStorage"]);
services.factory('Quotes', function($http){
  var quote = [];

  return {
    getQuotes: function(){
      return $http.get("http://muogleadmin.rp6uyk5n6t.us-west-2.elasticbeanstalk.com/api/web/quotes").success(function(response){
        return response;
      }, function errorCallback(response) {
        quoteErr = response;
        console.log(response);
        return false;
      });
    },
    getQuote: function(id){
      for(i=0;i<quote.length;i++){
        if(quote[i].id == id){
          return quote[i];
        }
      }
      return null;
    }
  }
});

services.factory('Categories', function($http){
  var quote = [];

  return {
    getCategories: function(){
      return $http.get("http://muogleadmin.rp6uyk5n6t.us-west-2.elasticbeanstalk.com/api/web/categories").success(function(response){
        return response;
      }, function errorCallback(response) {
        quoteErr = response;
        console.log(response);
        return false;
      });
    },
    getCategorie: function(id){
      for(i=0;i<quote.length;i++){
        if(quote[i].id == id){
          return quote[i];
        }
      }
      return null;
    }
  }
});

services.factory ('StorageService', function ($localStorage) {
  $localStorage = $localStorage.$default({
    favorites: []
  });
  var _getAll = function () {
    return $localStorage.favorites;
  };
  var _add = function (favorite) {
    console.log(favorite);
    $localStorage.favorites.push(favorite);
  }
  var _remove = function (favorite) {
    $localStorage.favorites.splice($localStorage.favorites.indexOf(favorite), 1);
  }

  $localStorageQuotes = $localStorage.$default({
    quotesData: {}
  });
  var _getQuotes = function () {
    return $localStorageQuotes.quotesData;
  };
  var _addQuotes = function (quotesData) {
    $localStorageQuotes.quotesData = quotesData;
  }
  var _removeQuotes = function () {
    $localStorageQuotes.quotesData = {};
  }
  return {
      getAll: _getAll,
      add: _add,
      remove: _remove,
      getQuotes: _getQuotes,
      addQuotes: _addQuotes,
      removeQuotes: _removeQuotes
    };
})
















// var getData = function(callbackFn) {
//     $http.get('data/muogle-data.json').success(function(data) {
//       callbackFn(data);
//     });
//   };

//   return {
//     getData: getData
//   };


// });
