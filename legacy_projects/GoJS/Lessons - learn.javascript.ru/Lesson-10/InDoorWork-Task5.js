/*
 Write a JavaScript function that accepts a string as a parameter and find the longest word within the string. Go to the editor

 Example string: Web Development Tutorial

 Expected Output: Development*/

var line = 'Web Development Tutorial ljdshghdghkhgkhj';

function maxWord(line) {
    var words = line.split(' ');
    words = words.sort(sorty);
    function sorty(a, b) {
        return (a.length < b.length) ? 1 : -1;
    }
    return words[0];
}
 console.log(maxWord(line));


