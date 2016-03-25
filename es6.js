(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CalculController = function () {
    function CalculController(calculService) {
        _classCallCheck(this, CalculController);

        this.calculService = calculService;
        this.tranche1 = calculService.getTranche(1);
        this.tranche2 = calculService.getTranche(2);
        this.tranche3 = calculService.getTranche(3);
        this.tranche4 = calculService.getTranche(4);
        this.tranche5 = calculService.getTranche(5);

        this.remuneration = 0;
        this.montantImpotTranche1 = 0;
        this.montantImpotTranche2 = 0;
        this.montantImpotTranche3 = 0;
        this.montantImpotTranche4 = 0;
        this.montantImpotTranche5 = 0;
        this.montantIR = 0;
        this.pourcentageIR = 0;
    }

    _createClass(CalculController, [{
        key: 'calculerMontantIR',
        value: function calculerMontantIR() {
            this.montantImpotTranche1 = this.calculService.calculerMontantImpotTranche(this.remuneration, 1);
            this.montantImpotTranche2 = this.calculService.calculerMontantImpotTranche(this.remuneration, 2);
            this.montantImpotTranche3 = this.calculService.calculerMontantImpotTranche(this.remuneration, 3);
            this.montantImpotTranche4 = this.calculService.calculerMontantImpotTranche(this.remuneration, 4);
            this.montantImpotTranche5 = this.calculService.calculerMontantImpotTranche(this.remuneration, 5);
            this.montantIR = this.calculService.calculerMontantIR(this.remuneration);

            this.pourcentageIR = this.calculService.calculerPourcentageIR(this.montantIR, this.remuneration);
        }
    }]);

    return CalculController;
}();

exports.default = CalculController;

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Tranche = require('./Tranche.js');

var _Tranche2 = _interopRequireDefault(_Tranche);

var _TrancheInconnueException = require('./TrancheInconnueException.js');

var _TrancheInconnueException2 = _interopRequireDefault(_TrancheInconnueException);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CalculService = function () {
    function CalculService() {
        _classCallCheck(this, CalculService);

        /* Voir http://www.impots.gouv.fr/portal/dgi/public/popup?espId=1&typePage=cpr02&docOid=documentstandard_6889 */
        this.tranche1 = new _Tranche2.default(0, 9690, 0);
        this.tranche2 = new _Tranche2.default(9690, 26764, 14);
        this.tranche3 = new _Tranche2.default(26764, 71754, 30);
        this.tranche4 = new _Tranche2.default(71754, 151956, 41);
        this.tranche5 = new _Tranche2.default(151956, Number.MAX_VALUE, 45);
        this.tranches = [this.tranche1, this.tranche2, this.tranche3, this.tranche4, this.tranche5];
    }

    _createClass(CalculService, [{
        key: 'isNombre',
        value: function isNombre(n) {
            return !isNaN(parseFloat(n));
        }
    }, {
        key: 'isNombreEntier',
        value: function isNombreEntier(n) {
            var isEntier = this.isNombre(n) && n === parseInt(n, 10);
            return isEntier;
        }

        /** 
         * Renvoie la tranche d'imposition correspondant à l'entier en paramètre. 
         * @param numeroTranche 1, 2, 3, 4 ou 5
         * @throws TrancheInconnueException quand le paramètre est différent de 1, 2, 3, 4 ou 5
         */

    }, {
        key: 'getTranche',
        value: function getTranche(numeroTranche) {
            if (!this.isNombreEntier(numeroTranche) || numeroTranche < 1 || numeroTranche > 5) {
                throw new _TrancheInconnueException2.default(numeroTranche);
            }

            return this.tranches[numeroTranche - 1];
        }

        /** 
         * Calcule le montant des impôts pour une tranche donnée. 
         * @param remuneration Ex : 100000
         * @param numeroTranche 1, 2, 3, 4 ou 5
         * @returns le montant de l'impôt pour la tranche demandée.
         */

    }, {
        key: 'calculerMontantImpotTranche',
        value: function calculerMontantImpotTranche(remuneration, numeroTranche) {
            if (!this.isNombre(remuneration) || remuneration < 0) {
                throw "Montant invalide";
            }

            var tranche = this.getTranche(numeroTranche);
            if (remuneration < tranche.min) {
                return 0;
            }
            var plafond = remuneration > tranche.max ? tranche.max : remuneration;
            var montantImposablePourCetteTranche = plafond - tranche.min;
            return montantImposablePourCetteTranche * tranche.tauxImposition / 100.0;
        }

        /** 
         * Calcule le montant total des impôts en faisant la somme des montants imposés pour chacune des tranches. 
         * @param remuneration Ex : 100000
         * @returns le montant de total l'impôt sur le revenu.
         */

    }, {
        key: 'calculerMontantIR',
        value: function calculerMontantIR(remuneration) {
            return this.calculerMontantImpotTranche(remuneration, 1) + this.calculerMontantImpotTranche(remuneration, 2) + this.calculerMontantImpotTranche(remuneration, 3) + this.calculerMontantImpotTranche(remuneration, 4) + this.calculerMontantImpotTranche(remuneration, 5);
        }

        /**
         * Calcule le pourcentage de l'impôt sur le revenu par rapport à la rémnunération.
         * @param montantIR le montant de l'impôt sur le revenu calculé.
         * @param remuneration le montant de la rémunération saisie.
         * @returns le pourcentage calculé. Ex : 33.3333
         */

    }, {
        key: 'calculerPourcentageIR',
        value: function calculerPourcentageIR(montantIR, remuneration) {
            if (remuneration === 0) {
                return 0;
            }
            return montantIR / remuneration * 100;
        }

        /**
         * Renvoie la tranche correspondant à la rémunération en paramètre.
         */

    }, {
        key: 'getTrancheByRemuneration',
        value: function getTrancheByRemuneration(remuneration) {
            var i = void 0,
                trancheCourante = void 0;
            for (i = this.tranches.length - 1; i >= 0; i -= 1) {
                trancheCourante = this.tranches[i];
                if (remuneration > trancheCourante.min) {
                    return trancheCourante;
                }
            }
            return this.tranche1;
        }
    }]);

    return CalculService;
}();

exports.default = CalculService;

},{"./Tranche.js":5,"./TrancheInconnueException.js":6}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

