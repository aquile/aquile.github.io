$(document).ready(function () {
    var inputsArr = $(".form_frame input");

    inputsArr.each(function(index){
        inputsArr.eq(index).keypress(function () {
            inputsArr.eq(index + 1).prop("disabled", false);
            inputsArr.eq(index + 1).focus();
            setTimeout(function(){
                inputsArr.eq(index).prop("disabled", true);
            }, 200);
        });
    })

});


