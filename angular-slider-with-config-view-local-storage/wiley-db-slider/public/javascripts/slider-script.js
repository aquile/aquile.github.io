function Slider(interval, timeout, transition) {
    //Should be done first
    var paginatorParent = document.body.querySelector('.slider__pagination'),
        lastLi = paginatorParent.querySelector('li:last-child');
    paginatorParent.removeChild(lastLi);
    var lastLi2 = paginatorParent.querySelector('li:last-child');
    lastLi2.style.display = "inline-block";

    //Local variables
    var sliderDiv = document.body.querySelector('.slider__images'),
        sliderDivJQ = $('.slider__images'),
        sliderWrap = document.body.querySelector('.slider-wrapper'),
        sliderImgWrp = sliderDiv.querySelector('.slider__images-wrap'),
        sliderImgArr = sliderImgWrp.querySelectorAll('img'),
        paginatorArr = document.body.querySelectorAll('.slider__pagination-item'),
        sliderANodes = sliderImgWrp.querySelectorAll('a'),
        sliderCircl1 = document.body.querySelector('.slider-circle-1'),
        sliderCircl2 = document.body.querySelector('.slider-circle-2'),
        sliderCircl3 = document.body.querySelector('.slider-circle-3'),
        sliderCircl3H2 = sliderCircl3.querySelector('h2'),
        sliderCircl3P = sliderCircl3.querySelector('p'),
        sliderCircl4 = document.body.querySelector(".slider-circle-4"),
        sliderCircl4P = sliderCircl4.querySelector("p"),
        sliderDivWidth;
    var slidesCounter = 0, index,
        slidesCounterMax = sliderImgArr.length; //4
    var intId, timeOutId;
    var classesArray = ["blue", "green", "orange", "purple", "red", "none", "left", "right"];

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
        //console.log('slider');
        slidesCounter++;
        if (slidesCounter == slidesCounterMax) {
            sliderDiv.style.transition = 'margin-left ease-in-out ' + 0 + 's';
            sliderDiv.style.marginLeft = "0";
            slidesCounter = 0;

            //lets catch end of transition and after that make fading of bubbles
            sliderDivJQ.one("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function () {
                if (slidesCounter != 0) {
                    fading()
                }
                paginator();
            });

            styling();

            intId = setTimeout(slider, interval);
        } else {
            //hide circles
            fadeOut(sliderCircl1);
            fadeOut(sliderCircl2);
            fadeOut(sliderCircl3);
            fadeOut(sliderCircl4);

            //lets catch end of transition and after that make fading of bubbles
            sliderDivJQ.one("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function () {
                if (slidesCounter != 0) {
                    fading()
                }
                paginator();
            });

            styling();

            intId = setTimeout(slider, interval);
        }
    }

    //concat fadeIn & fadeOut functions
    function fading() {
        index = +sliderImgArr[slidesCounter].dataset.index;

        //clear class list
        for (var i = 0; i < classesArray.length; i++) {
            sliderWrap.classList.remove(classesArray[i]);
        }
        //add new classes
        sliderWrap.classList.add(sliderANodes[index].dataset.color);
        sliderWrap.classList.add(sliderANodes[index].dataset.position);

        //let's break jive-sdk
        if (sliderWrap.classList.contains('left')) {
            sliderCircl2.style.right = "";
            sliderCircl2.style.left = sliderDiv.offsetWidth * 0.32 - 20 + "px";
        } //=== "calc(12% - 20px)";
        if (sliderWrap.classList.contains('right')) {
            sliderCircl2.style.left = "";
            sliderCircl2.style.right = sliderDiv.offsetWidth * 0.32 - 20 + "px";
        }
        //show after giving the position
        // if (!sliderWrap.classList.contains('none')) sliderCircl2.style.display = "block";

        //Hide title and subtitle in .slider-circle-3
        //Add new text picked form data-attr of <a> to title and subtittle in .slider-circle-3
        sliderCircl3H2.textContent = sliderANodes[index].dataset.title;
        sliderCircl3P.textContent = sliderANodes[index].dataset.subtitle;
        //set default text
        if (sliderANodes[index].dataset.action == "") {
            sliderCircl4P.textContent = "Learn more..."
        } else {
            sliderCircl4P.textContent = sliderANodes[index].dataset.action;
        }

        sliderCircl4.setAttribute("href", sliderANodes[index].getAttribute("href"));
        //show circles
        fadeIn(sliderCircl1);
        fadeIn(sliderCircl2);
        fadeIn(sliderCircl3);
        fadeIn(sliderCircl4);
    }

    //this function add some beauty to the sliding of images
    function styling() {
        sliderDiv.style.marginLeft = "-" + slidesCounter * sliderDivWidth + "px";
        setTimeout(function () {
            sliderDiv.style.transition = 'margin-left ease-in-out ' + transition + 's';
        }, 300);
    }

    //add .active class to the actual pagination li node
    function paginator() {
        var index = +sliderImgArr[slidesCounter].dataset.index;
        for (var i = 0; i < paginatorArr.length; i++) {
            paginatorArr[i].classList.remove('active');
        }
        if (+index == paginatorArr.length) {
            index = 0
        }
        paginatorArr[index].classList.add('active');
    }

    //adding pagination controls
    Array.prototype.forEach.call(paginatorArr, function (el, i) {
        el.onclick = function () {
            clearTimeout(intId);
            clearTimeout(timeOutId);
            intId = 0;

            slidesCounter = i - 1;
            for (var j = 0; j < paginatorArr.length; j++) {
                paginatorArr[j].classList.remove('active');
            }
            el.classList.add('active');

            sliderDiv.style.transition = 'margin-left ease-in-out ' + transition + 's';
            sliderDiv.style.marginLeft = "-" + i * sliderDivWidth + "px";

            //hide circles
            fadeOut(sliderCircl1);
            fadeOut(sliderCircl2);
            fadeOut(sliderCircl3);
            fadeOut(sliderCircl4);

            //lets catch end of transition and after that make fading of bubbles
            sliderDivJQ.one("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function () {
                //clear class list
                for (var a = 0; a < classesArray.length; a++) {
                    sliderWrap.classList.remove(classesArray[a]);
                }
                //add new classes
                (sliderANodes[i].dataset.color) ? sliderWrap.classList.add(sliderANodes[i].dataset.color) : sliderWrap.classList.add('none');
                (sliderANodes[i].dataset.position) ? sliderWrap.classList.add(sliderANodes[i].dataset.position) : sliderWrap.classList.add('left');

                //let's break jive-sdk
                if (sliderWrap.classList.contains('left')) {
                    sliderCircl2.style.right = "";
                    sliderCircl2.style.left = sliderDiv.offsetWidth * 0.32 - 20 + "px";
                } //=== "calc(12% - 20px)";
                if (sliderWrap.classList.contains('right')) {
                    sliderCircl2.style.left = "";
                    sliderCircl2.style.right = sliderDiv.offsetWidth * 0.32 - 20 + "px";
                }
                //show after giving the position
                // if (!sliderWrap.classList.contains('none')) sliderCircl2.style.display = "block";

                //Hide title and subtitle in .slider-circle-3
                //Add new text picked form data-attr of <a> to title and subtittle in .slider-circle-3
                sliderCircl3H2.textContent = sliderANodes[i].dataset.title;
                sliderCircl3P.textContent = sliderANodes[i].dataset.subtitle;
                //set default text
                if (sliderANodes[i].dataset.action == "") {
                    sliderCircl4P.textContent = "Learn more..."
                } else {
                    sliderCircl4P.textContent = sliderANodes[i].dataset.action;
                }

                sliderCircl4.setAttribute("href", sliderANodes[i].getAttribute("href"));
                //show circles
                fadeIn(sliderCircl1);
                fadeIn(sliderCircl2);
                fadeIn(sliderCircl3);
                fadeIn(sliderCircl4);


                //restore slidesCounter
                slidesCounter = i;
            });

            timeOutId = setTimeout(function () {
                slider();
            }, timeout)
        }

    });

    //stopping slider when cursor over the slider
    for (var i = 0; i < sliderANodes.length; i++) {
        sliderANodes[i].addEventListener('mouseover', function () {
            clearTimeout(timeOutId);
            clearTimeout(intId);
        });

        sliderANodes[i].addEventListener("mouseout", function () {
            intId = setTimeout(slider, interval);
        })
    }

    function fadeIn(el) {
        el.style.visibility = "visible";
        var last = +new Date();
        var tick = function () {
            el.style.opacity = +el.style.opacity + (new Date() - last) / 1200;
            last = +new Date();

            if (+el.style.opacity < 1) {
                // (window.requestAnimationFrame && requestAnimationFrame(tick)) ||
                setTimeout(tick, 150);
            }
        };
        tick();
    }

    function fadeOut(el) {
        //console.log('fadeOut');
        el.style.visibility = "hidden";
        el.style.opacity = "0";
    }

    //Default fn and views
    setWidths();
    fading();
    window.onresize = setWidths;

    //initialize slider inside the fn
    intId = setTimeout(slider, interval);
}