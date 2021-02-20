const sliderInterval = () => {
    const slides = document.querySelectorAll('.offer__slide');
    const currentSlide = document.querySelector('#current');
    const totalSlide = document.querySelector('#total');

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

module.exports = sliderInterval;