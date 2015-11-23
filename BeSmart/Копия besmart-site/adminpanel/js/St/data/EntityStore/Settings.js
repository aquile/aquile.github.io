/**
 *  @author Victor Protsenko <protsenko.victor@gmail.com>
 **/
St.data.EntityStore.Settings = Ext.extend(St.data.EntityStore, {
    constructor : function(config) {
        St.data.EntityStore.Settings.superclass.constructor.call(this, Ext.apply(config || {} , {
            autoLoad: true,
            entityName  : 'settings',
            fields      : [
                { name: 'id', mapping: 'id', type:'int' },
                { name: 'group', mapping: 'group' },
                { name: 'name', mapping: 'name' },
                { name: 'description', mapping: 'description' },
                { name: 'value', mapping: 'value'}
            ],
            sortInfo : {
                field: 'id',
                direction: 'DESC'
            }
        }));
    }
});