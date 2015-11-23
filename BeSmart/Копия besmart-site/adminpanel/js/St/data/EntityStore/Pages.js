St.data.EntityStore.Pages = Ext.extend(St.data.EntityStore, {
    constructor : function(config){
        St.data.EntityStore.Pages.superclass.constructor.call(this, Ext.apply(config || {} , {
            entityName  : 'pages',
            autoLoad: true,
            fields      : [
                { name: 'id', mapping: 'id', type:'int' },
                { name: 'name', mapping: 'name' },
                { name: 'title', mapping: 'title' },
                { name: 'description', mapping: 'description' },
                { name: 'keywords', mapping: 'keywords' },
                { name: 'content_on_disc', mapping: 'content_on_disc' },
                { name: 'template', mapping: 'template' },
                { name: 'content', mapping: 'content' },
                { name: 'protected', mapping: 'protected' }
            ]
        }));
    }
});