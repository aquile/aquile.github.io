function Gunman() {
    //Local variables
    var gunman = document.body.querySelector('.gunman');
    var pathGunmanCounter = -100; //in the end set -100px
    var bcgGunmanCounter = 0;

    //Timers
    var timerId;
    timerId = setInterval(function () {
            pathGunmanCounter += 10;
            gunman.style.right = pathGunmanCounter + 'px';

            switch (bcgGunmanCounter) {
                case 0:
                    gunman.style.backgroundPositionX = bcgGunmanCounter + 'px';
                    bcgGunmanCounter -= 99;
                    break;

                case -99:
                    gunman.style.backgroundPositionX = bcgGunmanCounter + 'px';
                    bcgGunmanCounter -= 99;
                    break;

                case -198:
                    gunman.style.backgroundPositionX = bcgGunmanCounter + 'px';
                    bcgGunmanCounter += 198;
                    break;
            }

            console.log(gunman.style.backgroundPositionX);
            // console.log(gunman.style.right);

        }
        ,
        200
    );

    setInterval(function () {
        clearInterval(timerId);
        gunman.style.backgroundPositionX = "-300px";
    }, 10000)

}