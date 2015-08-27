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
         calculService.getTranche(1).min, 
         calculService.getTranche(2).min, 
         calculService.getTranche(3).min, 
         calculService.getTranche(4).min, 
         calculService.getTranche(5).min, 
       ];
    }
  };
  
  $scope.getValeursAxeY = function(){
    return function(d){
       return [
         calculService.calculerMontantIR(calculService.getTranche(1).min), 
         calculService.calculerMontantIR(calculService.getTranche(2).min), 
         calculService.calculerMontantIR(calculService.getTranche(3).min), 
         calculService.calculerMontantIR(calculService.getTranche(4).min), 
         calculService.calculerMontantIR(calculService.getTranche(5).min), 
       ];
    }
  };
  
  var arrondir = function(montant){
    return nombreEntierFilter(montant);
  }
  
  $scope.arrondirValeursAxeY = function(){
    return arrondir;
  };
  
	$scope.getContenuInfoBulle = function(){
     return function(key, x, y, e, graph) {
        var rem = arrondir(key.point[0]);
        var ir = arrondir(key.point[1]);
        var tranche = calculService.getTrancheByRemuneration(rem);
       
        return  "<div class='infoBulle tranche" + tranche.tauxImposition + "'>" + 
                "tranche à " + tranche.tauxImposition + "%<br/>" + 
          		 "rémunération : " + rem + "€<br/>" +
   				 "montant total de l'impôt : " + ir + "€<br/>" +
          		 "taux d'imposition global : " + arrondir(calculService.calculerPourcentageIR(ir, rem)) + "%</div>";
       
     }
  }  
  
	
}]);