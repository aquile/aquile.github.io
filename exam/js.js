function Gunman() {
 console.log("ok");

    //Local variables
    var gunmanDiv = document.body.querySelector('.gunman'),
        fireDiv = document.body.querySelector('.fire'),
        timerYouSpan = document.body.querySelector('.timerNodeYou'),
        timerGunmanSpan = document.body.querySelector('.timerNodeGunman'),
        rewardSpan = document.body.querySelector('.rewardNode'),
        loseDiv = document.body.querySelector('.lose'),
        pathGunmanCounter = -100,
        i = 0, //bcgGunmanCounter
        timerYou,
        timerGunmanCounter = 1.5,
        rewardCounter = 0;

    //basic dimensions of gunmanDiv
    var X = -96,
        Y = -204;

    //positions in sprite
    var run = [0, 1, 2],
        stay = 3,
        fireGun = [4, 5, 6, 7],
        gunmanKilled = [8, 9, 10],
        youLose = 11;



    //GunmanTimer(timerGunmanCounter);

    //Reward(rewardCounter);

    //Lose(100);

    var timerStartGameId = setInterval(Go(X, Y), 200);

    setTimeout(function () {

        clearInterval(timerStartGameId);
        gunmanDiv.style.backgroundPositionX = stay*X + "px";

        //Fire();

    }, 4500);


    //Local methods
    function Go(x, y) {
        console.log("ok2");
        pathGunmanCounter += 20;
        gunmanDiv.style.right = pathGunmanCounter + 'px';

        for (;i < i+1; i++) {
            //implementing step of gunman
            gunmanDiv.style.backgroundPositionX = run[i]*x+ 'px';
            //restart step
            if (i == run.length - 1) i = 0;
        }
        //switch (bcgGunmanCounter) {
        //    case 0:
        //        gunmanDiv.style.backgroundPositionX = bcgGunmanCounter + 'px';
        //        bcgGunmanCounter -= 96;
        //        break;
        //
        //    case -96:
        //        gunmanDiv.style.backgroundPositionX = bcgGunmanCounter + 'px';
        //        bcgGunmanCounter -= 96;
        //        break;
        //
        //    case -192:
        //        gunmanDiv.style.backgroundPositionX = bcgGunmanCounter + 'px';
        //        bcgGunmanCounter += 192;
        //        break;
        //}
    }

    //function Fire() {
    //    var border = 15;
    //
    //    fireDiv.innerHTML = "READY?";
    //    fireDiv.style.display = "block";
    //
    //    var increaseBorderId = setInterval(function () {
    //        fireDiv.style.border = border + "px solid red";
    //        border -= 1;
    //    }, 100);
    //
    //    setTimeout(function () {
    //        clearInterval(increaseBorderId);
    //        fireDiv.innerHTML = "FIRE!!!";
    //        fireDiv.style.background = "red";
    //        fireDiv.style.color = "white";
    //    }, 1500)
    //}
//
//    function Reward(score) {
//        score += 1000;
//        score = score + " ";
//        //добавить к скоре разницу в милиссекундах между твоим выстрелом и выстрелом ганмена
//        rewardSpan.innerHTML = score;
//    }
//
//    function YouTimer() {
//
//    }
//
//    function GunmanTimer(timer) {
//        var t;
//        timer -= 0.15;
//        timerGunmanCounter = timer;
//        t = timer.toFixed(2) + " s";
//        timerGunmanSpan.innerHTML = t;
//    }
//
//    function Win() {
//        gunmanDiv.addEventListener('click', function (timer) {
//            setTimeout(function () {
//                clearInterval(loseID)
//            }, timer)
//        })
//    }
//
//    function Lose(x) {
//        loseDiv.style.display = "block";
//
//        var fs = 0,
//            opacity = 0;
//
//        function increaseFS() {
//            fs += 1;
//            opacity += 0.1;
//            loseDiv.style.fontSize = fs + "em";
//            loseDiv.style.opacity = opacity;
//        }
//
//        var setId = setInterval(increaseFS, x);
//
//        setTimeout(function () {
//            clearTimeout(setId);
//            setInterval(function () {
//                loseDiv.classList.toggle('flashing')
//            }, x * 5)
//        }, x * 7)
//    }
//
}