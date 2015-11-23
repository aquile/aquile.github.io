String.prototype.nl2br = function() {
    return !this ? '' : this.replace(/\r?\n/g, '<br/>');
};

function trunkateText(index, el) {
    var elHeight = $(el).height(),
        inn = $(el).find('div')[0];
    while ($(inn).outerHeight() > elHeight) {
        $(inn).text(function (index, text) {
            return text.replace(/\S*\s(\S)*$/, '...');
        });
    }
}

function initMenus() {
    var path = window.location.pathname,
        links = $('ul.menu>li>a');
    
    links.each(function (index, el) {
        var link = $(el);
        if (link.attr('href') === path) {
            link.css({
                color: '#000',
//                fontWeight: 'bold',
                textDecoration: 'underline'
            });
        }
    });
}

/**
 * Для отправки запроса нужно просто создать форму с классом proxyform
 * Значение полей уйдет в массиве, где ключ - это название поля
 * <form action="{$action}" class="proxyform">
 *     <input name="$_POST['somename']" required="1" errorText="Какой-то текст ошибки"/>
 *     <SOMETAG class="submitbutton"></SOMETAG>
 * </form>
 */
function initForms(selector) {
    
    var requestUrl = '/request/request.php',
        forms = selector ? $(selector) : $('form.proxyform');
    
    forms.each(function (index, form) {
        var submitBtn = $(form).find('.submitbutton');
        $(submitBtn).on('click', function () {
            $(form).submit();
        });
        form.onsubmit = function () {
            if (this.inprogress) {
                return false;
            }
            this.inprogress = true;
            // Collect data
            var action = $(this).attr('action'),
                i, required, errorText, field, value,
                Jform = $(this),
                button =  $(this).find('.submitbutton'),
                progressButtonText = $(button).attr('progresstext'),
                initialButtonText =  $(button).html(),
                onFinish = new Function(Jform.attr('onfinish')),
                onSuccess = new Function(Jform.attr('onsuccess')),
                onFail = new Function(Jform.attr('onfail')),
                fields = this.elements,
                n = fields.length,
                data = {
                    action: action
                };
            
            
            for (i = 0; i < n; i++) {
                field = $(fields[i]);
                value = field.val();
                required = field.attr('required');
                errorText = field.attr('errortext');
                
                if (field.attr('type') == 'radio') {
                    value = Jform.find('input[name=' + field.attr('name') + ']:checked').val();
                }
                
                if (required && !value.length) {
                    Dialog.show({
                        msg: errorText,
                        onOk: function () {
                            $(field).focus();
                        }
                    });
                    this.inprogress = false;
                    return false;
                } 
                data[field.attr('name')] = value;
            }
            
            // Progress
            $(button).html(progressButtonText);
            
            // Send form
            $.post(requestUrl, data, function(data) {
                if (action == 'new_order') {
                    window.location.replace('/thankyou');
                } else {
                    if (data.info && !data.hideNotification) {
                        Dialog.show({
                            msg: data.info
                        });
                    }
                    if (data.success) {
                        onSuccess(data);
                    } else {
                        onFail(data);
                    }
                    Jform[0].reset();
                }
            }).fail(function () {
                Dialog.show({
                    msg: 'Нарушена связть с сервером. Повторите попытку позже'
                });
            }).always(function () {
                Jform[0].inprogress = false;
                $(button).html(initialButtonText);                
                onFinish();
            });
            return false;
        };
    });
}

