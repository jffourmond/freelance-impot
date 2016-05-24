import ContactController from './ContactController';

describe("ContactController", contactControllerSpec);

function contactControllerSpec() {

    /* Le contrôleur à tester */
    let contactController;

    /* variable de test initialisée lors de l'appel à $window.open */
    let windowOpenParams;

    beforeEach(() => {
        const mockWindow = {
            open: (params) => {
                windowOpenParams = params;
            }
        };

        contactController = new ContactController(mockWindow);
    });

    it('devrait être initialisé', () => {
        expect(contactController).not.toBe(null);
    });

    describe("ouvrirFenetreEnvoiEmail", () => {

        it("devrait ouvrir la fenêtre d'envoi d'email avec les bons paramètres", () => {

            expect(windowOpenParams).toBe(undefined);
            contactController.ouvrirFenetreEnvoiEmail();
            expect(windowOpenParams).toBe('mailto:freelance.impot@gmail.com?subject=Freelance Impôt');
        });

    });

}