/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/caloriesCaclulator.js":
/*!**************************************!*\
  !*** ./src/js/caloriesCaclulator.js ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
const caloriesCaclulator = ({
  totalLine,
  buttonGender,
  buttonActivity,
  inputWeight,
  inputHeight,
  inputAge
}) => {
  let total = document.querySelector(totalLine);
  let activity;
  let gender;
  let weight;
  let height;
  let age;
  let totalValue;
  const dataCalc = JSON.parse(localStorage.getItem('dataCalc'));

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

  localStorage.setItem('dataCalc', JSON.stringify({
    gender,
    activity
  }));
  total.textContent = '____';

  const dailyCaloriesCalc = () => {
    if (!activity || !gender || !weight || !height || !age) {
      total.textContent = '____';
      return;
    }

    if (gender === 'male') {
      const bmr = 88.36 + 13.4 * weight + 4.8 * height - 5.7 * age;
      totalValue = Math.round(bmr * activity);
    }

    if (gender === 'female') {
      const bmr = 447.6 + 9.2 * weight + 3.1 * height - 4.3 * age;
      totalValue = Math.round(bmr * activity);
    }

    total.textContent = totalValue;
  };

  const buttosFields = parent => {
    const elements = parent.querySelectorAll('div');
    elements.forEach(element => {
      if (element.dataset.gender === gender) {
        element.classList.add('calculating__choose-item_active');
      }

      if (+element.dataset.activity === activity) {
        element.classList.add('calculating__choose-item_active');
      }
    });
    parent.addEventListener('click', e => {
      if (e.target.hasAttribute(`data-gender`)) {
        gender = e.target.getAttribute('data-gender');
      } else {
        activity = +e.target.getAttribute('data-activity');
      }

      localStorage.setItem('dataCalc', JSON.stringify({
        gender,
        activity
      }));

      if (e.target !== parent) {
        elements.forEach(element => {
          element.classList.remove('calculating__choose-item_active');
        });
        e.target.classList.add('calculating__choose-item_active');
      }

      dailyCaloriesCalc();
    });
  };

  const inputFields = selector => {
    const input = document.querySelector(selector);
    input.addEventListener('input', () => {
      if (input.value.match(/\D/g)) {
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

  buttosFields(document.querySelector(buttonGender));
  buttosFields(document.querySelector(buttonActivity));
  inputFields(inputWeight);
  inputFields(inputHeight);
  inputFields(inputAge);
};

/* harmony default export */ __webpack_exports__["default"] = (caloriesCaclulator);

/***/ }),

/***/ "./src/js/cards.js":
/*!*************************!*\
  !*** ./src/js/cards.js ***!
  \*************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
const cards = (cardContent, cardsContainer) => {
  const cardContainer = document.querySelector(cardsContainer);

  class CardRender {
    constructor({
      title,
      image,
      alt,
      description,
      price
    }, parent) {
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
      this.price = Math.floor(this.currencyRate * this.price);
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

  const cardRenderBlock = cardContent => {
    for (let i = 0; i < 3; i++) {
      new CardRender(cardContent[i], cardContainer).cardRender();
    }
  };

  cardRenderBlock(cardContent);
};

/* harmony default export */ __webpack_exports__["default"] = (cards);

/***/ }),

/***/ "./src/js/formSend.js":
/*!****************************!*\
  !*** ./src/js/formSend.js ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./src/js/modal.js");
/* harmony import */ var _initialData__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./initialData */ "./src/js/initialData.js");



const showSendResponse = (message, modal, modalInnerBox) => {
  const modalDialog = document.querySelector(modalInnerBox);
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
    (0,_modal__WEBPACK_IMPORTED_MODULE_0__.restorePagefromModal)(modal);
  }, 4000);
};

