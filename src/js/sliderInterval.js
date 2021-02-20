import {slideHide, sliderMoveRight} from './sliderControls';

const sliderInterval = ({totalSlides, slideCounter, showingSlide}) => {
    const slides = document.querySelectorAll(totalSlides);
    const currentSlide = document.querySelector(showingSlide);
    const totalSlide = document.querySelector(slideCounter);

    const intervalSlider = (init) => {
        slideHide();
        let i = init;
        slides[i].classList.remove('hide');
        
        setInterval(() => {
            i = sliderMoveRight(i, 'click');
        }, 3000);
    };

    currentSlide.textContent = '01';
    totalSlide.textContent = slides.length >= 10 ? slides.length : '0' + slides.length;
    intervalSlider(0);
};

export default sliderInterval;