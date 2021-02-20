/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/caloriesCaclulator.js":
/*!**************************************!*\
  !*** ./src/js/caloriesCaclulator.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (caloriesCaclulator);

/***/ }),

/***/ "./src/js/cards.js":
/*!*************************!*\
  !*** ./src/js/cards.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const cards = (cardContent) => {
    const cardContainer = document.querySelector('.menu__field .container');

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
    cardRenderBlock(cardContent);
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);


/***/ }),

/***/ "./src/js/formSend.js":
/*!****************************!*\
  !*** ./src/js/formSend.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./src/js/modal.js");
/* harmony import */ var _initialData__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./initialData */ "./src/js/initialData.js");



const formSend = () => {
    const modal = document.querySelector('.modal');
    const forms = document.querySelectorAll('form');

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
                (0,_modal__WEBPACK_IMPORTED_MODULE_0__.restorePagefromModal)();
            }, 4000);
        };

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const warningMessage = document.createElement('img');
            warningMessage.src = _initialData__WEBPACK_IMPORTED_MODULE_1__.statusMessage.loading;
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
                    (0,_modal__WEBPACK_IMPORTED_MODULE_0__.modalView)();
                    showSendResponse(_initialData__WEBPACK_IMPORTED_MODULE_1__.statusMessage.success);
                    warningMessage.remove();
                })
                .catch((err) => {
                    console.error(err);
                    (0,_modal__WEBPACK_IMPORTED_MODULE_0__.modalView)();
                    showSendResponse(_initialData__WEBPACK_IMPORTED_MODULE_1__.statusMessage.failure);
                    warningMessage.remove();
                }).finally(() => {
                    form.reset();
                });
        });
    };
    forms.forEach((form) => postData(form));

};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (formSend);

/***/ }),

/***/ "./src/js/getInitialData.js":
/*!**********************************!*\
  !*** ./src/js/getInitialData.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _cards__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cards */ "./src/js/cards.js");


const getInitialData = () => {

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
            (0,_cards__WEBPACK_IMPORTED_MODULE_0__.default)(cardContent);
        }).catch((err) => {
            console.error('Card content could not be downloaded ', err);
        });
        
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getInitialData);

/***/ }),

/***/ "./src/js/initialData.js":
/*!*******************************!*\
  !*** ./src/js/initialData.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "tabContent": () => (/* binding */ tabContent),
/* harmony export */   "statusMessage": () => (/* binding */ statusMessage)
/* harmony export */ });
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

const statusMessage = {
    loading: '/src/img/form/spinner.svg',
    success: 'Thank you! We will connect to you soon',
    failure: 'Something goes wrong',
};


/***/ }),

/***/ "./src/js/modal.js":
/*!*************************!*\
  !*** ./src/js/modal.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "modalView": () => (/* binding */ modalView),
/* harmony export */   "restorePagefromModal": () => (/* binding */ restorePagefromModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const modal = document.querySelector('.modal');
const connectUs = document.querySelectorAll('[data-modal]');

const modalView = () => {
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
};

const restorePagefromModal = () => {
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
};

const modalWindow = () => {
    const handleModalClose = (e) => {
        if (e.target === modal || e.target.hasAttribute('data-close') || e.key === 'Escape' || e.key === 'Esc') {
            restorePagefromModal();
        }
    };
    const modalAsPageBottom = () => {
        const scrollMax = document.documentElement.scrollHeight;
        const scrollCurrent = window.pageYOffset + document.documentElement.clientHeight;
        if (scrollCurrent >= scrollMax) {
            modalView();
            window.removeEventListener('scroll', modalAsPageBottom);
        }
    };

    connectUs.forEach((button) => {
        button.addEventListener('click', modalView);
    });

    modal.addEventListener('click', (e) => handleModalClose(e));
    document.addEventListener('keyup', (e) => handleModalClose(e));
    window.addEventListener('scroll', modalAsPageBottom);

};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modalWindow);



/***/ }),

/***/ "./src/js/sliderControls.js":
/*!**********************************!*\
  !*** ./src/js/sliderControls.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "slideHide": () => (/* binding */ slideHide),
/* harmony export */   "slideShow": () => (/* binding */ slideShow),
/* harmony export */   "dotShow": () => (/* binding */ dotShow),
/* harmony export */   "sliderMoveRight": () => (/* binding */ sliderMoveRight),
/* harmony export */   "sliderMoveLeft": () => (/* binding */ sliderMoveLeft),
/* harmony export */   "dotClick": () => (/* binding */ dotClick)
/* harmony export */ });
// const sliderControls = () => {

