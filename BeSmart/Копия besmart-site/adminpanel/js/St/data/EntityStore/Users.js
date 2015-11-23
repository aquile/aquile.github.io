St.data.EntityStore.Users = Ext.extend(St.data.EntityStore, {
    constructor : function(config) {
        St.data.EntityStore.Users.superclass.constructor.call(this, Ext.apply(config || {} , {
            entityName  : 'users',
            autoLoad: true,
            fields      : [
                { name: 'id', mapping: 'id', type:'int' },
                { name: 'login', mapping: 'login' },
                { name: 'pass', mapping: 'pass' },
                { name: 'userTypeID', mapping: 'userTypeID' },
                { name: 'fullname', mapping: 'fullname' },
                { name: 'firstname', mapping: 'firstname' },
                { name: 'lastname', mapping: 'lastname' },
                { name: 'tel', mapping: 'tel' },
                { name: 'email', mapping: 'email' },
                { name: 'level', mapping: 'level' },
                { name: 'lessons', mapping: 'lessons' },
                { name: 'contractNumber', mapping: 'contractNumber' },
                { name: 'availableFrom', mapping: 'availableFrom'},
                { name: 'availableTo', mapping: 'availableTo'},
                { name: 'blockedTill', mapping: 'blockedTill'},
                { name: 'toTeacher', mapping: 'toTeacher'},
                { name: 'isActive', mapping: 'isActive', type: 'boolean' },
                { name: 'isBlocked', mapping: 'isBlocked', type: 'boolean' },
                { name: 'hasTeacher', mapping: 'hasTeacher', type: 'boolean' },
                { name: 'creationDate', mapping: 'creationDate'},
                { name: 'modificationDate', mapping: 'modificationDate'},
                { name: 'price', mapping: 'price' },
                { name: 'school', mapping: 'school' },
                { name: 'comments', mapping: 'comments' },
                { name: 'birthdate', mapping: 'birthdate' },
                { name: 'hasBook', mapping: 'hasBook', type: 'boolean' },
                { name: 'managerID', mapping: 'managerID'}
            ],
            sortInfo : {
                field: 'isActive',
                direction: 'DESC'
            }
        }));
    }
});