function initLessons() {
    var requestUrl = '/request/request.php',
        loaderHtml = '<img src="/templates/general/images/loading-20.gif" />',
        loaderHtmlYellow = '<img src="/templates/general/images/ajax-loader-yellow.gif" />',
        lessonBtns = $('.lesson_button');

    lessonBtns.each(function(index, btn) {
        $(btn).on('click', function(btn) {
            this.inprogress = true;
            var text, confirma,
                loader = loaderHtml,
                Jbtn = $(this),
                lessonID = Jbtn.attr('lessonID'),
                lessonType = Jbtn.attr('lessontype'),
                lessonDay = Jbtn.attr('lessonday'),
                action = Jbtn.attr('lessonact'),
                initText = Jbtn.html(),
                okBtnText = 'Да',
                noBtnText = 'Отмена',
                params = {
                    lessonID: lessonID,
                    action: 'lesson_' + action
                };

            switch (action) {
                case 'reg': 
                    if (userRegistrations && userRegistrations[lessonDay] && userRegistrations[lessonDay].indexOf(lessonType) !== -1) {
                        text = '<div style="width: 370px; font-size: 14px;"><div class="dialog_content_title">Уважаемый студент!</div><div style="padding: 5px 0px">Вы уже осуществили регистрацию на занятие с этой темой сегодня</div><div style="padding: 5px 0px;">Обращаем Ваше внимание, что повторная регистрация на занятие может лишить возможности посетить занятие другому студенту</div><div style="padding: 5px 0px">Вы уверены что хотите продолжить регистрацию на повторное занятие?</div></div>';
                    } else {
                        text = 'Вы точно хотите записаться на это занятие?';
                    }
                    okBtnText = 'Зарегистрироваться';
                    break;
                case 'unreg': text = 'Вы точно хотите отказаться от этого занятия?'; break;
                case 'wait': text = 'Вы точно хотите стать в очередь на это занятие?'; break;
                case 'unwait': text = 'Вы точно хотите уйти с очереди на это занятие?'; break;
                case 'votefornew':
                case 'unvotefornew':
                    loader = loaderHtmlYellow;
                    break;
            }
            
            Dialog.show({
                noTitle: true,
                noBtn: true,
                msg: text,
                okBtnText: okBtnText,
                noBtnText: noBtnText,
                onOk: function () {
                    Jbtn.html(loader);
                    $.post(requestUrl, params, function (data) {
                        if (data.success) {
                            window.location.reload();
                        } else {
                            Dialog.show({
                                msg: (data.info || 'Произошла ошибка. Повторите попытку позже'),
                                onOk: function () {
                                    if (data.errorno == 202) {
                                        window.location.reload(); 
                                    }
                                }
                            });
                            this.inprogress = false;
                            Jbtn.html(initText);
                        }
                    }).fail(function () {
                        Dialog.show({
                            msg: 'Нарушена связть с сервером. Повторите попытку позже'
                        });
                        this.inprogress = false;
                        Jbtn.html(initText);
                    });
                }
            });
        });
    });
}

var Timer = function (fieldSelector, timeInSec, onTimeEnd) {
    var startTime = new Date();
    var self = this;
    var field = $(fieldSelector);
    
    function drowTime (startTime, timeInSec) {
        var t = new Date();
        var secPassed = Math.round((t.getTime() - startTime.getTime()) / 1000);
        var secLeft = timeInSec - secPassed;
        var str = '';
        
        if (secLeft <= 0) {
            str = 'время вышло';
            this.destroy();
            if (onTimeEnd) {
                onTimeEnd();
            }
        } else {
            str = this.toHHMMSS(secLeft);
        }
        
        field.html(str);
    };
    
    this.destroy = function () {
        window.clearInterval(timer);
    };
    this.toHHMMSS = function(seconds) {
        var sec_num = parseInt(seconds, 10); // don't forget the second parm
        var hours   = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds = sec_num - (hours * 3600) - (minutes * 60);

        if (hours   < 10) {hours   = "0" + hours;}
        if (minutes < 10) {minutes = "0" + minutes;}
        if (seconds < 10) {seconds = "0" + seconds;}
        var time    = hours+':'+minutes+':' + seconds;
        return time;
    };


    if (typeof timeInSec === 'number' && !isNaN(timeInSec)) {
        var timer = window.setInterval(function () {
            drowTime.call(self, startTime, timeInSec);
        }, 1000);
        field.html(this.toHHMMSS(timeInSec));
    } else {
        field.html('');
    }
    
};

