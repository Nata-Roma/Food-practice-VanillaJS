/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
(function () {
    'use strict';
}());

const tabContent = [
    {
        image: 'src/img/tabs/vegy.jpg',
        description: 'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Для людей, которые интересуются спортом; активных и здоровых. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    },
    {
        image: 'src/img/tabs/elite.jpg',
        description: 'Меню “Премиум” - мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    },
    {
        image: 'src/img/tabs/post.jpg',
        description: 'Наше специальное “Постное меню” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения. Полная гармония с собой и природой в каждом элементе! Все будет Ом!',
    },
    {
        image: 'src/img/tabs/hamburger.jpg',
        description: 'Меню "Сбалансированное" - это соответствие вашего рациона всем научным рекомендациям. Мы тщательно просчитываем вашу потребность в к/б/ж/у и создаем лучшие блюда для вас.',
    },
];

// const cardContent = [
//     {
//         title: 'Фитнес',
//         image: 'img/tabs/vegy.jpg',
//         alt: 'vegy',
//         description: 'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
//         price: 8.50,
//     },
//     {
//         title: 'Премиум',
//         image: 'img/tabs/elite.jpg',
//         alt: 'elite',
//         description: 'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
//         price: 20,
//     },
//     {
//         title: 'Постное',
//         image: 'img/tabs/post.jpg',
//         alt: 'post',
//         description: 'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
//         price: 16,
//     },
// ];

const deadline = '2021-02-20';

const statusMessage = {
    loading: '/src/img/form/spinner.svg',
    success: 'Thank you! We will connect to you soon',
    failure: 'Something goes wrong',
};

document.addEventListener('DOMContentLoaded', () => {

    const contentWrapper = document.querySelectorAll('.tabcontent');
    const tabWrapper = document.querySelector('.tabheader__items');
    const tabItems = tabWrapper.querySelectorAll('.tabheader__item');
    const sliderContainer = document.querySelector('.offer__slider');
    const slideWrapper = document.querySelector('.offer__slider-wrapper');
    const slideInner = document.querySelector('.offer__slider-inner');
    const slides = document.querySelectorAll('.offer__slide');
    const currentSlide = document.querySelector('#current');
    const totalSlide = document.querySelector('#total');
    const buttonLeft = document.querySelector('.offer__slider-prev');
    const buttonRight = document.querySelector('.offer__slider-next');
    const forms = document.querySelectorAll('form');
    const connectUs = document.querySelectorAll('[data-modal]');
    const modal = document.querySelector('.modal');
    const cardContainer = document.querySelector('.menu__field .container');

    // Cards rendering
    class CardRender {
        constructor({ title, image, alt, description, price }, parent) {
            this.title = title;
            this.image = image;
            this.alt = alt;
            this.description = description;
            this.price = price;
            this.parent = parent;
            this.currencyRate = 27;
            this.changeCurrency();
        }
        changeCurrency() {
            this.price = Math.floor((this.currencyRate * this.price));
        }
        cardRender() {
            const element = document.createElement('div');
            element.classList.add("menu__item");

            element.innerHTML = `
                    <img src=${this.image} alt=${this.alt}}>
                    <h3 class="menu__item-subtitle">Меню "${this.title}"</h3>
                    <div class="menu__item-descr">${this.description}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
            `;
            this.parent.append(element);
        }
    }

    const cardRenderBlock = (cardContent) => {

        for (let i = 0; i < 3; i++) {
            new CardRender(cardContent[i], cardContainer).cardRender();
        }
    };


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
                    contentWrapper.forEach((item) => {
                        handleContentHide(item);
                    });
                    handleTabContent(tabContent[i], contentWrapper[i]);
                }
            });
        }
    };

    // slides Slider
    const sliderCount = (i) => {
        if (i + 1 >= 10) {
            currentSlide.textContent = i + 1;
        } else {
            currentSlide.textContent = '0' + (i + 1);
        }
    };

    const slideHide = () => {
        slides.forEach((offer) => {
            offer.classList.add('hide');
            offer.classList.remove('show', 'fade');
        });
    };

    const slideShow = (i) => {
        slideHide();
        slides[i].classList.add('show', 'fade');
        slides[i].classList.remove('hide');
    };

    const dotShow = (i, dots) => {
        dots.forEach((dot) => {
            dot.style.opacity = 0.5;
        });
        dots[i].style.opacity = 1;
    };

    const sliderMoveRight = (i, theme, dots) => {
        if (i >= slides.length - 1) {
            i = 0;
        } else {
            i++;
        }

        if (theme === 'click') {
            slideShow(i);
        } else if (theme === 'move') {
            dotShow(i, dots);
        }
        sliderCount(i);
        return i;
    };

    const sliderMoveLeft = (i, theme, dots) => {
        if (!i) {
            i = slides.length - 1;
        } else {
            i--;
        }
        if (theme === 'click') {
            slideShow(i);
        } else if (theme === 'move') {
            dotShow(i, dots);
        }
        sliderCount(i);
        return i;
    };

    const dotClick = (currentDot, element) => {
        dotShow(currentDot, element);
        sliderCount(currentDot);
        return currentDot;
    };

    const IntervalSlider = (init) => {
        slideHide();
        let i = init;
        slides[i].classList.remove('hide');
        // totalSlide.textContent = '0' + slides.length;

        setInterval(() => {
            i = sliderMoveRight(i, 'click');
        }, 3000);
    };

    const clickedSlider = (init) => {
        slideHide();
        let i = init;
        slides[i].classList.remove('hide');
        // totalSlide.textContent = '0' + slides.length;

        buttonLeft.addEventListener('click', () => {
            i = sliderMoveLeft(i, 'click');
        });
        buttonRight.addEventListener('click', () => {
            i = sliderMoveRight(i, 'click');
        });
    };

    const movingSlider = (init) => {

        sliderContainer.style.position = 'relative';
        const dotsContainer = document.createElement('div');
        dotsContainer.classList.add('carousel-indicators');
        for (let j = 0; j < slides.length; j++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            dot.dataset.slide = j;
            dotsContainer.append(dot);
        }
        sliderContainer.append(dotsContainer);
        const dots = document.querySelectorAll('.dot');

        let index = init;
        dots[index].style.opacity = 1;

        let width = window.getComputedStyle(slideWrapper).width;
        width = +width.replace(/\D/g, '');
        // width = +width.slice(0, width.length - 2);

        slides.forEach((slide) => {
            slide.style.width = width + 'px';
        });
        slideInner.style.cssText = `display: flex; width: ${width * slides.length}%; transition: 0.5s all ease`;
        slideWrapper.style.overflow = 'hidden';
        buttonLeft.addEventListener('click', () => {
            index = sliderMoveLeft(index, 'move', dots);
            slideInner.style.transform = `translateX(-${width * index}px)`;
        });
        buttonRight.addEventListener('click', () => {
            index = sliderMoveRight(index, 'move', dots);
            slideInner.style.transform = `translateX(-${width * index}px)`;
        });
        dots.forEach((dot) => {
            dot.addEventListener('click', () => {
                const dotNumber = +dot.dataset.slide;
                index = dotClick(dotNumber, dots);
                slideInner.style.transform = `translateX(-${width * index}px)`;
            });
            
        });
    };

    // Offer Timer
    const getTime = (offerEnd) => {
        const currentTime = new Date();
        const offerLeft = new Date(offerEnd - currentTime);
        const daysLeft = offerLeft.getDate();
        const hoursLeft = offerLeft.getHours();
        const minutesLeft = offerLeft.getMinutes();
        const secondsLeft = offerLeft.getSeconds();

        return {
            currentTime,
            daysLeft,
            hoursLeft,
            minutesLeft,
            secondsLeft,
        };
    };

    const timerNumbers = (num) => {
        if (num >= 10) {
            return num;
        }
        return `0${num}`;
    };

    const offerOn = (offerDeadline) => {
        const offerEnd = new Date(offerDeadline);
        const days = document.querySelector('#days');
        const hours = document.querySelector('#hours');
        const minutes = document.querySelector('#minutes');
        const seconds = document.querySelector('#seconds');
        let offerTimer;

        const secTimer = () => {
            const { currentTime, daysLeft, hoursLeft, minutesLeft, secondsLeft } = getTime(offerEnd);

            days.textContent = timerNumbers(daysLeft);
            hours.textContent = timerNumbers(hoursLeft);
            minutes.textContent = timerNumbers(minutesLeft);
            seconds.textContent = timerNumbers(secondsLeft);

            if ((offerEnd - currentTime) <= 0) {
                clearInterval(offerTimer);
            }
        };

        if (new Date(offerDeadline) - new Date() > 0) {
            secTimer();
            offerTimer = setInterval(secTimer, 1000);
        } else {
            days.textContent = '--';
            hours.textContent = '--';
            minutes.textContent = '--';
            seconds.textContent = '--';
        }
    };


    // inputs fields and modal
    const modalView = () => {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        // clearTimeout(modalTimeout);
    };

    const restorePagefromModal = () => {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    };

    const handleModalClose = (e) => {
        if (e.target === modal || e.target.hasAttribute('data-close') || e.key === 'Escape' || e.key === 'Esc') {
            restorePagefromModal();
        }
    };

    // Forms submit

    // const postData = (form) => {
    //     const showSendResponse = (message) => {
    //         const modalDialog = document.querySelector('.modal__dialog');
    //         modalDialog.classList.add('hide');
    //         const thanksDialog = document.createElement('div');
    //         thanksDialog.classList.add('modal__dialog');
    //         thanksDialog.innerHTML = `
    //             <div class="modal__content">
    //                 <div class="modal__close" data-close>&times;</div>
    //                 <div class="modal__title">${message}</div>
    //             </div>
    //         `;
    //         modal.append(thanksDialog);
    //         setTimeout(() => {
    //             thanksDialog.remove();
    //             modalDialog.classList.remove('hide');
    //             restorePagefromModal();
    //         }, 4000);
    //     };

    //     form.addEventListener('submit', (e) => {
    //         e.preventDefault();
    //         const warningMessage = document.createElement('img');
    //         warningMessage.src = statusMessage.loading;
    //         warningMessage.style.cssText = `
    //             display: block;
    //             margin: 0 auto;
    //         `;
    //         form.insertAdjacentElement('afterend', warningMessage);

    //         // create XMLHttpRequest for POST form's data
    //         const request = new XMLHttpRequest();
    //         request.open('POST', '/server.php');

    //         // !!! Do not declare Headers if FormData using
    //         // request.setRequestHeader('Content-type', 'multipart/form-data');

    //         // !!! Use it for json formats
    //         request.setRequestHeader('Content-type', 'application/json');

    //         const formData = new FormData(form);
    //         const toJsonObject = {};

    //         formData.forEach((value, key) => {
    //             toJsonObject[key] = value;
    //         });

    //         // use it if not JSON format
    //         // request.send(formData);

    //         request.send(JSON.stringify(toJsonObject));

    //         request.addEventListener('load', () => {
    //             warningMessage.innerHTML = '';
    //             if(request.status === 200) {
    //                 modalView();
    //                 showSendResponse(statusMessage.success);
    //                 warningMessage.remove();
    //                 console.log(request.response);
    //             } else {
    //                 modalView();
    //                 showSendResponse(statusMessage.failure);
    //                 warningMessage.remove();
    //             }
    //         });
    //         form.reset();
    //     });


    // };

    const postDataToServer = async (url, data) => {
        // !!! Do not declare headers if FormData using
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: data
        });

        return await response.json();
    };

    const postData = (form) => {
        const showSendResponse = (message) => {
            const modalDialog = document.querySelector('.modal__dialog');
            modalDialog.classList.add('hide');
            const thanksDialog = document.createElement('div');
            thanksDialog.classList.add('modal__dialog');
            thanksDialog.innerHTML = `
                <div class="modal__content">
                    <div class="modal__close" data-close>&times;</div>
                    <div class="modal__title">${message}</div>
                </div>
            `;
            modal.append(thanksDialog);
            setTimeout(() => {
                thanksDialog.remove();
                modalDialog.classList.remove('hide');
                restorePagefromModal();
            }, 4000);
        };

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const warningMessage = document.createElement('img');
            warningMessage.src = statusMessage.loading;
            warningMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', warningMessage);

            const formData = new FormData(form);
            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postDataToServer('http://localhost:3000/requests', json)
                .then((data) => {
                    console.log(data);
                    modalView();
                    showSendResponse(statusMessage.success);
                    warningMessage.remove();
                })
                .catch((err) => {
                    console.error(err);
                    modalView();
                    showSendResponse(statusMessage.failure);
                    warningMessage.remove();
                }).finally(() => {
                    form.reset();
                });
        });
    };

    const getDataFromServer = async (url) => {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Could not fetch ${url}, status: ${response.status}`);
        }

        return await response.json();
    };

    // Open Modal if page bottom
    const modalAsPageBottom = () => {
        const scrollMax = document.documentElement.scrollHeight;
        const scrollCurrent = window.pageYOffset + document.documentElement.clientHeight;
        if (scrollCurrent >= scrollMax) {
            modalView();
            window.removeEventListener('scroll', modalAsPageBottom);
        }
    };

    // Daily calories calculator
    const caloriesCaclulator = () => {
        
        let total = document.querySelector('.calculating__result span');

        let activity;
        let gender;
        let weight;
        let height;
        let age;
        let totalValue;

        const dataCalc = JSON.parse(localStorage.getItem(('dataCalc')));

        if (dataCalc && dataCalc.gender) {
            gender = dataCalc.gender;
        } else {
            gender = 'female';
        }
        if (dataCalc && dataCalc.activity) {
            activity = dataCalc.activity;
        } else {
            activity = 1.375;
        }

        localStorage.setItem('dataCalc', JSON.stringify({gender, activity}));

        total.textContent = '____';

        const dailyCaloriesCalc = () => {
            if (!activity || !gender || !weight || !height || !age) {
                total.textContent = '____';
                return;
            }

            if (gender === 'male') {
                const bmr = 88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age);
                totalValue = Math.round(bmr * activity);
            }
    
            if (gender === 'female') {
                const bmr = 447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age);
                totalValue = Math.round(bmr * activity);
            }
            total.textContent = totalValue;
        };
    
        const buttosFields = (parent) => {
            const elements = parent.querySelectorAll('div');
            elements.forEach((element) => {
                    if(element.dataset.gender === gender) {
                        element.classList.add('calculating__choose-item_active');
                    }
                    if(+element.dataset.activity === activity) {
                        element.classList.add('calculating__choose-item_active');
                    }
            });

            parent.addEventListener('click', (e) => {
                if (e.target.hasAttribute(`data-gender`)) {
                    gender = e.target.getAttribute('data-gender');
                } else {
                    activity = +e.target.getAttribute('data-activity');
                }
                localStorage.setItem('dataCalc', JSON.stringify({gender, activity}));
                if(e.target !== parent) {
                    elements.forEach((element) => {
                        element.classList.remove('calculating__choose-item_active');
                    });
                    e.target.classList.add('calculating__choose-item_active');
                }
                    dailyCaloriesCalc();
            });
        };

        const inputFields = (selector) => {
            const input = document.querySelector(selector);

            input.addEventListener('input', () => {
                if(input.value.match(/\D/g)) {
                    input.style.border = '1px solid red';
                } else {
                    input.style.border = 'none';
                }

                switch (input.getAttribute('id')) {
                    case 'weight':
                        weight = +input.value;
                        break;
                    case 'height':
                        height = +input.value;
                        break;
                    case 'age':
                        age = +input.value;
                        break;
                }
                    dailyCaloriesCalc();
            });
        };

        buttosFields(document.querySelector('#gender'));
        buttosFields(document.querySelector('#activity'));
        
        inputFields('#weight');
        inputFields('#height');
        inputFields('#age');
    };

    // Events
    tabWrapper.addEventListener('click', (e) => handleTabClick(e));

    connectUs.forEach((button) => {
        button.addEventListener('click', modalView);
    });
    modal.addEventListener('click', (e) => handleModalClose(e));
    document.addEventListener('keyup', (e) => handleModalClose(e));
    window.addEventListener('scroll', modalAsPageBottom);
    forms.forEach((form) => postData(form));

    // Initial render

    getDataFromServer('http://localhost:3000/menu')
        .then((data) => {
            const cardContent = [...data];
            console.log(data);
            cardRenderBlock(cardContent);
        }).catch((err) => {
            console.error('Card content could not be downloaded ', err);
        });

    contentWrapper.forEach((item) => {
        handleContentHide(item);
    });
    handleTabContent(tabContent[0], contentWrapper[0]);

    currentSlide.textContent = '01';
    totalSlide.textContent = slides.length >= 10 ? slides.length : '0' + slides.length;

    // Infinite slider
    // IntervalSlider(0);

    //  Clicked slider
    // clickedSlider(0);

    // Moving slider
    movingSlider(0);

    caloriesCaclulator();
    offerOn(deadline);

});


/******/ })()
;
//# sourceMappingURL=bundle.js.map