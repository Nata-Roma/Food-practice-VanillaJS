const sliderMoving = () => {
    const sliderContainer = document.querySelector('.offer__slider');
    const slideWrapper = document.querySelector('.offer__slider-wrapper');
    const slideInner = document.querySelector('.offer__slider-inner');
    const slides = document.querySelectorAll('.offer__slide');
    const currentSlide = document.querySelector('#current');
    const totalSlide = document.querySelector('#total');
    const buttonLeft = document.querySelector('.offer__slider-prev');
    const buttonRight = document.querySelector('.offer__slider-next');

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

module.exports = sliderMoving;