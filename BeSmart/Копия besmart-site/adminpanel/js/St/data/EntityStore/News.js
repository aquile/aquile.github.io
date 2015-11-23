St.data.EntityStore.News = Ext.extend(St.data.EntityStore, {
    constructor : function(config){
        St.data.EntityStore.News.superclass.constructor.call(this, Ext.apply(config || {} , {
            entityName  : 'news',
            autoLoad    : true,
            fields      : [
                { name: 'id',       mapping: 'id', type: 'int' },
                { name: 'title',    mapping: 'title' },
                { name: 'body', mapping: 'body' }
            ]
        }));
    }
});