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
	 * @param montantRevenusHT Ex : 100000
	 * @param numeroTranche 1, 2, 3, 4 ou 5
	 * @returns le montant de l'impôt pour la tranche demandée.
	 */
	this.calculMontantTranche = function(montantRevenusHT, numeroTranche){
		if (!isNombre(montantRevenusHT) || montantRevenusHT < 0){
			throw "Montant invalide";
		}
	
		var tranche = this.getTranche(numeroTranche);
		if (montantRevenusHT < tranche.min){
			return 0;
		}
		var plafond = (montantRevenusHT > tranche.max) ? tranche.max : montantRevenusHT;
		var montantImposablePourCetteTranche = plafond - tranche.min;
		return (montantImposablePourCetteTranche) * tranche.tauxImposition / 100.0;
	}
	
	/** 
	 * Calcule le montant total des impôts en faisant la somme des montants imposés pour chacune des tranches. 
	 * @param montantRevenusHT Ex : 100000
	 * @returns le montant de total l'impôt sur le revenu.
	 */
	this.calculerMontantIR = function(montantRevenusHT){
		return this.calculMontantTranche(montantRevenusHT, 1) 
		    + this.calculMontantTranche(montantRevenusHT, 2)
			+ this.calculMontantTranche(montantRevenusHT, 3)
			+ this.calculMontantTranche(montantRevenusHT, 4)
			+ this.calculMontantTranche(montantRevenusHT, 5);
	}		
});