exports.default = ContactController;

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CourbeController = function () {
    function CourbeController(calculService, nombreEntierFilter) {
        _classCallCheck(this, CourbeController);

        this.calculService = calculService;
        this.nombreEntierFilter = nombreEntierFilter;
        this.arrondir = function (montant) {
            return nombreEntierFilter(montant);
        };

        this.initCourbe();
    }

    _createClass(CourbeController, [{
        key: "initCourbe",
        value: function initCourbe() {
            var montantsImpotsCalcules = [];
            var i = void 0;
            /* on met les montants calculés dans un tableau */
            for (i = 0; i <= 160; i += 2) {
                var remuneration = i * 1000;
                montantsImpotsCalcules.push([remuneration, this.calculService.calculerMontantIR(remuneration)]);
            }

            this.data = [{
                key: "montant IR",
                values: montantsImpotsCalcules
            }];
        }
    }, {
        key: "getValeursAxeX",
        value: function getValeursAxeX() {
            var calculService = this.calculService;
            return function (d) {
                return [calculService.tranche1.min, calculService.tranche2.min, calculService.tranche3.min, calculService.tranche4.min, calculService.tranche5.min];
            };
        }
    }, {
        key: "getValeursAxeY",
        value: function getValeursAxeY() {
            var calculService = this.calculService;
            return function (d) {
                return [calculService.calculerMontantIR(calculService.tranche1.min), calculService.calculerMontantIR(calculService.tranche2.min), calculService.calculerMontantIR(calculService.tranche3.min), calculService.calculerMontantIR(calculService.tranche4.min), calculService.calculerMontantIR(calculService.tranche5.min)];
            };
        }
    }, {
        key: "getContenuInfoBulle",
        value: function getContenuInfoBulle() {
            var calculService = this.calculService;
            var arrondir = this.arrondir;

            return function (key, x, y, e, graph) {
                var rem = key.point[0];
                var ir = key.point[1];
                var tranche = calculService.getTrancheByRemuneration(rem);

                return "<div class='infoBulle tranche" + tranche.tauxImposition + "'>" + "Tranche à " + tranche.tauxImposition + "%.<br/>" + "Pour une rémunération de <b>" + arrondir(rem) + "</b>€,<br/>" + "le montant total de l'impôt est <b>" + arrondir(ir) + "</b>€,<br/>" + "soit " + arrondir(calculService.calculerPourcentageIR(ir, rem)) + "% de la rémunération.</div>";
            };
        }
    }, {
        key: "arrondirValeursAxe",
        value: function arrondirValeursAxe() {
            return this.arrondir;
        }
    }]);

    return CourbeController;
}();

