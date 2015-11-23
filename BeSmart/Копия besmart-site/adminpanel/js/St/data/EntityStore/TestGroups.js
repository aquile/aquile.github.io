St.data.EntityStore.TestGroups = Ext.extend(St.data.EntityStore, {
    constructor : function(config) {
        St.data.EntityStore.TestGroups.superclass.constructor.call(this, Ext.apply(config || {} , {
            autoLoad: true,
            entityName  : 'testgroups',
            fields      : [
                { name: 'id', mapping: 'id', type:'int' },
                { name: 'name', mapping: 'name' }
            ],
            sortInfo : {
                field: 'name',
                direction: 'ASC'
            }
        }));
    }
});

