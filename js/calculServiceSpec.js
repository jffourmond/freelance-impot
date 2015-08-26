describe("calculServiceSpec", function() {

	var calculService;

    beforeEach(function() {
		angular.mock.module('app');
		angular.mock.inject(function(_calculService_){
			calculService = _calculService_;
		});
	});

	it('devrait être initialisé', function(){
		expect(calculService).not.toBe(null);
	});
	
	describe("getTranche", function() {
	
		it('devrait lancer une exception quand le paramètre est 0', function() {	
			expect(
				function(){
					calculService.getTranche(0);
				}).toThrow();
		});	
		
		it('devrait lancer une exception quand le paramètre est 6', function() {	
			try{
				calculService.getTranche(6);
			} catch (exception){
				expect(exception.numeroTranche).toBe(6);
			}
		});	
		
		it("devrait lancer une exception quand le paramètre n'est pas entier", function() {	
			try{
				calculService.getTranche(4.5);
			} catch (exception){
				expect(exception.numeroTranche).toBe(4.5);
			}
		});			
		
		it('devrait lancer une exception quand le paramètre est null', function() {	
			try{
				expect(function(){
					calculService.getTranche(null);
				}).toThrow();
			} catch (exception){
				expect(exception.numeroTranche).toBeNull();
			}
		});		

		it('devrait lancer une exception quand le paramètre est undefined', function() {	
			expect(function(){
				calculService.getTranche(undefined);
			}).toThrow();
		});			

		it('devrait lancer une exception quand le paramètre est une lettre', function() {	
			try{
				calculService.getTranche('A');
			} catch (exception){
				expect(exception.numeroTranche).toBe('A');
			}
		});			
	
		it('devrait renvoyer la tranche 1 quand le paramètre est 1', function() {	
			var tranche = calculService.getTranche(1);
			expect(tranche.min).toBe(0);
			expect(tranche.max).toBe(9690);
			expect(tranche.tauxImposition).toBe(0);
		});		
		
		it('devrait renvoyer la tranche 2 quand le paramètre est 2', function() {	
			var tranche = calculService.getTranche(2);
			expect(tranche.min).toBe(9690);
			expect(tranche.max).toBe(26764);
			expect(tranche.tauxImposition).toBe(14);
		});	

		it('devrait renvoyer la tranche 3 quand le paramètre est 3', function() {	
			var tranche = calculService.getTranche(3);
			expect(tranche.min).toBe(26764);
			expect(tranche.max).toBe(71754);
			expect(tranche.tauxImposition).toBe(30);
		});			
		
		it('devrait renvoyer la tranche 4 quand le paramètre est 4', function() {	
			var tranche = calculService.getTranche(4);
			expect(tranche.min).toBe(71754);
			expect(tranche.max).toBe(151956);
			expect(tranche.tauxImposition).toBe(41);
		});				
		
		it('devrait renvoyer la tranche 5 quand le paramètre est 5', function() {	
			var tranche = calculService.getTranche(5);
			expect(tranche.min).toBe(151956);
			expect(tranche.max).toBe(Number.MAX_VALUE);
			expect(tranche.tauxImposition).toBe(45);
		});				
	});	
	
	describe("calculerMontantImpotTranche", function() {
	
		it('devrait lancer une exception quand le numero de tranche est incorrect', function() {
			try{
				expect(function(){
					calculService.calculerMontantImpotTranche(0, '?');
				}).toThrow();
			} catch (exception){
				expect(exception.numeroTranche).toBe(-1);
			}
		});			
		
		it('devrait lancer une exception quand le montant de la rémunération est négatif', function() {
			expect(function(){
				calculService.calculerMontantImpotTranche(-1, 1);
			}).toThrow("Montant invalide");
		});		

		it('devrait lancer une exception quand le montant de la rémunération est incorrect', function() {
			expect(function(){
				calculService.calculerMontantImpotTranche('blablabla', 1);
			}).toThrow("Montant invalide");
		});		

		it('devrait toujours renvoyer 0 quand le montant de la rémunération est 0', function() {
			expect(calculService.calculerMontantImpotTranche(0, 1)).toBe(0);
			expect(calculService.calculerMontantImpotTranche(0, 2)).toBe(0);
			expect(calculService.calculerMontantImpotTranche(0, 3)).toBe(0);
			expect(calculService.calculerMontantImpotTranche(0, 4)).toBe(0);
			expect(calculService.calculerMontantImpotTranche(0, 5)).toBe(0);
		});		
			
		it('devrait renvoyer 0 quand la rémunération est inférieure au minimum de la tranche', function() {
			expect(calculService.calculerMontantImpotTranche(10000, 2)).not.toBe(0);
			expect(calculService.calculerMontantImpotTranche(10000, 3)).toBe(0);
		});			
		
		it('devrait renvoyer 0 quand la rémunération est égale au minimum de la tranche', function() {
			expect(calculService.calculerMontantImpotTranche(9690, 2)).toBe(0);
			expect(calculService.calculerMontantImpotTranche(26764, 3)).toBe(0);
			expect(calculService.calculerMontantImpotTranche(71754, 4)).toBe(0);
			expect(calculService.calculerMontantImpotTranche(151956, 5)).toBe(0);
		});			

		it('devrait renvoyer des montants différents pour chaque tranche avec une rémunération de 200000 euros', function() {
			expect(calculService.calculerMontantImpotTranche(200000, 1)).toBe(0);
			expect(calculService.calculerMontantImpotTranche(200000, 2)).toBe(0.14*(26764-9690));
			expect(calculService.calculerMontantImpotTranche(200000, 3)).toBe(0.3*(71754-26764));
			expect(calculService.calculerMontantImpotTranche(200000, 4)).toBe(0.41*(151956-71754));
			expect(calculService.calculerMontantImpotTranche(200000, 5)).toBe(0.45*(200000-151956));
		});			
		
	});	
	
	describe("calculerMontantIR", function() {
	
		it('devrait renvoyer 0 quand le montant de la rémunération est égal à 0', function() {
			var montantIR = calculService.calculerMontantIR(0);
			expect(montantIR).toBe(0);
		});	

		it('devrait renvoyer 0 quand le montant de la rémunération est compris dans la tranche 1', function() {
			var montantIR = calculService.calculerMontantIR(1000);
			expect(montantIR).toBe(0);
		});
		
		it('devrait renvoyer 0 quand le montant de la rémunération est égal au max de la tranche 1', function() {
			var montantIR = calculService.calculerMontantIR(9690);
			expect(montantIR).toBe(0);
		});	
		
		it('ne devrait pas renvoyer 0 quand le montant de la rémunération est supérieur au max de la tranche 1', function() {
			var montantIR = calculService.calculerMontantIR(9691);
			expect(montantIR).not.toBe(0);
		});		

		it('devrait renvoyer 43.4 quand le montant de la rémunération est égal à 10000', function() {
			var montantIR = calculService.calculerMontantIR(10000);
			expect(montantIR).toBe(43.4);
		});		
		
		it('devrait renvoyer 27468.22 quand le montant de la rémunération est égal à 100000', function() {
			var montantIR = calculService.calculerMontantIR(100000);
			expect(montantIR).toBe(27468.22);
		});		
	
		it('devrait renvoyer 430389.98 quand le montant de la rémunération est égal à 100000', function() {
			var montantIR = calculService.calculerMontantIR(1000000);
			expect(montantIR).toBe(430389.98);
		});		
	});
  
  	describe("calculerPourcentageIR", function() {
	
		it("devrait renvoyer 0 quand le montant de la rémunération est 0", function() {
			expect(calculService.calculerPourcentageIR(10000, 0)).toBe(0);
		});	
     
		it("devrait renvoyer le pourcentage attendu quand les paramètres sont corrects", function() {
			expect(calculService.calculerPourcentageIR(0, 3000)).toBe(0);
			expect(calculService.calculerPourcentageIR(1000, 3000)).toBeCloseTo(33.3333);
			expect(calculService.calculerPourcentageIR(1000, 10000)).toBe(10);
			expect(calculService.calculerPourcentageIR(10000, 10000)).toBe(100);
		});	     
   });
  
  describe("getTrancheByRemuneration", function() {
	
		it("devrait renvoyer la tranche à 0% quand le montant de la rémunération est 9690", function() {
			expect(calculService.getTrancheByRemuneration(9690).tauxImposition).toBe(0);
		});	
     
      it("devrait renvoyer la tranche à 14% quand le montant de la rémunération est 9691", function() {
			expect(calculService.getTrancheByRemuneration(9691).tauxImposition).toBe(14);
		});	
      it("devrait renvoyer la tranche à 45% quand le montant de la rémunération est 2000000", function() {
			expect(calculService.getTrancheByRemuneration(2000000).tauxImposition).toBe(45);
		});	    
   });
  
});
