'use strict';

//import ContactController from './ContactController.js';

var app = angular.module('app', ['ngRoute', 'nvd3ChartDirectives']);

app.config(function ($routeProvider) {
    $routeProvider.
    when("/", {
        templateUrl: "partials/simulateur.html",
        controller: "CalculCtrl"
    }).
    when("/apropos", {
        templateUrl: "partials/apropos.html",
        controller: "ContactController", 
        controllerAs: "contact"
    }).
    when("/technos", {
        templateUrl: "partials/technos.html"
    }).
    otherwise({
        redirectTo: "/"
    });
});