const slides = document.querySelectorAll('.offer__slide');
const currentSlide = document.querySelector('#current');

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
// };

// module.exports = sliderControls;

// module.exports.slideHide = slideHide;
// module.exports.dotClick = dotClick;
// module.exports.sliderMoveRight = sliderMoveRight;
// module.exports.sliderMoveLeft = sliderMoveLeft;

/***/ }),

/***/ "./src/js/sliderInterval.js":
/*!**********************************!*\
  !*** ./src/js/sliderInterval.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _sliderControls__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sliderControls */ "./src/js/sliderControls.js");


const sliderInterval = () => {
    const slides = document.querySelectorAll('.offer__slide');
    const currentSlide = document.querySelector('#current');
    const totalSlide = document.querySelector('#total');

    const intervalSlider = (init) => {
        (0,_sliderControls__WEBPACK_IMPORTED_MODULE_0__.slideHide)();
        let i = init;
        slides[i].classList.remove('hide');
        
        setInterval(() => {
            i = (0,_sliderControls__WEBPACK_IMPORTED_MODULE_0__.sliderMoveRight)(i, 'click');
        }, 3000);
    };

    currentSlide.textContent = '01';
    totalSlide.textContent = slides.length >= 10 ? slides.length : '0' + slides.length;
    intervalSlider(0);
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (sliderInterval);

/***/ }),

/***/ "./src/js/specialOffer.js":
/*!********************************!*\
  !*** ./src/js/specialOffer.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const specialOffer = (deadline) => {


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
    offerOn(deadline);
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (specialOffer);

/***/ }),

/***/ "./src/js/tabs.js":
/*!************************!*\
  !*** ./src/js/tabs.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _initialData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./initialData */ "./src/js/initialData.js");


const tabs = () => {

    const contentWrapper = document.querySelectorAll('.tabcontent');
    const tabWrapper = document.querySelector('.tabheader__items');
    const tabItems = tabWrapper.querySelectorAll('.tabheader__item');

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
                    handleTabContent(_initialData__WEBPACK_IMPORTED_MODULE_0__.tabContent[i], contentWrapper[i]);
                }
            });
        }
    };
    tabWrapper.addEventListener('click', (e) => handleTabClick(e));
    contentWrapper.forEach((item) => {
        handleContentHide(item);
    });
    handleTabContent(_initialData__WEBPACK_IMPORTED_MODULE_0__.tabContent[0], contentWrapper[0]);
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _js_sliderInterval__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js/sliderInterval */ "./src/js/sliderInterval.js");
/* harmony import */ var _js_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/modal */ "./src/js/modal.js");
/* harmony import */ var _js_formSend__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./js/formSend */ "./src/js/formSend.js");
/* harmony import */ var _js_specialOffer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./js/specialOffer */ "./src/js/specialOffer.js");
/* harmony import */ var _js_tabs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./js/tabs */ "./src/js/tabs.js");
/* harmony import */ var _js_caloriesCaclulator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./js/caloriesCaclulator */ "./src/js/caloriesCaclulator.js");
/* harmony import */ var _js_getInitialData__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./js/getInitialData */ "./src/js/getInitialData.js");
(function () {
    'use strict';
}());

const deadline = '2021-02-21';


// import sliderClicked from './js/sliderClicked';
// import sliderMoving from './js/sliderMoving';





// import cards from './js/cards';





document.addEventListener('DOMContentLoaded', () => {

    (0,_js_getInitialData__WEBPACK_IMPORTED_MODULE_6__.default)();

    (0,_js_tabs__WEBPACK_IMPORTED_MODULE_4__.default)();
    (0,_js_caloriesCaclulator__WEBPACK_IMPORTED_MODULE_5__.default)();

    (0,_js_sliderInterval__WEBPACK_IMPORTED_MODULE_0__.default)();
    
    // sliderClicked();
    // sliderMoving();
    (0,_js_modal__WEBPACK_IMPORTED_MODULE_1__.default)();
    (0,_js_formSend__WEBPACK_IMPORTED_MODULE_2__.default)();
    (0,_js_specialOffer__WEBPACK_IMPORTED_MODULE_3__.default)(deadline);

});


})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map