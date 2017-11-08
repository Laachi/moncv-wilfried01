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
    const chartElements = Array.from(document.getElementsByClassName('progress'));

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

    /*
    function getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    */
    // On récupère la liste de toutes les valeurs pour les langages
    const listValues = chartElements.map(item => parseInt(item.firstElementChild.getAttribute('aria-valuenow'), 10));
    /*
    let listValues = new Array(6);

    for (let i = 0; i < listValues.length; ++i) {
        listValues[i] = getRandomIntInclusive(20, 100);
    }
    */

    const TOTAL = listValues.reduce((sum, value) => sum + value, 0);

    // On récupère le nom de tous les langages dans les progress bar
    const listNames = chartElements.map(item => item.getAttribute('name'));

    // On crée un canvas qui contiendra le doughnut
    const canvas = $('<canvas id="' + 'progression' + '"></canvas>');

    // On la remplace par la balise canvas.
    $('#langages').replaceWith(canvas);

    const couleur = [
        window.chartColors.yellow,
        window.chartColors.green,
        window.chartColors.red,
        window.chartColors.blue,
        window.chartColors.purple,
        window.chartColors.orange
    ];

    const data = {
        datasets: [{
            data: [
                listValues[0] * 100 / TOTAL,
                listValues[1] * 100 / TOTAL,
                listValues[2] * 100 / TOTAL,
                listValues[3] * 100 / TOTAL,
                listValues[4] * 100 / TOTAL,
                listValues[5] * 100 / TOTAL
            ],
            backgroundColor: [
                couleur[0],
                couleur[1],
                couleur[2],
                couleur[3],
                couleur[4],
                couleur[5]
            ],
            borderWidth: 3
        }],
        labels: [
            listNames[0],
            listNames[1],
            listNames[2],
            listNames[3],
            listNames[4],
            listNames[5]
        ]
    };

    const options = {
        responsive: true,
        legend: {
            position: 'bottom'
        },
        animation: {
            animateScale: true,
            animateRotate: true
        },
        cutoutPercentage: 65
    };

    const chartConfig = {
        type: 'doughnut',
        data,
        options
    };

    window.Doughnut = new Chart(document.getElementById('progression').getContext('2d'), chartConfig);
});
