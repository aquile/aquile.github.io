St.data.EntityStore.Statistics = Ext.extend(St.data.EntityStore, {
    constructor : function(config) {
        St.data.EntityStore.Statistics.superclass.constructor.call(this, Ext.apply(config || {} , {
            autoLoad: true,
            entityName  : 'statistics',
            fields      : [
                { name: 'name', mapping: 'name' },
                { name: 'value', mapping: 'value' },
                { name: 'bindings', mapping: 'bindings' }
            ],
            sortInfo    : null
        }));
    }
});