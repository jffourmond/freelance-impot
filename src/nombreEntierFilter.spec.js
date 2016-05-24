import nombreEntierFilter from './nombreEntierFilter';

describe("nombreEntierFilter", nombreEntierFilterSpec);

function nombreEntierFilterSpec() {

    let filter;

    beforeEach(() => {
        filter = nombreEntierFilter();
    });

    it('devrait être initialisé', () => {
        expect(nombreEntierFilter).not.toBe(null);
    });

    describe("la fonction de filtrage", () => {

        it('devrait renvoyer des entiers avec des espaces', () => {
            expect(filter(0.4)).toBe('0');
            expect(filter(50)).toBe('50');
            expect(filter(101.1)).toBe('101');
            expect(filter(999.9)).toBe('1 000');
            expect(filter(55555.5555)).toBe('55 556');
            expect(filter(555555.5555)).toBe('555 556');
            expect(filter(1000000)).toBe('1 000 000');
            expect(filter(10000000)).toBe('10 000 000');
            expect(filter(100000000)).toBe('100 000 000');
            expect(filter(1000000000)).toBe('1 000 000 000');
        });
    });

}