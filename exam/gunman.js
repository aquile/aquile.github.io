function Gunman() {

    var self = this;
    //Local variables
    var gunmanDiv = document.body.querySelector('.gunman'),
        fireDiv = document.body.querySelector('.fire'),
        timerYouSpan = document.body.querySelector('.timerNodeYou'),
        timerGunmanSpan = document.body.querySelector('.timerNodeGunman'),
        rewardSpan = document.body.querySelector('.rewardNode'),
        loseDiv = document.body.querySelector('.lose'),
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
        gunmanKilled = [8, 9, 10],
        youLose = 11;

    //main timer of appearance
    var appear = 3600;


    //Local methods
    this.Go = function () {
        audioPlay(Audio.audioIntro);
        //change gunman on sprite
        gunmanDiv.style.backgroundPositionY = j * Y + 'px';
        pathGunmanCounter = -120;
        gunmanDiv.style.right = pathGunmanCounter + 'px';

        var timerGoId = setInterval(function () {
            pathGunmanCounter += 20;
            gunmanDiv.style.right = pathGunmanCounter + 'px';

            gunmanDiv.style.backgroundPositionX = run[i] * X + 'px';
            console.log(run[i] * X + 'px' + "i=" + i) ;
            i++;

            if (i == 3) {
                i = 0
            }
        }, 200);

        //erase player time
        timerYouSpan.innerHTML = ' ';

        self.GunmanTimer(timerGunmanCounter);

        setTimeout(function () {
            clearInterval(timerGoId);
            gunmanDiv.style.backgroundPositionX = stay * X + "px";
            audioStop(Audio.audioIntro);
            self.Ready();
        }, appear);
    };

    //Set timer for gunman
    this.GunmanTimer = function (timer) {
        var t;
        timer -= 0.15;
        timerGunmanCounter = timer;
        t = timer.toFixed(2) + " s";
        timerGunmanSpan.innerHTML = t;
    };

    //displaying div "READY?" then "FIRE!"
    this.Ready = function () {
        audioPlay(Audio.audioWait);
        var border = 15;

        fireDiv.innerHTML = "READY?";
        fireDiv.style.display = "block";

        var decreaseBorderId = setInterval(function () {
            fireDiv.style.border = border + "px solid red";
            border -= 1;
        }, 100);

        setTimeout(function () {
            audioStop(Audio.audioWait);
            audioPlay(Audio.audioFire);

            clearInterval(decreaseBorderId);

            fireDiv.innerHTML = "FIRE!!!";
            fireDiv.style.background = "red";
            fireDiv.style.color = "white";

            self.Win();
        }, 1500)
    };

    //implement lose timeOut and putting onclick to the div gunman
    this.Win = function () {
        var yourTime,
            past,
            then;

        past = new Date().getTime();

        // Implement Lose function timer
        var loseID = setTimeout(function () {
            self.GunmanShot();
        }, timerGunmanCounter * 1000);

        //Giving a chance to player))
        gunmanDiv.addEventListener('click', OneClick);

        function OneClick() {
            audioPlay(Audio.audioShot_Fall);

            clearInterval(loseID);
            then = new Date().getTime();
            yourTime = ((then - past) / 1000).toFixed(2) + " s";

            timerYouSpan.innerHTML = yourTime;
            self.Reward(rewardCounter);
            self.GunmanKilled();

            //removing event
            gunmanDiv.removeEventListener('click', OneClick);
        }
    };


    this.Reward = function (score) {
        score = +score + 1000;
        rewardCounter = score + " ";
        //добавить к скоре разницу в милиссекундах между твоим выстрелом и выстрелом ганмена
        rewardSpan.innerHTML = rewardCounter;
    };

    this.GunmanKilled = function () {
        audioPlay(Audio.audioWait);

        fireDiv.innerHTML = "КРАСАУЧЕГ !";
        fireDiv.style.background = "white";
        fireDiv.style.color = "red";

        i = 0;
        var killedId = setInterval(function () {
            gunmanDiv.style.backgroundPositionX = gunmanKilled[i] * X + "px";

            if (i == 2) {
                clearInterval(killedId);

                //next gunman
                j++;
                if (j < 5) {
                    setTimeout(function () {
                        audioStop(Audio.audioWait);
                        pathGunmanCounter = 0;
                        i = 0;
                        self.Go();
                    }, 2000)
                }
            }

            i++;
        }, 500);


    };

    this.Lose = function (x) {
        fireDiv.innerHTML = "LOSER !";
        fireDiv.style.background = "white";
        fireDiv.style.color = "red";


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
        }, x * 8)
    };

    this.GoBack = function () {
        i = youLose;
        gunmanDiv.style.backgroundPositionX = i * X + "px";

        setTimeout(function () {
            audioPlay(Audio.audioDeath);
            i = 3;
            var backId = setInterval(function () {
                gunmanDiv.style.backgroundPositionX = fireGun[i] * X + "px";
                i--;
                if (i == 0) {
                    //i = 0;
                    clearInterval(backId);
                    var intId = setInterval(function () {
                        pathGunmanCounter += 20;
                        gunmanDiv.style.right = pathGunmanCounter + 'px';

                        gunmanDiv.style.backgroundPositionX = run[i] * X + 'px';
                        i++;

                        if (i == 2) {
                            i = 0
                        }
                    }, 200);
                    setTimeout(function () {
                        clearInterval(intId);
                        audioStop(Audio.audioDeath);
                    }, 6000)
                }
            }, 250);
        }, 3000)
    };


    this.GunmanShot = function () {
        audioPlay(Audio.audioShot);

        //close gunman from the user
        loseDiv.style.display = "block";
        loseDiv.style.opacity = "0";

        i = 0;
        var fireInterval = setInterval(function () {
            gunmanDiv.style.backgroundPositionX = fireGun[i] * X + "px";
            i++;
            if (i == 3) {
                clearInterval(fireInterval);
                self.Lose(100);
                self.GoBack();
            }
        }, 500);
    };

    function audioPlay(audio) {
        audio.play();
    }

    function audioStop(audio) {
        audio.pause();
        audio.currentTime = 0;
    }
}