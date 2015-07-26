function isEmpty(obj) {
    var counter = 0;
    for (var key in obj) {
        counter++
    }
    return (counter == 0) ? true : false;
}

var schedule = {};

console.log(isEmpty(schedule)); // true

schedule["8:30"] = "подъём";

console.log(isEmpty(schedule)); // false