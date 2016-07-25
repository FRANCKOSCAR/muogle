var controllers = angular.module('controllers',['services', 'ngCordova', 'ngAnimate']);

controllers.controller('MainCtrl', function($scope, $ionicHistory, $ionicSlideBoxDelegate, $ionicPopover, Quotes, Categories, $ionicModal, $cordovaSocialSharing, $location, StorageService, $ionicScrollDelegate) {
  getQuotes ();
  getCategories ();
  $scope.info =[];
  $scope.searchWrong ="";
  $scope.searchEmpty ="";
  $scope.fact = [];
  $scope.subCategory = [];
  $scope.subCategoryTitle = [];
  $scope.category = [];
  $scope.card = {
    all: false,
    tag: ""
  };
  $scope.factContent = null;
  $scope.searchContent = null;
  $scope.active = {state: -1};
  $scope.activeValidator = {state: -1};
  $scope.facts = [];
  $scope.hasPopoverBackdropListener =false;
  $scope.verifierScrollLeft = 0;
  $scope.activeIndex = 0;



$scope.$watch('card.tag', function() {
  if($scope.card.tag){
      $scope.card.tag = $scope.card.tag.toLowerCase();
  }
});
$scope.$watch('card.tag', function (newValue, oldValue) {
  if(newValue === "")
    $scope.card.tag = null;
});

$scope.favoriteViewer = function(id) {
  $scope.card.category = null;
  $scope.card.id = id;
  $scope.searchEmpty = $scope.card.id;
  $scope.card.all = false;
  $scope.filterFacts();
  $scope.active.state = "null";
  $location.path("/content");
  $scope.closeFavorite();
}


$scope.categoryViewer = function(category) {
  $scope.resetState();
  $scope.card.category = category.description;
  $scope.card.all = false;
  $scope.filterFacts();
  if($scope.slider ) {
    $location.path("/content");
    // $scope.slider.slideTo(0);
    setCurrentFavorite(0);
  } else {
    $location.path("/content");
  }
  $scope.active.state = category.description;
  $scope.searchEmpty = "notNull";
  $ionicScrollDelegate.$getByHandle('categoryScroll').anchorScroll();
}

//Quotes filter function
$scope.setCardCategory = function ( category ) {
  $scope.resetState();
  if ( $scope.slider ){
    $scope.slider.slideTo(0);
    setCurrentFavorite($scope.slider.activeIndex);
  }
  $scope.bool = false;
  $scope.slidePosition = false;
  $scope.slideValiderGrayValue =false;
  $scope.card.category = category.description;
  $scope.active.state = category.description;
  $scope.searchEmpty = "notNull";
  $scope.card.all = false;
  $scope.filterFacts();
}

function getOffset( el ) {
    var _x = 0;
    var _y = 0;
    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
        _x += el.offsetLeft - el.scrollLeft;
        _y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
    }
    return { top: _y, left: _x };
}


$scope.setCard = function (card){
  $scope.resetState();
  if ( $scope.slider ){
    $scope.slider.slideTo(0);
    setCurrentFavorite($scope.slider.activeIndex);
  }
  $scope.bool = false;
  $scope.slidePosition = false;
  $scope.slideValiderGrayValue = false;
  $scope.card.all = true;
  $scope.active.state = "All";
  $scope.searchEmpty = "notNull";
  $scope.filterFacts();
}

$scope.searchTag = function(){
  $scope.resetState();
  $scope.bool = false;
  $scope.slidePosition = false;
  $scope.slideValiderGrayValue = false;
  $scope.info = null;
  $scope.searchEmpty = null;
  $scope.card.category=null;
  $scope.card.id=null;
  $scope.card.all = false;
  $scope.active.state = "null";
  $scope.filterFacts();
  if($scope.facts.length) {
    $scope.searchEmpty = "notNull";
  }
  if ( $scope.slider && $scope.searchEmpty!=null){
    $location.path("/content");
    setCurrentFavorite($scope.slider.activeIndex);
  } else {
  $location.path("/content");
  }
}



  function getQuotes (){
    Quotes.getQuotes().then(function(quotes){
      if (quotes !== false){
        $scope.fact =  quotes;
        quotes.data.items.forEach(function(item, index){
          if(item.category){
            if($scope.subCategoryTitle.indexOf(item.category.title)== -1){
              $scope.subCategoryTitle.push(item.category.title);
              $scope.subCategory.push(item);
            }
          }
        });
      }
    });
  }


    function getCategories (){
    Categories.getCategories().then(function(categories){
      if (categories !== false){
        $scope.category = categories.data;
      }
    });
  }




  $scope.filterFacts = function (searchContent) {
    var inputs = $scope.fact.data.items;
        filterValue = $scope.card;
        $scope.facts = [];
    if (filterValue.all === false){
      if(filterValue.category !== undefined && filterValue.category !== null) {
        var output = [];
        angular.forEach(inputs, function (input) {
          if (input.category !== null){
           if (input.category.description === filterValue.category){
              output.push(input);
            }
          }
         });
        $scope.facts = output;
      } else {
        if(filterValue.id !== undefined && filterValue.id !== null) {
        var output = [];
        angular.forEach(inputs, function (input) {
          if (input.id === filterValue.id){
            output.push(input);
          }
         });
        $scope.facts = output;
        } else if(filterValue.tag !== undefined && filterValue.tag !== null){
          var output = [],
            ids = [];
          angular.forEach(inputs, function (input) {
            angular.forEach(input.tags, function (tag) {
              if (filterValue.tag.indexOf(tag.toLowerCase()) !== -1 && ids.indexOf(input.id) === -1) {
                output.push(input);
                ids.push(input.id);
              }
            });
          });
          console.log($scope.card);
          console.log(output);
          $scope.facts = output;
        }
      }

    }else {
      $scope.facts = inputs;
    }
    setCurrentFavorite(0);
  }



Quotes;

$scope.goCategory = function(){
  $location.path("/list");
}

$scope.goCategoryFromFavorite = function(){
  $location.path("/list");
  $scope.closeFavorite();
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


$scope.datta = [];

$scope.$on("$ionicSlides.slideChangeStart", function(event, data){
});

$scope.$on("$ionicSlides.slideChangeEnd", function(event, data){
  // note: the indexes are 0-based
  $scope.activeIndex = data.slider.activeIndex;
  $scope.previousIndex = data.slider.previousIndex;
});

  $scope.bool = false;
  $scope.slideValiderGrayValue = false;
  $scope.bool = false;
  $scope.slidePosition = false;
  $scope.slideEnable = true;
  $scope.slideUp = function($event, info) {
      $scope.info = info;
      $scope.slideValiderGrayValue = !$scope.slideValiderGrayValue;
      $scope.slidePosition = !$scope.slidePosition;
      $scope.slideEnable = !$scope.slideEnable;
      $scope.bool = !$scope.bool;
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
  var $verifiers = angular.element(document.getElementsByClassName('verifier'));
  $scope.popover.item = item;
  var popoverWrapper = document.getElementsByClassName('popover-wrapper');
  if ($scope.popover.isShown) {
    if ($verifiers[0].parentNode.id !== "verifierContainer"){
      $scope.popover.show($event); 
    } else{
      $scope.popover.show($event); 
      var $verifiers = angular.element(document.getElementsByClassName('verifier'));
      angular.element(document.getElementsByClassName('popover-wrapper')).append($verifiers);
    }
  }

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
  angular.element($scope.popover.modalEl).css({
    visibility: 'visible'
  });

  if (!$scope.hasPopoverBackdropListener){
    //event listener for click on popover wrapper
    var backdrop = document.querySelector(".popover-backdrop.active");
    if (backdrop){
      var eventTesteur = backdrop.addEventListener("click", function(event){
          if (event.target.className == "popover-backdrop active"){
            $scope.closePopover();
          }
      });
      $scope.hasPopoverBackdropListener =true;
    }
  }
};

$scope.resetState = function () {
  $scope.verifierScrollLeft = 0;
}

$scope.shouldClosePopover = function(event){
  var distance = $scope.verifierScrollLeft - event.detail.scrollLeft;
  if (distance != 0){
    $scope.closePopover();
  }
  $scope.verifierScrollLeft = event.detail.scrollLeft;
}


$scope.closePopover = function() {
  if ($scope.popover.isShown){
    $scope.popover.hide();
  }
};



  //Cleanup the popover when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.popover.remove();
  });
  // Execute action on hide popover
  $scope.$on('popover.hidden', function() {

    var $verifiers = angular.element(document.getElementsByClassName('verifier'));
    var $replacePopover = document.getElementById("verifierContainer");
    angular.element($replacePopover).append($verifiers);

    var muogle = document.getElementsByClassName("muogleVerifier");
    angular.element(muogle).removeClass("opacity");
    // Execute action
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
  $scope.openModal = function() {
    setCurrentIndex($scope.slider.activeIndex);
    $scope.modal.cont = $scope.info;
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };

  $ionicModal.fromTemplateUrl('favorite.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal2 = modal;
    $scope.modal2.cont = {};
  });
  $scope.openFavorite = function() {
    $scope.modal2.show();
  };
  $scope.closeFavorite = function() {
    $scope.modal2.hide();
  };


////////////////////////////Ionic Modal////////////////////////////////////



////////////////////////////Social Sharing////////////////////////////////////
$scope.shareNative = function(content) {
        // $cordovaSocialSharing.share("This is your message", "This is your subject", "www/imagefile.png", "https://www.thepolyglotdeveloper.com");
        $cordovaSocialSharing
    .share(content+' Download now #MuogleApp', "MUOGLE") // Share via native share sheet
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
    setCurrentFavorite($scope.slider.activeIndex);
    if ($scope.favorite.indexOf($scope.info.id) === -1){
      StorageService.add($scope.info.id);
      setCurrentFavorite($scope.slider.activeIndex);
    }
  };
  $scope.remove = function (favorite) {
    if (favorite){
      StorageService.remove(favorite.id);
    }
    setCurrentFavorite($scope.slider.activeIndex);
    if ($scope.favorite.indexOf($scope.info.id) !== -1){
      StorageService.remove($scope.info.id);
      setCurrentFavorite($scope.slider.activeIndex);
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
  $scope.random = $scope.fact.data.items[Math.floor(Math.random()*$scope.fact.data.items.length)];
  $location.path("/random");
};
////////////////////////////Random Page////////////////////////////////////

$scope.goToFavorite = function(){
  $location.path("/favorite");
}

function setCurrentIndex(index){
  if ($scope.facts.length > 0){  
    $scope.info = $scope.facts[index];
  }
}

function setCurrentFavorite(index){
    setCurrentIndex(index);
    //setting the landing fact favorite status
  if ($scope.info){
    $scope.info.isFavorited = $scope.favorite.indexOf($scope.info.id) !== -1;
    $scope.isFavorited = $scope.info.isFavorited;
  }
}

$scope.$on("$ionicSlides.slideChangeEnd", function(event, data){
  setCurrentFavorite(data.slider.activeIndex);
  $scope.$apply();
});



////////////////////////////keyboard////////////////////////////////////

window.addEventListener('native.keyboardshow', function(){
  angular.element(document.querySelector("#footer")).addClass("fiftypercent");
});

window.addEventListener('native.keyboardhide', function(){
  angular.element(document.querySelector("#footer")).removeClass("fiftypercent");
});

////////////////////////////Keyboard////////////////////////////////////


 
});