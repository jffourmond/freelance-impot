var app = angular.module('app', ['ngRoute', 'nvd3ChartDirectives']);

app.config(function($routeProvider){
	$routeProvider.
	when("/", {
		templateUrl : "partials/simulateur.html", 
		controller : "CalculCtrl"
	}).	
	when("/apropos", {
		templateUrl : "partials/apropos.html", 
      controller : "ContactCtrl"
	}).   
	when("/technos", {
		templateUrl : "partials/technos.html", 
	}).   
	otherwise({
		redirectTo: "/"
	});
});