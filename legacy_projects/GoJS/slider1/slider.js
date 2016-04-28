function Slider(selector, options) {
    var self = this;
//DOM nodes
    var sliderNode = document.querySelector(selector);
    var sliderImagesNode = sliderNode.querySelector('.slider__images-wrap');
    var prevSlideNode = sliderNode.querySelector('.slider__pager_previous');
    var nextSliderNode = sliderNode.querySelector('.slider__pager_next');

    var paginatorNode = sliderNode.querySelector('.slider__pagination');

//Local variables
    var imagesCount = sliderImagesNode.children.length;
    var currentSlideIndex = options.currentSlideIndex || 0;
    var imageWidth = sliderImagesNode.offsetWidth;
//Methods
    this.nextSlide = function () {
        if (currentSlideIndex === imagesCount - 1) return currentSlideIndex = 0;
        currentSlideIndex++;
    };
    this.prevSlide = function () {
        if (currentSlideIndex === 0) return;
        currentSlideIndex--;
    };
    this.__render = function () {
        console.log(currentSlideIndex);
        console.log(imageWidth);
        sliderImagesNode.style.marginLeft = currentSlideIndex * -imageWidth + 'px';
        if (currentSlideIndex === 0) {
            prevSlideNode.style.visibility = 'hidden';
        } else (prevSlideNode.style.visibility = 'visible');
        if (currentSlideIndex === imagesCount - 1) {
            nextSliderNode.style.visibility = 'hidden';
        } else (nextSliderNode.style.visibility = '');

        paginatorNode.querySelector('.active').classList.remove('active');
        paginatorNode.children[currentSlideIndex].querySelector('a').classList.add('active');
    };

    nextSliderNode.onclick = function () {
        self.nextSlide();
        self.__render();
    };

    prevSlideNode.onclick = function () {
        self.prevSlide();
        self.__render();
    };

    paginatorNode.onclick = function (event) {

        if (link.tagName !== 'A') return;
        paginatorNode.querySelector('.active').classList.remove('active');
        link.classList.add('active');

        currentSlideIndex = +link.dataset.slider__item;
        self.__render();
    };

    sliderImagesNode.style.transition = 'margin-left ease-in-out 0.5s';

    if (currentSlideIndex === 0) {
        prevSlideNode.style.visibility = 'none';
    }

    self.__render();

    if (options.changeInterval) {

        var timerId,
            startAutoSlide = function () {
                prevSlideNode.style.display = '';
                nextSliderNode.style.display = '';

                timerId = setInterval(function () {
                    self.nextSlide();
                    self.__render();
                }, options.changeInterval);
            };
        startAutoSlide();

        sliderNode.onmousemove = function () {
            prevSlideNode.style.display = 'none';
            nextSliderNode.style.display = 'none';
            clearInterval(timerId);
        };

        sliderNode.onmouseout = function () {
            startAutoSlide();
        }
    }
}

