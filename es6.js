'use strict';

var app = angular.module('app', ['ngRoute', 'nvd3ChartDirectives']);

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
'use strict';

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
        key: "calculerMontantIR",
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

app.controller("CalculController", ["CalculService", CalculController]);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CalculService = function () {
    function CalculService() {
        _classCallCheck(this, CalculService);

        /* Voir http://www.impots.gouv.fr/portal/dgi/public/popup?espId=1&typePage=cpr02&docOid=documentstandard_6889 */
        this.tranche1 = new Tranche(0, 9690, 0);
        this.tranche2 = new Tranche(9690, 26764, 14);
        this.tranche3 = new Tranche(26764, 71754, 30);
        this.tranche4 = new Tranche(71754, 151956, 41);
        this.tranche5 = new Tranche(151956, Number.MAX_VALUE, 45);
        this.tranches = [this.tranche1, this.tranche2, this.tranche3, this.tranche4, this.tranche5];
    }

    _createClass(CalculService, [{
        key: "isNombre",
        value: function isNombre(n) {
            return !isNaN(parseFloat(n));
        }
    }, {
        key: "isNombreEntier",
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
        key: "getTranche",
        value: function getTranche(numeroTranche) {
            if (!this.isNombreEntier(numeroTranche) || numeroTranche < 1 || numeroTranche > 5) {
                throw new TrancheInconnueException(numeroTranche);
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
        key: "calculerMontantImpotTranche",
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
        key: "calculerMontantIR",
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
        key: "calculerPourcentageIR",
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
        key: "getTrancheByRemuneration",
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

app.service("CalculService", CalculService);
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
                console.log("[" + remuneration + "," + this.calculService.calculerMontantIR(remuneration) + "],");
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

app.controller('CourbeController', ['CalculService', 'nombreEntierFilter', CourbeController]);
'use strict';

app.filter('nombreEntier', function () {

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
});
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsIkNhbGN1bENvbnRyb2xsZXIuanMiLCJDYWxjdWxTZXJ2aWNlLmpzIiwiQ29udGFjdENvbnRyb2xsZXIuanMiLCJDb3VyYmVDb250cm9sbGVyLmpzIiwibm9tYnJlRW50aWVyRmlsdGVyLmpzIiwiVHJhbmNoZS5qcyIsIlRyYW5jaGVJbmNvbm51ZUV4Y2VwdGlvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQSxJQUFJLE1BQU0sUUFBUSxNQUFSLENBQWUsS0FBZixFQUFzQixDQUFDLFNBQUQsRUFBWSxxQkFBWixDQUF0QixDQUFOOztBQUVKLElBQUksTUFBSixDQUFXLFVBQVUsY0FBVixFQUEwQjtBQUNqQyxtQkFDQSxJQURBLENBQ0ssR0FETCxFQUNVO0FBQ04scUJBQWEsMEJBQWI7QUFDQSxvQkFBWSxrQkFBWjtLQUhKLEVBS0EsSUFMQSxDQUtLLFVBTEwsRUFLaUI7QUFDYixxQkFBYSx1QkFBYjtBQUNBLG9CQUFZLG1CQUFaO0tBUEosRUFTQSxJQVRBLENBU0ssVUFUTCxFQVNpQjtBQUNiLHFCQUFhLHVCQUFiO0tBVkosRUFZQSxTQVpBLENBWVU7QUFDTixvQkFBWSxHQUFaO0tBYkosRUFEaUM7Q0FBMUIsQ0FBWDtBQ0pBOzs7Ozs7SUFFTTtBQUVGLGFBRkUsZ0JBRUYsQ0FBWSxhQUFaLEVBQTJCOzhCQUZ6QixrQkFFeUI7O0FBQ3ZCLGFBQUssYUFBTCxHQUFxQixhQUFyQixDQUR1QjtBQUV2QixhQUFLLFFBQUwsR0FBZ0IsY0FBYyxVQUFkLENBQXlCLENBQXpCLENBQWhCLENBRnVCO0FBR3ZCLGFBQUssUUFBTCxHQUFnQixjQUFjLFVBQWQsQ0FBeUIsQ0FBekIsQ0FBaEIsQ0FIdUI7QUFJdkIsYUFBSyxRQUFMLEdBQWdCLGNBQWMsVUFBZCxDQUF5QixDQUF6QixDQUFoQixDQUp1QjtBQUt2QixhQUFLLFFBQUwsR0FBZ0IsY0FBYyxVQUFkLENBQXlCLENBQXpCLENBQWhCLENBTHVCO0FBTXZCLGFBQUssUUFBTCxH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QTJCLFlBQU07Ozs7O0FBSzdCLFdBQU8sVUFBQyxrQkFBRCxFQUF3Qjs7QUFFM0IsWUFBSSxVQUFVLEtBQUssS0FBSyxLQUFMLENBQVcsa0JBQVgsQ0FBTCxDQUZhO0FBRzNCLFlBQUksV0FBVyxFQUFYLENBSHVCO0FBSTNCLFlBQUksVUFBSixDQUoyQjs7QUFNM0IsWUFBSSxjQUFjLENBQWQsQ0FOdUI7QUFPM0IsYUFBSyxJQUFJLFFBQVEsTUFBUixHQUFpQixDQUFqQixFQUFvQixLQUFLLENBQUwsRUFBUSxLQUFLLENBQUwsRUFBUTs7QUFFekMsZ0JBQUksZ0JBQWdCLENBQWhCLEVBQW1CO0FBQ25CLDJCQUFXLFFBQVEsQ0FBUixJQUFhLEdBQWIsR0FBbUIsUUFBbkIsQ0FEUTtBQUVuQiw4QkFBYyxDQUFkLENBRm1CO2FBQXZCLE1BR087QUFDSCwyQkFBVyxRQUFRLENBQVIsSUFBYSxRQUFiLENBRFI7YUFIUDtBQU1BLDJCQUFlLENBQWYsQ0FSeUM7U0FBN0M7O0FBV0EsZUFBTyxRQUFQLENBbEIyQjtLQUF4QixDQUxzQjtDQUFOLENBQTNCO0FDRkE7Ozs7SUFFTSxVQUVGLFNBRkUsT0FFRixDQUFZLEdBQVosRUFBaUIsR0FBakIsRUFBc0IsY0FBdEIsRUFBc0M7MEJBRnBDLFNBRW9DOztBQUNsQyxTQUFLLEdBQUwsR0FBVyxHQUFYLENBRGtDO0FBRWxDLFNBQUssR0FBTCxHQUFXLEdBQVgsQ0FGa0M7QUFHbEMsU0FBSyxjQUFMLEdBQXNCLGNBQXRCLENBSGtDO0NBQXRDO0FDSko7Ozs7SUFFTSwyQkFFRixTQUZFLHdCQUVGLENBQVksYUFBWixFQUEyQjswQkFGekIsMEJBRXlCOztBQUN2QixTQUFLLE9BQUwsR0FBZSwrQkFBZixDQUR1QjtBQUV2QixTQUFLLGFBQUwsR0FBcUIsYUFBckIsQ0FGdUI7Q0FBM0IiLCJmaWxlIjoiZXM2LmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xyXG5cclxudmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCdhcHAnLCBbJ25nUm91dGUnLCAnbnZkM0NoYXJ0RGlyZWN0aXZlcyddKTtcclxuXHJcbmFwcC5jb25maWcoZnVuY3Rpb24gKCRyb3V0ZVByb3ZpZGVyKSB7XHJcbiAgICAkcm91dGVQcm92aWRlci5cclxuICAgIHdoZW4oXCIvXCIsIHtcclxuICAgICAgICB0ZW1wbGF0ZVVybDogXCJwYXJ0aWFscy9zaW11bGF0ZXVyLmh0bWxcIixcclxuICAgICAgICBjb250cm9sbGVyOiBcIkNhbGN1bENvbnRyb2xsZXJcIlxyXG4gICAgfSkuXHJcbiAgICB3aGVuKFwiL2Fwcm9wb3NcIiwge1xyXG4gICAgICAgIHRlbXBsYXRlVXJsOiBcInBhcnRpYWxzL2Fwcm9wb3MuaHRtbFwiLFxyXG4gICAgICAgIGNvbnRyb2xsZXI6IFwiQ29udGFjdENvbnRyb2xsZXJcIlxyXG4gICAgfSkuXHJcbiAgICB3aGVuKFwiL3RlY2hub3NcIiwge1xyXG4gICAgICAgIHRlbXBsYXRlVXJsOiBcInBhcnRpYWxzL3RlY2hub3MuaHRtbFwiXHJcbiAgICB9KS5cclxuICAgIG90aGVyd2lzZSh7XHJcbiAgICAgICAgcmVkaXJlY3RUbzogXCIvXCJcclxuICAgIH0pO1xyXG59KTsiLCIndXNlIHN0cmljdCc7XHJcblxyXG5jbGFzcyBDYWxjdWxDb250cm9sbGVyIHtcclxuICAgIFxyXG4gICAgY29uc3RydWN0b3IoY2FsY3VsU2VydmljZSkge1xyXG4gICAgICAgIHRoaXMuY2FsY3VsU2VydmljZSA9IGNhbGN1bFNlcnZpY2U7XHJcbiAgICAgICAgdGhpcy50cmFuY2hlMSA9IGNhbGN1bFNlcnZpY2UuZ2V0VHJhbmNoZSgxKTtcclxuICAgICAgICB0aGlzLnRyYW5jaGUyID0gY2FsY3VsU2VydmljZS5nZXRUcmFuY2hlKDIpO1xyXG4gICAgICAgIHRoaXMudHJhbmNoZTMgPSBjYWxjdWxTZXJ2aWNlLmdldFRyYW5jaGUoMyk7XHJcbiAgICAgICAgdGhpcy50cmFuY2hlNCA9IGNhbGN1bFNlcnZpY2UuZ2V0VHJhbmNoZSg0KTtcclxuICAgICAgICB0aGlzLnRyYW5jaGU1ID0gY2FsY3VsU2VydmljZS5nZXRUcmFuY2hlKDUpO1xyXG5cclxuICAgICAgICB0aGlzLnJlbXVuZXJhdGlvbiA9IDA7XHJcbiAgICAgICAgdGhpcy5tb250YW50SW1wb3RUcmFuY2hlMSA9IDA7XHJcbiAgICAgICAgdGhpcy5tb250YW50SW1wb3RUcmFuY2hlMiA9IDA7XHJcbiAgICAgICAgdGhpcy5tb250YW50SW1wb3RUcmFuY2hlMyA9IDA7XHJcbiAgICAgICAgdGhpcy5tb250YW50SW1wb3RUcmFuY2hlNCA9IDA7XHJcbiAgICAgICAgdGhpcy5tb250YW50SW1wb3RUcmFuY2hlNSA9IDA7XHJcbiAgICAgICAgdGhpcy5tb250YW50SVIgPSAwO1xyXG4gICAgICAgIHRoaXMucG91cmNlbnRhZ2VJUiA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgY2FsY3VsZXJNb250YW50SVIoKSB7XHJcbiAgICAgICAgdGhpcy5tb250YW50SW1wb3RUcmFuY2hlMSA9IHRoaXMuY2FsY3VsU2VydmljZS5jYWxjdWxlck1vbnRhbnRJbXBvdFRyYW5jaGUodGhpcy5yZW11bmVyYXRpb24sIDEpO1xyXG4gICAgICAgIHRoaXMubW9udGFudEltcG90VHJhbmNoZTIgPSB0aGlzLmNhbGN1bFNlcnZpY2UuY2FsY3VsZXJNb250YW50SW1wb3RUcmFuY2hlKHRoaXMucmVtdW5lcmF0aW9uLCAyKTtcclxuICAgICAgICB0aGlzLm1vbnRhbnRJbXBvdFRyYW5jaGUzID0gdGhpcy5jYWxjdWxTZXJ2aWNlLmNhbGN1bGVyTW9udGFudEltcG90VHJhbmNoZSh0aGlzLnJlbXVuZXJhdGlvbiwgMyk7XHJcbiAgICAgICAgdGhpcy5tb250YW50SW1wb3RUcmFuY2hlNCA9IHRoaXMuY2FsY3VsU2VydmljZS5jYWxjdWxlck1vbnRhbnRJbXBvdFRyYW5jaGUodGhpcy5yZW11bmVyYXRpb24sIDQpO1xyXG4gICAgICAgIHRoaXMubW9udGFudEltcG90VHJhbmNoZTUgPSB0aGlzLmNhbGN1bFNlcnZpY2UuY2FsY3VsZXJNb250YW50SW1wb3RUcmFuY2hlKHRoaXMucmVtdW5lcmF0aW9uLCA1KTtcclxuICAgICAgICB0aGlzLm1vbnRhbnRJUiA9IHRoaXMuY2FsY3VsU2VydmljZS5jYWxjdWxlck1vbnRhbnRJUih0aGlzLnJlbXVuZXJhdGlvbik7XHJcblxyXG4gICAgICAgIHRoaXMucG91cmNlbnRhZ2VJUiA9IHRoaXMuY2FsY3VsU2VydmljZS5jYWxjdWxlclBvdXJjZW50YWdlSVIodGhpcy5tb250YW50SVIsIHRoaXMucmVtdW5lcmF0aW9uKTtcclxuICAgIH1cclxufVxyXG5cclxuYXBwLmNvbnRyb2xsZXIoXCJDYWxjdWxDb250cm9sbGVyXCIsIFtcIkNhbGN1bFNlcnZpY2VcIiwgQ2FsY3VsQ29udHJvbGxlcl0pO1xyXG4iLCIndXNlIHN0cmljdCc7XHJcblxyXG5jbGFzcyBDYWxjdWxTZXJ2aWNlIHtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIC8qIFZvaXIgaHR0cDovL3d3dy5pbXBvdHMuZ291di5mci9wb3J0YWwvZGdpL3B1YmxpYy9wb3B1cD9lc3BJZD0xJnR5cGVQYWdlPWNwcjAyJmRvY09pZD1kb2N1bWVudHN0YW5kYXJkXzY4ODkgKi9cclxuICAgICAgICB0aGlzLnRyYW5jaGUxID0gbmV3IFRyYW5jaGUoMCwgOTY5MCwgMCk7XHJcbiAgICAgICAgdGhpcy50cmFuY2hlMiA9IG5ldyBUcmFuY2hlKDk2OTAsIDI2NzY0LCAxNCk7XHJcbiAgICAgICAgdGhpcy50cmFuY2hlMyA9IG5ldyBUcmFuY2hlKDI2NzY0LCA3MTc1NCwgMzApO1xyXG4gICAgICAgIHRoaXMudHJhbmNoZTQgPSBuZXcgVHJhbmNoZSg3MTc1NCwgMTUxOTU2LCA0MSk7XHJcbiAgICAgICAgdGhpcy50cmFuY2hlNSA9IG5ldyBUcmFuY2hlKDE1MTk1NiwgTnVtYmVyLk1BWF9WQUxVRSwgNDUpO1xyXG4gICAgICAgIHRoaXMudHJhbmNoZXMgPSBbdGhpcy50cmFuY2hlMSwgdGhpcy50cmFuY2hlMiwgdGhpcy50cmFuY2hlMywgdGhpcy50cmFuY2hlNCwgdGhpcy50cmFuY2hlNV07ICAgICAgIFxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBpc05vbWJyZShuKSB7XHJcbiAgICAgICAgcmV0dXJuICFpc05hTihwYXJzZUZsb2F0KG4pKTtcclxuICAgIH1cclxuXHJcbiAgICBpc05vbWJyZUVudGllcihuKSB7XHJcbiAgICAgICAgbGV0IGlzRW50aWVyID0gdGhpcy5pc05vbWJyZShuKSAmJiAobiA9PT0gcGFyc2VJbnQobiwgMTApKTtcclxuICAgICAgICByZXR1cm4gaXNFbnRpZXI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIFxyXG4gICAgICogUmVudm9pZSBsYSB0cmFuY2hlIGQnaW1wb3NpdGlvbiBjb3JyZXNwb25kYW50IMOgIGwnZW50aWVyIGVuIHBhcmFtw6h0cmUuIFxyXG4gICAgICogQHBhcmFtIG51bWVyb1RyYW5jaGUgMSwgMiwgMywgNCBvdSA1XHJcbiAgICAgKiBAdGhyb3dzIFRyYW5jaGVJbmNvbm51ZUV4Y2VwdGlvbiBxdWFuZCBsZSBwYXJhbcOodHJlIGVzdCBkaWZmw6lyZW50IGRlIDEsIDIsIDMsIDQgb3UgNVxyXG4gICAgICovXHJcbiAgICBnZXRUcmFuY2hlIChudW1lcm9UcmFuY2hlKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmlzTm9tYnJlRW50aWVyKG51bWVyb1RyYW5jaGUpIHx8IG51bWVyb1RyYW5jaGUgPCAxIHx8IG51bWVyb1RyYW5jaGUgPiA1KSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBUcmFuY2hlSW5jb25udWVFeGNlcHRpb24obnVtZXJvVHJhbmNoZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy50cmFuY2hlc1tudW1lcm9UcmFuY2hlIC0gMV07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIFxyXG4gICAgICogQ2FsY3VsZSBsZSBtb250YW50IGRlcyBpbXDDtHRzIHBvdXIgdW5lIHRyYW5jaGUgZG9ubsOpZS4gXHJcbiAgICAgKiBAcGFyYW0gcmVtdW5lcmF0aW9uIEV4IDogMTAwMDAwXHJcbiAgICAgKiBAcGFyYW0gbnVtZXJvVHJhbmNoZSAxLCAyLCAzLCA0IG91IDVcclxuICAgICAqIEByZXR1cm5zIGxlIG1vbnRhbnQgZGUgbCdpbXDDtHQgcG91ciBsYSB0cmFuY2hlIGRlbWFuZMOpZS5cclxuICAgICAqL1xyXG4gICAgY2FsY3VsZXJNb250YW50SW1wb3RUcmFuY2hlIChyZW11bmVyYXRpb24sIG51bWVyb1RyYW5jaGUpIHtcclxuICAgICAgICBpZiAoIXRoaXMuaXNOb21icmUocmVtdW5lcmF0aW9uKSB8fCByZW11bmVyYXRpb24gPCAwKSB7XHJcbiAgICAgICAgICAgIHRocm93IFwiTW9udGFudCBpbnZhbGlkZVwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHRyYW5jaGUgPSB0aGlzLmdldFRyYW5jaGUobnVtZXJvVHJhbmNoZSk7XHJcbiAgICAgICAgaWYgKHJlbXVuZXJhdGlvbiA8IHRyYW5jaGUubWluKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgcGxhZm9uZCA9IChyZW11bmVyYXRpb24gPiB0cmFuY2hlLm1heCkgPyB0cmFuY2hlLm1heCA6IHJlbXVuZXJhdGlvbjtcclxuICAgICAgICBsZXQgbW9udGFudEltcG9zYWJsZVBvdXJDZXR0ZVRyYW5jaGUgPSBwbGFmb25kIC0gdHJhbmNoZS5taW47XHJcbiAgICAgICAgcmV0dXJuIChtb250YW50SW1wb3NhYmxlUG91ckNldHRlVHJhbmNoZSkgKiB0cmFuY2hlLnRhdXhJbXBvc2l0aW9uIC8gMTAwLjA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIFxyXG4gICAgICogQ2FsY3VsZSBsZSBtb250YW50IHRvdGFsIGRlcyBpbXDDtHRzIGVuIGZhaXNhbnQgbGEgc29tbWUgZGVzIG1vbnRhbnRzIGltcG9zw6lzIHBvdXIgY2hhY3VuZSBkZXMgdHJhbmNoZXMuIFxyXG4gICAgICogQHBhcmFtIHJlbXVuZXJhdGlvbiBFeCA6IDEwMDAwMFxyXG4gICAgICogQHJldHVybnMgbGUgbW9udGFudCBkZSB0b3RhbCBsJ2ltcMO0dCBzdXIgbGUgcmV2ZW51LlxyXG4gICAgICovXHJcbiAgICBjYWxjdWxlck1vbnRhbnRJUiAocmVtdW5lcmF0aW9uKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FsY3VsZXJNb250YW50SW1wb3RUcmFuY2hlKHJlbXVuZXJhdGlvbiwgMSkgKyBcclxuICAgICAgICAgIHRoaXMuY2FsY3VsZXJNb250YW50SW1wb3RUcmFuY2hlKHJlbXVuZXJhdGlvbiwgMikgKyBcclxuICAgICAgICAgIHRoaXMuY2FsY3VsZXJNb250YW50SW1wb3RUcmFuY2hlKHJlbXVuZXJhdGlvbiwgMykgKyBcclxuICAgICAgICAgIHRoaXMuY2FsY3VsZXJNb250YW50SW1wb3RUcmFuY2hlKHJlbXVuZXJhdGlvbiwgNCkgKyBcclxuICAgICAgICAgIHRoaXMuY2FsY3VsZXJNb250YW50SW1wb3RUcmFuY2hlKHJlbXVuZXJhdGlvbiwgNSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxjdWxlIGxlIHBvdXJjZW50YWdlIGRlIGwnaW1ww7R0IHN1ciBsZSByZXZlbnUgcGFyIHJhcHBvcnQgw6AgbGEgcsOpbW51bsOpcmF0aW9uLlxyXG4gICAgICogQHBhcmFtIG1vbnRhbnRJUiBsZSBtb250YW50IGRlIGwnaW1ww7R0IHN1ciBsZSByZXZlbnUgY2FsY3Vsw6kuXHJcbiAgICAgKiBAcGFyYW0gcmVtdW5lcmF0aW9uIGxlIG1vbnRhbnQgZGUgbGEgcsOpbXVuw6lyYXRpb24gc2Fpc2llLlxyXG4gICAgICogQHJldHVybnMgbGUgcG91cmNlbnRhZ2UgY2FsY3Vsw6kuIEV4IDogMzMuMzMzM1xyXG4gICAgICovXHJcbiAgICBjYWxjdWxlclBvdXJjZW50YWdlSVIgKG1vbnRhbnRJUiwgcmVtdW5lcmF0aW9uKSB7XHJcbiAgICAgICAgaWYgKHJlbXVuZXJhdGlvbiA9PT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG1vbnRhbnRJUiAvIHJlbXVuZXJhdGlvbiAqIDEwMDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbnZvaWUgbGEgdHJhbmNoZSBjb3JyZXNwb25kYW50IMOgIGxhIHLDqW11bsOpcmF0aW9uIGVuIHBhcmFtw6h0cmUuXHJcbiAgICAgKi9cclxuICAgIGdldFRyYW5jaGVCeVJlbXVuZXJhdGlvbiAocmVtdW5lcmF0aW9uKSB7XHJcbiAgICAgICAgbGV0IGksIHRyYW5jaGVDb3VyYW50ZTtcclxuICAgICAgICBmb3IgKGkgPSB0aGlzLnRyYW5jaGVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaSAtPSAxKSB7XHJcbiAgICAgICAgICAgIHRyYW5jaGVDb3VyYW50ZSA9IHRoaXMudHJhbmNoZXNbaV07XHJcbiAgICAgICAgICAgIGlmIChyZW11bmVyYXRpb24gPiB0cmFuY2hlQ291cmFudGUubWluKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJhbmNoZUNvdXJhbnRlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLnRyYW5jaGUxO1xyXG4gICAgfVxyXG59XHJcblxyXG5hcHAuc2VydmljZShcIkNhbGN1bFNlcnZpY2VcIiwgQ2FsY3VsU2VydmljZSk7IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuY2xhc3MgQ29udGFjdENvbnRyb2xsZXIge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCRzY29wZSwgJHdpbmRvdykge1xyXG4gICAgICAgIHRoaXMuJHNjb3BlID0gJHNjb3BlO1xyXG4gICAgICAgIHRoaXMuJHdpbmRvdyA9ICR3aW5kb3c7XHJcbiAgICB9XHJcblxyXG4gICAgb3V2cmlyRmVuZXRyZUVudm9pRW1haWwoKSB7XHJcbiAgICAgICAgdGhpcy4kd2luZG93Lm9wZW4oJ21haWx0bzonICsgJ2ZyZWVsYW5jZScgKyAnLicgKyAnaW1wb3QnICsgJ0AnICsgJ2dtYWlsJyArICcuJyArICdjb20nICsgJz9zdWJqZWN0PUZyZWVsYW5jZSBJbXDDtHQnKTtcclxuICAgIH1cclxufVxyXG5cclxuYXBwLmNvbnRyb2xsZXIoXCJDb250YWN0Q29udHJvbGxlclwiLCBDb250YWN0Q29udHJvbGxlcik7IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuY2xhc3MgQ291cmJlQ29udHJvbGxlciB7XHJcblxyXG4gICAgY29uc3RydWN0b3IoY2FsY3VsU2VydmljZSwgbm9tYnJlRW50aWVyRmlsdGVyKSB7XHJcbiAgICAgICAgdGhpcy5jYWxjdWxTZXJ2aWNlID0gY2FsY3VsU2VydmljZTtcclxuICAgICAgICB0aGlzLm5vbWJyZUVudGllckZpbHRlciA9IG5vbWJyZUVudGllckZpbHRlcjtcclxuICAgICAgICB0aGlzLmFycm9uZGlyID0gZnVuY3Rpb24obW9udGFudCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbm9tYnJlRW50aWVyRmlsdGVyKG1vbnRhbnQpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuaW5pdENvdXJiZSgpO1xyXG4gICAgfVxyXG4gICAgXHJcblxyXG4gICAgaW5pdENvdXJiZSgpIHtcclxuICAgICAgICBsZXQgbW9udGFudHNJbXBvdHNDYWxjdWxlcyA9IFtdO1xyXG4gICAgICAgIGxldCBpO1xyXG4gICAgICAgIC8qIG9uIG1ldCBsZXMgbW9udGFudHMgY2FsY3Vsw6lzIGRhbnMgdW4gdGFibGVhdSAqL1xyXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPD0gMTYwOyBpICs9IDIpIHtcclxuICAgICAgICAgICAgbGV0IHJlbXVuZXJhdGlvbiA9IGkgKiAxMDAwO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIltcIiArIHJlbXVuZXJhdGlvbiArIFwiLFwiICsgdGhpcy5jYWxjdWxTZXJ2aWNlLmNhbGN1bGVyTW9udGFudElSKHJlbXVuZXJhdGlvbikgKyBcIl0sXCIpO1xyXG4gICAgICAgICAgICBtb250YW50c0ltcG90c0NhbGN1bGVzLnB1c2goW1xyXG4gICAgICAgICAgICAgICAgcmVtdW5lcmF0aW9uLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5jYWxjdWxTZXJ2aWNlLmNhbGN1bGVyTW9udGFudElSKHJlbXVuZXJhdGlvbilcclxuICAgICAgICAgICAgXSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmRhdGEgPSBbe1xyXG4gICAgICAgICAgICBrZXk6IFwibW9udGFudCBJUlwiLFxyXG4gICAgICAgICAgICB2YWx1ZXM6IG1vbnRhbnRzSW1wb3RzQ2FsY3VsZXNcclxuICAgICAgICB9XTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRWYWxldXJzQXhlWCgpIHtcclxuICAgICAgICBsZXQgY2FsY3VsU2VydmljZSA9IHRoaXMuY2FsY3VsU2VydmljZTtcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgICAgICAgY2FsY3VsU2VydmljZS50cmFuY2hlMS5taW4sXHJcbiAgICAgICAgICAgICAgICBjYWxjdWxTZXJ2aWNlLnRyYW5jaGUyLm1pbixcclxuICAgICAgICAgICAgICAgIGNhbGN1bFNlcnZpY2UudHJhbmNoZTMubWluLFxyXG4gICAgICAgICAgICAgICAgY2FsY3VsU2VydmljZS50cmFuY2hlNC5taW4sXHJcbiAgICAgICAgICAgICAgICBjYWxjdWxTZXJ2aWNlLnRyYW5jaGU1Lm1pblxyXG4gICAgICAgICAgICBdO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VmFsZXVyc0F4ZVkoKSB7XHJcbiAgICAgICAgbGV0IGNhbGN1bFNlcnZpY2UgPSB0aGlzLmNhbGN1bFNlcnZpY2U7XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgICAgIGNhbGN1bFNlcnZpY2UuY2FsY3VsZXJNb250YW50SVIoY2FsY3VsU2VydmljZS50cmFuY2hlMS5taW4pLFxyXG4gICAgICAgICAgICAgICAgY2FsY3VsU2VydmljZS5jYWxjdWxlck1vbnRhbnRJUihjYWxjdWxTZXJ2aWNlLnRyYW5jaGUyLm1pbiksXHJcbiAgICAgICAgICAgICAgICBjYWxjdWxTZXJ2aWNlLmNhbGN1bGVyTW9udGFudElSKGNhbGN1bFNlcnZpY2UudHJhbmNoZTMubWluKSxcclxuICAgICAgICAgICAgICAgIGNhbGN1bFNlcnZpY2UuY2FsY3VsZXJNb250YW50SVIoY2FsY3VsU2VydmljZS50cmFuY2hlNC5taW4pLFxyXG4gICAgICAgICAgICAgICAgY2FsY3VsU2VydmljZS5jYWxjdWxlck1vbnRhbnRJUihjYWxjdWxTZXJ2aWNlLnRyYW5jaGU1Lm1pbilcclxuICAgICAgICAgICAgXTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGdldENvbnRlbnVJbmZvQnVsbGUoKSB7XHJcbiAgICAgICAgbGV0IGNhbGN1bFNlcnZpY2UgPSB0aGlzLmNhbGN1bFNlcnZpY2U7XHJcbiAgICAgICAgbGV0IGFycm9uZGlyID0gdGhpcy5hcnJvbmRpcjtcclxuXHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKGtleSwgeCwgeSwgZSwgZ3JhcGgpIHtcclxuICAgICAgICAgICAgbGV0IHJlbSA9IGtleS5wb2ludFswXTtcclxuICAgICAgICAgICAgbGV0IGlyID0ga2V5LnBvaW50WzFdO1xyXG4gICAgICAgICAgICBsZXQgdHJhbmNoZSA9IGNhbGN1bFNlcnZpY2UuZ2V0VHJhbmNoZUJ5UmVtdW5lcmF0aW9uKHJlbSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gXCI8ZGl2IGNsYXNzPSdpbmZvQnVsbGUgdHJhbmNoZVwiICsgdHJhbmNoZS50YXV4SW1wb3NpdGlvbiArIFwiJz5cIiArXHJcbiAgICAgICAgICAgICAgICBcIlRyYW5jaGUgw6AgXCIgKyB0cmFuY2hlLnRhdXhJbXBvc2l0aW9uICsgXCIlLjxici8+XCIgK1xyXG4gICAgICAgICAgICAgICAgXCJQb3VyIHVuZSByw6ltdW7DqXJhdGlvbiBkZSA8Yj5cIiArIGFycm9uZGlyKHJlbSkgKyBcIjwvYj7igqwsPGJyLz5cIiArXHJcbiAgICAgICAgICAgICAgICBcImxlIG1vbnRhbnQgdG90YWwgZGUgbCdpbXDDtHQgZXN0IDxiPlwiICsgYXJyb25kaXIoaXIpICsgXCI8L2I+4oKsLDxici8+XCIgK1xyXG4gICAgICAgICAgICAgICAgXCJzb2l0IFwiICsgYXJyb25kaXIoY2FsY3VsU2VydmljZS5jYWxjdWxlclBvdXJjZW50YWdlSVIoaXIsIHJlbSkpICsgXCIlIGRlIGxhIHLDqW11bsOpcmF0aW9uLjwvZGl2PlwiO1xyXG5cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGFycm9uZGlyVmFsZXVyc0F4ZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5hcnJvbmRpcjtcclxuICAgIH1cclxufVxyXG5cclxuYXBwLmNvbnRyb2xsZXIoJ0NvdXJiZUNvbnRyb2xsZXInLCBbJ0NhbGN1bFNlcnZpY2UnLCAnbm9tYnJlRW50aWVyRmlsdGVyJywgQ291cmJlQ29udHJvbGxlcl0pOyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmFwcC5maWx0ZXIoJ25vbWJyZUVudGllcicsICgpID0+IHtcclxuXHJcbiAgICAvKipcclxuICAgICAgKiBAcmV0dXJucyBFeGVtcGxlIDogOTk5OTkuOTkgPT4gJzEwMCAwMDAnXHJcbiAgICAgICovXHJcbiAgICByZXR1cm4gKG5vbWJyZUF2ZWNWaXJndWxlcykgPT4ge1xyXG5cclxuICAgICAgICBsZXQgYXJyb25kaSA9ICcnICsgTWF0aC5yb3VuZChub21icmVBdmVjVmlyZ3VsZXMpO1xyXG4gICAgICAgIGxldCByZXN1bHRhdCA9ICcnO1xyXG4gICAgICAgIGxldCBpO1xyXG5cclxuICAgICAgICBsZXQgY29tcHRldXIxMjMgPSAwO1xyXG4gICAgICAgIGZvciAoaSA9IGFycm9uZGkubGVuZ3RoIC0gMTsgaSA+PSAwOyBpIC09IDEpIHtcclxuXHJcbiAgICAgICAgICAgIGlmIChjb21wdGV1cjEyMyA9PT0gMykge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0YXQgPSBhcnJvbmRpW2ldICsgJyAnICsgcmVzdWx0YXQ7XHJcbiAgICAgICAgICAgICAgICBjb21wdGV1cjEyMyA9IDA7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHRhdCA9IGFycm9uZGlbaV0gKyByZXN1bHRhdDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb21wdGV1cjEyMyArPSAxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdGF0O1xyXG4gICAgfVxyXG59KTsiLCIndXNlIHN0cmljdCc7XHJcblxyXG5jbGFzcyBUcmFuY2hle1xyXG4gICAgXHJcbiAgICBjb25zdHJ1Y3RvcihtaW4sIG1heCwgdGF1eEltcG9zaXRpb24pIHtcclxuICAgICAgICB0aGlzLm1pbiA9IG1pbjtcclxuICAgICAgICB0aGlzLm1heCA9IG1heDtcclxuICAgICAgICB0aGlzLnRhdXhJbXBvc2l0aW9uID0gdGF1eEltcG9zaXRpb247XHJcbiAgICB9XHJcbn0gICAgXHJcbiIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmNsYXNzIFRyYW5jaGVJbmNvbm51ZUV4Y2VwdGlvbntcclxuICAgIFxyXG4gICAgY29uc3RydWN0b3IobnVtZXJvVHJhbmNoZSkge1xyXG4gICAgICAgIHRoaXMubWVzc2FnZSA9IFwiVHJhbmNoZSBkJ2ltcG9zaXRpb24gaW5jb25udWVcIjtcclxuICAgICAgICB0aGlzLm51bWVyb1RyYW5jaGUgPSBudW1lcm9UcmFuY2hlO1xyXG4gICAgfVxyXG59Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
