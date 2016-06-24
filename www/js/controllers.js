var controllers = angular.module('controllers',['services', 'ngCordova']);

controllers.controller('MainCtrl', function($scope, $ionicHistory, $ionicSlideBoxDelegate, $ionicPopover, MyService, $ionicModal, $cordovaSocialSharing, $location, StorageService) {
  getQuotes ();
  $scope.category = [];
  $scope.cardCategory = null;
  $scope.factContent = null;

  //Quotes filter function
  $scope.setCardCategory = function ( category ) {
    console.log(category.description);
    $scope.cardCategory = category.description;

  }

  $scope.defaultChecker = function(category) {
    if ($scope.cardCategory  == null)
      return {
        count : 1,
        description :  "women",
        icon : null,
        id : 13,
        text : "women",
        title : "women"};
    else {
      return $scope.cardCategory;
    }
  }

  function getQuotes (){
    MyService.getQuotes().then(function(quotes){
        console.log(quotes.data.items);
      if (quotes !== false){
        $scope.category =  quotes;
        // StorageService.addQuotes(quotes);
        console.log($scope.category);
      } else {
        // $scope.category =  StorageService.getQuotes;
        console.log("local "+$scope.category);
      }
    });
  }












  MyService;

  $scope.backHome = function(){
    $ionicHistory.goBack();
  };

  $scope.options = {
  loop: false,
  effect: 'fade',
  speed: 500,
}

$scope.$on("$ionicSlides.sliderInitialized", function(event, data){
  // data.slider is the instance of Swiper
  $scope.slider = data.slider;
});

  // function getCat(){
  //   var dd = getData();
  //   var edd;
  //   angular.forEach(dd, function(value,key){
  //     edd.push(value.Category);
  //   });
  //   var edd = MyService.getQuotes();
  //   console.log(edd);
  // }

  // MyService.getQuotes();

$scope.datta = [];

$scope.$on("$ionicSlides.slideChangeStart", function(event, data){
  console.log('Slide change is beginning');
});

$scope.$on("$ionicSlides.slideChangeEnd", function(event, data){
  // note: the indexes are 0-based
  $scope.activeIndex = data.slider.activeIndex;
  $scope.previousIndex = data.slider.previousIndex;
});


  $scope.slideValiderGrayValue = false;
  $scope.slidePosition = false;
  $scope.slideEnable = true;
  $scope.slideUp = function() {
      $scope.slideValiderGrayValue = !$scope.slideValiderGrayValue;
      $scope.slidePosition = !$scope.slidePosition;
      $scope.slideEnable = !$scope.slideEnable;
      if ($scope.slideEnable === false){
        $scope.slider.lockSwipes();
      } else {
        $scope.slider.unlockSwipes();
      }
  };

  $scope.slideValiderRandomGrayValue = false;
  $scope.slidePositionRandom = false;
  $scope.slideUpRandom = function() {
    $scope.slidePositionRandom = !$scope.slidePositionRandom;
    $scope.slideValiderRandomGrayValue = !$scope.slideValiderRandomGrayValue;
  };

////////////////////////////Ionic Popover////////////////////////////////////

$ionicPopover.fromTemplateUrl('popover.html', {
  scope: $scope
}).then(function(popover) {
  console.log(popover);
  $scope.popover = popover;
  $scope.popover.item = {};
});

function offset(elm) {
  try {return elm.offset();} catch(e) {}
  var rawDom = elm;
  var _x = 0;
  var _y = 0;
  var body = document.documentElement || document.body;
  var scrollX = window.pageXOffset || body.scrollLeft;
  var scrollY = window.pageYOffset || body.scrollTop;
  _x = rawDom.getBoundingClientRect().left + scrollX;
  _y = rawDom.getBoundingClientRect().top + scrollY;
  return { left: _x, top: _y };
}
  $scope.openPopover = function($event, item) {
    $scope.popover.item = item;
    $scope.popover.show($event);
    console.log($scope.popover);
    var position = offset($event.toElement),
        popoverPosition = offset($scope.popover.modalEl);
    if(popoverPosition.top > position.top) {
      angular.element($scope.popover.modalEl).css({
        'margin-top': String(position.top - popoverPosition.top - 58)+'px'
      });
    }
    angular.element($scope.popover.modalEl).css({
      visibility: 'visible'
    });
    console.log('Show margin is: '+angular.element($scope.popover.modalEl).css('margin-top'));
  };
  $scope.closePopover = function() {
    $scope.popover.hide();
  };
  //Cleanup the popover when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.popover.remove();
  });
  // Execute action on hide popover
  $scope.$on('popover.hidden', function() {
    // Execute action
    console.log('Hide margin is: '+angular.element($scope.popover.modalEl).css('margin-top'));
    angular.element($scope.popover.modalEl).css({
      //'margin-top': String(position.top - popoverPosition.top - 58)+'px',
      visibility: 'hidden'
    });
  });
  // Execute action on remove popover
  $scope.$on('popover.removed', function() {
    // Execute action
  });
