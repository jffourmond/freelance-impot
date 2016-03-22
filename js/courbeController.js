'use strict';

app.controller('CourbeCtrl', ['$scope', 'CalculService', 'nombreEntierFilter', function ($scope, calculService, nombreEntierFilter) {

    var montantsImpotsCalcules = [];
    var i;

    /* on met les montants calculés dans un tableau */
    for (i = 0; i <= 160; i += 2) {
        var remuneration = i * 1000;
        console.log("[" + remuneration + "," + calculService.calculerMontantIR(remuneration) + "],");
        montantsImpotsCalcules.push([
            remuneration,
            calculService.calculerMontantIR(remuneration)
        ]);
    }

    $scope.data = [{
        key: "montant IR",
        //values: montantsImpotsCalcules
        values: [
            [0, 0],
            [2000, 0],
            [4000, 0],
            [6000, 0],
            [8000, 0],
            [10000, 43.4],
            [12000, 323.4],
            [14000, 603.4],
            [16000, 883.4],
            [18000, 1163.4],
            [20000, 1443.4],
            [22000, 1723.4],
            [24000, 2003.4],
            [26000, 2283.4],
            [28000, 2761.1600000000003],
            [30000, 3361.16],
            [32000, 3961.16],
            [34000, 4561.16],
            [36000, 5161.16],
            [38000, 5761.16],
            [40000, 6361.16],
            [42000, 6961.16],
            [44000, 7561.16],
            [46000, 8161.16],
            [48000, 8761.16],
            [50000, 9361.16],
            [52000, 9961.16],
            [54000, 10561.16],
            [56000, 11161.16],
            [58000, 11761.16],
            [60000, 12361.16],
            [62000, 12961.16],
            [64000, 13561.16],
            [66000, 14161.16],
            [68000, 14761.16],
            [70000, 15361.16],
            [72000, 15988.220000000001],
            [74000, 16808.22],
            [76000, 17628.22],
            [78000, 18448.22],
            [80000, 19268.22],
            [82000, 20088.22],
            [84000, 20908.22],
            [86000, 21728.22],
            [88000, 22548.22],
            [90000, 23368.22],
            [92000, 24188.22],
            [94000, 25008.22],
            [96000, 25828.22],
            [98000, 26648.22],
            [100000, 27468.22],
            [102000, 28288.22],
            [104000, 29108.22],
            [106000, 29928.22],
            [108000, 30748.22],
            [110000, 31568.22],
            [112000, 32388.22],
            [114000, 33208.22],
            [116000, 34028.22],
            [118000, 34848.22],
            [120000, 35668.22],
            [122000, 36488.22],
            [124000, 37308.22],
            [126000, 38128.22],
            [128000, 38948.22],
            [130000, 39768.22],
            [132000, 40588.22],
            [134000, 41408.22],
            [136000, 42228.22],
            [138000, 43048.22],
            [140000, 43868.22],
            [142000, 44688.22],
            [144000, 45508.22],
            [146000, 46328.22],
            [148000, 47148.22],
            [150000, 47968.22],
            [152000, 48789.98],
            [154000, 49689.98],
            [156000, 50589.98],
            [158000, 51489.98],
            [160000, 52389.98]
        ]
    }];


    $scope.getValeursAxeX = function () {
        return function (d) {
            return [
                $scope.tranche1.min,
                $scope.tranche2.min,
                $scope.tranche3.min,
                $scope.tranche4.min,
                $scope.tranche5.min
            ];
        };
    };

    $scope.getValeursAxeY = function () {
        return function (d) {
            return [
                calculService.calculerMontantIR($scope.tranche1.min),
                calculService.calculerMontantIR($scope.tranche2.min),
                calculService.calculerMontantIR($scope.tranche3.min),
                calculService.calculerMontantIR($scope.tranche4.min),
                calculService.calculerMontantIR($scope.tranche5.min)
            ];
        };
    };

    var arrondir = function (montant) {
        return nombreEntierFilter(montant);
    };

    $scope.arrondirValeursAxe = function () {
        return arrondir;
    };

    $scope.getContenuInfoBulle = function () {
        return function (key, x, y, e, graph) {
            var rem = key.point[0];
            var ir = key.point[1];
            var tranche = calculService.getTrancheByRemuneration(rem);

            return "<div class='infoBulle tranche" + tranche.tauxImposition + "'>" +
                "Tranche à " + tranche.tauxImposition + "%.<br/>" +
                "Pour une rémunération de <b>" + arrondir(rem) + "</b>€,<br/>" +
                "le montant total de l'impôt est <b>" + arrondir(ir) + "</b>€,<br/>" +
                "soit " + arrondir(calculService.calculerPourcentageIR(ir, rem)) + "% de la rémunération.</div>";

        };
    };

}]);