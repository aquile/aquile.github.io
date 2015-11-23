St.data.EntityStore.UserLesson = Ext.extend(St.data.EntityStore, {
    constructor : function(config) {
        St.data.EntityStore.UserLesson.superclass.constructor.call(this, Ext.apply(config || {} , {
            autoLoad: true,
            idProperty: 'id',
            entityName  : 'userlesson',
            fields      : [
                { name: 'id', mapping: 'id', type: 'int' },
                { name: 'user', mapping: 'user' },
                { name: 'lesson', mapping: 'lesson' },
                { name: 'status', mapping: 'status' },
                { name: 'login', mapping: 'login' },
                { name: 'fullname', mapping: 'fullname' }
            ]
        }));
    }
});