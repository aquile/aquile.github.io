St.data.EntityStore.Managers = Ext.extend(St.data.EntityStore, {
    constructor : function(config) {
        St.data.EntityStore.Managers.superclass.constructor.call(this, Ext.apply(config || {} , {
            autoLoad: true,
            entityName  : 'managers',
            fields      : [
                { name: 'id', mapping: 'id', type:'int' },
                { name: 'name', mapping: 'name' },
                { name: 'tel', mapping: 'tel' },
                { name: 'email', mapping: 'email' },
                { name: 'school', mapping: 'school' },
                { name: 'deleted', mapping: 'deleted' }
            ],
            sortInfo : {
                field: 'id',
                direction: 'ASC'
            }
        }));
    }
});