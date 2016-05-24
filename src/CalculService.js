import Tranche from './Tranche';
import TrancheInconnueException from './TrancheInconnueException';

export default class CalculService {

    constructor(){
        /* Voir http://www.impots.gouv.fr/portal/dgi/public/popup?espId=1&typePage=cpr02&docOid=documentstandard_6889 */
        const tranche1 = new Tranche(0, 9690, 0);
        const tranche2 = new Tranche(9690, 26764, 14);
        const tranche3 = new Tranche(26764, 71754, 30);
        const tranche4 = new Tranche(71754, 151956, 41);
        const tranche5 = new Tranche(151956, Number.MAX_VALUE, 45);
        this.tranches =  [tranche1, tranche2, tranche3, tranche4, tranche5];       
    }


    isNombre(n) {
        return !isNaN(parseFloat(n));
    }

    isNombreEntier(n) {
        const isEntier = this.isNombre(n) && (n === parseInt(n, 10));
        return isEntier;
    }

    /** 
     * Renvoie la tranche d'imposition correspondant à l'entier en paramètre. 
     * @param numeroTranche 1, 2, 3, 4 ou 5
     * @throws TrancheInconnueException quand le paramètre est différent de 1, 2, 3, 4 ou 5
     */
    getTranche (numeroTranche) {
        if ( !this.isNombreEntier(numeroTranche) || numeroTranche < 1 || numeroTranche > 5) {
            throw new TrancheInconnueException(numeroTranche);
        }

        return this.tranches[numeroTranche - 1];
    }

    /** 
     * Calcule le montant des impôts pour une tranche donnée. 
     * @param remuneration Ex : 100000
     * @param numeroTranche 1, 2, 3, 4 ou 5
     * @returns le montant de l'impôt pour la tranche demandée.
     */
    calculerMontantImpotTranche (remuneration, numeroTranche) {
        if ( !this.isNombre(remuneration) || remuneration < 0) {
            throw "Montant invalide";
        }

        const tranche = this.getTranche(numeroTranche);
        if (remuneration < tranche.min) {
            return 0;
        }
        const plafond = (remuneration > tranche.max) ? tranche.max : remuneration;
        const montantImposablePourCetteTranche = plafond - tranche.min;
        return montantImposablePourCetteTranche * tranche.tauxImposition / 100.0;
    }

    /** 
     * Calcule le montant total des impôts en faisant la somme des montants imposés pour chacune des tranches. 
     * @param remuneration Ex : 100000
     * @returns le montant de total l'impôt sur le revenu.
     */
    calculerMontantIR (remuneration) {
        return this.calculerMontantImpotTranche(remuneration, 1) + 
          this.calculerMontantImpotTranche(remuneration, 2) + 
          this.calculerMontantImpotTranche(remuneration, 3) + 
          this.calculerMontantImpotTranche(remuneration, 4) + 
          this.calculerMontantImpotTranche(remuneration, 5);
    }

    /**
     * Calcule le pourcentage de l'impôt sur le revenu par rapport à la rémnunération.
     * @param montantIR le montant de l'impôt sur le revenu calculé.
     * @param remuneration le montant de la rémunération saisie.
     * @returns le pourcentage calculé. Ex : 33.3333
     */
    calculerPourcentageIR (montantIR, remuneration) {
        if (remuneration === 0) {
            return 0;
        }
        return montantIR / remuneration * 100;
    }

    /**
     * Renvoie la tranche correspondant à la rémunération en paramètre.
     */
    getTrancheByRemuneration (remuneration) {
        let i, trancheCourante;
        for (i = 5; i > 0; i -= 1) {
            trancheCourante = this.getTranche(i);
            if (remuneration > trancheCourante.min) {
                return trancheCourante;
            }
        }
        return this.getTranche(1);
    }
}

