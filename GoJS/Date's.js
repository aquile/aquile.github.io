//task1
var Feb20 = new Date(2012, 01, 20, 03, 12);
console.log(Feb20);

var date = new Date(2012,0,3);  // 3 ������ 2012

//task2
function getWeekDay() {
    var arr = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    return arr[date.getDay()];
}

console.log( getWeekDay(date) );      // ������ ������� '��'

//task3
var date = new Date(2012, 0, 0);  // 3 ��� 2012
function getLocalDay() {
    var day = date.getDay();

    if (day == 0) { // ���� 0 ���������� 7
        day = 7;
    }

    return day;
}

console.log( getLocalDay(date) );       // �������, ������� 2