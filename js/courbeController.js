app.controller('CourbeCtrl', ['$scope', 'calculService', function($scope, calculService) {

	var montantsImpotsCalcules = [];

  /* on met les montants calculés dans un tableau */
  for (var i = 0; i <= 160; i++) {
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
  
  $scope.arrondir = function(){
    return function(montant){
      return d3.format('.0f')(montant);
    }
  };
	
}]);