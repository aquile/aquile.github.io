$(document).ready(function () {
    //Local variables
    var inputsArr = $(".form_frame input"),
        notificationNode = document.body.querySelector(".notification");

    for (var i = 0; i <= 19; i += 2) {
        setHandlerOdd(i);

        function setHandlerOdd(index) {
            inputsArr.eq(index).keypress(function (event) {
                if (+event.which >= 48 && +event.which <= 57) { // 0-9
                    notificationNode.textContent = "";

                    //set disable controller off to the next input & focus on it
                    inputsArr.eq(index + 1).prop("disabled", false);
                    inputsArr.eq(index + 1).focus();
                    setTimeout(function () {
                        inputsArr.eq(index).prop("disabled", true);
                    }, 200);
                } else if (event.which === 120 || event.which === 88) { //xX lat
                    notificationNode.textContent = "";

                    //set disable controller off to the next input & focus on it
                    inputsArr.eq(index + 2).prop("disabled", false);
                    inputsArr.eq(index + 2).focus();
                    setTimeout(function () {
                        inputsArr.eq(index).prop("disabled", true);
                    }, 200);
                } else {
                    notificationNode.textContent = "Please use only 0-9 or xX";
                    //clear value of this input
                    setTimeout(function () {
                        inputsArr.eq(index).val("");
                    }, 100);
                }
            });
        }

    }

    for (var j = 1; j < 20; j += 2) {
        setHandlerEven(j);

        function setHandlerEven(index) {
            inputsArr.eq(index).keypress(function (event) {
                if (+event.which >= 48 && +event.which <= (57 - +inputsArr.eq(index - 1).val())) { // 0-(9-previous input literal value)
                    notificationNode.textContent = "";

                    //set disable controller off to the next input & focus on it
                    inputsArr.eq(index + 1).prop("disabled", false);
                    inputsArr.eq(index + 1).focus();
                    setTimeout(function () {
                        inputsArr.eq(index).prop("disabled", true);
                    }, 200);
                } else if (event.which === 47) { // or /
                    notificationNode.textContent = "";

                    //set disable controller off to the next input & focus on it
                    inputsArr.eq(index + 1).prop("disabled", false);
                    inputsArr.eq(index + 1).focus();
                    setTimeout(function () {
                        inputsArr.eq(index).prop("disabled", true);
                    }, 200);
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

    ////Binding of keypressing handler to each input
    //inputsArr.each(function (index) {
    //
    //    inputsArr.eq(index).keypress(function (event) {
    //        if (+event.which >= 47 && +event.which <= 57 //0-9 & /
    //            || event.which === 120 || event.which === 88 //xX lat
    //            || event.which === 1093 || event.which === 1061) { //xX cyr
    //
    //            notificationNode.textContent = "";
    //            //set disable controller off to the next input & focus on it
    //            inputsArr.eq(index + 1).prop("disabled", false);
    //            inputsArr.eq(index + 1).focus();
    //
    //            //disable this input after value in DOM
    //            setTimeout(function () {
    //                inputsArr.eq(index).prop("disabled", true);
    //            }, 200);
    //        } else {
    //            notificationNode.textContent = "Please use only 0-9, / or xX";
    //            //clear value of this input
    //           setTimeout(function(){
    //                inputsArr.eq(index).val("");
    //            }, 100);
    //
    //        }
    //
    //    });
    //})

});


