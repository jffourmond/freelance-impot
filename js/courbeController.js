app.controller('CourbeCtrl', ['$scope', 'calculService', 'nombreEntierFilter', function($scope, calculService, nombreEntierFilter) {
 
  var montantsImpotsCalcules = [];

  /* on met les montants calculés dans un tableau */
  for (var i = 0; i <= 160; i+=2) {
    var remuneration = i*1000;
    montantsImpotsCalcules.push([
      remuneration, 
      calculService.calculerMontantIR(remuneration)
    ]);
  }
  
  
  $scope.data = [
    {
      "key": "montant IR",
      "values": montantsImpotsCalcules
    }
   ] ;
 	
  
  $scope.getValeursAxeX = function(){
    return function(d){
       return [
         $scope.tranche1.min, 
         $scope.tranche2.min, 
         $scope.tranche3.min, 
         $scope.tranche4.min, 
         $scope.tranche5.min, 
       ];
    }
  };
  
  $scope.getValeursAxeY = function(){
    return function(d){
       return [
         calculService.calculerMontantIR($scope.tranche1.min), 
         calculService.calculerMontantIR($scope.tranche2.min), 
         calculService.calculerMontantIR($scope.tranche3.min), 
         calculService.calculerMontantIR($scope.tranche4.min), 
         calculService.calculerMontantIR($scope.tranche5.min), 
       ];
    }
  };
  
  var arrondir = function(montant){
    return nombreEntierFilter(montant);
  }
  
  $scope.arrondirValeursAxe = function(){
    return arrondir;
  };
  
	$scope.getContenuInfoBulle = function(){
     return function(key, x, y, e, graph) {
        var rem = key.point[0];
        var ir = key.point[1];
        var tranche = calculService.getTrancheByRemuneration(rem);
       
        return  "<div class='infoBulle tranche" + tranche.tauxImposition + "'>" + 
                "Tranche à " + tranche.tauxImposition + "%.<br/>" + 
          		 "Pour une rémunération de <b>" + arrondir(rem) + "</b>€,<br/>" +
   				 "le montant total de l'impôt est <b>" + arrondir(ir) + "</b>€,<br/>" +
          		 "soit " + arrondir(calculService.calculerPourcentageIR(ir, rem)) + "% de la rémunération.</div>";
       
     }
  }  
  
	
}]);