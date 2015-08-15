//Task 1
var obj = {
    className: 'open menu'
}

function addClass(obj, cls) {
    var arr = obj.className.split(' ');
   if (arr.indexOf(cls) === -1) {
       arr.push(cls);
       obj.className = arr.join(' ');
   }
}

addClass(obj, 'open');
addClass(obj, 'new');
addClass(obj, 'fuck');

console.log(obj.className);

//Task 2
