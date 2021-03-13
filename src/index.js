(function () {
    'use strict';
}());

const deadline = '2021-04-22';

import sliderInterval from './js/sliderInterval';
// import sliderClicked from './js/sliderClicked';
// import sliderMoving from './js/sliderMoving';

import modalWindow from './js/modal';
import formSend from './js/formSend';
import specialOffer from './js/specialOffer';
import tabs from './js/tabs';
import caloriesCaclulator from './js/caloriesCaclulator';
import getInitialData from './js/getInitialData';



document.addEventListener('DOMContentLoaded', () => {

    getInitialData({
        cardsContainer: '.menu__field .container',
        url: 'http://localhost:3000/menu',
    });

    tabs({
        contentContainer: '.tabcontent', 
        tabContainer: '.tabheader__items', 
        tabs: '.tabheader__item',
    });
    caloriesCaclulator({
        totalLine: '.calculating__result span',
        buttonGender: '#gender',
        buttonActivity: '#activity',
        inputWeight: '#weight',
        inputHeight: '#height',
        inputAge: '#age',
    });

    sliderInterval({
        totalSlides: '.offer__slide', 
        slideCounter: '#total',
        showingSlide: '#current',
    });
    
    // sliderClicked({
    //     totalSlides: '.offer__slide', 
    //     slideCounter: '#total',
    //     showingSlide: '#current',
    //     sliderPrev: '.offer__slider-prev',
    //     sliderNext: '.offer__slider-next',
    // });
    // sliderMoving({
    //     totalSlides: '.offer__slide', 
    //     slideCounter: '#total',
    //     showingSlide: '#current',
    //     sliderPrev: '.offer__slider-prev',
    //     sliderNext: '.offer__slider-next',
    //     innerContainer: '.offer__slider-inner',
    //     outterContainer: '.offer__slider-wrapper',
    //     sliderOutContainer: '.offer__slider',
    // });
    modalWindow({
        modalBox: '.modal',
    });
    formSend({
        modalBox: '.modal',
        formContainer: 'form',
        modalInner: '.modal__dialog',
    });
    specialOffer({
        deadline,
        offerDays: '#days',
        offerHours: '#hours',
        offerMinutes: '#minutes',
        offerSecunds: '#seconds',
    });

});

