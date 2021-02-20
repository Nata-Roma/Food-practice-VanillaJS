import {slideHide, sliderMoveRight} from './sliderControls';

const sliderInterval = () => {
    const slides = document.querySelectorAll('.offer__slide');
    const currentSlide = document.querySelector('#current');
    const totalSlide = document.querySelector('#total');

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