

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
                if(target === tab) {
                    target.classList.add('tabheader__item_active');
                    handleTabContent(tabContent[i], contentWrapper);
                }
            });
        }
    };

    tabWrapper.addEventListener('click', (e) => handleTabClick(e));


    handleTabContent(tabContent[0], contentWrapper);










});