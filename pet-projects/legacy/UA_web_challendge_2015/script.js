function Slider (id) {
    var arrowLeft = document.querySelector(id + ' ' + '.nav-left'),
        arrowRight = document.querySelector(id + ' ' + '.nav-right'),
        slideWrapper = document.querySelector(id),
        newWidth = slideWrapper.clientWidth,
        slideCarousel = document.querySelector(id + ' ' + '.slide__images-wrapper'),
        slideItems = document.querySelectorAll(id + ' ' + '.slide__item'),
        currentSlide = 0,
        self = this;

    self.sliderRender = function () {
        resizeSlides();
        setSlideItemWidth();
        arrowLeft.addEventListener('click', renderSliderLeft);
        arrowRight.addEventListener('click', renderSliderRight);
    };

    function resizeSlides () {
        setInterval( function () {
            newWidth = slideWrapper.clientWidth;
        }, 1000);
    }

    function setSlideItemWidth () {
        setInterval( function () {
            for (var i = 0; i < slideItems.length; i++) {
                slideItems[i].style.width = newWidth + 'px';
            }
        },1200);
    }

    function renderSliderRight () {
        arrowLeft.classList.remove('disabled');
        currentSlide += 1;
        slideCarousel.style.marginLeft = -(currentSlide * (newWidth + 1)) + 'px';
        if (currentSlide === 2) {
            arrowRight.classList.add('disabled');
            currentSlide = 1;
        }
    }

    function renderSliderLeft () {
        arrowRight.classList.remove('disabled');
        currentSlide--;
        slideCarousel.style.marginLeft = (currentSlide * (newWidth + 1)) + 'px';
        if (currentSlide === 0) {
            arrowLeft.classList.add('disabled');
        }
    }


}