const formSend = ({
  modalBox,
  formContainer,
  modalInner
}) => {
  const modal = document.querySelector(modalBox);
  const forms = document.querySelectorAll(formContainer);

  const postDataToServer = async (url, data) => {
    // !!! Do not declare headers if FormData using
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: data
    });
    return await response.json();
  };

  const postData = (form, modalInnerBox) => {
    form.addEventListener('submit', e => {
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
      postDataToServer('http://localhost:3000/requests', json).then(data => {
        console.log(data);
        (0,_modal__WEBPACK_IMPORTED_MODULE_0__.modalView)(modal);
        showSendResponse(_initialData__WEBPACK_IMPORTED_MODULE_1__.statusMessage.success, modal, modalInnerBox);
        warningMessage.remove();
      }).catch(err => {
        console.error(err);
        (0,_modal__WEBPACK_IMPORTED_MODULE_0__.modalView)(modal);
        showSendResponse(_initialData__WEBPACK_IMPORTED_MODULE_1__.statusMessage.failure, modal, modalInnerBox);
        warningMessage.remove();
      }).finally(() => {
        form.reset();
      });
    });
  };

  forms.forEach(form => postData(form, modalInner));
};

/* harmony default export */ __webpack_exports__["default"] = (formSend);

/***/ }),

/***/ "./src/js/getInitialData.js":
/*!**********************************!*\
  !*** ./src/js/getInitialData.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _cards__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cards */ "./src/js/cards.js");


