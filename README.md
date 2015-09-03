# Freelance Impôt
Simulateur de calcul d'impôt sur le revenu ultra simplifié, pour travailleurs indépendants

## Technologies utilisées
 
* JavaScript
* AngularJS 1.4
* <a href="http://cmaurer.github.io/angularjs-nvd3-directives/index.html">Angularjs-nvd3-directives</a>
* Jasmine
* Bootstrap 3
* HTML 5
* CSS 3
* Docker

## Lancer l'appli avec Docker 

1. Récupérer le Dockerfile
2. Aller dans le répertoire où est situé le Dockerfile
3. Taper "docker build -t freelance-impot ." pour construire l'image du container.
4. Taper "docker run -d -p 80:80 -t freelance-impot" pour démarrer le container.

## Tester l'appli

L'appli est déployée à cette adresse : http://www.freelance-impot.fr