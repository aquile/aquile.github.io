function User(fullName) {
    this.fullName = fullName;

    Object.defineProperties(this, {
        firstName: {
            get: function () {
                return this.fullName.split(' ')[0];
            },
            set: function(newFirstName){
                this.fullName = newFirstName + " " + this.fullName.split(' ')[1];
            }
        },

        lastName: {
            get: function () {
                return this.fullName.split(' ')[1];
            },
            set: function(newLastName){
                this.fullName = this.fullName.split(' ')[0]  + " " + newLastName;
            }
        }


    })
}

    var vasya = new User("Василий Попкин");


// чтение firstName/lastName
    console.log(vasya.firstName); // Василий
    console.log(vasya.lastName); // Попкин

// запись в lastName
    vasya.lastName = 'Сидоров';

    console.log(vasya.fullName); // Василий Сидоров