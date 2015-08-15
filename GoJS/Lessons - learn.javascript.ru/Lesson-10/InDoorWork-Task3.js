/*
 Write a JavaScript function that returns a passed string with letters in alphabetical order. Go to the editor

 Example string: webmaster

 Expected Output: abeemrstw

 Assume punctuation and numbers symbols are not included in the passed string.*/

var line = 'webmaster';

function sortString(line1) {
    return line1.split('').sort().join('');
}

console.log(sortString(line));