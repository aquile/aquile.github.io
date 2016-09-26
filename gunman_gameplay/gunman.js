function Gunman() {

    //Local variables
    var gunmanDiv = document.body.querySelector('.gunman'),
        fireDiv = document.body.querySelector('.fire'),
        timerYouSpan = document.body.querySelector('.timerNodeYou'),
        timerGunmanSpan = document.body.querySelector('.timerNodeGunman'),
        rewardSpan = document.body.querySelector('.rewardNode'),
        loseDiv = document.body.querySelector('.lose'),
        winDiv = document.body.querySelector('.win'),
        playButtonDiv = document.body.querySelector('.play_button-wrapper'),
        playButtonSpan = document.body.querySelector(".play_button-wrapper span"),
        pathGunmanCounter = -120,
        i = 0,  //bcg-x GunmanCounter
        j = 0,  //bcg-y GunmanCounter
        timerGunmanCounter = 1.5,
        rewardCounter = 0,
        Audio = {
            audioIntro: document.querySelector('.sound__intro'),
            audioDeath: document.querySelector('.sound__death'),
            audioFire: document.querySelector('.sound__fire'),
            audioShot: document.querySelector('.sound__shot'),
            audioShot_Fall: document.querySelector('.sound__shot-fall'),
            audioWait: document.querySelector('.sound__wait'),
            audioWin: document.querySelector('.sound__win')
        };

    //basic dimensions of gunmanDiv
    var X = -96,
        Y = -204;

    //positions in sprite
    var run = [0, 1, 2],
        stay = 3,
        fireGun = [4, 5, 6, 7],
        gunmanKilling = [8, 9, 10],
        youLose = 11;

    //main timer of appearance
    var appear = 4000,
    //timeout of play again div
        playAgainTimeout = 8500;

    //Global method--------------------------------------------------------
    go();

    function go () {
        audioPlay(Audio.audioIntro);
        fireDiv.style.display = "none";

        //change gunman on sprite
        gunmanDiv.style.backgroundPositionY = j * Y + 'px';
        pathGunmanCounter = -120;
        gunmanDiv.style.right = pathGunmanCounter + 'px';

        var timerGoId = setInterval(Steps, 200);

        //erase player time
        timerYouSpan.textContent = ' ';

        gunmanTimer(timerGunmanCounter);

        setTimeout(function () {
            clearInterval(timerGoId);
            gunmanDiv.style.backgroundPositionX = stay * X + "px";
            audioStop(Audio.audioIntro);
            ready();
        }, appear);
    }

    //Local methods---------------------------------------------------------
    //Set timer for gunman
    function gunmanTimer(timer) {
        var t;
        timer -= 0.15;
        timerGunmanCounter = timer;
        t = timer.toFixed(2) + " s";
        timerGunmanSpan.textContent = t;
    }

    //displaying div "READY?" then "FIRE!"
    function ready() {
        audioPlay(Audio.audioWait);
        var border = 15;

        fireDiv.textContent = "READY?";
        fireDiv.style.display = "block";

        var decreaseBorderId = setInterval(function () {
            fireDiv.style.border = border + "px solid red";
            border -= 1;
        }, 100);

        setTimeout(function () {
            audioStop(Audio.audioWait);
            audioPlay(Audio.audioFire);

            clearInterval(decreaseBorderId);

            fireDiv.textContent = "FIRE!!!";
            fireDiv.style.background = "red";
            fireDiv.style.color = "white";

            win();
        }, 1500)
    }

    //implement lose timeout and putting onclick to the div gunman
    function win() {
        var yourTime,
            past,
            then;

        past = new Date().getTime();

        // Implement Lose function timer
        var loseID = setTimeout(function () {
            gunmanShot();
        }, timerGunmanCounter * 1000);

        //Giving a chance to player))))))
        gunmanDiv.addEventListener('click', oneClick);

        function oneClick() {
            audioPlay(Audio.audioShot_Fall);

            clearInterval(loseID);
            then = new Date().getTime();
            yourTime = ((then - past) / 1000).toFixed(2) + " s";

            timerYouSpan.textContent = yourTime;
            reward(rewardCounter);
            gunmanKilled();

            //removing event
            gunmanDiv.removeEventListener('click', oneClick);
        }
    }

    //calculating reward
    function reward(score) {
        score = +score + 1000;
        rewardCounter = score + " ";
        //добавить к скоре разницу в милиссекундах между твоим выстрелом и выстрелом ганмена
        rewardSpan.textContent = rewardCounter;
    }

    //when gunman was killed by player
    function gunmanKilled() {
        audioPlay(Audio.audioWait);

        fireDiv.textContent = "КРАСАУЧЕГ !";
        fireDiv.style.background = "white";
        fireDiv.style.color = "red";

        i = 0;
        var killedId = setInterval(function () {
            gunmanDiv.style.backgroundPositionX = gunmanKilling[i] * X + "px";

            if (i == 2) {
                clearInterval(killedId);

                //next gunman
                j++;
                console.log(j);
                if (j < 5) {
                    setTimeout(function () {
                        audioStop(Audio.audioWait);
                        pathGunmanCounter = 0;
                        i = 0;
                        go();//__________________________________________________
                    }, 2000)
                }
                if (j == 5) {
                    audioPlay(Audio.audioWin);
                    loseWin(winDiv, 100);

                }
            }

            i++;
        }, 500);


    }

    //display loser div
    function lose(x) {
        audioPlay(Audio.audioDeath);
        fireDiv.textContent = "LOSER !";
        fireDiv.style.background = "white";
        fireDiv.style.color = "red";

        loseWin(loseDiv, x);
    }

    //after gunman won he must left the window
    function goBack() {
        i = youLose;
        gunmanDiv.style.backgroundPositionX = i * X + "px";

        setTimeout(function () {
            i = 0;

            var backId = setInterval(Steps, 200);

            setTimeout(function () {
                clearInterval(backId);
            }, 4000)

        }, 5000)
    }

    // when gunman was faster then player
    function gunmanShot() {
        audioPlay(Audio.audioShot);

        //close gunman from the user
        loseDiv.style.display = "block";
        loseDiv.style.opacity = "0";

        i = 0;
        var fireInterval = setInterval(function () {
            gunmanDiv.style.backgroundPositionX = fireGun[i] * X + "px";
            i++;

            if (i == 4) {
                setTimeout(function () {
                    clearInterval(fireInterval);
                    lose(100);
                    goBack();

                }, 700)
            }
        }, 500);
    }

    //implementing steps of gunman
    function Steps() {
        pathGunmanCounter += 25;
        gunmanDiv.style.right = pathGunmanCounter + 'px';

        gunmanDiv.style.backgroundPositionX = run[i] * X + 'px';
        i++;

        if (i == 3) {
            i = 0
        }
    }

    //display and flashing of  win/lose window
    function loseWin(elem, x) {
        elem.style.display = "block";
        elem.style.opacity = "0";
        var fs = 0,
            opacity = 0;

        function increaseFS() {
            fs += 1;
            opacity += 0.1;
            elem.style.fontSize = fs + "em";
            elem.style.opacity = opacity;
        }

        var setId = setInterval(increaseFS, x);
        var toggleId;

        setTimeout(function () {
            clearTimeout(setId);
            toggleId = setInterval(function () {
                elem.classList.toggle('flashing')
            }, x * 5);
        }, x * 8);

        setTimeout(function () {
            clearInterval(toggleId);

            playAgain();

        }, playAgainTimeout)
    }

    //play again fn
    function playAgain() {
        //hide lose or win div
        loseDiv.style.display = "none";
        winDiv.style.display = "none";

        //putting counters on start positions
        pathGunmanCounter = -120;
        i = 0;
        j = 0;
        timerGunmanCounter = 1.5;
        rewardCounter = 0;

        rewardSpan.textContent = '0';
        //display play again div
        playButtonSpan.textContent = "WONNA PLAY AGAIN ?";
        playButtonDiv.style.display = "block";
    }

    //functions for audio tags
    function audioPlay(audio) {
        audio.play();
    }

    function audioStop(audio) {
        audio.pause();
        audio.currentTime = 0;
    }
}