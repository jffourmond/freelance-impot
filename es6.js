'use strict';

var app = angular.module('app', ['ngRoute', 'nvd3ChartDirectives']);

app.config(function ($routeProvider) {
    $routeProvider.when("/", {
        templateUrl: "partials/simulateur.html",
        controller: "CalculCtrl"
    }).when("/apropos", {
        templateUrl: "partials/apropos.html",
        controller: "ContactController",
        controllerAs: "contact"
    }).when("/technos", {
        templateUrl: "partials/technos.html"
    }).otherwise({
        redirectTo: "/"
    });
});
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ContactController = function () {
    function ContactController($scope, $window) {
        _classCallCheck(this, ContactController);

        this.$scope = $scope;
        this.$window = $window;
    }

    _createClass(ContactController, [{
        key: 'ouvrirFenetreEnvoiEmail',
        value: function ouvrirFenetreEnvoiEmail() {
            this.$window.open('mailto:' + 'freelance' + '.' + 'impot' + '@' + 'gmail' + '.' + 'com' + '?subject=Freelance Impôt');
        }
    }]);

    return ContactController;
}();

app.controller("ContactController", ContactController);
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Tranche = function Tranche(min, max, tauxImposition) {
    _classCallCheck(this, Tranche);

    this.min = min;
    this.max = max;
    this.tauxImposition = tauxImposition;
};
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TrancheInconnueException = function TrancheInconnueException(numeroTranche) {
    _classCallCheck(this, TrancheInconnueException);

    this.message = "Tranche d'imposition inconnue";
    this.numeroTranche = numeroTranche;
};