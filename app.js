var app = angular.module('app', ['ngRoute', 'nvd3ChartDirectives']);

app.config(function($routeProvider){
	$routeProvider.
	when("/", {
		templateUrl : "partials/simulateur.html", 
		controller : "CalculCtrl"
	}).			
	when("/technos", {
		templateUrl : "partials/technos.html", 
	}).
	when("/contact", {
		templateUrl : "partials/contact.html", 
	}).   
	otherwise({
		redirectTo: "/"
	});
});