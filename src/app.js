'use strict';

import nombreEntierFilter from './nombreEntierFilter';
import CalculService from './CalculService';
import CalculController from './CalculController';
import CourbeController from './CourbeController';
import ContactController from './ContactController';

let applicationName = 'freelance-impot';
let app = angular.module(applicationName, ['ngRoute', 'nvd3ChartDirectives']);
angular.module(applicationName).filter('nombreEntier', nombreEntierFilter);
angular.module(applicationName).service("CalculService", CalculService);
angular.module(applicationName).controller("CalculController", ["CalculService", CalculController]);
angular.module(applicationName).controller('CourbeController', ['CalculService', 'nombreEntierFilter', CourbeController]);
angular.module(applicationName).controller("ContactController", ContactController);

app.config(function ($routeProvider) {
    $routeProvider.
    when("/", {
        templateUrl: "partials/simulateur.html",
        controller: "CalculController"
    }).
    when("/apropos", {
        templateUrl: "partials/apropos.html",
        controller: "ContactController"
    }).
    when("/technos", {
        templateUrl: "partials/technos.html"
    }).
    otherwise({
        redirectTo: "/"
    });
});

angular.bootstrap(document, [applicationName]);