import CalculService from './CalculService';

describe("CalculService", calculServiceSpec);

function calculServiceSpec () {

    let calculService;

    beforeEach(() => {
        calculService = new CalculService();
    });

    it('devrait être initialisé', () => {
        expect(calculService).not.toBe(null);
    });

    describe("getTranche", () => {

        it('devrait lancer une exception quand le paramètre est 0', () => {
            expect(
                () => {
                    calculService.getTranche(0);
                }
            ).toThrow();
        });

        it('devrait lancer une exception quand le paramètre est 6', () => {
            try {
                calculService.getTranche(6);
            } catch (exception) {
                expect(exception.numeroTranche).toBe(6);
            }
        });

        it("devrait lancer une exception quand le paramètre n'est pas entier", () => {
            try {
                calculService.getTranche(4.5);
            } catch (exception) {
                expect(exception.numeroTranche).toBe(4.5);
            }
        });

        it('devrait lancer une exception quand le paramètre est null', () => {
            try {
                expect(() => {
                    calculService.getTranche(null);
                }).toThrow();
            } catch (exception) {
                expect(exception.numeroTranche).toBeNull();
            }
        });

        it('devrait lancer une exception quand le paramètre est undefined', () => {
            expect(() => {
                calculService.getTranche(undefined);
            }).toThrow();
        });

        it('devrait lancer une exception quand le paramètre est une consttre', () => {
            try {
                calculService.getTranche('A');
            } catch (exception) {
                expect(exception.numeroTranche).toBe('A');
            }
        });

        it('devrait renvoyer la tranche 1 quand le paramètre est 1', () => {
            const tranche = calculService.getTranche(1);
            expect(tranche.min).toBe(0);
            expect(tranche.max).toBe(9690);
            expect(tranche.tauxImposition).toBe(0);
        });

        it('devrait renvoyer la tranche 2 quand le paramètre est 2', () => {
            const tranche = calculService.getTranche(2);
            expect(tranche.min).toBe(9690);
            expect(tranche.max).toBe(26764);
            expect(tranche.tauxImposition).toBe(14);
        });

        it('devrait renvoyer la tranche 3 quand le paramètre est 3', () => {
            const tranche = calculService.getTranche(3);
            expect(tranche.min).toBe(26764);
            expect(tranche.max).toBe(71754);
            expect(tranche.tauxImposition).toBe(30);
        });

        it('devrait renvoyer la tranche 4 quand le paramètre est 4', () => {
            const tranche = calculService.getTranche(4);
            expect(tranche.min).toBe(71754);
            expect(tranche.max).toBe(151956);
            expect(tranche.tauxImposition).toBe(41);
        });

        it('devrait renvoyer la tranche 5 quand le paramètre est 5', () => {
            const tranche = calculService.getTranche(5);
            expect(tranche.min).toBe(151956);
            expect(tranche.max).toBe(Number.MAX_VALUE);
            expect(tranche.tauxImposition).toBe(45);
        });
    });

    describe("calculerMontantImpotTranche", () => {

        it('devrait lancer une exception quand le numero de tranche est incorrect', () => {
            try {
                expect(() => {
                    calculService.calculerMontantImpotTranche(0, '?');
                }).toThrow();
            } catch (exception) {
                expect(exception.numeroTranche).toBe(-1);
            }
        });

        it('devrait lancer une exception quand le montant de la rémunération est négatif', () => {
            expect(() => {
                calculService.calculerMontantImpotTranche(-1, 1);
            }).toThrow("Montant invalide");
        });

        it('devrait lancer une exception quand le montant de la rémunération est incorrect', () => {
            expect(() => {
                calculService.calculerMontantImpotTranche('blablabla', 1);
            }).toThrow("Montant invalide");
        });

        it('devrait toujours renvoyer 0 quand le montant de la rémunération est 0', () => {
            expect(calculService.calculerMontantImpotTranche(0, 1)).toBe(0);
            expect(calculService.calculerMontantImpotTranche(0, 2)).toBe(0);
            expect(calculService.calculerMontantImpotTranche(0, 3)).toBe(0);
            expect(calculService.calculerMontantImpotTranche(0, 4)).toBe(0);
            expect(calculService.calculerMontantImpotTranche(0, 5)).toBe(0);
        });

        it('devrait renvoyer 0 quand la rémunération est inférieure au minimum de la tranche', () => {
            expect(calculService.calculerMontantImpotTranche(10000, 2)).not.toBe(0);
            expect(calculService.calculerMontantImpotTranche(10000, 3)).toBe(0);
        });

        it('devrait renvoyer 0 quand la rémunération est égale au minimum de la tranche', () => {
            expect(calculService.calculerMontantImpotTranche(9690, 2)).toBe(0);
            expect(calculService.calculerMontantImpotTranche(26764, 3)).toBe(0);
            expect(calculService.calculerMontantImpotTranche(71754, 4)).toBe(0);
            expect(calculService.calculerMontantImpotTranche(151956, 5)).toBe(0);
        });

        it('devrait renvoyer des montants différents pour chaque tranche avec une rémunération de 200000 euros', () => {
            expect(calculService.calculerMontantImpotTranche(200000, 1)).toBe(0);
            expect(calculService.calculerMontantImpotTranche(200000, 2)).toBe(0.14 * (26764 - 9690));
            expect(calculService.calculerMontantImpotTranche(200000, 3)).toBe(0.3 * (71754 - 26764));
            expect(calculService.calculerMontantImpotTranche(200000, 4)).toBe(0.41 * (151956 - 71754));
            expect(calculService.calculerMontantImpotTranche(200000, 5)).toBe(0.45 * (200000 - 151956));
        });

    });

    describe("calculerMontantIR", () => {

        it('devrait renvoyer 0 quand le montant de la rémunération est égal à 0', () => {
            const montantIR = calculService.calculerMontantIR(0);
            expect(montantIR).toBe(0);
        });

        it('devrait renvoyer 0 quand le montant de la rémunération est compris dans la tranche 1', () => {
            const montantIR = calculService.calculerMontantIR(1000);
            expect(montantIR).toBe(0);
        });

        it('devrait renvoyer 0 quand le montant de la rémunération est égal au max de la tranche 1', () => {
            const montantIR = calculService.calculerMontantIR(9690);
            expect(montantIR).toBe(0);
        });

        it('ne devrait pas renvoyer 0 quand le montant de la rémunération est supérieur au max de la tranche 1', () => {
            const montantIR = calculService.calculerMontantIR(9691);
            expect(montantIR).not.toBe(0);
        });

        it('devrait renvoyer 43.4 quand le montant de la rémunération est égal à 10000', () => {
            const montantIR = calculService.calculerMontantIR(10000);
            expect(montantIR).toBe(43.4);
        });

        it('devrait renvoyer 27468.22 quand le montant de la rémunération est égal à 100000', () => {
            const montantIR = calculService.calculerMontantIR(100000);
            expect(montantIR).toBe(27468.22);
        });

        it('devrait renvoyer 430389.98 quand le montant de la rémunération est égal à 100000', () => {
            const montantIR = calculService.calculerMontantIR(1000000);
            expect(montantIR).toBe(430389.98);
        });

    });

    describe("calculerPourcentageIR", () => {

        it("devrait renvoyer 0 quand le montant de la rémunération est 0", () => {
            expect(calculService.calculerPourcentageIR(10000, 0)).toBe(0);
        });

        it("devrait renvoyer le pourcentage attendu quand les paramètres sont corrects", () => {
            expect(calculService.calculerPourcentageIR(0, 3000)).toBe(0);
            expect(calculService.calculerPourcentageIR(1000, 3000)).toBeCloseTo(33.3333);
            expect(calculService.calculerPourcentageIR(1000, 10000)).toBe(10);
            expect(calculService.calculerPourcentageIR(10000, 10000)).toBe(100);
        });
    });

    describe("getTrancheByRemuneration", () => {

        it("devrait renvoyer la tranche à 0% quand le montant de la rémunération est 0", () => {
            expect(calculService.getTrancheByRemuneration(0).tauxImposition).toBe(0);
        });

        it("devrait renvoyer la tranche à 0% quand le montant de la rémunération est 9690", () => {
            expect(calculService.getTrancheByRemuneration(9690).tauxImposition).toBe(0);
        });

        it("devrait renvoyer la tranche à 14% quand le montant de la rémunération est 9691", () => {
            expect(calculService.getTrancheByRemuneration(9691).tauxImposition).toBe(14);
        });
        it("devrait renvoyer la tranche à 45% quand le montant de la rémunération est 2000000", () => {
            expect(calculService.getTrancheByRemuneration(2000000).tauxImposition).toBe(45);
        });
    });

}