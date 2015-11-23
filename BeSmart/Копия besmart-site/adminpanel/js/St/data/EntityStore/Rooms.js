St.data.EntityStore.Rooms = Ext.extend(St.data.EntityStore, {
    constructor : function(config) {
        St.data.EntityStore.Rooms.superclass.constructor.call(this, Ext.apply(config || {} , {
            autoLoad: true,
            entityName  : 'rooms',
            fields      : [
                { name: 'id', mapping: 'id', type:'int' },
                { name: 'name', mapping: 'name' },
                { name: 'limit', mapping: 'limit' },
                { name: 'nameAndLimit', mapping: 'nameAndLimit'},
                { name: 'nameAndLimitAndSchool', mapping: 'nameAndLimitAndSchool'},
                { name: 'school', mapping: 'school'}
            ],
            sortInfo : {
                field: 'id',
                direction: 'ASC'
            }
        }));
    }
});