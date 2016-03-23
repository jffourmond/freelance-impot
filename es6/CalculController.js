'use strict';

class CalculController {
    
    constructor(calculService) {
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

    calculerMontantIR() {
        this.montantImpotTranche1 = this.calculService.calculerMontantImpotTranche(this.remuneration, 1);
        this.montantImpotTranche2 = this.calculService.calculerMontantImpotTranche(this.remuneration, 2);
        this.montantImpotTranche3 = this.calculService.calculerMontantImpotTranche(this.remuneration, 3);
        this.montantImpotTranche4 = this.calculService.calculerMontantImpotTranche(this.remuneration, 4);
        this.montantImpotTranche5 = this.calculService.calculerMontantImpotTranche(this.remuneration, 5);
        this.montantIR = this.calculService.calculerMontantIR(this.remuneration);

        this.pourcentageIR = this.calculService.calculerPourcentageIR(this.montantIR, this.remuneration);
    }
}

CalculController.$inject = ["CalculService"];
app.controller("CalculController", CalculController);

