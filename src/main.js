import 'bootstrap.native';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'bootswatch/spacelab/bootstrap.min.css';
import './main.css';
import 'chart.js';
import 'jquery-smooth-scroll';

$(document).ready(function () {
    // On sélectionne toutes les balises avec la classe valant progress dans notre document.
    // On aurait pu choisir progress-bar directement, mais la class progress
    // n'a pas d'importance sans progress-bar. c'est pourquoi nous la supprimons complètement
    var chartElements = $('.progress');

    // Code de couleur pour chaque langage à  représenter dans notre page
    window.chartColors = {
        red: '#FF0000',
        orange: '#FFBF00',
        yellow: '#FFFF00',
        green: '#40FF00',
        blue: '#0040FF',
        purple: '#FF00FF',
        grey: '#A4A4A4'
    };

    // On parcours les éléments du tableau et à chacun on applique la fonction qui transforme
    // le progress-bar en chart
    chartElements.each(function (index) {
        buildDoughnut(chartElements[index], index);
    });

    // Cette fonction prend en paramètre un balise (ou groupe de balises) et la remplace
    // par une balise canvas afin d'en construire un chart. Notez que cette balise doit avoir
    // pour enfant une balise div avec les propriétés d'une progress-bar définies dans
    // bootstrap. ATTENTION, CETTE FONCTION MODIFIE LE DOM DE VOTRE DOCUMENT HTML
    function buildDoughnut(item, index) {
        // On transforme la balise reçue en obket jQuery
        let temp = $(item);

        // On récupère le langage de programmation de la balise courante
        let langage = temp.attr('name');

        // On récupère le niveau contenu dans l'attribut aria-valuenow'
        let niveauLangage = temp.children('div').attr('aria-valuenow');

        // On crée un noeud contenant la balise canvas
        let canvas = $('<canvas id="' + langage + '" height="50" width="50"></canvas>');

        // On remplace la balise reçu en paramètre par une balise canvas
        temp.replaceWith(canvas);

        // Tableau des couleurs pour l'affichage des langages
        let couleur = [
            window.chartColors.yellow,
            window.chartColors.green,
            window.chartColors.red,
            window.chartColors.blue,
            window.chartColors.purple,
            window.chartColors.orange
        ];

        // La configuration de notre chart de type doughnut
        let chartConfig = {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: [
                        niveauLangage,
                        100 - niveauLangage
                    ],
                    backgroundColor: [
                        couleur[index]
                    ],
                    borderWidth: 5
                }],
                labels: [
                    langage,
                    'Restant'
                ]
            },
            options: {
                responsive: true,
                legend: {
                    position: 'bottom'
                },
                animation: {
                    animateScale: true,
                    animateRotate: true
                }
            }
        };

        // Création et affichage de notre chart doughnut dans la page HTML.
        window.Doughnut = new Chart(document.getElementById(langage).getContext('2d'), chartConfig);
    }
});
