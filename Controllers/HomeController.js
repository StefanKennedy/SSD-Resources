
var homeApp = angular.module("homeApp", ['ngRoute']);

homeApp.config(function($locationProvider, $routeProvider){
	
	$routeProvider.when("/", {
		templateUrl:"partials/Home.html"
	}).when("/ConnectingToTheDatabase", {
		templateUrl:"partials/Tutorial.html"
	});
	
});

homeApp.controller('HomeController', HomeController);

function HomeController($scope, $location){
	
	$scope.pageLinks = [{heading:'Creating a Database',description:'Shows how to create a database local to your project.',link:'CreatingADatabase'}, {heading:'Connecting to the database',description:'Example code for connecting to the database and running a query', link:'ConnectingToTheDatabase'}];
	
	$scope.location = $location;
	
}