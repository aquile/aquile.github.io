St.data.EntityStore.TestTypes = Ext.extend(St.data.EntityStore, {
    constructor : function(config) {
        St.data.EntityStore.TestTypes.superclass.constructor.call(this, Ext.apply(config || {} , {
            autoLoad: true,
            entityName  : 'testtypes',
            fields      : [
                { name: 'id', mapping: 'id', type:'int' },
                { name: 'name', mapping: 'name' }
            ],
            sortInfo : {
                field: 'id',
                direction: 'ASC'
            }
        }));
    }
});