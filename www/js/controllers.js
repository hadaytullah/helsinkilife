angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

.controller('EventListCtrl',['$scope','$http','DataService',function($scope,$http,dataService){
    
    $http.get('http://api.hel.fi/linkedevents/v0.1/event/?start=2015-011-15&end=2015-12-30&include=location')
    
    .then(
        function successCallback(response){
            console.log('Data fetched.');
            console.log(response);
            $scope.eventlist = response.data.data;
            
            //store the data, accessible to all views through the data service
            dataService.setFilteredEventList(response.data.data);
        
        },
        function errorCallback(response){
            console.log('Error occured while fetching data');
            //console.log(response.message);
        }
    
    
    );
    //$scope.eventlist = [
    //{ name:{ fi:'Event1'}, id: 1 },
    //{ name:{ fi:'Event2'}, id: 2 },
    //{ name:{ fi:'Event3'}, id: 3 },
    //{ name:{ fi:'Event4'}, id: 4 }    
  //];

}])

.controller('EventCtrl',['$scope','$http','$stateParams','$filter','DataService','Utility',function($scope,$http,$stateParams,$filter, dataService,Utility){
    console.log($stateParams);
    console.log(dataService.getFilteredEventList());
    
    $scope.isEmpty = Utility.isEmpty; //To be fixed, don't use logic in HTML
    
    //TODO: MAke a local 'event' object and copy contents from fetched data. 
    //It will reduce coupling between HTML and Backend data/JSON
    
    var currentEventId = $stateParams.id;
    
    //find the selected event using the id
    if(currentEventId){
        
        $scope.event = $filter('filter')(dataService.getFilteredEventList(), {id: currentEventId})[0];
        console.log($scope.event);
        
        //sanitizing, event desciption which is html
        //$scope.eventDescriptionHtml = $scope.event.description.fi;
        if(Utility.isEmpty($scope.event.description.fi)){
            //TODO: Covert using i18n to english/finnish
            $scope.event.desciption.fi="Tieto tapahtumasta ei ole saatavilla nyt.";
        }
        
        if(Utility.isEmpty($scope.event.location.image)){
            var pictureNumber = Utility.getRandomInt(1,4);
            $scope.event.location.image="img/helsinki"+pictureNumber+"-small.jpg";
        }
        
    }
    
    
    
    //$scope.deliberatelyTrustDangerousSnippet = function() {
    //           return $sce.trustAsHtml($scope.snippet);
    //};

}])

;
