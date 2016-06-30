var controllers = angular.module('controllers',['services', 'ngCordova']);

controllers.controller('MainCtrl', function($scope, $ionicHistory, $ionicSlideBoxDelegate, $ionicPopover, Quotes, Categories, $ionicModal, $cordovaSocialSharing, $location, StorageService) {
  getQuotes ();
  getCategories ();
  $scope.searchEmpty ="";
  $scope.fact = [];
  $scope.category = [];
  $scope.card = {};
  $scope.card.tag = "";
  $scope.factContent = null;
  $scope.searchContent = null;
  $scope.active = {state: -1};
  $scope.activeValidator = {state: -1};

//Quotes filter function
$scope.setCardCategory = function ( category ) {
  $scope.card.category = category.description;
  $scope.active.state = category.description;
  $scope.searchEmpty = "notNull";
}

$scope.$watch('card.tag', function() {
      $scope.card.tag = $scope.card.tag.toLowerCase().replace(/\s+/g,'');
});
$scope.$watch('card.tag', function (newValue, oldValue) {
  if(newValue === "")
    $scope.card.tag = null;
});


$scope.categoryViewer = function(category) {
  $scope.card.category = category;
  $location.path("/content");
  $scope.active.state = category;
  $scope.searchEmpty = "notNull";
}


$scope.setCardTag = function (tag){
  $scope.card.category = null;
  $scope.card.tag = tag;
  $scope.active.state = "All";
  console.log($scope.card.tag);
  $scope.searchEmpty = $scope.card.tag;
}

$scope.searchTag = function(){
  $scope.active.state = "All";
  $location.path("content");
  console.log($scope.card.tag);
  $scope.searchEmpty = $scope.card.tag;
}



  // $scope.searchContentByTag = function(tag){
  //   var output = [];
  //   console.log($scope.fact);
  //   angular.forEach($scope.fact, function (input) {
  //     angular.forEach(input.tag, function (tagValue) {
  //       if (tagValue === fact){
  //         output.push(input);
  //       }
  //     });
  //   });
  //   $scope.cardCategory = fact.description;
  //   $location.path("/content");
  // }

  // $scope.defaultChecker = function(category) {
  //   if ($scope.cardCategory  == null)
  //     return {
  //       count : 1,
  //       description :  "women",
  //       icon : null,
  //       id : 13,
  //       text : "women",
  //       title : "women"};
  //   else {
  //     return $scope.cardCategory;
  //   }
  // }

  function getQuotes (){
    Quotes.getQuotes().then(function(quotes){
        console.log(quotes.data.items);
      if (quotes !== false){
        $scope.fact =  quotes;
        // StorageService.addQuotes(quotes);
        console.log($scope.fact);
      } else {
        // $scope.category =  StorageService.getQuotes;
        console.log("local "+$scope.fact);
      }
    });
  }


    function getCategories (){
    Categories.getCategories().then(function(categories){
      if (categories !== false){
        $scope.category = categories.data;
        console.log($scope.category);
      } else {
        console.log("local "+$scope.category);
      }
    });
  }









Quotes;

$scope.goCategory = function(){
  $location.path("/list");
}

$scope.backHome = function(){
$location.path("/");
};

  $scope.goBack = function(){
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

  var muogle = document.getElementsByClassName("muogleVerifier");
  angular.element(muogle).addClass("opacity");

  $scope.activeValidator.state = item.id;
  console.log(item.id);
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
    var muogle = document.getElementsByClassName("muogleVerifier");
    angular.element(muogle).removeClass("opacity");
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
$scope.shareNative = function(content) {
  console.log($cordovaSocialSharing.share);
        // $cordovaSocialSharing.share("This is your message", "This is your subject", "www/imagefile.png", "https://www.thepolyglotdeveloper.com");
        $cordovaSocialSharing
    .share(content, "MUOGLE") // Share via native share sheet
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
  console.log($scope.fact.data);
  $scope.random = $scope.fact.data.items[Math.floor(Math.random()*$scope.fact.data.items.length)];
  console.log($scope.random);
  $location.path("/random");
};
////////////////////////////Random Page////////////////////////////////////

$scope.goToFavorite = function(){
  $location.path("/favorite");
}

////////////////////////////category favorite Page////////////////////////////////////
 $scope.isFavorite = function(fact){
    if(fact !== undefined){
      return $scope.favorite.indexOf(fact.id) !== -1;
    }else {
      return false;
    }
 }

////////////////////////////category favorite Page////////////////////////////////////





 
});