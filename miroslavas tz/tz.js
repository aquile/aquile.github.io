var Gun = (function () {
    var bullets = 7;

    return {
        fire: function () {
            return (bullets) ? --bullets : "no bullets!"
        },
        reload: function () {
            return bullets = 7
        },
        dieBitch: function (x) {
            return (x >= bullets) ? bullets = 0 : bullets -= x
        }
    }
})();


(function () {
    var form = document.getElementById("login_form"),
        userNameInp = document.getElementById("loginform-username"),
        passwordInp = document.getElementById("loginform-password"),
        btn = document.body.querySelector(".btn.btn-primary"),
        errorMessage = document.body.querySelectorAll(".col-lg-8");

    btn.addEventListener("click", formHandler);

    function formHandler(event) {
        var formValid1 = false,
            formValid2 = false;

        // проверяем юзернейм инпут
        if (userNameInp.value.length > 0 &&
            /^[a-zA-Z-а-яА-Я-я]+$/.test(userNameInp.value) &&
            userNameInp.value.length < 13){
            formValid1 = true;
        } else {
            event.preventDefault();
            errorMessage[0].innerHTML = "заполни юзернейм, нах!"
        }


        // проверяем пасворд инпут
        if (passwordInp.value === "12345"){
            formValid2 = true;
        } else {
            event.preventDefault();
            errorMessage[1].innerHTML = "неверный пароль, нах!"
        }


        event.preventDefault();
            //alert("ok!")
    }
})();



function shot(bullets, name) {
    return console.log(name + " выстрелялa " + bullets + " патронов")
}