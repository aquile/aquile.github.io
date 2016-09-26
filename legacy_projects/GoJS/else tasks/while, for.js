do {
    var n = prompt('insert number > 100');
} while (n != null && n < 100);




var num = 10;
nest:
    for (var i = 2; i < num; i++) {
        for (var j = 2; j < i; j++) {
            if (i % j == 0) continue nest;
        }
        console.log(i);
}