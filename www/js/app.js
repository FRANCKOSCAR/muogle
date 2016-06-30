var app = angular.module('myApp', ['ionic','ionic.service.core','controllers', 'services', 'ngCordova']);
 

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})



app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('index', {
    url: '/',
    templateUrl: 'index.html'
  })
  .state('content', {
    url: '/content',
    templateUrl: 'content.html'
  })
  .state('list', {
    url: '/list',
    templateUrl: 'list.html'
  })
  .state('quoteInfo', {
    url: '/quoteInfo',
    templateUrl: 'quoteInfo.html'
  })
  .state('favorite', {
    url: '/favorite',
    templateUrl: 'favorite.html'
  })
  .state('random', {
    url: '/random',
    templateUrl: 'random.html'
  });
  $urlRouterProvider.otherwise('/');  
});
 


app.filter('favoriteFilter', function () {  
   return function(inputs,filterValues) {
      var output = [];
      angular.forEach(inputs, function (input) {
        if (filterValues.indexOf(input.id) !== -1)
            output.push(input);
       });
      console.log(output);
       return output;
   };
});



app.filter('categoryFilter', function () {  
  return function(inputs,filterValue, searchContent) {
    if(filterValue.category !== undefined && filterValue.category !== null) {
      var output = [];
      console.log(inputs);
      console.log(filterValue.category);
      angular.forEach(inputs, function (input) {
        if (input.category !== null){
         if (input.category.description === filterValue.category){
            output.push(input);
          }
        }
       });
      return output;
    } else if(filterValue.tag !== undefined && filterValue.tag !== null){
      console.log(filterValue.tag);
      var output = [];
      angular.forEach(inputs, function (input) {
        angular.forEach(input.tags, function (tag) {
          if (filterValue.tag === tag){
            output.push(input);
          }
        });
      });
      console.log(output);
      return output;
    }
   };
});

app.directive('backImg', function(){
    return function(scope, element, attrs){
        attrs.$observe('backImg', function(value) {
            element.css({
                'background-image': 'url(' + value +')',
                'background-size' : 'cover'
            });
        });
    };
});


