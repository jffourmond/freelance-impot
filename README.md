# Freelance Impôt
Simulateur de calcul d'impôt sur le revenu ultra simplifié, pour travailleurs indépendants

## Technologies utilisées
 
* ECMAScript 2015 (ES6)
* AngularJS 1.5
* <a href="http://cmaurer.github.io/angularjs-nvd3-directives/index.html">Angularjs-nvd3-directives</a>
* Jasmine
* Bootstrap 3
* HTML 5
* CSS 3
* npm + browserify + babelify
* Docker

## Lancer l'appli avec Docker 

1. `git clone https://github.com/jffourmond/freelance-impot.git`
2. `cd freelance-impot`
3. Taper `docker build -t freelance-impot .` pour construire l'image du container.
4. Taper `docker run -d -p 80:80 --name freelance-impot -t freelance-impot` pour démarrer le container.

## Tester l'appli

L'appli est déployée à cette adresse : http://www.freelance-impot.fr