////////////////////////////Ionic Popover////////////////////////////////////



////////////////////////////Ionic Modal////////////////////////////////////
  $ionicModal.fromTemplateUrl('my-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
    $scope.modal.cont = {};
  });
  $scope.openModal = function(item) {
    $scope.modal.cont = item;
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
//   // Cleanup the modal when we're done with it!
//   $scope.$on('$destroy', function() {
//     $scope.modal.remove();
//   });
//   // Execute action on hide modal
//   $scope.$on('modal.hidden', function() {
//     // Execute action
//   });
//   // Execute action on remove modal
//   $scope.$on('modal.removed', function() {
//     // Execute action
//   });
// });
////////////////////////////Ionic Modal////////////////////////////////////



////////////////////////////Social Sharing////////////////////////////////////
$scope.shareNative = function() {
  console.log($cordovaSocialSharing.share);
        // $cordovaSocialSharing.share("This is your message", "This is your subject", "www/imagefile.png", "https://www.thepolyglotdeveloper.com");
        $cordovaSocialSharing
    .share("This is your message", "This is your subject", "www/imagefile.png", "https://www.thepolyglotdeveloper.com") // Share via native share sheet
    .then(function(result) {
      // Success!
    }, function(err) {
      // An error occured. Show a message to the user
    });
}
////////////////////////////Social Sharing////////////////////////////////////

////////////////////////////Local Storage////////////////////////////////////
$scope.favorite = StorageService.getAll();
  $scope.add = function (newFavorite) {
    if ($scope.favorite.indexOf(newFavorite.id) === -1){
      StorageService.add(newFavorite.id);
    }
  };
  $scope.remove = function (favorite) {
    if ($scope.favorite.indexOf(favorite.id) !== -1){
      StorageService.remove(favorite.id);
    }
  };
////////////////////////////Local Storage////////////////////////////////////


////////////////////////////Random Page////////////////////////////////////
$scope.random = {};

$scope.highlight = function(fact) {
  $scope.random = fact;
  $location.path("/random");
};


$scope.randomFct = function() {
  console.log($scope.category.data);
  $scope.random = $scope.category.data.items[Math.floor(Math.random()*$scope.category.data.items.length)];
  console.log($scope.random);
  $location.path("/random");
};
////////////////////////////Random Page////////////////////////////////////

$scope.goToFavorite = function(){
  $location.path("/favorite");
}

////////////////////////////category favorite Page////////////////////////////////////
 $scope.isFavorite = function(fact){
    console.log($scope.favorite.indexOf(fact.id));
    if(fact !== undefined)
      return $scope.favorite.indexOf(fact.id) !== -1;
    else 
      return false;
 }

////////////////////////////category favorite Page////////////////////////////////////





 
});