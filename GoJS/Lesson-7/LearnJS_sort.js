var users = [{
    name: "Два",
    surname: 'Манькин',
    age: 20
}, {
    name: "Три",
    surname: 'Дунькин',
    age: 25
}, {
    name: "Раз",
    surname: 'Баранкин',
    age: 18
}];

function byField(field) {
    return function(a, b) {
        return a[field] > b[field] ? 1 : -1;
    }
}

users.sort(byField('name'));
users.forEach(function(user) {
    console.log( user.name );
});

users.sort(byField('age'));
users.forEach(function(user) {
    console.log( user.name );
});
