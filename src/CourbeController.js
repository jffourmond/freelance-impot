'use strict';

export default class CourbeController {

    constructor(calculService, nombreEntierFilter) {
        this.calculService = calculService;
        this.nombreEntierFilter = nombreEntierFilter;
        this.arrondir = function(montant) {
            return nombreEntierFilter(montant);
        };

        this.initCourbe();
    }

    initCourbe() {
        let montantsImpotsCalcules = [];
        let i;
        /* on met les montants calculés dans un tableau */
        for (i = 0; i <= 160; i += 2) {
            let remuneration = i * 1000;
            montantsImpotsCalcules.push([
                remuneration,
                this.calculService.calculerMontantIR(remuneration)
            ]);
        }

        this.data = [{
            key: "montant IR",
            values: montantsImpotsCalcules
        }];
    }

    getValeursAxeX() {
        let calculService = this.calculService;
        return () => [
            calculService.getTranche(1).min,
            calculService.getTranche(2).min,
            calculService.getTranche(3).min,
            calculService.getTranche(4).min,
            calculService.getTranche(5).min
        ];
    }

    getValeursAxeY() {
        let calculService = this.calculService;
        return () => [
            calculService.calculerMontantIR(calculService.getTranche(1).min),
            calculService.calculerMontantIR(calculService.getTranche(2).min),
            calculService.calculerMontantIR(calculService.getTranche(3).min),
            calculService.calculerMontantIR(calculService.getTranche(4).min),
            calculService.calculerMontantIR(calculService.getTranche(5).min)
        ];
    }

    getContenuInfoBulle() {
        let calculService = this.calculService;
        let arrondir = this.arrondir;

        return function(key) {
            let rem = key.point[0];
            let ir = key.point[1];
            let tranche = calculService.getTrancheByRemuneration(rem);

            return "<div class='infoBulle tranche" + tranche.tauxImposition + "'>" +
                "Tranche à " + tranche.tauxImposition + "%.<br/>" +
                "Pour une rémunération de <b>" + arrondir(rem) + "</b>€,<br/>" +
                "le montant total de l'impôt est <b>" + arrondir(ir) + "</b>€,<br/>" +
                "soit " + arrondir(calculService.calculerPourcentageIR(ir, rem)) + "% de la rémunération.</div>";

        };
    }

    arrondirValeursAxe() {
        return this.arrondir;
    }
}

