/*
 Write a JavaScript function that accepts a string as a parameter and converts the first letter of each word of the string in upper case. Go to the editor

 Example string: the quick brown fox

 Expected Output: The Quick Brown Fox*/

var line = 'the quick brown fox';
function toUC(line) {
    var words = line.split(' ');
    for (var i = 0; i < words.length; i++) {
        var lineIn = words[i].split('');
        lineIn[0] = lineIn[0].toUpperCase();
        words[i] = lineIn.join('')
    }
    return words;
}

console.log(toUC(line));