var ssPopup = {
    popup: undefined,
    container: undefined,

    init: function (selector, operatorSelector) {
        var operator = $(operatorSelector);

        this.container = $(selector);
        this.popup = $(this.container.find('.popup_content')[0]);
        this.closeBtn = $(this.container.find('.close_btn'));
        
        this.container.on('mousewheel', function (e) {
            e.preventDefault();
            e.stopPropagation();
        }).on('click', function () {
            ssPopup.hide();
        });

        this.popup.on('click', function (e) {
            e.stopPropagation();
        });

        this.closeBtn.on('click', function () {
            ssPopup.hide();
        });

        operator.on('click', function () {
            ssPopup.show();
        });
        operator.css({
            top: (($(window).height() - operator.height()) / 2) + 'px'
        });
    },
    show: function () {
        this.container.css('display', 'block');
        
        var wHeight= $(window).height(),
            wWidth = $(window).width(),
            pHeight = this.popup.height(),
            pWidth = this.popup.width(),
            top = (wHeight - pHeight) / 2,
            left = (wWidth - pWidth) / 2;

        this.popup.css({
            top: top + 'px',
            left: left + 'px'
        });
        
        $(document.body).addClass('popuped');
    },
    hide: function () {
        this.container.css('display', 'none');
        $(document.body).removeClass('popuped');
    }
};

