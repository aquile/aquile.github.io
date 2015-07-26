//Write a function shuffle(arr) to shuffle an array.
var arraychic = [123, 3245, 4567, 988, 987654];
function shuffle(arr) {
    function sorty() {
        return (Math.random() - 0.5);
    }
    return arr.sort(sorty);
}

console.log(shuffle(arraychic));