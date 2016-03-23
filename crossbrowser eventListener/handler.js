var addEvent = function (object, type, callback) {
    if (object == null || typeof(object) == 'undefined') return;
    if (object.addEventListener) {
        object.addEventListener(type, callback, false);
    } else if (object.attachEvent) {
        object.attachEvent("on" + type, callback);
    } else {
        object["on" + type] = callback;
    }
};
//таким образом робиш конструктора для собітій
addEvent(window, "resize", function () {
    resizeSlides();
    setSlideItemWidth();
});
