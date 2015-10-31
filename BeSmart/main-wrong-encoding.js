String.prototype.nl2br = function () {
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
 * Р”Р»СЏ РѕС‚РїСЂР°РІРєРё Р·Р°РїСЂРѕСЃР° РЅСѓР¶РЅРѕ РїСЂРѕСЃС‚Рѕ СЃРѕР·РґР°С‚СЊ С„РѕСЂРјСѓ СЃ РєР»Р°СЃСЃРѕРј proxyform
 * Р—РЅР°С‡РµРЅРёРµ РїРѕР»РµР№ СѓР№РґРµС‚ РІ РјР°СЃСЃРёРІРµ, РіРґРµ РєР»СЋС‡ - СЌС‚Рѕ РЅР°Р·РІР°РЅРёРµ РїРѕР»СЏ
 * <form action="{$action}" class="proxyform">
 *     <input name="$_POST['somename']" required="1" errorText="РљР°РєРѕР№-С‚Рѕ С‚РµРєСЃС‚ РѕС€РёР±РєРё"/>
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
                button = $(this).find('.submitbutton'),
                progressButtonText = $(button).attr('progresstext'),
                initialButtonText = $(button).html(),
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
            $.post(requestUrl, data, function (data) {
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
                    msg: 'РќР°СЂСѓС€РµРЅР° СЃРІСЏР·С‚СЊ СЃ СЃРµСЂРІРµСЂРѕРј. РџРѕРІС‚РѕСЂРёС‚Рµ РїРѕРїС‹С‚РєСѓ РїРѕР·Р¶Рµ'
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

    lessonBtns.each(function (index, btn) {
        $(btn).on('click', function (btn) {
            this.inprogress = true;
            var text, confirma,
                loader = loaderHtml,
                Jbtn = $(this),
                lessonID = Jbtn.attr('lessonID'),
                lessonType = Jbtn.attr('lessontype'),
                lessonDay = Jbtn.attr('lessonday'),
                action = Jbtn.attr('lessonact'),
                initText = Jbtn.html(),
                okBtnText = 'Р”Р°',
                noBtnText = 'РћС‚РјРµРЅР°',
                params = {
                    lessonID: lessonID,
                    action: 'lesson_' + action
                };

            switch (action) {
                case 'reg':
                    if (userRegistrations && userRegistrations[lessonDay] && userRegistrations[lessonDay].indexOf(lessonType) !== -1) {
                        text = '<div style="width: 370px; font-size: 14px;"><div class="dialog_content_title">РЈРІР°Р¶Р°РµРјС‹Р№ СЃС‚СѓРґРµРЅС‚!</div><div style="padding: 5px 0px">Р’С‹ СѓР¶Рµ РѕСЃСѓС‰РµСЃС‚РІРёР»Рё СЂРµРіРёСЃС‚СЂР°С†РёСЋ РЅР° Р·Р°РЅСЏС‚РёРµ СЃ СЌС‚РѕР№ С‚РµРјРѕР№ СЃРµРіРѕРґРЅСЏ</div><div style="padding: 5px 0px;">РћР±СЂР°С‰Р°РµРј Р’Р°С€Рµ РІРЅРёРјР°РЅРёРµ, С‡С‚Рѕ РїРѕРІС‚РѕСЂРЅР°СЏ СЂРµРіРёСЃС‚СЂР°С†РёСЏ РЅР° Р·Р°РЅСЏС‚РёРµ РјРѕР¶РµС‚ Р»РёС€РёС‚СЊ РІРѕР·РјРѕР¶РЅРѕСЃС‚Рё РїРѕСЃРµС‚РёС‚СЊ Р·Р°РЅСЏС‚РёРµ РґСЂСѓРіРѕРјСѓ СЃС‚СѓРґРµРЅС‚Сѓ</div><div style="padding: 5px 0px">Р’С‹ СѓРІРµСЂРµРЅС‹ С‡С‚Рѕ С…РѕС‚РёС‚Рµ РїСЂРѕРґРѕР»Р¶РёС‚СЊ СЂРµРіРёСЃС‚СЂР°С†РёСЋ РЅР° РїРѕРІС‚РѕСЂРЅРѕРµ Р·Р°РЅСЏС‚РёРµ?</div></div>';
                    } else {
                        text = 'Р’С‹ С‚РѕС‡РЅРѕ С…РѕС‚РёС‚Рµ Р·Р°РїРёСЃР°С‚СЊСЃСЏ РЅР° СЌС‚Рѕ Р·Р°РЅСЏС‚РёРµ?';
                    }
                    okBtnText = 'Р—Р°СЂРµРіРёСЃС‚СЂРёСЂРѕРІР°С‚СЊСЃСЏ';
                    break;
                case 'unreg':
                    text = 'Р’С‹ С‚РѕС‡РЅРѕ С…РѕС‚РёС‚Рµ РѕС‚РєР°Р·Р°С‚СЊСЃСЏ РѕС‚ СЌС‚РѕРіРѕ Р·Р°РЅСЏС‚РёСЏ?';
                    break;
                case 'wait':
                    text = 'Р’С‹ С‚РѕС‡РЅРѕ С…РѕС‚РёС‚Рµ СЃС‚Р°С‚СЊ РІ РѕС‡РµСЂРµРґСЊ РЅР° СЌС‚Рѕ Р·Р°РЅСЏС‚РёРµ?';
                    break;
                case 'unwait':
                    text = 'Р’С‹ С‚РѕС‡РЅРѕ С…РѕС‚РёС‚Рµ СѓР№С‚Рё СЃ РѕС‡РµСЂРµРґРё РЅР° СЌС‚Рѕ Р·Р°РЅСЏС‚РёРµ?';
                    break;
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
                                msg: (data.info || 'РџСЂРѕРёР·РѕС€Р»Р° РѕС€РёР±РєР°. РџРѕРІС‚РѕСЂРёС‚Рµ РїРѕРїС‹С‚РєСѓ РїРѕР·Р¶Рµ'),
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
                            msg: 'РќР°СЂСѓС€РµРЅР° СЃРІСЏР·С‚СЊ СЃ СЃРµСЂРІРµСЂРѕРј. РџРѕРІС‚РѕСЂРёС‚Рµ РїРѕРїС‹С‚РєСѓ РїРѕР·Р¶Рµ'
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

    function drowTime(startTime, timeInSec) {
        var t = new Date();
        var secPassed = Math.round((t.getTime() - startTime.getTime()) / 1000);
        var secLeft = timeInSec - secPassed;
        var str = '';

        if (secLeft <= 0) {
            str = 'РІСЂРµРјСЏ РІС‹С€Р»Рѕ';
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
    this.toHHMMSS = function (seconds) {
        var sec_num = parseInt(seconds, 10); // don't forget the second parm
        var hours = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds = sec_num - (hours * 3600) - (minutes * 60);

        if (hours < 10) {
            hours = "0" + hours;
        }
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        var time = hours + ':' + minutes + ':' + seconds;
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

        var wHeight = $(window).height(),
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
        console.error('РќРµ СѓРєР°Р·Р°РЅ СЃРµР»РµРєС‚РѕСЂ С‚РµСЃС‚Р°');
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
        questionId: $(container.find('input[name=question_id]')[0]),
        testName: $(container.find('.testname')[0]),
        minValue: $(container.find('.minvalue')[0]),
        progressInfo: $(container.find('.progressinfo')[0]),
        timeLeft: $(container.find('.timeleft')[0]),
        groupTitle: $(container.find('.test_group_title')[0]),
        questionBody: $(container.find('.test_question')[0])
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

            var wHeight = $(window).height(),
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
                onSuccess: function (data) {
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
                onFinish: function () {
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
                onSuccess: function (data) {
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
                onFinish: function () {
                    this.hideLoading();
                }
            });
        },

        /**
         * 1. РўРµРєСѓС‰РёР№ РїСЂРѕРіСЂРµСЃСЃ
         * 2. РЎРєРѕР»СЊРєРѕ РІСЂРµРјРµРЅРё РѕСЃС‚Р°Р»РѕСЃСЊ
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
         * 1. РћР±РЅРѕРІРёС‚СЊ РіСЂСѓРїРїСѓ
         * 2. РћР±РЅРѕРІРёС‚СЊ РІРѕРїСЂРѕСЃ
         */
        updateQuestion: function (info) {
            var qInfo = info.questionInfo;

            testQuestion.questionId.val(qInfo ? qInfo.id : '');
            testQuestion.groupTitle.html(qInfo ? '<div style="font-weight: bold; padding-bottom: 10px;">Question #' + qInfo.qnumber + '</div>' + qInfo.groupName : '');
            testQuestion.questionBody.html(qInfo ? this.parseQuestion(qInfo.body).nl2br() : '');
            testQuestion.questionBody.find('input.autosize').autoGrowInput({
                comfortZone: 20,
                maxWidth: 300
            });
        },

        onTestFinish: function (info) {
            var msg = '';
            this.hide();
            if (info.status === 2) {
                msg = '<div style="color:green; font-weight: bold; padding: 0 0 10px 0;">Р’С‹ СѓСЃРїРµС€РЅРѕ РїСЂРѕС€Р»Рё С‚РµСЃС‚</div>';
                if (testType === 1) {
                    msg += 'РЎРІСЏР¶РёС‚РµСЃСЊ СЃ РІР°С€РёРј РєРѕРЅСЃСѓР»СЊС‚Р°РЅС‚РѕРј РґР»СЏ РїСЂРѕС…РѕР¶РґРµРЅРёСЏ СѓСЃС‚РЅРѕР№ С‡Р°СЃС‚Рё С‚РµСЃС‚РёСЂРѕРІР°РЅРёСЏ';
                }
            } else {
                msg = '<div style="padding: 0 0 10px 0; color: #555; font-weight: bold">Р’С‹ РЅРµ РїСЂРѕС€Р»Рё С‚РµСЃС‚!</div>РџРѕРїС‹С‚Р°Р№С‚РµСЃСЊ РµС‰Рµ СЂР°Р·';
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
                'height': parentHeight + 'px',
                'marginTop': -parentHeight + 'px',
                'display': 'block',
                'lineHeight': parentHeight + 'px'
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

            $.post(requestUrl, data, function (data) {
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
                    msg: 'РќР°СЂСѓС€РµРЅР° СЃРІСЏР·С‚СЊ СЃ СЃРµСЂРІРµСЂРѕРј. РџРѕРІС‚РѕСЂРёС‚Рµ РїРѕРїС‹С‚РєСѓ РїРѕР·Р¶Рµ'
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

        var wHeight = $(window).height(),
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

function initGallery() {
    $('.image_float img').on('click', function () {
        var src = $(this).attr('original');
        Popup.show({
            type: 'image',
            src: src
        });
    });
}

function initGalleryVideo() {
    $('.play_video_icon').on('click', function () {
        var src = $(this).attr('original');
        Popup.show({
            type: 'video',
            src: src
        });
    });
}

function initSchedule() {
    $('#change_school').click(function () {
        $.cookie("st_current_school", $('#schedule_school').val());
        window.location.reload();
    });
}

function initPolls() {
    if (typeof pollToShow != 'undefined' && JSON && JSON.parse) {
        var options = JSON.parse(pollToShow.options);
        var msg = '<div class="poll">'
            + '<div class="poll-title">' + pollToShow.question + '</div>'
            + '<div class="poll-options">'
            + '<form id="poll-form" action="answer_poll" class="proxyform" onsuccess="Dialog.close()">'
            + '<input type="hidden" name="question" value="' + pollToShow.id + '" />';

        for (var i = 0, n = options.length; i < n; i++) {
            msg += '<label><input type="radio" name="answer" value="' + i + '" required="1" errortext="Р’С‹Р±РµСЂРёС‚Рµ, РїРѕР¶Р°Р»СѓР№СЃС‚Р°, РѕРґРёРЅ РёР· РІР°СЂРёР°РЅС‚РѕРІ" /> ' + options[i] + ' </label>';
        }

        msg += '</form>'
            + '</div>'
            + '</div>';
        Dialog.show({
            title: 'РћРїСЂРѕСЃ',
            msg: msg,
            onOk: function () {
                var valid,
                    form = $('#poll-form'),
                    checked = form.find('input:checked');

                if (checked.length) {
                    initForms('#poll-form');
                    form.submit();
                } else {
                    alert('Р’С‹Р±РµСЂРёС‚Рµ, РїРѕР¶Р°Р»СѓР№СЃС‚Р°, РѕРґРёРЅ РёР· РІР°СЂРёР°РЅС‚РѕРІ!');
                    return false;
                }
            }
        });
    }
}

function initImageScroller(selector) {
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
            left: -current + 'px'
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

$(function () {
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

(function ($) {
    $.fn.autoGrowInput = function (o) {

        o = $.extend({
            maxWidth: 1000,
            minWidth: 0,
            comfortZone: 70
        }, o);

        this.filter('input:text').each(function () {

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
                check = function () {

                    if (val === (val = input.val())) {
                        return;
                    }

                    // Enter new content into testSubject
                    var escaped = val.replace(/&/g, '&amp;').replace(/\s/g, ' ').replace(/</g, '&lt;').replace(/>/g, '&gt;');
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

// Created by aquile_bernadotte on 23.10.15;
//add classList in IE 9 and earlier
/*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js */
if("document" in self){if(!("classList" in document.createElement("_"))){(function(j){"use strict";if(!("Element" in j)){return}var a="classList",f="prototype",m=j.Element[f],b=Object,k=String[f].trim||function(){return this.replace(/^\s+|\s+$/g,"")},c=Array[f].indexOf||function(q){var p=0,o=this.length;for(;p<o;p++){if(p in this&&this[p]===q){return p}}return -1},n=function(o,p){this.name=o;this.code=DOMException[o];this.message=p},g=function(p,o){if(o===""){throw new n("SYNTAX_ERR","An invalid or illegal string was specified")}if(/\s/.test(o)){throw new n("INVALID_CHARACTER_ERR","String contains an invalid character")}return c.call(p,o)},d=function(s){var r=k.call(s.getAttribute("class")||""),q=r?r.split(/\s+/):[],p=0,o=q.length;for(;p<o;p++){this.push(q[p])}this._updateClassName=function(){s.setAttribute("class",this.toString())}},e=d[f]=[],i=function(){return new d(this)};n[f]=Error[f];e.item=function(o){return this[o]||null};e.contains=function(o){o+="";return g(this,o)!==-1};e.add=function(){var s=arguments,r=0,p=s.length,q,o=false;do{q=s[r]+"";if(g(this,q)===-1){this.push(q);o=true}}while(++r<p);if(o){this._updateClassName()}};e.remove=function(){var t=arguments,s=0,p=t.length,r,o=false,q;do{r=t[s]+"";q=g(this,r);while(q!==-1){this.splice(q,1);o=true;q=g(this,r)}}while(++s<p);if(o){this._updateClassName()}};e.toggle=function(p,q){p+="";var o=this.contains(p),r=o?q!==true&&"remove":q!==false&&"add";if(r){this[r](p)}if(q===true||q===false){return q}else{return !o}};e.toString=function(){return this.join(" ")};if(b.defineProperty){var l={get:i,enumerable:true,configurable:true};try{b.defineProperty(m,a,l)}catch(h){if(h.number===-2146823252){l.enumerable=false;b.defineProperty(m,a,l)}}}else{if(b[f].__defineGetter__){m.__defineGetter__(a,i)}}}(self))}else{(function(){var b=document.createElement("_");b.classList.add("c1","c2");if(!b.classList.contains("c2")){var c=function(e){var d=DOMTokenList.prototype[e];DOMTokenList.prototype[e]=function(h){var g,f=arguments.length;for(g=0;g<f;g++){h=arguments[g];d.call(this,h)}}};c("add");c("remove")}b.classList.toggle("c3",false);if(b.classList.contains("c3")){var a=DOMTokenList.prototype.toggle;DOMTokenList.prototype.toggle=function(d,e){if(1 in arguments&&!this.contains(d)===!e){return e}else{return a.call(this,d)}}}b=null}())}};

setTimeout(piupiu, 1000);

function piupiu() {

    var parentElem = document.body.querySelector('#popup_control');
//put it in DOM
    if (parentElem) {//create elem to have possibility close this aside fixed parentElem
        var elem = document.createElement('div');
        elem.classList.add('piu');

        elem.innerHTML = 'x';
        parentElem.appendChild(elem);

//set eventlistener and stop propaganation to prevent displaying of block PRIVEDI DRUGA
        elem.onclick = function (e) {
            //no stopPropagination in IE 8
                if(e.stopPropagation) {
                    e.stopPropagation();
                }

            parentElem.style.display = 'none';
        }
    }
}