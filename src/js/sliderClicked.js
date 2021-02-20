import {slideHide, sliderMoveLeft, sliderMoveRight} from './sliderControls';

const sliderClicked = ({totalSlides, slideCounter, showingSlide, sliderPrev, sliderNext}) => {

    const slides = document.querySelectorAll(totalSlides);
    const currentSlide = document.querySelector(showingSlide);
    const totalSlide = document.querySelector(slideCounter);
    const buttonLeft = document.querySelector(sliderPrev);
    const buttonRight = document.querySelector(sliderNext);

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