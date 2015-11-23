St.data.EntityStore.Schools = Ext.extend(St.data.EntityStore, {
    constructor : function(config) {
        St.data.EntityStore.Schools.superclass.constructor.call(this, Ext.apply(config || {} , {
            autoLoad: true,
            entityName  : 'schools',
            fields      : [
                { name: 'id', mapping: 'id', type:'int' },
                { name: 'name', mapping: 'name' },
                { name: 'address', mapping: 'address' }
            ],
            sortInfo : {
                field: 'id',
                direction: 'ASC'
            }
        }));
    }
});