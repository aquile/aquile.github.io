var name = prompt('enter your name bitch!', defaultStatus);

alert('hello ' + name);

if (!confirm('are you sure that you are ' + name + '?')) {
    (alert("go away!"));
} else {
    alert("hello again " + name);
}
