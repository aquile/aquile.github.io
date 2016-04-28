/*
 Имеется массив css классов со старницы.

 var arr = ['link', 'menu', 'menu__item', 'menu__item', 'header', 'link', 'footer', 'sidebar', 'link' ... ];
 Необходимо из этого массива получить массив с уникальными именами классов (без повторений) отсортированный по частоте использования (наиболее часто используемые - впереди).

 Если классы используются одинаковое количество раз - между ними не важно какой будет первее.

 result = ['link', 'menu__item', 'menu', 'header', 'footer', 'sidebar', ... ];*/

var arr = ['link', 'menu', 'menu__item', 'menu__item', 'header', 'link', 'footer', 'sidebar', 'link'];

function sortClass(arr1) {
    var frequency = {};
    for (var i = 0; i < arr1.length; i++) {

        if (frequency[arr1[i]]) {
            frequency[arr1[i]]++;
        } else {
            frequency[arr1[i]] = 1;
        }
    }
    function sorty(a, b) {
        return (frequency[a] < frequency[b]) ? 1 : -1;
    }
    return Object.keys(frequency).sort(sorty);

}
console.log(sortClass(arr));