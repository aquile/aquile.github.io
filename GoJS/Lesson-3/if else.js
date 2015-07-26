/**
 * Created by Sergey on 18.07.2015.
 */
var userName = prompt("who is come?");

if (userName == 'admin') {
    var userPassword = prompt('type the password');
    if (userPassword == 111) {
        alert('welcome!');
    } else if (!userPassword) {
        alert('access canceled');
    } else alert('wrong password');
} else if (!userName) {
    alert('access canceled')
} else alert('access denied');


//OK

login = prompt('insert login');
message = (login == 'vasya') ? 'hello' :
    (login == 'master') ? 'hellouu master' :
        (login == '') ? '' : 'no login';

console.log(message);

//OK
var age = 5;
if(age < 14 || age > 90) alert(true);