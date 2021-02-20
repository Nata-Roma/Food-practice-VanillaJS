(function () {
    'use strict';
}());

const deadline = '2021-02-21';

    


document.addEventListener('DOMContentLoaded', () => {
    const cards = require('./js/cards');
    require('./js/tabs')();
    // require('./js/sliderInterval')(); //Infinite slider
    // require('./js/sliderClicked')();    //Clicked slider
    require('./js/sliderMoving')();     //Moving slider
    const specialOffer = require('./js/specialOffer');
    require('./js/caloriesCaclulator')();
    require('./js/modal')();
    require('./js/formSend')();

    const getDataFromServer = async (url) => {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Could not fetch ${url}, status: ${response.status}`);
        }

        return await response.json();
    };

    getDataFromServer('http://localhost:3000/menu')
        .then((data) => {
            const cardContent = [...data];
            console.log(data);
            cards(cardContent);
        }).catch((err) => {
            console.error('Card content could not be downloaded ', err);
        });

    specialOffer(deadline);

});

