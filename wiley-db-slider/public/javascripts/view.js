function Slider(interval, timeout, transition) {


    window.onload = setWidths;
    window.onresize = setWidths;


    //Local variables
    var sliderDiv = document.body.querySelector('.slider__images'),
        sliderImgWrp = sliderDiv.querySelector('.slider__images-wrap'),
        sliderImgArr = sliderImgWrp.querySelectorAll('.slider__images img'),
        paginatorArr = document.body.querySelectorAll('.slider__pagination-item'),
        sliderANodes = sliderImgWrp.querySelectorAll('a'),
        sliderCircl3 = document.body.querySelector('.slider-circle-3'),
        sliderCircl3H2 = sliderCircl3.querySelector('h2'),
        sliderCircl3P = sliderCircl3.querySelector('p'),
        sliderDivWidth;
    var slidesCounter = 0,
        paginatorCounter = 0,
        slidesCounterMax = sliderImgArr.length; //4
    var intId, timeOutId;


    //Set width to images wrapper to put them in line
    function setWidths() {
        //Set this dimension
        sliderDivWidth = sliderDiv.offsetWidth;

        sliderImgWrp.style.width = sliderDivWidth * 3 + "px";
        //Set img width
        for (var i = 0; i < sliderImgArr.length; i++) {
            sliderImgArr[i].style.width = sliderDivWidth + "px";
        }
    }

    //add first paginator class
    paginatorArr[0].classList.toggle('active');

    //this function slide the images
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
//this function add some beauty to the sliding of images
    function styling() {
        slidesCounter++;
        sliderDiv.style.transition = 'margin-left ease-in-out ' + transition + 's';
        sliderDiv.style.marginLeft = "-" + slidesCounter * sliderDivWidth + "px";

        //Hide title and subtitle in .slider-circle-3
        fadeOut(sliderCircl3H2);
        fadeOut(sliderCircl3P);
        //Add new text picked form data-attr of <a> to title and subtittle in .slider-circle-3
        sliderCircl3H2.textContent = sliderANodes[slidesCounter].dataset.title;
        sliderCircl3P.textContent = sliderANodes[slidesCounter].dataset.subtitle;
        fadeIn(sliderCircl3H2);
        fadeIn(sliderCircl3P);
    }

    //add .active class to the actual pagination li node
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

    //adding pagition controls
    Array.prototype.forEach.call(paginatorArr, function (el, i) {
        el.addEventListener('click', function () {
            clearInterval(intId);
            intId = 0;

            slidesCounter = i - 1;
            for (var j = 0; j < paginatorArr.length; j++) {
                paginatorArr[j].classList.remove('active');
            }
            paginatorArr[i].classList.add('active');
            paginatorCounter = i;

            styling();

            timeOutId = setTimeout(function () {
                intId = setInterval(slider, interval);
            }, timeout)
        })

    });

    //stopping slider when cursor over the slider
    for (var i = 0; i < sliderANodes.length; i++) {
        sliderANodes[i].addEventListener('mouseover', function () {
            clearTimeout(timeOutId);
            clearInterval(intId);
        });

        sliderANodes[i].addEventListener("mouseout", function () {
            intId = setInterval(slider, interval);
        })
    }


    function fadeIn(el) {
        el.style.opacity = 0;

        var last = +new Date();
        var tick = function () {
            el.style.opacity = +el.style.opacity + (new Date() - last) / 400;
            last = +new Date();

            if (+el.style.opacity < 1) {
                (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16)
            }
        };

        tick();
    }

    function fadeOut(el) {
        el.style.opacity = 1;

        var last = +new Date();
        var tick = function () {
            el.style.opacity = +el.style.opacity - (new Date() - last) / 400;
            last = +new Date();

            if (+el.style.opacity > 0) {
                (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16)
            }
        };

        tick();
    }

//initialize slider
    intId = setInterval(slider, interval);

}