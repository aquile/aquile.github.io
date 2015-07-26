function User() {

var name, surname;

    this.setfirstName = function (name1) {
        return name = name1;
    };

    this.setsurName = function (surname1) {
        return surname = surname1;
    };


    this.getFullName = function () {
       return name + ' ' + surname;
    }
}

var user = new User();
user.setfirstName("Petya");
user.setsurName("Ivanov");

console.log(user.getFullName());