exports.default = CourbeController;

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Tranche = function Tranche(min, max, tauxImposition) {
    _classCallCheck(this, Tranche);

    this.min = min;
    this.max = max;
    this.tauxImposition = tauxImposition;
};

exports.default = Tranche;

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TrancheInconnueException = function TrancheInconnueException(numeroTranche) {
    _classCallCheck(this, TrancheInconnueException);

    this.message = "Tranche d'imposition inconnue";
    this.numeroTranche = numeroTranche;
};

exports.default = TrancheInconnueException;

},{}],7:[function(require,module,exports){
'use strict';

var _nombreEntierFilter = require('./nombreEntierFilter.js');

var _nombreEntierFilter2 = _interopRequireDefault(_nombreEntierFilter);

var _CalculService = require('./CalculService.js');

var _CalculService2 = _interopRequireDefault(_CalculService);

var _CalculController = require('./CalculController.js');

var _CalculController2 = _interopRequireDefault(_CalculController);

var _CourbeController = require('./CourbeController.js');

var _CourbeController2 = _interopRequireDefault(_CourbeController);

var _ContactController = require('./ContactController.js');

var _ContactController2 = _interopRequireDefault(_ContactController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var applicationName = 'freelance-impot';
var app = angular.module(applicationName, ['ngRoute', 'nvd3ChartDirectives']);
angular.module(applicationName).filter('nombreEntier', _nombreEntierFilter2.default);
angular.module(applicationName).service("CalculService", _CalculService2.default);
angular.module(applicationName).controller("CalculController", ["CalculService", _CalculController2.default]);
angular.module(applicationName).controller('CourbeController', ['CalculService', 'nombreEntierFilter', _CourbeController2.default]);
angular.module(applicationName).controller("ContactController", _ContactController2.default);

app.config(function ($routeProvider) {
    $routeProvider.when("/", {
        templateUrl: "partials/simulateur.html",
        controller: "CalculController"
    }).when("/apropos", {
        templateUrl: "partials/apropos.html",
        controller: "ContactController"
    }).when("/technos", {
        templateUrl: "partials/technos.html"
    }).otherwise({
        redirectTo: "/"
    });
});

angular.bootstrap(document, [applicationName]);

},{"./CalculController.js":1,"./CalculService.js":2,"./ContactController.js":3,"./CourbeController.js":4,"./nombreEntierFilter.js":8}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = nombreEntierFilter;
function nombreEntierFilter() {

    /**
      * @returns Exemple : 99999.99 => '100 000'
      */
    return function (nombreAvecVirgules) {

        var arrondi = '' + Math.round(nombreAvecVirgules);
        var resultat = '';
        var i = void 0;

        var compteur123 = 0;
        for (i = arrondi.length - 1; i >= 0; i -= 1) {

            if (compteur123 === 3) {
                resultat = arrondi[i] + ' ' + resultat;
                compteur123 = 0;
            } else {
                resultat = arrondi[i] + resultat;
            }
            compteur123 += 1;
        }

        return resultat;
    };
};

},{}]},{},[7,1,2,3,4,8,5,6])


//# sourceMappingURL=es6.js.map
