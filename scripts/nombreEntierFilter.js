'use strict';

export default function nombreEntierFilter() {

    /**
      * @returns Exemple : 99999.99 => '100 000'
      */
    return (nombreAvecVirgules) => {

        let arrondi = '' + Math.round(nombreAvecVirgules);
        let resultat = '';
        let i;

        let compteur123 = 0;
        for (i = arrondi.length - 1; i >= 0; i -= 1) {

            if (compteur123 === 3) {
                resultat = arrondi[i] + ' ' + resultat;
                compteur123 = 0;
            } else {
                resultat = arrondi[i] + resultat;
            }
            compteur123 += 1;
        }

        return resultat;
    }
}