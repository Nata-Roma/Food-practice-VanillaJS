import {slideHide, sliderMoveLeft, sliderMoveRight} from './sliderControls';

const sliderClicked = () => {

    const slides = document.querySelectorAll('.offer__slide');
    const currentSlide = document.querySelector('#current');
    const totalSlide = document.querySelector('#total');
    const buttonLeft = document.querySelector('.offer__slider-prev');
    const buttonRight = document.querySelector('.offer__slider-next');

    const clickedSlider = (init) => {
        slideHide();
        let i = init;
        slides[i].classList.remove('hide');

        buttonLeft.addEventListener('click', () => {
            i = sliderMoveLeft(i, 'click');
        });
        buttonRight.addEventListener('click', () => {
            i = sliderMoveRight(i, 'click');
        });
    };
    currentSlide.textContent = '01';
    totalSlide.textContent = slides.length >= 10 ? slides.length : '0' + slides.length;
    clickedSlider(0);
};

export default sliderClicked;