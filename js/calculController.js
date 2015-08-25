app.controller('CalculCtrl', ['$scope', 'calculService', function($scope, calculService) {

	$scope.tranche1 = calculService.getTranche(1);
	$scope.tranche2 = calculService.getTranche(2);
	$scope.tranche3 = calculService.getTranche(3);
	$scope.tranche4 = calculService.getTranche(4);
	$scope.tranche5 = calculService.getTranche(5);

    $scope.remuneration = 0; /* en euros */
	$scope.montantImpotTranche1 = 0;
	$scope.montantImpotTranche2 = 0;
	$scope.montantImpotTranche3 = 0;
	$scope.montantImpotTranche4 = 0;
	$scope.montantImpotTranche5 = 0;
	$scope.montantIR = 0;
	$scope.pourcentageIR = 0; 
	
    $scope.calculerIR = function(){
        
		$scope.montantImpotTranche1 = calculService.calculerMontantImpotTranche($scope.remuneration, 1);
		$scope.montantImpotTranche2 = calculService.calculerMontantImpotTranche($scope.remuneration, 2);
		$scope.montantImpotTranche3 = calculService.calculerMontantImpotTranche($scope.remuneration, 3);
		$scope.montantImpotTranche4 = calculService.calculerMontantImpotTranche($scope.remuneration, 4);
		$scope.montantImpotTranche5 = calculService.calculerMontantImpotTranche($scope.remuneration, 5);
		$scope.montantIR = calculService.calculerMontantIR($scope.remuneration);
		
		$scope.pourcentageIR = $scope.montantIR / $scope.remuneration * 100;
    }
	


}]);