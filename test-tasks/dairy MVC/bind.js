
function inc (a){
  return console.log(a);
}

for (var i = 0; i < 5; i++){
  var b = inc.bind(null, i);
  setTimeout(b , 50)
}
