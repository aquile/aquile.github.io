St.data.EntityStore.DataNodes = Ext.extend(St.data.EntityStore, {
    constructor : function(config) {
        St.data.EntityStore.DataNodes.superclass.constructor.call(this, Ext.apply(config || {} , {
            autoLoad: true,
            entityName  : 'datanodes',
            fields      : [
                { name: 'id', mapping: 'id', type:'int' },
                { name: 'type', mapping: 'type' },
                { name: 'value', mapping: 'value' },
                { name: 'description', mapping: 'description' }
            ]
        }));
    }
});