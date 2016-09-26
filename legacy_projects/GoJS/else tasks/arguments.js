/**
 * Created by Sergey on 27.07.2015.
 */
function sum() {
    var amm = 0;
    for (var i = 0; i < arguments.length; i++) {
        amm += arguments[i];
    }
    return console.log(amm);
}


sum();//0
sum(1, 2);// 3
sum(1, 2, 3);//= 6;
sum(1, 2, 3, 4);// = 10;