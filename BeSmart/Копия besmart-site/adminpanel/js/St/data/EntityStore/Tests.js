St.data.EntityStore.Tests = Ext.extend(St.data.EntityStore, {
    constructor : function(config) {
        St.data.EntityStore.Tests.superclass.constructor.call(this, Ext.apply(config || {} , {
            autoLoad: true,
            entityName  : 'tests',
            fields      : [
                { name: 'id', mapping: 'id', type:'int' },
                { name: 'name', mapping: 'name' },
                { name: 'level', mapping: 'level', type:'int' },
                { name: 'type', mapping: 'type', type:'int' },
                { name: 'successRate', mapping: 'successRate', type:'int' },
                { name: 'timeLimit', mapping: 'timeLimit', type:'int' }
            ],
            sortInfo : {
                field: 'id',
                direction: 'ASC'
            }
        }));
    }
});