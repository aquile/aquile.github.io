var scrollInProgress = false;
var currentPageIndex = 0;
function updatePageHeight() {
    var wHeight = $(window).height();
    $('#pageholder, .page').css({
        height: wHeight + 'px'
    });
    scrollToPage(currentPageIndex);
}
function scrollToPage(pageIndex) {
    if (scrollInProgress) {
        return;
    }
    scrollInProgress = true;
    var pHolder = $('#pageholder'),
            baseHeight = pHolder.height();

    $('#pageholder').animate({
        scrollTop: baseHeight * Math.ceil(Number(pageIndex))
    }, 600, function() {
        scrollInProgress = false;
        currentPageIndex = pageIndex;
    });
}
updatePageHeight();

$('a.menuitemlink').on('click', function() {
    var pageIndex = $(this).attr('pageindex');
    if (!isNaN(parseInt(pageIndex))) {
        scrollToPage(pageIndex);
    }
});
window.onresize = updatePageHeight;
window.onmousewheel = function (e) {
    e.preventDefault();
    if (scrollInProgress) {
        return;
    }
    var pageHolder = $('#pageholder'),
        moveTop = e.wheelDelta > 0,
        pageIndex = pageHolder.scrollTop() / $(window).height();

    scrollToPage(pageIndex + (moveTop ? -1 : 1));
};