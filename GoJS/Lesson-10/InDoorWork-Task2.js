/*Необходимо написать функцию, которая будет принимать на вход массив чисел и возвращать самое большое.*/

    getMaxNumber([1,30,40,2,7]); // 40
getMaxNumber([1,15,-20,2,-7]); // 15

function getMaxNumber(mass) {
    return Math.max.apply(null, mass);
}
console.log(getMaxNumber([1,30,40,2,7]));