/**
 * Created by Garbovskiy on 14.07.2015.
 */
var theToggle = document.getElementById('toggle');

// hasClass
function hasClass(elem, className) {
    return new RegExp(' ' + className + ' ').test(' ' + elem.className + ' ');
}
// addClass
function addClass(elem, className) {
    if (!hasClass(elem, className)) {
        elem.className += ' ' + className;
    }
}
// removeClass
function removeClass(elem, className) {
    var newClass = ' ' + elem.className.replace(/[\t\r\n]/g, ' ') + ' ';
    if (hasClass(elem, className)) {
        while (newClass.indexOf(' ' + className + ' ') >= 0) {
            newClass = newClass.replace(' ' + className + ' ', ' ');
        }
        elem.className = newClass.replace(/^\s+|\s+$/g, '');
    }
}
// toggleClass
function toggleClass(elem, className) {
    var newClass = ' ' + elem.className.replace(/[\t\r\n]/g, " ") + ' ';
    if (hasClass(elem, className)) {
        while (newClass.indexOf(" " + className + " ") >= 0) {
            newClass = newClass.replace(" " + className + " ", " ");
        }
        elem.className = newClass.replace(/^\s+|\s+$/g, '');
    } else {
        elem.className += ' ' + className;
    }
}

theToggle.onclick = function () {
    toggleClass(this, 'on');
    return false;
};

// Scroll to anchor tag function
var scroll = function () {

    var $root = $('html, body');

    $('.goto').click(function () {
        var $gotoid = $(this).prop('id');
        var $justid = $gotoid.replace('goto', '');

        if (typeof $("#" + $justid) != undefined) { // test if target exists
            $root.animate({
                scrollTop: $("#" + $justid).offset().top - $('#header').height()
            }, 1000);
        }
        $('.goto_active_yes').removeClass('goto_active_yes');
        $(this).addClass('goto_active_yes');
        $('#toggle').click(removeClass(theToggle, 'on'));
        return false;
    });
};

$(document).ready(scroll);

// Slider function
var slider = function () {

    var img01 = {"background-image": "url(" + $(".slide1").data("img") + ")"};
    var img02 = {"background-image": "url(" + $(".slide2").data("img") + ")"};
    var img03 = {"background-image": "url(" + $(".slide3").data("img") + ")"};
    var img04 = {"background-image": "url(" + $(".slide4").data("img") + ")"};

    var bgColorUl = {backgroundColor: "rgba(255,255,255, 0.4)"};
    var bgColorUlActive = {background: "rgba(54,  135, 58, 0.8)"};

    $(".slide1").css(img01);
    $(".slide2").css(img02);
    $(".slide3").css(img03);
    $(".slide4").css(img04);

    $("#slide1").click(function () {
        $(".slider-controls li").css(bgColorUl);
        $(".slide2,.slide3").fadeOut();
        $(".slide1").fadeIn();
        $(this).css(bgColorUlActive);
    });
    $("#slide2").click(function () {
        $(".slider-controls li").css(bgColorUl);
        $(".slide1,.slide3").fadeOut();
        $(".slide2").fadeIn();
        $(this).css(bgColorUlActive);
    });
    $("#slide3").click(function () {
        $(".slider-controls li").css(bgColorUl);
        $(".slide1,.slide2").fadeOut();
        $(".slide3").fadeIn();
        $(this).css(bgColorUlActive);
    });
};

$(document).ready(slider);

// Youtube video playing function
var playVideo = function () {
    $('#gotovideo').on('click', function (ev) {

        $("#video")[0].src += "&autoplay=1";
        ev.preventDefault();

    });
};

$(document).ready(playVideo);