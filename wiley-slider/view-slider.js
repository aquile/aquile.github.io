function Slider(timeout, transition) {


    window.onload = setWidths;
    window.onresize = setWidths;

    //Local variables
    var sliderDiv = document.body.querySelector('.slider__images'),
        sliderImgWrp = sliderDiv.querySelector('.slider__images-wrap'),
        sliderImgArr = sliderImgWrp.querySelectorAll('.slider__images img'),
        paginatorArr = document.body.querySelectorAll('.slider__pagination-item');

    //Get width of parent node
    var sliderDivWidth;
    //Set width to images wrapper to put them in line


    function setWidths() {
        //Set this dimension
        sliderDivWidth = sliderDiv.offsetWidth;

        sliderImgWrp.style.width = sliderDivWidth * 3 + "px";
        //Set img width
        for (var i = 0; i < sliderImgArr.length; i++) {
            sliderImgArr[i].style.width = sliderDivWidth + "px";
        }
        console.log('ok');
    }

    var slidesCounter = 0,
        paginatorCounter = 0,
        slidesCounterMax = sliderImgArr.length; //4

    //add first paginator class
    paginatorArr[0].classList.toggle('active');

    function slider() {
            paginator();
            styling();

        //if the slider is last one
        if (slidesCounter == slidesCounterMax) {
            sliderDiv.style.transition = 'margin-left ease-in-out ' + 0 + 's';
            sliderDiv.style.marginLeft = "0";
            slidesCounter = 0;

            setTimeout(function () {
            styling();
            }, 300)
        }
    }

    function styling() {
        slidesCounter++;
        sliderDiv.style.transition = 'margin-left ease-in-out ' + transition + 's';
        sliderDiv.style.marginLeft = "-" + slidesCounter * sliderDivWidth + "px";
    }

    function paginator() {
        if (slidesCounter < slidesCounterMax - 2) {
            paginatorArr[paginatorCounter].classList.toggle('active');
            paginatorArr[++paginatorCounter].classList.toggle('active');
        }
        if (slidesCounter == slidesCounterMax - 2) {
            paginatorArr[0].classList.toggle('active');
            paginatorArr[paginatorCounter].classList.toggle('active');
            paginatorCounter = 0;
        }
        if (slidesCounter > slidesCounterMax - 2) {
            paginatorArr[paginatorCounter].classList.toggle('active');
            paginatorArr[++paginatorCounter].classList.toggle('active');
        }
    }

    setInterval(slider, timeout);
}