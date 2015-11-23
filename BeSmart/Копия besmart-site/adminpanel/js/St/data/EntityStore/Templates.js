St.data.EntityStore.Templates = Ext.extend(St.data.EntityStore, {
    constructor : function(config) {
        St.data.EntityStore.Templates.superclass.constructor.call(this, Ext.apply(config || {} , {
            autoLoad: true,
            entityName  : 'templates',
            fields      : [
                { name: 'id', mapping: 'id', type:'int' },
                { name: 'templ_desc', mapping: 'templ_desc' },
                { name: 'templ_path_name', mapping: 'templ_path_name' },
                { name: 'icon', mapping: 'icon' }
            ]
        }));
    }
});