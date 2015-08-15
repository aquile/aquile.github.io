function AmIAfraid(day, num) {

    var result;
    switch (day) {
        case    "Monday":
            if (num === 12) {
                result = true;
            } else {
                result = false;
            }
            break;
        case    "Tuesday":
            if (num > 95) {
                result = true;
            } else {
                result = false;
            }
            break;
        case    "Wednesday":
            if (num === 34) {
                result = true;
            } else {
                result = false;
            }
            break;
        case "Thursday":
            if (num === 0) {
                result = true;
            } else {
                result = false;
            }
            break;
        case   "Saturday":
            if (num === 56) {
                result = true;
            } else {
                result = false;
            }
            break;
        case   "Sunday":
            if (num === 666 || num === -666) {
                result = true;
            } else {
                result = false;
            }
            break;
        case   "Friday":
            if (num % 2 == 0) {
                result = true;
            } else {
                result = false;
            }
            break;

        default :
            result = false;
    }

    return console.log(result);
}

AmIAfraid("Monday", 12);

/*
 var fearDays = {
 "Monday": 12,
 "Tuesday": 95,
 "Wednesday": 34,
 "Thursday": 0,
 "Friday": true,
 "Saturday": 56,
 "Sunday": 666 || -666
 };

 for (var key in fearDays) {
 if (num === fearDays[key]) {
 var expectedDay = key;
 break;
 }
 }

 return console.log(expectedDay);

 };
 //if (!expectedDay) return*/


