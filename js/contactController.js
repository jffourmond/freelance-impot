app.controller('ContactCtrl', ['$scope', '$window', function($scope, $window) {

	 $scope.ouvrirFenetreEnvoiEmail = function(){
		$window.open('mailto:' + 'freelance' + '.' + 'impot' + '@' + 'gmail' + '.' + 'com' + '?subject=Freelance Impôt');
    }


}]);

