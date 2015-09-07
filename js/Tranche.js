'use strict';

function Tranche(min, max, tauxImposition) {
    return {
        min: min,
        max: max,
        tauxImposition: tauxImposition
    };
}

function TrancheInconnueException(numeroTranche) {
    return {
        message: "Tranche d'imposition inconnue",
        numeroTranche: numeroTranche
    };
}