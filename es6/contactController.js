'use strict';

class ContactController {

    constructor($scope, $window) {
        this.$scope = $scope;
        this.$window = $window;
    }

    ouvrirFenetreEnvoiEmail() {
        this.$window.open('mailto:' + 'freelance' + '.' + 'impot' + '@' + 'gmail' + '.' + 'com' + '?subject=Freelance Impôt');
    }
}

app.controller("ContactController", ContactController);