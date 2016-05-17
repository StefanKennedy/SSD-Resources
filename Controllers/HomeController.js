
var homeApp = angular.module("homeApp", ['ngRoute']);

homeApp.config(function($locationProvider, $routeProvider){
	
	$routeProvider.when("/", {
		templateUrl:"partials/Home.html"
	}).when("/ConnectingToTheDatabase/:content", {
		templateUrl:"partials/Tutorial.html",
		controller:'TutorialController'
	});
	
});

homeApp.controller('HomeController', HomeController);
homeApp.controller('TutorialController', TutorialController);

function HomeController($scope, $location){
	
	$scope.pageLinks = [{heading:'Creating a Database',description:'Shows how to create a database local to your project.',link:'CreatingADatabase'}, {heading:'Connecting to the database',description:'Example code for connecting to the database and running a query', link:'ConnectingToTheDatabase'}];
	
	$scope.location = $location;
	
	//$scope.heading = "test" + $scope.$id;
	
}

function TutorialController($scope, $http, $location, $routeParams){
	$scope.heading="blarg";
	/*$.ajax({url:$routeParams.content + ".json", dataType:"json", success:function(data){
		$scope.heading = JSON.stringify(data);
		console.log("done");
	}}).error(function(xhr, status, error){
		alert("failed: " + xhr.responseText);
	});*/
	
	$http.get($routeParams.content + ".json").success(function(data){
		$scope.heading = data.heading;
		console.log("done");
	});
}