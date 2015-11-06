$(document).ready(function () {
    //Local variables
    var inputsArr = $(".form_frame input"),
        bottomScrNode = $(".form_frame--bottom"),
        notificationNode = document.body.querySelector(".notification"),
        sumScore = document.body.querySelector(".score_summ");
    var bottomNodeCounter = 0;

    //event listener method for the odd inputs
    for (var i = 0; i <= 19; i += 2) {

        setHandlerOdd(i);

        function setHandlerOdd(index) {
            inputsArr.eq(index).keypress(function (event) {
                //console.log(event);
                if (+event.which >= 48 && +event.which <= 57) { // 0-9
                    switchFocus(index, 1);

                    setTimeout(function () {
                        scoreCounter(index, bottomNodeCounter, inputsArr.eq(index).val());
                    }, 100);
                } else if (event.which === 120 || event.which === 88) { //xX lat

                    switchFocus(index, 2);

                    setTimeout(function () {
                        scoreCounter(index, bottomNodeCounter, "10");
                        inputObserver(index + 2, bottomNodeCounter);
                        inputObserver(index + 3, bottomNodeCounter);
                        ++bottomNodeCounter;
                    }, 200);
                } else {
                    notificationNode.textContent = "Please use only 0-9 or xX";
                    //clear value of this input
                    setTimeout(function () {
                        inputsArr.eq(index).val("");
                    }, 200);
                }
            });
        }
    }

    //event listener method for the even inputs
    for (var j = 1; j < 20; j += 2) {

        setHandlerEven(j);

        function setHandlerEven(index) {
            inputsArr.eq(index).keypress(function (event) {
                if (+event.which >= 48 && +event.which <= (57 - +inputsArr.eq(index - 1).val())) { // 0-(9-previous input literal value)

                    switchFocus(index, 1);

                    setTimeout(function () {
                        scoreCounter(index, bottomNodeCounter, inputsArr.eq(index).val());
                        ++bottomNodeCounter;
                    }, 100);

                } else if (event.which === 47) { // or /

                    switchFocus(index, 1);

                    setTimeout(function () {
                        //add 10-prev input value instead of the val
                        scoreCounter(index, bottomNodeCounter, (10 - +inputsArr.eq(index - 1).data("scr")));
                        inputObserver(index + 1, bottomNodeCounter);
                        ++bottomNodeCounter;
                    }, 100);

                } else {
                    notificationNode.textContent = "Please type only 0-" + (9 - +inputsArr.eq(index - 1).val()) + " or /";
                    //clear value of this input
                    setTimeout(function () {
                        inputsArr.eq(index).val("");
                    }, 100);
                }
            });
        }
    }

    //Local methods
    //switch disabling and focus
    function switchFocus(index, i) {
        notificationNode.textContent = "";

        //set disable controller off to the next input & focus on it
        inputsArr.eq(index + +i).prop("disabled", false);
        inputsArr.eq(index + +i).focus();
    }


    //counter fn
    function scoreCounter(indexCounter, bottomCounter, scrValue) {

        inputsArr.eq(indexCounter).prop("disabled", true);
        inputsArr.eq(indexCounter).data("scr", scrValue); //add 10 instead of the val

        //insert temporary score
        bottomScrNode.eq(bottomCounter).text(function () {
            var tempScore = 0;
            for (var i = 0; i < inputsArr.length; i++) {
                tempScore += +inputsArr.eq(i).data("scr");
            }
            return tempScore;
        });
        sumScore.textContent = bottomScrNode.eq(bottomCounter).text();
    }

    //future changes strike & spea observer
    function inputObserver(index, bottom) {
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

                    sumScore.textContent = bottomScrNode.eq(bottom + 1).text();
                }
                if (mutation.target.value === "x" || mutation.target.value === "X") {//check out mutation

                    //add extra balls to the parent target
                    inputsArr.eq(index - 4).data("scr", (+inputsArr.eq(index - 4).data("scr") + 10));
                    // refresh bottom score of the parent target
                    bottomScrNode.eq(bottom).text(+bottomScrNode.eq(bottom).text() + 10);
                    // refresh next bottom score text
                    bottomScrNode.eq(bottom + 1).text(+bottomScrNode.eq(bottom + 1).text() + 10);

                    //add extra balls
                    inputsArr.eq(index - 2).data("scr", (+inputsArr.eq(index - 2).data("scr") + 10));
                    // refresh bottom score
                    bottomScrNode.eq(bottom).text(+bottomScrNode.eq(bottom).text() + 10);
                    // refresh next bottom score text
                    bottomScrNode.eq(bottom + 1).text(+bottomScrNode.eq(bottom + 1).text() + 10);

                    sumScore.textContent = bottomScrNode.eq(bottom + 1).text();
                }
                if (mutation.target.value === "/") {//check out mutation

                    //add extra balls
                    inputsArr.eq(index - 2).data("scr", (+inputsArr.eq(index - 2).data("scr") + (10 - +inputsArr.eq(index - 2).data("scr"))));
                    // refresh bottom score
                    bottomScrNode.eq(bottom).text(+bottomScrNode.eq(bottom).text() + (10 - +inputsArr.eq(index - 2).data("scr")));
                    // refresh next bottom score text
                    bottomScrNode.eq(bottom + 1).text(+bottomScrNode.eq(bottom + 1).text() + (10 - +inputsArr.eq(index - 2).data("scr")));

                    sumScore.textContent = bottomScrNode.eq(bottom + 1).text();
                }

            });
        });

        // configuration of the observer:
        var config = {attributes: true, childList: true, characterData: true}; // config of this observer

        observer.observe(target, config);
    }

});