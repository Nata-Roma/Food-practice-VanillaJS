

(function () {
    'use strict';
}());

const tabContent = [
    {
        image: 'img/tabs/vegy.jpg',
        description: 'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Для людей, которые интересуются спортом; активных и здоровых. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    },
    {
        image: 'img/tabs/elite.jpg',
        description: 'Меню “Премиум” - мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    },
    {
        image: 'img/tabs/post.jpg',
        description: 'Наше специальное “Постное меню” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения. Полная гармония с собой и природой в каждом элементе! Все будет Ом!',
    },
    {
        image: 'img/tabs/hamburger.jpg',
        description: 'Меню "Сбалансированное" - это соответствие вашего рациона всем научным рекомендациям. Мы тщательно просчитываем вашу потребность в к/б/ж/у и создаем лучшие блюда для вас.',
    },
];

document.addEventListener('DOMContentLoaded', () => {

    const contentWrapper = document.querySelector('.tabcontent');
    const tabWrapper = document.querySelector('.tabheader__items');
    const tabItems = tabWrapper.querySelectorAll('.tabheader__item');
    const offers = document.querySelectorAll('.offer__slide');
    const currentSlide = document.querySelector('#current');
    const days = document.querySelector('#days');
    const hours = document.querySelector('#hours');
    const minutes = document.querySelector('#minutes');
    const seconds = document.querySelector('#seconds');
    const connectUs = document.querySelector('.btn');
    const modal = document.querySelector('.modal');
    const modalClose = document.querySelector('.modal__close');

    // Tabs, Content, Choise of style
    const handleContentHide = (element) => {
        element.classList.add('hide');
        element.classList.remove('show', 'fade');
    };

    const handleContentShow = (element) => {
        element.classList.add('show', 'fade');
        element.classList.remove('hide');
    };

    const handleTabContent = ({ image, description }, parent) => {
        const imageElem = parent.querySelector('img');
        const descriptionElem = parent.querySelector('.tabcontent__descr');
        handleContentHide(parent);

        imageElem.src = image;
        descriptionElem.textContent = description;
        handleContentShow(parent);
    };

    const handleTabClick = (e) => {
        const target = e.target;
        if (target && target.classList.contains('tabheader__item')) {
            tabItems.forEach((tab) => {
                tab.classList.remove('tabheader__item_active');
            });
            tabItems.forEach((tab, i) => {
                if (target === tab) {
                    target.classList.add('tabheader__item_active');
                    handleTabContent(tabContent[i], contentWrapper);
                }
            });
        }
    };

    // Offers Slider
    const offersHide = () => {
        offers.forEach((offer) => {
            offer.classList.add('hide');
            offer.classList.remove('show', 'fade');
        });
    };

    const offerMove = (i) => {
        offersHide();
        offers[i].classList.add('show', 'fade');
        offers[i].classList.remove('hide');
    };

    const offerSlide = (init) => {
        let offerInterval;
        let i = init;

        offerInterval = setInterval(() => {
            offerMove(i);
            currentSlide.textContent = '0' + (i + 1);
            i++;
            if (i === 4) {
                i = 0;
            }
        }, 3000);
    };

    // Offer Timer
    const offerOn = () => {
        const offerEnd = new Date('2021-02-15');
        const secTimer = () => {
            const sec = new Date();
            const offerLeft = new Date(offerEnd-sec);
            days.textContent = offerLeft.getDate();
            hours.textContent = offerLeft.getHours();
            minutes.textContent = offerLeft.getMinutes();
            seconds.textContent = offerLeft.getSeconds();
            if((offerEnd-sec) === 0) {
                clearInterval(offerTimer);
            }
        };

        const offerTimer = setInterval(secTimer, 1000);
    };

    const modalView = () => {
        console.log('enter');
        if(modal.style.display === 'none') {
            modal.style.display = 'block';
            console.log('enter if');
        }
    }; 

    const handleModalClose = (e) => {
        if(e.target === modal || e.target === modalClose ) {
            modal.style.display = 'none';
        }
    };
    
    
    tabWrapper.addEventListener('click', (e) => handleTabClick(e));
    connectUs.addEventListener('click', modalView);
    modalClose.addEventListener('click', handleModalClose);
    modal.addEventListener('click', (e) => handleModalClose(e));


    handleTabContent(tabContent[0], contentWrapper);
    offersHide();
    offers[0].classList.remove('hide');
    currentSlide.textContent = '01';

    offerSlide(1);
    offerOn();









});