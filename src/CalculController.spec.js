'use strict';

import CalculService from './CalculService';
import CalculController from './CalculController';

describe("CalculController", calculControllerSpec);

function calculControllerSpec() {

    /* Le contrôleur à tester */
    let ctrl;

    beforeEach(function () {
        let calculService = new CalculService();
        ctrl = new CalculController(calculService);
    });

    it('devrait être initialisé', function () {
        expect(ctrl).not.toBe(null);
        expect(ctrl.remuneration).toBe(0);
    });

    it('devrait récupérer toutes les tranches', function () {
        expect(ctrl.tranche1.tauxImposition).toBe(0);
        expect(ctrl.tranche2.tauxImposition).toBe(14);
        expect(ctrl.tranche3.tauxImposition).toBe(30);
        expect(ctrl.tranche4.tauxImposition).toBe(41);
        expect(ctrl.tranche5.tauxImposition).toBe(45);
    });

    describe("calculerMontantIR", function () {

        it('devrait initialiser toutes les variables à 0 pour une rémunération de 0€', function () {

            ctrl.remuneration = 0;
            ctrl.calculerMontantIR();

            expect(ctrl.montantImpotTranche1).toBe(0);
            expect(ctrl.montantImpotTranche2).toBe(0);
            expect(ctrl.montantImpotTranche3).toBe(0);
            expect(ctrl.montantImpotTranche4).toBe(0);
            expect(ctrl.montantImpotTranche5).toBe(0);
            expect(ctrl.montantIR).toBe(0);
            expect(ctrl.pourcentageIR).toBeCloseTo(0);
        });

        it('devrait calculer les bonnes valeurs pour toutes les variables du CalculController', function () {

            ctrl.remuneration = 200000;
            ctrl.calculerMontantIR();

            expect(ctrl.montantImpotTranche1).toBe(0);
            expect(ctrl.montantImpotTranche2).toBe(2390.36);
            expect(ctrl.montantImpotTranche3).toBe(13497);
            expect(ctrl.montantImpotTranche4).toBe(32882.82);
            expect(ctrl.montantImpotTranche5).toBe(21619.8);
            expect(ctrl.montantIR).toBe(
                ctrl.montantImpotTranche1 +
                ctrl.montantImpotTranche2 +
                ctrl.montantImpotTranche3 +
                ctrl.montantImpotTranche4 +
                ctrl.montantImpotTranche5
            );
            expect(ctrl.pourcentageIR).toBeCloseTo(35.19);
        });

    });

}