var testPopup = function (config) {
    var testType, loader, operator, container, 
        popup, closeBtn, testQuestion, nextBtn;
    
    if (!config.selector) {
        console.error('Не указан селектор теста');
        return false;
    }
    container = $(config.selector);
    popup = $(container.find('.abs_shadow')[0]);
    closeBtn = $(container.find('.close_btn'));
    if (config.operatorSelector) {
        operator = $(config.operatorSelector);
    }
    testQuestion = {
        transactionId: $(container.find('input[name=transaction_id]')[0]),
        questionId  : $(container.find('input[name=question_id]')[0]),
        testName    : $(container.find('.testname')[0]),
        minValue    : $(container.find('.minvalue')[0]),
        progressInfo: $(container.find('.progressinfo')[0]),
        timeLeft    : $(container.find('.timeleft')[0]),
        groupTitle  : $(container.find('.test_group_title')[0]),
        questionBody : $(container.find('.test_question')[0])
    };
    nextBtn = $(container.find('.myButton')[0]);
    loader = $(container.find('.loader')[0]);
    testType = config.testType;

    return {
        timer: undefined,
        init: function () {
            var self = this;
            // Handle events
            container.on('mousewheel', function (e) {
                e.preventDefault();
                e.stopPropagation();
            });
            popup.on('click', function (e) {
                e.stopPropagation();
            });
            if (closeBtn) {
                closeBtn.on('click', function () {
                    testPopup.hide();
                });
            }
            if (operator) {
                operator.on('click', function () {
                    testPopup.show();
                });
                operator.css({
                    top: (($(window).height() - operator.height()) / 2) + 'px'
                });
            }
            if (nextBtn) {
                nextBtn.on('click', function () {
                    self.submitNext();
                });
            }
        },
        show: function (testId) {
            container.css('display', 'block');

            var wHeight= $(window).height(),
                wWidth = $(window).width(),
                pHeight = popup.height(),
                pWidth = popup.width(),
                top = (wHeight - pHeight) / 2,
                left = (wWidth - pWidth) / 2;

            popup.css({
                top: top + 'px',
                left: left + 'px'
            });

            $(document.body).addClass('popuped');

            this.startTest(testId);
        },
        hide: function () {
            container.css('display', 'none');
            $(document.body).removeClass('popuped');
        },

        submitNext: function () {
            // Collect data for submit;
            var answerInputs = container.find('input[name="answer"]'),
                answer = [],
                questionId = testQuestion.questionId.val(),
                transactionId = testQuestion.transactionId.val();

            for (var i = 0, n = answerInputs.length; i < n; i++) {
                answer.push(answerInputs[i].value);
            }

            this.showLoading();
            this.sendRequest({
                data: {
                    action: 'submit_question',
                    questionId: questionId,
                    answer: answer,
                    transactionId: transactionId
                },
                onSuccess: function(data) {
                    this.updateTimer(data.data);
                    this.updateTestInfo(data.data);
                    this.updateQuestion(data.data);
                    
                    if (data.data.action == 'finish') {
                        this.onTestFinish(data.data.testInfo);
                    } else if (data.data.action == 'show_message') {
                        Dialog.show({
                            msg: data.data.msg,
                            onOk: function () {
                                window.location.reload();
                            }
                        });
                    }
                },
                onFail: function () {
                    this.hide();
                },
                onFinish: function() {
                    this.hideLoading();
                }
            });
        },

        startTest: function (testId) {
            this.showLoading();
            this.sendRequest({
                data: {
                    action: 'start_test',
                    testId: testId,
                    testType: testType
                },
                onSuccess: function(data) {
                    this.updateTimer(data.data);
                    this.updateTestInfo(data.data);
                    this.updateQuestion(data.data);
                    
                    if (data.data.action == 'finish') {
                        this.onTestFinish(data.data.testInfo);
                    } else if (data.data.action == 'display_message') {
                        Dialog.show({
                            msg: data.data.msg,
                            onOk: function () {
                                window.location.reload();
                            }
                        });
                    }
                },
                onFail: function () {
                    this.hide();
                },
                onFinish: function() {
                    this.hideLoading();
                }
            });
        },

        /**
         * 1. Текущий прогресс
         * 2. Сколько времени осталось
         */
        updateTestInfo: function (info) {
            var self = this;
            testQuestion.transactionId.val(info.transactionId || '');
            testQuestion.testName.html(info.testName || '');
            testQuestion.minValue.html(info.successRate ? info.successRate + '%' : '');
            testQuestion.progressInfo.html(info.points || '');
            
            if (this.timer) {
                this.timer.destroy();
            }
            this.timer = new Timer(testQuestion.timeLeft, info.timeLeft, function () {
                self.submitNext();
            });
//            testQuestion.timeLeft.html(info.timeLeft ? toHHMMSS(info.timeLeft) : '');
        },

        /** 
         * 1. Обновить группу
         * 2. Обновить вопрос
         */
        updateQuestion: function (info) {
            var qInfo = info.questionInfo;
            
            testQuestion.questionId.val(qInfo ? qInfo.id : '');
            testQuestion.groupTitle.html(qInfo ? '<div style="font-weight: bold; padding-bottom: 10px;">Question #' + qInfo.qnumber + '</div>' + qInfo.groupName : '');
            testQuestion.questionBody.html(qInfo ?  this.parseQuestion(qInfo.body).nl2br() : '');
            testQuestion.questionBody.find('input.autosize').autoGrowInput({
                comfortZone: 20,
                maxWidth: 300
            });
        },
        
        onTestFinish: function (info) {
            var msg = '';
            this.hide();
            if (info.status === 2) {
                msg = '<div style="color:green; font-weight: bold; padding: 0 0 10px 0;">Вы успешно прошли тест</div>';
                if (testType === 1) {
                    msg += 'Свяжитесь с вашим консультантом для прохождения устной части тестирования';
                }
            } else {
                msg = '<div style="padding: 0 0 10px 0; color: #555; font-weight: bold">Вы не прошли тест!</div>Попытайтесь еще раз';
            }
            Dialog.show({
                msg: msg,
                onOk: function () {
                    window.location.reload();
                }
            });
        },
        
        updateProgressbar: function (info) {

        },

        updateTimer: function (info) {

        },

        showError: function () {

        },

        parseQuestion: function (question) {
            return question.replace(/\{\}/gi, function (match) {
                return '<input type="text" name="answer" AUTOCOMPLETE="off"  class="test_input autosize"/> ';
            });
        },

        showLoading: function () {
            var parentHeight = loader.parent().height();
            loader.css({
                'height' : parentHeight + 'px',
                'marginTop' :  - parentHeight + 'px',
                'display': 'block',
                'lineHeight' : parentHeight + 'px'
            });
        },

        hideLoading: function () {
            loader.css({
                display: 'none'
            });
        },

        /**
         * @param {Object} params
         * @param {Object} params.callback Success calback
         * @param {Object} params.data request data
         */
        sendRequest: function (params) {
            var requestUrl = '/request/test.php',
                data = params.data || {},
                onSuccess = params.onSuccess,
                onFail = params.onFail,
                onFinish = params.onFinish,
                self = this;

            $.post(requestUrl, data, function(data) {
                if (data.info) {
                    Dialog.show({
                        msg: data.info
                    });
                }
                if (data.success) {
                    onSuccess.call(self, data);
                } else {
                    onFail.call(self, this);
                }
            }).fail(function () {
                Dialog.show({
                    msg: 'Нарушена связть с сервером. Повторите попытку позже'
                });
                onFail.call(self, this);
            }).always(function () {
                onFinish.call(self, this);
            });
        }
    };
};

