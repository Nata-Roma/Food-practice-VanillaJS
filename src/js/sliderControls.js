const slides = document.querySelectorAll('.offer__slide');
const currentSlide = document.querySelector('#current');

const sliderCount = (i) => {
    if (i + 1 >= 10) {
        currentSlide.textContent = i + 1;
    } else {
        currentSlide.textContent = '0' + (i + 1);
    }
};

export const slideHide = () => {
    slides.forEach((offer) => {
        offer.classList.add('hide');
        offer.classList.remove('show', 'fade');
    });
};

export const slideShow = (i) => {
    slideHide();
    slides[i].classList.add('show', 'fade');
    slides[i].classList.remove('hide');
};

export const dotShow = (i, dots) => {
    dots.forEach((dot) => {
        dot.style.opacity = 0.5;
    });
    dots[i].style.opacity = 1;
};

export const sliderMoveRight = (i, theme, dots) => {
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

export const sliderMoveLeft = (i, theme, dots) => {
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

export const dotClick = (currentDot, element) => {
    dotShow(currentDot, element);
    sliderCount(currentDot);
    return currentDot;
};
