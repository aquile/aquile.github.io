var imageLine = $('#slide-container'),
    slideControls = $('#slide-controls li'),
    counter = 0,
    imageWidth = 964,
    imageHeight = 499,
    sI;

function scrollImages () {

    if (counter === 8) {
        counter = 0;
    }

    var left = counter * imageWidth;
    var top = counter * imageHeight;
    
    imageLine.animate({
//        left: -left + 'px',
        top: -top + 'px'
    }, 500);
    
    
    $('#slide-controls li.hover').toggleClass('hover');
    $(slideControls[counter]).toggleClass('hover');

    counter++;
}

function iniIterval () {
    sI = window.setInterval(scrollImages, 5000);
}

slideControls.each(function(index, element) {
    $(this).on('click', function (el) {
        counter = index;
        window.clearInterval(sI);
        scrollImages();
        iniIterval();
    });
});

iniIterval();


