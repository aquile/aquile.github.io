St.data.EntityStore.TestResults = Ext.extend(St.data.EntityStore, {
    constructor : function(config) {
        St.data.EntityStore.TestResults.superclass.constructor.call(this, Ext.apply(config || {} , {
            entityName  : 'testresults',
            autoLoad: true,
            fields      : [
                { name: 'id', mapping: 'id', type:'int' },
                { name: 'level', mapping: 'level' },
                { name: 'name', mapping: 'name' },
                { name: 'tel', mapping: 'tel' },
                { name: 'email', mapping: 'email' },
                { name: 'time', mapping: 'time' }
            ]
        }));
    }
});