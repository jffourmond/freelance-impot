'use strict';

describe("ContactCtrl", function () {

    /* La fonction de création du contrôleur */
    var createControllerFunction;

    /* Le contrôleur à tester */
    var contactController;

    /* Le scope de test associé au contrôleur */
    var scope;

    /* Un mock de l'objet window du navigateur */
    var mockWindow;

    /* Variable de test initialisée lors de l'appel à $window.open */
    var windowOpenParams;

    beforeEach(function () {
        angular.mock.module('app');

        angular.mock.inject(function ($rootScope, $controller) {
            scope = $rootScope.$new();
            mockWindow = {
                open: function (params) {
                    windowOpenParams = params;
                }
            };
            createControllerFunction = function () {
                return $controller('ContactCtrl', {
                    $scope: scope,
                    $window: mockWindow
                });
            };
        });

        contactController = createControllerFunction();
    });

    it('devrait être initialisé', function () {
        expect(contactController).not.toBe(null);
    });

    describe("ouvrirFenetreEnvoiEmail", function () {

        it("devrait ouvrir la fenêtre d'envoi d'email avec les bons paramètres", function () {

            expect(windowOpenParams).toBe(undefined);
            scope.ouvrirFenetreEnvoiEmail();
            expect(windowOpenParams).toBe('mailto:freelance.impot@gmail.com?subject=Freelance Impôt');
        });

    });

});