describe("CalculCtrl", function() {

   /* La fonction de création du contrôleur */
	var createControllerFunction;

   /* Le contrôleur à tester */
  	var calculController;
  
   /* Le scope de test associé au contrôleur */
	var scope;
  
    beforeEach(function() {
		angular.mock.module('app');

		angular.mock.inject(function($rootScope, $controller){
			 scope = $rootScope.$new();
          createControllerFunction = function(){
          	return $controller('CalculCtrl', {'$scope' : scope}); 
          }
		});
      
      calculController = createControllerFunction();
	});

	it('devrait être initialisé', function(){
		expect(calculController).not.toBe(null);
      expect(scope.remuneration).toBe(0)
	});
  
	it('devrait récupérer toutes les tranches', function(){
		 expect(scope.tranche1.tauxImposition).toBe(0);
       expect(scope.tranche2.tauxImposition).toBe(14);
       expect(scope.tranche3.tauxImposition).toBe(30);
       expect(scope.tranche4.tauxImposition).toBe(41);
       expect(scope.tranche5.tauxImposition).toBe(45);
	});  
	
	describe("calculerMontantIR", function() {
	
		it('devrait initialiser toutes les variables à 0 pour une rémunération de 0€', function() {	
        
         scope.remuneration = 0;
			scope.calculerMontantIR();

         expect(scope.montantImpotTranche1).toBe(0);
         expect(scope.montantImpotTranche2).toBe(0);
         expect(scope.montantImpotTranche3).toBe(0);
         expect(scope.montantImpotTranche4).toBe(0);
         expect(scope.montantImpotTranche5).toBe(0);
         expect(scope.montantIR).toBe(0);
         expect(scope.pourcentageIR).toBeCloseTo(0);
		});	     
     
		it('devrait calculer les bonnes valeurs pour toutes les variables du scope', function() {	
        
         scope.remuneration = 200000;
			scope.calculerMontantIR();

         expect(scope.montantImpotTranche1).toBe(0);
         expect(scope.montantImpotTranche2).toBe(2390.36);
         expect(scope.montantImpotTranche3).toBe(13497);
         expect(scope.montantImpotTranche4).toBe(32882.82);
         expect(scope.montantImpotTranche5).toBe(21619.8);
         expect(scope.montantIR).toBe(
           scope.montantImpotTranche1 +
           scope.montantImpotTranche2 +
           scope.montantImpotTranche3 +
           scope.montantImpotTranche4 + 
           scope.montantImpotTranche5);
         expect(scope.pourcentageIR).toBeCloseTo(35.19);
		});	
						
	});
  
});
