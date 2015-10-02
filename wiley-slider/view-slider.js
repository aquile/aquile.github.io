function Slider(interval, timeout, transition) {


    window.onload = setWidths;
    window.onresize = setWidths;



    //Local variables
    var sliderDiv = document.body.querySelector('.slider__images'),
        sliderImgWrp = sliderDiv.querySelector('.slider__images-wrap'),
        sliderImgArr = sliderImgWrp.querySelectorAll('.slider__images img'),
        paginatorArr = document.body.querySelectorAll('.slider__pagination-item'),
        sliderANodes = sliderImgWrp.querySelectorAll('a'),
        sliderDivWidth;
    var slidesCounter = 0,
        paginatorCounter = 0,
        slidesCounterMax = sliderImgArr.length; //4
    var intId;


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


    Array.prototype.forEach.call(paginatorArr, function (el, i) {
        el.addEventListener('click', function () {
            clearInterval(intId);

            slidesCounter = i - 1;
            for (var j = 0; j < paginatorArr.length; j++) {
                paginatorArr[j].classList.remove('active');
            }
            paginatorArr[i].classList.add('active');
            paginatorCounter = i;
            //console.log(i);

            styling();

            setTimeout(function () {
                intId = setInterval(slider, interval);
            }, timeout)
        })

    });



    for ( var i = 0; i < sliderANodes.length; i++){
        sliderANodes[i].addEventListener('mousemove', function(){
            clearInterval(intId);
            console.log("in")
        });

        sliderANodes[i].addEventListener("mouseover", function(){
            intId = setInterval(slider, interval);
            console.log("out")
        })
    }

    //Array.prototype.forEach.call(sliderImgArr, function (el, i) {
    //    el.addEventListener("mousemove", function(){
    //    clearInterval(intId);
    //        console.log("in")
    //    });
    //    el.addEventListener("mouseover", function(){
    //        intId = setInterval(slider, interval);
    //        console.log("out")
    //    })
    //});


    //function fadeIn(el) {
    //    el.style.opacity = 0;
    //
    //    var last = +new Date();
    //    var tick = function() {
    //        el.style.opacity = +el.style.opacity + (new Date() - last) / 400;
    //        last = +new Date();
    //
    //        if (+el.style.opacity < 1) {
    //            (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16)
    //        }
    //    };
    //
    //    tick();
    //}

    //fadeIn(el);

    intId = setInterval(slider, interval);

}