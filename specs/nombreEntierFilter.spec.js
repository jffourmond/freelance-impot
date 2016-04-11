'use strict';

describe("nombreEntierFilter", function () {

    let nombreEntierFilter;

    beforeEach(function () {
        angular.mock.module('freelance-impot');

        angular.mock.inject(function (_nombreEntierFilter_) {
            nombreEntierFilter = _nombreEntierFilter_;
        });
    });

    it('devrait être initialisé', function () {
        expect(nombreEntierFilter).not.toBe(null);
    });

    describe("la fonction de filtrage", function () {

        it('devrait renvoyer des entiers avec des espaces', function () {
            expect(nombreEntierFilter(0.4)).toBe('0');
            expect(nombreEntierFilter(50)).toBe('50');
            expect(nombreEntierFilter(101.1)).toBe('101');
            expect(nombreEntierFilter(999.9)).toBe('1 000');
            expect(nombreEntierFilter(55555.5555)).toBe('55 556');
            expect(nombreEntierFilter(555555.5555)).toBe('555 556');
            expect(nombreEntierFilter(1000000)).toBe('1 000 000');
            expect(nombreEntierFilter(10000000)).toBe('10 000 000');
            expect(nombreEntierFilter(100000000)).toBe('100 000 000');
            expect(nombreEntierFilter(1000000000)).toBe('1 000 000 000');
        });
    });

});