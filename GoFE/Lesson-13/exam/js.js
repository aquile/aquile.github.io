function Gunman() {
    //Local variables
    var gunman = document.body.querySelector('.gunman');
    var linearGunmanCounter = -50;

    //Timers
    var timerId = setInterval(function () {
        linearGunmanCounter += 50;
        gunman.style.left = linearGunmanCounter + 'px';
        console.log(gunman.style.left);
    }, 500);

    setInterval(function () {
        clearInterval(timerId);
    }, 5000)

}