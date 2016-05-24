export default class TrancheInconnueException{
    
    constructor(numeroTranche) {
        this.message = "Tranche d'imposition inconnue";
        this.numeroTranche = numeroTranche;
    }
}