const getInitialData = ({
  cardsContainer,
  url
}) => {
  const getDataFromServer = async url => {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Could not fetch ${url}, status: ${response.status}`);
    }

    return await response.json();
  };

  getDataFromServer(url).then(data => {
    const cardContent = [...data];
    console.log(data);
    (0,_cards__WEBPACK_IMPORTED_MODULE_0__.default)(cardContent, cardsContainer);
  }).catch(err => {
    console.error('Card content could not be downloaded ', err);
  });
};

/* harmony default export */ __webpack_exports__["default"] = (getInitialData);

/***/ }),

/***/ "./src/js/initialData.js":
/*!*******************************!*\
  !*** ./src/js/initialData.js ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "tabContent": function() { return /* binding */ tabContent; },
/* harmony export */   "statusMessage": function() { return /* binding */ statusMessage; }
/* harmony export */ });
const tabContent = [{
  image: 'src/img/tabs/vegy.jpg',
  description: 'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Для людей, которые интересуются спортом; активных и здоровых. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!'
}, {
  image: 'src/img/tabs/elite.jpg',
  description: 'Меню “Премиум” - мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!'
}, {
  image: 'src/img/tabs/post.jpg',
  description: 'Наше специальное “Постное меню” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения. Полная гармония с собой и природой в каждом элементе! Все будет Ом!'
}, {
  image: 'src/img/tabs/hamburger.jpg',
  description: 'Меню "Сбалансированное" - это соответствие вашего рациона всем научным рекомендациям. Мы тщательно просчитываем вашу потребность в к/б/ж/у и создаем лучшие блюда для вас.'
}];
const statusMessage = {
  loading: './src/img/form/spinner.svg',
  success: 'Thank you! We will connect to you soon',
  failure: 'Something goes wrong'
};

/***/ }),

/***/ "./src/js/modal.js":
/*!*************************!*\
  !*** ./src/js/modal.js ***!
  \*************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "modalView": function() { return /* binding */ modalView; },
/* harmony export */   "restorePagefromModal": function() { return /* binding */ restorePagefromModal; }
/* harmony export */ });
const connectUs = document.querySelectorAll('[data-modal]');
const modalView = modal => {
  modal.classList.add('show');
  modal.classList.remove('hide');
  document.body.style.overflow = 'hidden';
};
const restorePagefromModal = modal => {
  modal.classList.add('hide');
  modal.classList.remove('show');
  document.body.style.overflow = '';
};

const modalWindow = ({
  modalBox
}) => {
  const modal = document.querySelector(modalBox);

  const handleModalClose = e => {
    if (e.target === modal || e.target.hasAttribute('data-close') || e.key === 'Escape' || e.key === 'Esc') {
      restorePagefromModal(modal);
    }
  };

  const modalAsPageBottom = () => {
    const scrollMax = document.documentElement.scrollHeight;
    const scrollCurrent = window.pageYOffset + document.documentElement.clientHeight;

    if (scrollCurrent >= scrollMax) {
      modalView(modal);
      window.removeEventListener('scroll', modalAsPageBottom);
    }
  };

  connectUs.forEach(button => {
    button.addEventListener('click', () => modalView(modal));
  });
  modal.addEventListener('click', e => handleModalClose(e));
  document.addEventListener('keyup', e => handleModalClose(e));
  window.addEventListener('scroll', modalAsPageBottom);
};

/* harmony default export */ __webpack_exports__["default"] = (modalWindow);

/***/ }),

/***/ "./src/js/sliderControls.js":
/*!**********************************!*\
  !*** ./src/js/sliderControls.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "slideHide": function() { return /* binding */ slideHide; },
/* harmony export */   "slideShow": function() { return /* binding */ slideShow; },
/* harmony export */   "dotShow": function() { return /* binding */ dotShow; },
/* harmony export */   "sliderMoveRight": function() { return /* binding */ sliderMoveRight; },
/* harmony export */   "sliderMoveLeft": function() { return /* binding */ sliderMoveLeft; },
/* harmony export */   "dotClick": function() { return /* binding */ dotClick; }
/* harmony export */ });
const slides = document.querySelectorAll('.offer__slide');
const currentSlide = document.querySelector('#current');

const sliderCount = i => {
  if (i + 1 >= 10) {
    currentSlide.textContent = i + 1;
  } else {
    currentSlide.textContent = '0' + (i + 1);
  }
};

const slideHide = () => {
  slides.forEach(offer => {
    offer.classList.add('hide');
    offer.classList.remove('show', 'fade');
  });
};
const slideShow = i => {
  slideHide();
  slides[i].classList.add('show', 'fade');
  slides[i].classList.remove('hide');
};
const dotShow = (i, dots) => {
  dots.forEach(dot => {
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

/***/ }),

/***/ "./src/js/sliderInterval.js":
/*!**********************************!*\
  !*** ./src/js/sliderInterval.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _sliderControls__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sliderControls */ "./src/js/sliderControls.js");


const sliderInterval = ({
  totalSlides,
  slideCounter,
  showingSlide
}) => {
  const slides = document.querySelectorAll(totalSlides);
  const currentSlide = document.querySelector(showingSlide);
  const totalSlide = document.querySelector(slideCounter);

  const intervalSlider = init => {
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

/* harmony default export */ __webpack_exports__["default"] = (sliderInterval);

/***/ }),

/***/ "./src/js/specialOffer.js":
/*!********************************!*\
  !*** ./src/js/specialOffer.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
const specialOffer = ({
  deadline,
  offerDays,
  offerHours,
  offerMinutes,
  offerSecunds
}) => {
  const getTime = offerEnd => {
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
      secondsLeft
    };
  };

  const timerNumbers = num => {
    if (num >= 10) {
      return num;
    }

    return `0${num}`;
  };

  const offerOn = ({
    deadline,
    offerDays,
    offerHours,
    offerMinutes,
    offerSecunds
  }) => {
    const offerEnd = new Date(deadline);
    const days = document.querySelector(offerDays);
    const hours = document.querySelector(offerHours);
    const minutes = document.querySelector(offerMinutes);
    const seconds = document.querySelector(offerSecunds);
    let offerTimer;

    const secTimer = () => {
      const {
        currentTime,
        daysLeft,
        hoursLeft,
        minutesLeft,
        secondsLeft
      } = getTime(offerEnd);
      days.textContent = timerNumbers(daysLeft);
      hours.textContent = timerNumbers(hoursLeft);
      minutes.textContent = timerNumbers(minutesLeft);
      seconds.textContent = timerNumbers(secondsLeft);

      if (offerEnd - currentTime <= 0) {
        clearInterval(offerTimer);
      }
    };

    if (new Date(deadline) - new Date() > 0) {
      secTimer();
      offerTimer = setInterval(secTimer, 1000);
    } else {
      days.textContent = '--';
      hours.textContent = '--';
      minutes.textContent = '--';
      seconds.textContent = '--';
    }
  };

  offerOn({
    deadline,
    offerDays,
    offerHours,
    offerMinutes,
    offerSecunds
  });
};

/* harmony default export */ __webpack_exports__["default"] = (specialOffer);

/***/ }),

/***/ "./src/js/tabs.js":
/*!************************!*\
  !*** ./src/js/tabs.js ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _initialData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./initialData */ "./src/js/initialData.js");


const tabs = ({
  contentContainer,
  tabContainer,
  tabs
}) => {
  const contentWrapper = document.querySelectorAll(contentContainer);
  const tabWrapper = document.querySelector(tabContainer);
  const tabItems = tabWrapper.querySelectorAll(tabs); // Tabs, Content, Choise of style

  const handleContentHide = element => {
    element.classList.add('hide');
    element.classList.remove('show', 'fade');
  };

  const handleContentShow = element => {
    element.classList.add('show', 'fade');
    element.classList.remove('hide');
  };

  const handleTabContent = ({
    image,
    description
  }, parent) => {
    const imageElem = parent.querySelector('img');
    const descriptionElem = parent.querySelector('.tabcontent__descr');
    handleContentHide(parent);
    imageElem.src = image;
    descriptionElem.textContent = description;
    handleContentShow(parent);
  };

  const handleTabClick = e => {
    const target = e.target;

    if (target && target.classList.contains('tabheader__item')) {
      tabItems.forEach(tab => {
        tab.classList.remove('tabheader__item_active');
      });
      tabItems.forEach((tab, i) => {
        if (target === tab) {
          target.classList.add('tabheader__item_active');
          contentWrapper.forEach(item => {
            handleContentHide(item);
          });
          handleTabContent(_initialData__WEBPACK_IMPORTED_MODULE_0__.tabContent[i], contentWrapper[i]);
        }
      });
    }
  };

  tabWrapper.addEventListener('click', e => handleTabClick(e));
  contentWrapper.forEach(item => {
    handleContentHide(item);
  });
  handleTabContent(_initialData__WEBPACK_IMPORTED_MODULE_0__.tabContent[0], contentWrapper[0]);
};

/* harmony default export */ __webpack_exports__["default"] = (tabs);

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
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
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
})();

const deadline = '2021-02-22';
 // import sliderClicked from './js/sliderClicked';
// import sliderMoving from './js/sliderMoving';







document.addEventListener('DOMContentLoaded', () => {
  (0,_js_getInitialData__WEBPACK_IMPORTED_MODULE_6__.default)({
    cardsContainer: '.menu__field .container',
    url: 'http://localhost:3000/menu'
  });
  (0,_js_tabs__WEBPACK_IMPORTED_MODULE_4__.default)({
    contentContainer: '.tabcontent',
    tabContainer: '.tabheader__items',
    tabs: '.tabheader__item'
  });
  (0,_js_caloriesCaclulator__WEBPACK_IMPORTED_MODULE_5__.default)({
    totalLine: '.calculating__result span',
    buttonGender: '#gender',
    buttonActivity: '#activity',
    inputWeight: '#weight',
    inputHeight: '#height',
    inputAge: '#age'
  });
  (0,_js_sliderInterval__WEBPACK_IMPORTED_MODULE_0__.default)({
    totalSlides: '.offer__slide',
    slideCounter: '#total',
    showingSlide: '#current'
  }); // sliderClicked({
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

  (0,_js_modal__WEBPACK_IMPORTED_MODULE_1__.default)({
    modalBox: '.modal'
  });
  (0,_js_formSend__WEBPACK_IMPORTED_MODULE_2__.default)({
    modalBox: '.modal',
    formContainer: 'form',
    modalInner: '.modal__dialog'
  });
  (0,_js_specialOffer__WEBPACK_IMPORTED_MODULE_3__.default)({
    deadline,
    offerDays: '#days',
    offerHours: '#hours',
    offerMinutes: '#minutes',
    offerSecunds: '#seconds'
  });
});
}();
/******/ })()
;
//# sourceMappingURL=bundle.js.map