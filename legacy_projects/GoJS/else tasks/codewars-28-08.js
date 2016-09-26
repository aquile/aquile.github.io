/**
 * Created by Sergey on 28.08.2015.
 */
function solution(number) {
    var sum = 0;
    for (var i = 1; i < +number; i++) {
        if (i % 3 == 0 || i % 5 == 0) {
            sum += i;
            console.log(i);
        }
    }
    return sum;
}

console.log(solution(10));