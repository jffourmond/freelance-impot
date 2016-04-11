'use strict';

import ContactController from '../scripts/ContactController.js';

describe("ContactController", function() {

    /* Le contrôleur à tester */
    let contactController;

    /* Un mock de l'objet window du navigateur */
    let mockWindow;

    /* variable de test initialisée lors de l'appel à $window.open */
    let windowOpenParams;

    beforeEach(function() {
        angular.mock.module('freelance-impot');

        let mockWindow = {
            open: function(params) {
                windowOpenParams = params;
            }
        };

        contactController = new ContactController(mockWindow);
    });

    it('devrait être initialisé', function() {
        expect(contactController).not.toBe(null);
    });

    describe("ouvrirFenetreEnvoiEmail", function() {

        it("devrait ouvrir la fenêtre d'envoi d'email avec les bons paramètres", function() {

            expect(windowOpenParams).toBe(undefined);
            contactController.ouvrirFenetreEnvoiEmail();
            expect(windowOpenParams).toBe('mailto:freelance.impot@gmail.com?subject=Freelance Impôt');
        });

    });

});