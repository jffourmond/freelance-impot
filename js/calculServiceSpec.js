describe("calculServiceSpec", function() {

	var calculService;

    beforeEach(function() {
		angular.mock.module('app');
		angular.mock.inject(function(_calculService_){
			calculService = _calculService_;
		});
	});

	it('Le calculService devrait être initialisé', function(){
		expect(calculService).not.toBe(null);
	});
	
	describe("getTranche", function() {
	
		it('La fonction getTranche devrait lancer une exception quand le paramètre est 0', function() {	
			expect(
				function(){
					calculService.getTranche(0);
				}).toThrow();
		});	
		
		it('La fonction getTranche devrait lancer une exception quand le paramètre est 6', function() {	
			try{
				calculService.getTranche(6);
			} catch (exception){
				expect(exception.numeroTranche).toBe(6);
			}
		});	
		
		it("La fonction getTranche devrait lancer une exception quand le paramètre n'est pas entier", function() {	
			try{
				calculService.getTranche(4.5);
			} catch (exception){
				expect(exception.numeroTranche).toBe(4.5);
			}
		});			
		
		it('La fonction getTranche devrait lancer une exception quand le paramètre est null', function() {	
			try{
				expect(function(){
					calculService.getTranche(null);
				}).toThrow();
			} catch (exception){
				expect(exception.numeroTranche).toBeNull();
			}
		});		

		it('La fonction getTranche devrait lancer une exception quand le paramètre est undefined', function() {	
			expect(function(){
				calculService.getTranche(undefined);
			}).toThrow();
		});			

		it('La fonction getTranche devrait lancer une exception quand le paramètre est une lettre', function() {	
			try{
				calculService.getTranche('A');
			} catch (exception){
				expect(exception.numeroTranche).toBe('A');
			}
		});			
	
		it('La fonction getTranche devrait renvoyer la tranche 1 quand le paramètre est 1', function() {	
			var tranche = calculService.getTranche(1);
			expect(tranche.min).toBe(0);
			expect(tranche.max).toBe(9690);
			expect(tranche.tauxImposition).toBe(0);
		});		
		
		it('La fonction getTranche devrait renvoyer la tranche 2 quand le paramètre est 2', function() {	
			var tranche = calculService.getTranche(2);
			expect(tranche.min).toBe(9690);
			expect(tranche.max).toBe(26764);
			expect(tranche.tauxImposition).toBe(14);
		});	

		it('La fonction getTranche devrait renvoyer la tranche 3 quand le paramètre est 3', function() {	
			var tranche = calculService.getTranche(3);
			expect(tranche.min).toBe(26764);
			expect(tranche.max).toBe(71754);
			expect(tranche.tauxImposition).toBe(30);
		});			
		
		it('La fonction getTranche devrait renvoyer la tranche 4 quand le paramètre est 4', function() {	
			var tranche = calculService.getTranche(4);
			expect(tranche.min).toBe(71754);
			expect(tranche.max).toBe(151956);
			expect(tranche.tauxImposition).toBe(41);
		});				
		
		it('La fonction getTranche devrait renvoyer la tranche 5 quand le paramètre est 5', function() {	
			var tranche = calculService.getTranche(5);
			expect(tranche.min).toBe(151956);
			expect(tranche.max).toBe(Number.MAX_VALUE);
			expect(tranche.tauxImposition).toBe(45);
		});				
	});	
	
	describe("calculerMontantImpotTranche", function() {
	
		it('La fonction calculerMontantImpotTranche devrait renvoyer 0 quand le montant est égal à 0', function() {
			var montantImpotTranche = calculService.calculerMontantImpotTranche(0, 5);
			expect(montantImpotTranche).toBe(0);
		});	
			
		it('La fonction calculerMontantImpotTranche devrait lancer une exception quand le numero de tranche est incorrect', function() {
			try{
				expect(function(){
					calculService.calculerMontantImpotTranche(0, -1);
				}).toThrow();
			} catch (exception){
				expect(exception.numeroTranche).toBe(-1);
			}
		});			
		
		it('La fonction calculerMontantImpotTranche devrait lancer une exception quand le montant est négatif', function() {
			expect(function(){
				calculService.calculerMontantImpotTranche(-1, 1);
			}).toThrow("Montant invalide");
		});		

		it('La fonction calculerMontantImpotTranche devrait lancer une exception quand le montant est incorrect', function() {
			expect(function(){
				calculService.calculerMontantImpotTranche('blablabla', 1);
			}).toThrow("Montant invalide");
		});			
	});	
	
	describe("calculerMontantIR", function() {
	
		it('La fonction calculerMontantIR devrait renvoyer 0 quand le montant est égal à 0', function() {
			var montantIR = calculService.calculerMontantIR(0);
			expect(montantIR).toBe(0);
		});	

		it('La fonction calculerMontantIR devrait renvoyer 0 quand le montant est compris dans la tranche 1', function() {
			var montantIR = calculService.calculerMontantIR(1000);
			expect(montantIR).toBe(0);
		});
		
		it('La fonction calculerMontantIR devrait renvoyer 0 quand le montant est égal au max de la tranche 1', function() {
			var montantIR = calculService.calculerMontantIR(9690);
			expect(montantIR).toBe(0);
		});	
		
		it('La fonction calculerMontantIR ne devrait pas renvoyer 0 quand le montant est supérieur au max de la tranche 1', function() {
			var montantIR = calculService.calculerMontantIR(9691);
			expect(montantIR).not.toBe(0);
		});		

		it('La fonction calculerMontantIR devrait renvoyer 43.4 quand le montant est égal à 10000', function() {
			var montantIR = calculService.calculerMontantIR(10000);
			expect(montantIR).toBe(43.4);
		});		
		
		it('La fonction calculerMontantIR devrait renvoyer 27468.22 quand le montant est égal à 100000', function() {
			var montantIR = calculService.calculerMontantIR(100000);
			expect(montantIR).toBe(27468.22);
		});		
	
		it('La fonction calculerMontantIR devrait renvoyer 430389.98 quand le montant est égal à 100000', function() {
			var montantIR = calculService.calculerMontantIR(1000000);
			expect(montantIR).toBe(430389.98);
		});		
	});
  
  	describe("calculerPourcentageIR", function() {
	
		it("La fonction calculerPourcentageIR devrait renvoyer 0 quand le montant de l'impôt est 0", function() {
			expect(montantIR).toBe(calculService.calculerMontantIR(0, 0));
		});	
     
		it("La fonction calculerPourcentageIR devrait renvoyer un pourcentage correct", function() {
			expect(calculService.calculerMontantIR(1000, 10000)).toBe(10);
         expect(calculService.calculerMontantIR(1000, 3000)).toBeCloseTo(33.3333);
		});	     
   });
});
