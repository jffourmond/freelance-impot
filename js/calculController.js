app.controller('CalculCtrl', ['$scope', 'calculService', function($scope, calculService) {

	$scope.tranche1 = calculService.getTranche(1);
	$scope.tranche2 = calculService.getTranche(2);
	$scope.tranche3 = calculService.getTranche(3);
	$scope.tranche4 = calculService.getTranche(4);
	$scope.tranche5 = calculService.getTranche(5);

    $scope.revenusHT = 0; /* en euros */
	$scope.montantTranche1 = 0;
	$scope.montantTranche2 = 0;
	$scope.montantTranche3 = 0;
	$scope.montantTranche4 = 0;
	$scope.montantTranche5 = 0;
	$scope.montantIR = 0;
	$scope.pourcentageIR = 0; 
	
    $scope.calculerIR = function(){
        
		$scope.montantTranche1 = calculService.calculMontantTranche($scope.revenusHT, 1);
		$scope.montantTranche2 = calculService.calculMontantTranche($scope.revenusHT, 2);
		$scope.montantTranche3 = calculService.calculMontantTranche($scope.revenusHT, 3);
		$scope.montantTranche4 = calculService.calculMontantTranche($scope.revenusHT, 4);
		$scope.montantTranche5 = calculService.calculMontantTranche($scope.revenusHT, 5);
		$scope.montantIR = calculService.calculerMontantIR($scope.revenusHT);
		
		$scope.pourcentageIR = $scope.montantIR / $scope.revenusHT * 100;
    }
	


}]);