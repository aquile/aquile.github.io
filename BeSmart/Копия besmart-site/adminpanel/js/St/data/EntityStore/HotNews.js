St.data.EntityStore.HotNews = Ext.extend(St.data.EntityStore, {
    constructor : function(config) {
        St.data.EntityStore.HotNews.superclass.constructor.call(this, Ext.apply(config || {} , {
            autoLoad: true,
            entityName  : 'hotnews',
            fields      : [
                { name: 'id', mapping: 'id', type:'int' },
                { name: 'title', mapping: 'title' },
                { name: 'content', mapping: 'content' },
                { name: 'status', mapping: 'status'}
            ],
            sortInfo : {
                field: 'id',
                direction: 'DESC'
            }
        }));
    }
});