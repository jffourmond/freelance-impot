'use strict';

import ContactController from './ContactController';

describe("ContactController", contactControllerSpec);

function contactControllerSpec() {

    /* Le contrôleur à tester */
    let contactController;

    /* variable de test initialisée lors de l'appel à $window.open */
    let windowOpenParams;

    beforeEach(function() {
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

}