var orderPopup = {
    popup: undefined,
    container: undefined,

    init: function (selector, operatorSelector) {
        var operator = $(operatorSelector);

        this.container = $(selector);
        this.popup = $(this.container.find('.popup_content')[0]);
        this.closeBtn = $(this.container.find('.close_btn'));
        this.abtype = this.container.find('input[name=abtype]')[0];
        
        this.container.on('mousewheel', function (e) {
            e.preventDefault();
            e.stopPropagation();
        }).on('click', function () {
            orderPopup.hide();
        });

        this.popup.on('click', function (e) {
            e.stopPropagation();
        });

        this.closeBtn.on('click', function () {
            orderPopup.hide();
        });

        operator.on('click', function () {
            var btn = $(this),
                type = btn.attr('stype');
            orderPopup.show(type);
        });
        operator.css({
            top: (($(window).height() - operator.height()) / 2) + 'px'
        });
    },

    show: function (typeVal) {
        this.abtype.value = typeVal;
        this.container.css('display', 'block');
        
        var wHeight= $(window).height(),
            wWidth = $(window).width(),
            pHeight = this.popup.height(),
            pWidth = this.popup.width(),
            top = (wHeight - pHeight) / 2,
            left = (wWidth - pWidth) / 2;

        this.popup.css({
            top: top + 'px',
            left: left + 'px'
        });
        
        $(document.body).addClass('popuped');
    },
    hide: function () {
        this.container.css('display', 'none');
        this.abtype.value = '';
        $(document.body).removeClass('popuped');
    }
};

function initCommentsContainer() {
    var teacherID,
        container = $('#teacher_comments_container');
        container.addClass('mask');
    if (container.length) {
        teacherID = container.attr('data:teacherID');
        $.get('/request/getComments.php', {
            teacherID: teacherID,
            page: 1
        }, function (data) {
            container.html(data);
        }).always(function () {
            container.removeClass('mask');
        });
        
        container.on('click', '.paging a', function () {
            container.addClass('mask');
            var page = $(this).attr('data:pageNo');
            $.get('/request/getComments.php', {
                teacherID: teacherID,
                page: page
            }, function (data) {
                container.html(data);
            }).always(function () {
                container.removeClass('mask');
            });
        });
    }
}

function initRatingContainer() {
    var stars, rating,
        container = $('#rating');
    
    if (container.length) {
        stars = container.find('.star_big');
        rating = container.find('input[name=rating]');
        stars.on('click', function (e) {
            var i,
                star = $(this),
                value = star.html();
            
            for (i = 0; i < 5; i++) {
                if (i < value) {
                    $(stars[i]).addClass('hover');
                } else {
                    $(stars[i]).removeClass('hover');
                }
            }
            rating.val(value);
        });
    }
}

function initGallery () {
    $('.image_float img').on('click', function () {
        var src = $(this).attr('original');
        Popup.show({
            type: 'image',
            src : src
        });
    });
}

function initGalleryVideo () {
    $('.play_video_icon').on('click', function () {
        var src = $(this).attr('original');
        Popup.show({
            type: 'video',
            src : src
        });
    });
}

function initSchedule () {
    $('#change_school').click(function () {
        $.cookie("st_current_school", $('#schedule_school').val());
        window.location.reload();
    });
}

