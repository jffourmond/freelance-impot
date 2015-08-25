app.service('calculService', function(){
	
	/* Voir http://www.impots.gouv.fr/portal/dgi/public/popup?espId=1&typePage=cpr02&docOid=documentstandard_6889 */
	var tranche1 = new Tranche(0, 9690, 0);
	var tranche2 = new Tranche(9690, 26764, 14);
	var tranche3 = new Tranche(26764, 71754, 30);
	var tranche4 = new Tranche(71754, 151956, 41);
	var tranche5 = new Tranche(151956, Number.MAX_VALUE, 45);
	var tranches = [tranche1, tranche2, tranche3, tranche4, tranche5];
	
	function isNombre(n){
		return !isNaN(parseFloat(n));
	}
	
	function isNombreEntier(n) {
		var isEntier = isNombre(n) && (n === parseInt(n, 10));
		return isEntier;
	}

	/** 
	 * Renvoie la tranche d'imposition correspondant à l'entier en paramètre. 
	 * @param numeroTranche 1, 2, 3, 4 ou 5
	 * @throws TrancheInconnueException quand le paramètre est différent de 1, 2, 3, 4 ou 5
	 */	
	this.getTranche = function(numeroTranche){
		if (!isNombreEntier(numeroTranche) || numeroTranche < 1 || numeroTranche > 5){
			throw new TrancheInconnueException(numeroTranche);
		}
	
		return tranches[numeroTranche - 1];
	}	
		
	/** 
	 * Calcule le montant des impôts pour une tranche donnée. 
	 * @param remuneration Ex : 100000
	 * @param numeroTranche 1, 2, 3, 4 ou 5
	 * @returns le montant de l'impôt pour la tranche demandée.
	 */
	this.calculerMontantImpotTranche = function(remuneration, numeroTranche){
		if (!isNombre(remuneration) || remuneration < 0){
			throw "Montant invalide";
		}
	
		var tranche = this.getTranche(numeroTranche);
		if (remuneration < tranche.min){
			return 0;
		}
		var plafond = (remuneration > tranche.max) ? tranche.max : remuneration;
		var montantImposablePourCetteTranche = plafond - tranche.min;
		return (montantImposablePourCetteTranche) * tranche.tauxImposition / 100.0;
	}
	
	/** 
	 * Calcule le montant total des impôts en faisant la somme des montants imposés pour chacune des tranches. 
	 * @param remuneration Ex : 100000
	 * @returns le montant de total l'impôt sur le revenu.
	 */
	this.calculerMontantIR = function(remuneration){
		return this.calculerMontantImpotTranche(remuneration, 1) 
		    + this.calculerMontantImpotTranche(remuneration, 2)
			+ this.calculerMontantImpotTranche(remuneration, 3)
			+ this.calculerMontantImpotTranche(remuneration, 4)
			+ this.calculerMontantImpotTranche(remuneration, 5);
	}		
   
   /**
    * Calcule le pourcentage de l'impôt sur le revenu par rapport à la rémnunération.
    * @param montantIR le montant de l'impôt sur le revenu calculé.
    * @param remuneration le montant de la rémunération saisie.
    * @returns le pourcentage calculé. Ex : 33.3333
    */ 
   this.calculerPourcentageIR = function(montantIR, remuneration){
     return montantIR / remuneration * 100;
   }
});