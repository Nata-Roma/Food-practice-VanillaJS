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

const deadline = '2021-02-16';

const statusMessage = {
    loading: '/img/form/spinner.svg',
    success: 'Thank you! We will connect to you soon',
    failure: 'Something goes wrong',
};

document.addEventListener('DOMContentLoaded', () => {

    const contentWrapper = document.querySelectorAll('.tabcontent');
    const tabWrapper = document.querySelector('.tabheader__items');
    const tabItems = tabWrapper.querySelectorAll('.tabheader__item');
    const offers = document.querySelectorAll('.offer__slide');
    const currentSlide = document.querySelector('#current');
    const forms = document.querySelectorAll('form');
    const connectUs = document.querySelectorAll('[data-modal]');
    const modal = document.querySelector('.modal');
    const cardContainer = document.querySelector('.menu__field .container');
    class CardRender {
        constructor({title, image, alt, description, price}, parent) {
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

            element.innerHTML =  `
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

        for( let i = 0; i < 3; i++) {
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

        if(new Date(offerDeadline) - new Date() > 0) {
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


            // !!! Do not declare headers if FormData using
           
            const formData = new FormData(form);
            const toJsonObject = {};

            formData.forEach((value, key) => {
                toJsonObject[key] = value;
            });

            fetch('/server.php', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(toJsonObject)
            }).then((response) => response.text())
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


    // Open Modal if page bottom
    const modalAsPageBottom = () => {
        const scrollMax = document.documentElement.scrollHeight;
        const scrollCurrent = window.pageYOffset + document.documentElement.clientHeight;
        if (scrollCurrent >= scrollMax) {
            modalView();
            window.removeEventListener('scroll', modalAsPageBottom);
        }
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

    fetch('http://localhost:3000/menu')
    .then((response) => response.json())
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
    offersHide();
    offers[0].classList.remove('hide');
    currentSlide.textContent = '01';
    
    
    offerSlide(1);
    offerOn(deadline);

});