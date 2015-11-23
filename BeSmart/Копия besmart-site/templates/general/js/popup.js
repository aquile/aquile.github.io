var Popup;

$(function () {
    Popup = (function () {
        // Create html
        var border = document.createElement('div');
        var inner = document.createElement('div');
        var closeBtn = document.createElement('div');

        border.className = 'stpopup';
        inner.className = 'inner';
        closeBtn.className = 'closebtn';

        border.appendChild(closeBtn);
        border.appendChild(inner);
        border.onclick = closeBtn.onclick = function () {
            Popup.hide();
        };
        document.body.appendChild(border);

        return {
            /**
             * @param {Object} config popup configuration
             * @param {String} config.type  image or video
             * @param {String} config.src   content
             */
            show: function (config) {
                border.style.display = 'block';
                if (config.type === 'image') {
                    this.showImage(config.src);
                } else if (config.type === 'video') {
                    this.showVideo(config.src);
                }
            },

            showImage: function (src) {
                var image = document.createElement('img');
                    image.onload = this.syncSize;
                    image.className = 'gallery_original_image';
                    image.src = src;
                    
                window.onresize = function () {
                    Popup.syncSize.call(image);
                };
            },

            showVideo: function (src) {
                var iframe = document.createElement('iframe');
                    iframe.width = '853';
                    iframe.height = '480';
                    iframe.allowfullscreen = true;
                    iframe.frameborder = '0';
                    iframe.src = '//www.youtube.com/embed/' + src + '?rel=0';
                
                this.syncSize.call(iframe);

                window.onresize = function () {
                    Popup.syncSize.call(iframe);
                };
            },

            hide: function () {
                inner.innerHTML = '';
                border.style.display = 'none';
                closeBtn.style.display = 'none';
                window.onresize = null;
            },
            syncSize: function () {
                inner.innerHTML = '';
                inner.appendChild(this);
                var wHeight= $(window).height(),
                    wWidth = $(window).width(),
                    pHeight = $(this).height(),
                    pWidth = $(this).width(),
                    top = (wHeight - pHeight) / 2,
                    left = (wWidth - pWidth) / 2;
            
                $(inner).css({
                    top: top + 'px',
                    left: left + 'px'
                });
                
                var closeBtnLeft = $(inner).offset().left + $(inner).width() + 8,
                    closeBtnTop = $(inner).offset().top - 12;

                $(this).css({
                    visibility: 'visible'
                });
                
                
                $(closeBtn).css({
                    left: closeBtnLeft + 'px',
                    top: closeBtnTop + 'px',
                    display: 'block'
                });
            }
        };

    })();
});
