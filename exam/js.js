function Gunman() {

    //Local variables
    var gunmanDiv = document.body.querySelector('.gunman'),
        fireDiv = document.body.querySelector('.fire'),
        timerYouSpan = document.body.querySelector('.timerNodeYou'),
        timerGunmanSpan = document.body.querySelector('.timerNodeGunman'),
        rewardSpan = document.body.querySelector('.rewardNode'),
        loseDiv = document.body.querySelector('.lose'),
        pathGunmanCounter = -100,
        bcgGunmanCounter = 0,
        timerYou,
        timerGunmanCounter = 1.5,
        rewardCounter = 0;
    var X = 96,
        Y = 204;

    GunmanTimer(timerGunmanCounter);

    Reward(rewardCounter);

    Lose(100);

    var timerGoId = setInterval(Go, 200);

    setTimeout(function () {

        clearInterval(timerGoId);

        gunmanDiv.style.backgroundPositionX = "-288px";

        Fire();

    }, 2000);


    //Local methods
    function Go(x, y) {
        pathGunmanCounter += 10;
        gunmanDiv.style.right = pathGunmanCounter + 'px';

        switch (bcgGunmanCounter) {
            case 0:
                gunmanDiv.style.backgroundPositionX = bcgGunmanCounter + 'px';
                bcgGunmanCounter -= 96;
                break;

            case -96:
                gunmanDiv.style.backgroundPositionX = bcgGunmanCounter + 'px';
                bcgGunmanCounter -= 96;
                break;

            case -192:
                gunmanDiv.style.backgroundPositionX = bcgGunmanCounter + 'px';
                bcgGunmanCounter += 192;
                break;
        }
    }

    function Fire() {
        var border = 15;

        fireDiv.innerHTML = "READY?";
        fireDiv.style.display = "block";

        var increaseBorderId = setInterval(function () {
            fireDiv.style.border = border + "px solid red";
            border -= 1;
        }, 100);

        setTimeout(function () {
            clearInterval(increaseBorderId);
            fireDiv.innerHTML = "FIRE!!!";
            fireDiv.style.background = "red";
            fireDiv.style.color = "white";
        }, 1500)
    }

    function Reward(score) {
        score += 1000;
        score = score + " ";
        //добавить к скоре разницу в милиссекундах между твоим выстрелом и выстрелом ганмена
        rewardSpan.innerHTML = score;
    }

    function YouTimer() {

    }

    function GunmanTimer(timer) {
        var t;
        timer -= 0.15;
        timerGunmanCounter = timer;
        t = timer.toFixed(2) + " s";
        timerGunmanSpan.innerHTML = t;
    }

    function Win() {
        gunmanDiv.addEventListener('click', function (timer) {
            setTimeout(function () {
                clearInterval(loseID)
            }, timer)
        })
    }

    function Lose(x) {
        loseDiv.style.display = "block";

        var fs = 0,
            opacity = 0;

        function increaseFS() {
            fs += 1;
            opacity += 0.1;
            loseDiv.style.fontSize = fs + "em";
            loseDiv.style.opacity = opacity;
        }

        var setId = setInterval(increaseFS, x);

        setTimeout(function () {
            clearTimeout(setId);
            setInterval(function () {
                loseDiv.classList.toggle('flashing')
            }, x * 5)
        }, x * 7)
    }

}