(function () {
    'use strict';
}());

const deadline = '2021-02-21';

import sliderInterval from './js/sliderInterval';
// import sliderClicked from './js/sliderClicked';
// import sliderMoving from './js/sliderMoving';

import modalWindow from './js/modal';
import formSend from './js/formSend';
import specialOffer from './js/specialOffer';
import tabs from './js/tabs';
// import cards from './js/cards';
import caloriesCaclulator from './js/caloriesCaclulator';
import getInitialData from './js/getInitialData';



document.addEventListener('DOMContentLoaded', () => {

    getInitialData();

    tabs();
    caloriesCaclulator();

    sliderInterval();
    
    // sliderClicked();
    // sliderMoving();
    modalWindow();
    formSend();
    specialOffer(deadline);

});