function initPolls () {
    if (typeof pollToShow != 'undefined' && JSON && JSON.parse) {
        var options = JSON.parse(pollToShow.options);
        var msg = '<div class="poll">'
            + '<div class="poll-title">' + pollToShow.question + '</div>'
            +   '<div class="poll-options">'
            +      '<form id="poll-form" action="answer_poll" class="proxyform" onsuccess="Dialog.close()">'
            +       '<input type="hidden" name="question" value="' + pollToShow.id + '" />';
        
        for (var i = 0, n = options.length; i < n; i++) {
            msg +=      '<label><input type="radio" name="answer" value="' + i + '" required="1" errortext="Выберите, пожалуйста, один из вариантов" /> ' + options[i] + ' </label>';
        }
        
        msg +=     '</form>'   
            +   '</div>'
            + '</div>';
        Dialog.show({
            title: 'Опрос',
            msg: msg,
            onOk: function () {
                var valid,
                    form = $('#poll-form'),
                    checked = form.find('input:checked');

                if (checked.length) {
                    initForms('#poll-form');
                    form.submit();
                } else {
                    alert('Выберите, пожалуйста, один из вариантов!');
                    return false;
                }
            }
        });
    }
}

function initImageScroller (selector) {
    var galleryAnimationInerval,
        container = $(selector),
        timeout = 5000,
        width = container.width(),
        inner = container.find('.gellery-container-inner'),
        arrowLeft = container.find('.gellery-container-arrow.left'),
        arrowRight = container.find('.gellery-container-arrow.right');
        anim = function (dir) {
            if (!dir) {
                dir = 1;
            }
            var current = -(parseInt(inner.css('left')) || 0) + (dir * width);
            if (current >= inner.width()) {
                current = 0;
            } else if (current < 0) {
                current = inner.width() - width;
            }
            inner.animate({
                left:  -current + 'px'
            }, 400);
        };
    
    if (inner.width() == width) {
        return;
    }
    
    galleryAnimationInerval = setInterval(anim, timeout);
    
    arrowRight.on('click', function () {
        clearInterval(galleryAnimationInerval);
        anim(1);
        galleryAnimationInerval = setInterval(anim, timeout);
    });
    arrowLeft.on('click', function () {
        clearInterval(galleryAnimationInerval);
        anim(-1);
        galleryAnimationInerval = setInterval(anim, timeout);
    });
}

$(function (){
    var truncateEl = $('.ellipsis');
    truncateEl.each(trunkateText);
    
    // Menu initialization
    initMenus();
    
    // Init forms
    initForms();
    
    // Init lessons
    initLessons();
    
    // init order popup
    ssPopup.init('#order_popup', '#popup_control');

    orderPopup.init('#order_popup2', '.order_btn');

    // Init comments
    initCommentsContainer();
    
    // Init rating container
    initRatingContainer();
    
    initGallery();
    initGalleryVideo();
    
    initSchedule();
    
    initPolls();
    // Init autosize inputs
    $('input.autosize').autoGrowInput({
        comfortZone: 20,
        maxWidth: 300
    });
    
    initImageScroller('.gellery-container');
});

(function($){
    $.fn.autoGrowInput = function(o) {

        o = $.extend({
            maxWidth: 1000,
            minWidth: 0,
            comfortZone: 70
        }, o);

        this.filter('input:text').each(function(){

            var minWidth = o.minWidth || $(this).width(),
                val = '',
                input = $(this),
                testSubject = $('<tester/>').css({
                    position: 'absolute',
                    top: -9999,
                    left: -9999,
                    width: 'auto',
                    fontSize: input.css('fontSize'),
                    fontFamily: input.css('fontFamily'),
                    fontWeight: input.css('fontWeight'),
                    letterSpacing: input.css('letterSpacing'),
                    whiteSpace: 'nowrap'
                }),
                check = function() {

                    if (val === (val = input.val())) {return;}

                    // Enter new content into testSubject
                    var escaped = val.replace(/&/g, '&amp;').replace(/\s/g,' ').replace(/</g, '&lt;').replace(/>/g, '&gt;');
                    testSubject.html(escaped);

                    // Calculate new width + whether to change
                    var testerWidth = testSubject.width(),
                        newWidth = (testerWidth + o.comfortZone) >= minWidth ? testerWidth + o.comfortZone : minWidth,
                        currentWidth = input.width(),
                        isValidWidthChange = (newWidth < currentWidth && newWidth >= minWidth)
                                             || (newWidth > minWidth && newWidth < o.maxWidth);

                    // Animate width
                    if (isValidWidthChange) {
                        input.width(newWidth);
                    }

                };

            testSubject.insertAfter(input);

            $(this).bind('keyup keydown blur update', check);

        });

        return this;

    };
}($));



