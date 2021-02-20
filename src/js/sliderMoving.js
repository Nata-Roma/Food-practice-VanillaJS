import {sliderMoveLeft, sliderMoveRight, dotClick} from './sliderControls';

const sliderMoving = () => {
    const sliderContainer = document.querySelector('.offer__slider');
    const slideWrapper = document.querySelector('.offer__slider-wrapper');
    const slideInner = document.querySelector('.offer__slider-inner');
    const slides = document.querySelectorAll('.offer__slide');
    const currentSlide = document.querySelector('#current');
    const totalSlide = document.querySelector('#total');
    const buttonLeft = document.querySelector('.offer__slider-prev');
    const buttonRight = document.querySelector('.offer__slider-next');

    
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
    currentSlide.textContent = '01';
    totalSlide.textContent = slides.length >= 10 ? slides.length : '0' + slides.length;
    movingSlider(0);
};

export default sliderMoving;