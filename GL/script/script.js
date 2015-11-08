var a;
$(document).ready(function () {
    //Local variables
    var framesArr = $(".form_frame"),
        body = document.body,
        inputsArr = $(".form_frame input"),
        bottomScrNode = $(".form_frame--bottom"),
        notificationNode = document.body.querySelector(".notification"),
        sumScore = document.body.querySelector(".score_summ"),
        controlls = $(".controller li"),
        lastLi = $(".controller #last"),
        lastLiSpan = $(".controller #last span");
    var bottomNodeCounter = 0,
        activeLiCount = 0,
        timeout = 20;

    //body.style.height = ($(window).height() + "px");
    //
    //window.onresize = function () {
    //    body.style.height = ($(window).height() + "px");
    //};

    for (var k = 0; k <= controlls.length - 2; k++) {
        setBallsHandler(k);

        function setBallsHandler(i) {
            controlls.eq(i).click(function () {
                var target = $("input:enabled").eq(0);

                target.focus().trigger({type: 'keypress', which: (48 + i)});
                target.val(controlls.eq(i).data("value"));
                lastLi.removeClass("active");
            })
        }
    }

    var lastCntrl = function () {
        controlls.eq(10).on("click", lastLiHandler);
    };

    lastCntrl();

    function lastLiHandler(event) {
        event.stopPropagation();
        var target = $("input:enabled").eq(0);

        if (target.data("approved") === "X") {
            target.focus().trigger({type: 'keypress', which: 120});
            target.val("x");
            lastLi.removeClass("active");
        } else if (target.data("approved") === "/") {
            target.focus().trigger({type: 'keypress', which: 47});
            target.val("/");
            lastLi.removeClass("active");
        } else {
            controlls.eq(10).off(event);
            lastLi.addClass("active");

            lastLiSpan.eq(0).one("click", function (event) {
                event.stopPropagation();
                target = $("input:enabled").eq(0);
                target.focus().trigger({type: 'keypress', which: 120});
                target.val("X");
                lastLi.removeClass("active");
            });
            //and
            lastLiSpan.eq(1).one("click", function (event) {
                event.stopPropagation();
                target = $("input:enabled").eq(0);
                target.focus().trigger({type: 'keypress', which: 47});
                target.val("/");
                lastLi.removeClass("active");
            });

        }
    }

    //event listener method for the even inputs
    for (var i = 0; i <= 16; i += 2) {

        setHandlerOdd(i);

        function setHandlerOdd(index) {
            inputsArr.eq(index).keypress(function (event) {

                if (+event.which >= 48 && +event.which <= 57) { // 0-9
                    switchFocus(index, 1, activeLiCount);

                    setTimeout(function () {
                        scoreCounter(index, bottomNodeCounter, inputsArr.eq(index).val());
                    }, timeout);
                } else if (event.which === 120 || event.which === 88) { //xX lat

                    ++activeLiCount;
                    switchFocus(index, 2, activeLiCount);

                    setTimeout(function () {
                        scoreCounter(index, bottomNodeCounter, "10");

                        inputObserver(index + 2, bottomNodeCounter);
                        inputObserver(index + 3, bottomNodeCounter);
                        ++bottomNodeCounter;
                    }, timeout);
                } else {
                    notificationNode.textContent = "Please use only 0-9 or xX";
                    //clear value of this input
                    setTimeout(function () {
                        inputsArr.eq(index).val("");
                    }, timeout);
                }
            });
        }
    }

    //event listener method for the odd inputs
    for (var j = 1; j <= 17; j += 2) {

        setHandlerEven(j);

        function setHandlerEven(index) {
            inputsArr.eq(index).keypress(function (event) {
                if (+event.which >= 48 && +event.which <= (57 - +inputsArr.eq(index - 1).val())) { // 0-(9-previous input literal value)

                    ++activeLiCount;
                    switchFocus(index, 1, activeLiCount);

                    setTimeout(function () {
                        scoreCounter(index, bottomNodeCounter, inputsArr.eq(index).val());
                        ++bottomNodeCounter;
                    }, timeout);

                } else if (event.which === 47) { // or /

                    ++activeLiCount;
                    switchFocus(index, 1, activeLiCount);

                    setTimeout(function () {
                        //add 10-prev input value instead of the val
                        scoreCounter(index, bottomNodeCounter, (10 - +inputsArr.eq(index - 1).data("scr")));
                        inputObserver(index + 1, bottomNodeCounter);
                        ++bottomNodeCounter;
                    }, timeout);

                } else {
                    notificationNode.textContent = "Please type only 0-" + (9 - +inputsArr.eq(index - 1).val()) + " or /";
                    //clear value of this input
                    setTimeout(function () {
                        inputsArr.eq(index).val("");
                    }, timeout);
                }
            });
        }
    }


    //18 input handler 0-9 || xX
    inputsArr.eq(18).keypress(function (event) {
        if (+event.which >= 48 && +event.which <= 57) { // 0-9

            //switch to the next input 19
            switchFocus(19, 0, activeLiCount);
            disableInput(18);

            //19 input handler 0-9 || /
            inputsArr.eq(19).keypress(function (event) {
                if (+event.which >= 48 && +event.which <= (57 - +inputsArr.eq(18).val())) { // 0-9

                    disableInput(19);
                    lastFrameScore();

                } else if (+event.which === 47) {
                    //switch to the next input 20
                    switchFocus(20, 0, activeLiCount);
                    disableInput(19);

                    inputsArr.eq(20).keypress(function (event) {
                        if ((+event.which >= 48 && +event.which <= 57) || (event.which === 120 || event.which === 88)) { //0-9 or xX lat

                            disableInput(20);
                            //count score
                            lastFrameScore();

                        } else {
                            notificationNode.textContent = "Please use only 0-9 or xX";
                            //clear value of this input
                            setTimeout(function () {
                                inputsArr.eq(20).val("");
                            }, timeout);
                        }
                    });
                }
                else {
                    notificationNode.textContent = "Please type only 0-" + (9 - +inputsArr.eq(18).val()) + " or /";
                    //clear value of this input
                    setTimeout(function () {
                        inputsArr.eq(19).val("");
                    }, timeout);
                }
            });

        } else if (event.which === 120 || event.which === 88) { //xX lat

            //switch to the next input
            switchFocus(19, 0, activeLiCount);
            disableInput(18);

            //19 input handler 0-9 || xX
            inputsArr.eq(19).keypress(function (event) {
                if (+event.which >= 48 && +event.which <= 57) { // 0-9

                    //switch to the next input
                    switchFocus(20, 0, activeLiCount);
                    disableInput(19);

                    //20 input handler 0-9 || /
                    inputsArr.eq(20).keypress(function (event) {
                        if (+event.which >= 47 && +event.which <= (57 - +inputsArr.eq(19).val())) { // 0-left or /

                            disableInput(20);
                            //count score
                            lastFrameScore();

                        } else {
                            notificationNode.textContent = "Please type only 0-" + (9 - +inputsArr.eq(19).val()) + " or /";
                            //clear value of this input
                            setTimeout(function () {
                                inputsArr.eq(20).val("");
                            }, timeout);
                        }
                    });

                } else if (event.which === 120 || event.which === 88) { //xX lat

                    //switch to the next input
                    switchFocus(20, 0, activeLiCount);
                    disableInput(19);

                    //20 input handler 0-9 || xX
                    inputsArr.eq(20).keypress(function (event) {
                        if ((+event.which >= 48 && +event.which <= 57) || (event.which === 120 || event.which === 88)) { //0-9 or xX lat

                            disableInput(20);
                            //count score
                            lastFrameScore();

                        } else {
                            notificationNode.textContent = "Please use only 0-9 or xX";
                            //clear value of this input
                            setTimeout(function () {
                                inputsArr.eq(20).val("");
                            }, timeout);
                        }
                    });
                } else {
                    notificationNode.textContent = "Please use only 0-9 or xX";
                    //clear value of this input
                    setTimeout(function () {
                        inputsArr.eq(19).val("");
                    }, timeout);
                }
            });

        } else {
            notificationNode.textContent = "Please use only 0-9 or xX";
            //clear value of this input
            setTimeout(function () {
                inputsArr.eq(18).val("");
            }, timeout);
        }
    });

    //Local methods---------------------------------------------------------------------

    //switch disabling and focus
    function switchFocus(index, i, active) {
        notificationNode.textContent = "";

        //set disable controller off to the next input & focus on it
        inputsArr.eq(index + +i).prop("disabled", false);
        inputsArr.eq(index + +i).focus();

        for (var j = 0; j < framesArr.length; j++) {
            framesArr.eq(j).removeClass("active");
        }
        framesArr.eq(active).addClass("active");
    }

    function disableInput(index) {
        if (index >= 18) {
            //rebind handler to the lastLi #10 = x || /
            lastCntrl();
        }
        setTimeout(function () {
            inputsArr.eq(index).prop("disabled", true);
        }, timeout);
    }

    //counter fn
    function scoreCounter(indexCounter, bottomCounter, scrValue) {

        inputsArr.eq(indexCounter).prop("disabled", true);
        inputsArr.eq(indexCounter).data("scr", scrValue);

        //insert temporary score
        bottomScrNode.eq(bottomCounter).text(function () {
            var tempScore = 0;
            for (var i = 0; i < inputsArr.length; i++) {
                if (+inputsArr.eq(i).data("scr") >= 0) {
                    tempScore += +inputsArr.eq(i).data("scr");
                }
            }
            return tempScore;
        });
        sumScore.textContent = bottomScrNode.eq(bottomCounter).text();
    }

    //future changes strike & spea observer
    function inputObserver(index, bottom) {
        var ammScoreNode;
        //hide last bottom scr div
        if (+index >= 18) {
            ammScoreNode = bottom;
            bottomScrNode.eq(bottom + 1).css("visibility", "hidden");
        } else {
            ammScoreNode = bottom + 1;
        }
        // select the target node
        var target = inputsArr[index]; // target to be observed

        // create an observer instance
        var observer = new MutationObserver(function (mutations) {

            mutations.forEach(function (mutation) {

                //check out mutation
                if (+mutation.target.value > 0) {

                    //add extra balls
                    inputsArr.eq(index - 2).data("scr", (+inputsArr.eq(index - 2).data("scr") + +mutation.target.value));
                    // refresh bottom score
                    bottomScrNode.eq(bottom).text(+bottomScrNode.eq(bottom).text() + +mutation.target.value);
                    // refresh next bottom score text
                    bottomScrNode.eq(bottom + 1).text(+bottomScrNode.eq(bottom + 1).text() + +mutation.target.value);

                    sumScore.textContent = bottomScrNode.eq(ammScoreNode).text();
                }
                if (mutation.target.value === "x" || mutation.target.value === "X") {//check out mutation

                    if (inputsArr.eq(index - 1).val() === "/") {
                        //add extra balls
                        inputsArr.eq(index - 1).data("scr", (+inputsArr.eq(index - 1).data("scr") + 10));
                        // refresh bottom score
                        bottomScrNode.eq(bottom).text(+bottomScrNode.eq(bottom).text() + 10);
                        // refresh next bottom score text
                        bottomScrNode.eq(bottom + 1).text(+bottomScrNode.eq(bottom + 1).text() + 10);


                        sumScore.textContent = bottomScrNode.eq(ammScoreNode).text();

                    } else if (inputsArr.eq(index - 4).val() === "x" || inputsArr.eq(index - 4).val() === "X") {

                        //add extra balls to the parent target
                        inputsArr.eq(index - 4).data("scr", (+inputsArr.eq(index - 4).data("scr") + 10));
                        // refresh bottom score of the parent target
                        bottomScrNode.eq(bottom).text(+bottomScrNode.eq(bottom).text() + 10);
                        // refresh next bottom score text
                        bottomScrNode.eq(bottom + 1).text(+bottomScrNode.eq(bottom + 1).text() + 10);
                        //update parent bottom temp score
                        bottomScrNode.eq(bottom - 1).text(+bottomScrNode.eq(bottom - 1).text() + 10);
                        //add extra balls
                        inputsArr.eq(index - 2).data("scr", (+inputsArr.eq(index - 2).data("scr") + 10));
                        // refresh bottom score
                        bottomScrNode.eq(bottom).text(+bottomScrNode.eq(bottom).text() + 10);
                        //// refresh next bottom score text
                        bottomScrNode.eq(bottom + 1).text(+bottomScrNode.eq(bottom + 1).text() + 10);

                        sumScore.textContent = bottomScrNode.eq(ammScoreNode).text();

                    } else {

                        //add extra balls
                        inputsArr.eq(index - 2).data("scr", (+inputsArr.eq(index - 2).data("scr") + 10));
                        // refresh bottom score
                        bottomScrNode.eq(bottom).text(+bottomScrNode.eq(bottom).text() + 10);
                        //// refresh next bottom score text
                        bottomScrNode.eq(bottom + 1).text(+bottomScrNode.eq(bottom + 1).text() + 10);

                        sumScore.textContent = bottomScrNode.eq(ammScoreNode).text();
                    }
                }
                if (mutation.target.value === "/") {//check out mutation

                    //add extra balls to the empty ceil after X
                    inputsArr.eq(index - 2).data("scr", (+inputsArr.eq(index - 2).data("scr") + (10 - +inputsArr.eq(index - 1).data("scr"))));
                    // refresh bottom score
                    bottomScrNode.eq(bottom).text(+bottomScrNode.eq(bottom).text() + (10 - +inputsArr.eq(index - 1).data("scr")));
                    // refresh next bottom score text
                    bottomScrNode.eq(bottom + 1).text(+bottomScrNode.eq(bottom).text() + 10);

                    sumScore.textContent = bottomScrNode.eq(ammScoreNode).text();
                }

            });
        });

        // configuration of the observer:
        var config = {attributes: true, childList: true, characterData: true}; // config of this observer

        observer.observe(target, config);
    }

    function lastFrameScore() {
        var lastSumm = 0,
            gameResult = {},
            results;
        setTimeout(function () {
            notificationNode.textContent = "";
            for (var i = 18; i <= 20; i++) {
                var scrValue,
                    inputVal = inputsArr.eq(i).val();

                if (+inputVal >= 0) scrValue = inputVal;
                if (inputVal === "/") scrValue = (10 - +inputsArr.eq(i - 1).val()) + "";
                if (inputVal === "x" || inputVal === "X") scrValue = "10";
                if (inputVal == "") scrValue = 0;

                inputsArr.eq(i).data("scr", scrValue);

                lastSumm += +inputsArr.eq(i).data("scr");
            }
            bottomScrNode.eq(9).text(+bottomScrNode.eq(8).text() + lastSumm);
            bottomScrNode.eq(9).css("visibility", "visible");
            sumScore.textContent = (+bottomScrNode.eq(9).text()) + "";

            results = storage.load();

            console.log(results);
            // bind player data
            gameResult.player = "player name";
            gameResult.date = new Date();
            gameResult.score = sumScore.textContent;

            console.log(gameResult);
            results.push(gameResult);

            //save to localStorage player result data
            return storage.store(results);
        }, timeout);
    }
});
