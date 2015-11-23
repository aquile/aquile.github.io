/**
 * Modal alert library
 * 1. Requires JQuery library
 * 2. Need include just after Jquery lib
 * 
 * Usage:
    Dialog.show({
        title: 'AAA',
        msg: '',
        onOK: function () {

        }
    });
<div id="dialog_popup" class="popup_window" style="display: block">
            <div class="dialog_content">
                <div class="dialog_content_title"></div>
                <div class="dialog_content_msg">Вы не можете зарегистрироваться на урок, так как максимальное количество учеников(8) уже зарегистрировано</div>
                <div class="button dialog_popup_ok">OK</div>
            </div>
        </div>
 */
var DialogJSClass = function () {
    // constructor
    var emptyFn = function (){},
        onOk = emptyFn,
        synchPosition,
        _this = this,
        windowEl = document.createElement('div'),
        windowContent = document.createElement('div'),
        titleEl = document.createElement('div'),
        msgEl = document.createElement('div'),
        btnHolder = document.createElement('div'),
        okBtn = document.createElement('div'),
        noBtn = document.createElement('div');
    
    windowEl.className = 'dialog_window';
    windowContent.className = 'dialog_content';
    titleEl.className = 'dialog_content_title';
    msgEl.className = 'dialog_content_msg';
    btnHolder.className = 'dialog_btnholder';
    okBtn.className = 'button dialog_popup_ok';
    okBtn.innerHTML = 'OK';
    noBtn.className = 'button dialog_popup_ok';
    noBtn.innerHTML = 'ОТМЕНА';
    
    windowContent.appendChild(titleEl);
    windowContent.appendChild(msgEl);
    windowContent.appendChild(btnHolder);
    btnHolder.appendChild(okBtn);
    btnHolder.appendChild(noBtn);
    windowEl.appendChild(windowContent);
    
    synchPosition = function () {
        var wContent = $(windowContent),
            wHeight= $(window).height(),
            wWidth = $(window).width(),
            pHeight = wContent.height(),
            pWidth = wContent.width(),
            top = (wHeight - pHeight) / 2,
            left = (wWidth - pWidth) / 2;

        wContent.css({
            top: top + 'px',
            left: left + 'px'
        });
    };
    document.body.appendChild(windowEl);

    okBtn.onclick = function () {
        if (onOk(_this.close) !== false) {
            _this.close();
        }
    };
    noBtn.onclick = function () {
        _this.close();
    };
    // Public Methods
    this.show = function (cfg) {
        titleEl.innerHTML = cfg.title || 'Уведомление';
        msgEl.innerHTML = cfg.msg;
        okBtn.innerHTML = cfg.okBtnText || 'ОК';
        noBtn.innerHTML = cfg.noBtnText || 'ОТМЕНА';
        if (cfg.noTitle) {
            titleEl.style.display = 'none';
        } else {
            titleEl.style.display = null;
        }
        if (cfg.noBtn) {
            noBtn.style.display = null;
        } else {
            noBtn.style.display = 'none';
        }
        
        if (cfg.onOk) {
            onOk = cfg.onOk;
        }
        windowEl.style.display = 'block';
        synchPosition();
        $(document.body).addClass('popuped');
    };
    this.close = function () {
        windowEl.style.display = null;
        titleEl.innerHTML = '';
        msgEl.innerHTML = '';
        onOk = emptyFn;
        $(document.body).removeClass('popuped');
    };
};

var Dialog;
$(function () {
    Dialog = new DialogJSClass();
});