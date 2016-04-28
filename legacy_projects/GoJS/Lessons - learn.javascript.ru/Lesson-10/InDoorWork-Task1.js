/*Есть объект из чисел, строк и прочих данных. Необходимо его превратить в массив состоящий только из чисел или строк. Написать метод extractNumber или extractString, который будет возвращать массив.*/

var obj = {
    person1Age: 20,
    person1Name: 'Ivanov',
    person2Age: 30,
    person2Name: 'Petrov',
    person3Age: 40,
    person3Name: 'Sidorov'
};

function extractNumber(object) {
    var title;
    var massNumber = [];
    var massString = [];
    for (title in object) {
        if (typeof object[title] == 'number') {
            massNumber.push(object[title]);
        } else {
            massString.push(object[title]);
        }
    }

    return [massNumber, massString];
}

console.log(extractNumber(obj));