var app = angular.module('myApp', ['ionic','ionic.service.core','controllers', 'services', 'ngCordova', 'ngAnimate']);
 

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
      Keyboard.shrinkView(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.backgroundColorByHexString('#ffffff');;
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
 
app.filter("categoryFilter", function(){
  return function(inputs){
    var output = [];
    angular.forEach(inputs, function (input){
      if (input.count>0){
        output.push(input);
      }
    });
    return output;
  };
});

app.filter('favoriteFilter', function () {  
   return function(inputs,filterValues) {
      var output = [];
      angular.forEach(inputs, function (input) {
        if (filterValues.indexOf(input.id) !== -1)
            output.push(input);
       });
       return output;
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


