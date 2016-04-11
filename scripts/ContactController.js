'use strict';

export default class ContactController {

    constructor($window) {
        this.$window = $window;
    }

    ouvrirFenetreEnvoiEmail() {
        this.$window.open('mailto:' + 'freelance' + '.' + 'impot' + '@' + 'gmail' + '.' + 'com' + '?subject=Freelance Impôt');
    }
}

