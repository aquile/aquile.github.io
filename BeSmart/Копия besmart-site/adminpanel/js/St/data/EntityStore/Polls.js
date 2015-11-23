St.data.EntityStore.Polls = Ext.extend(St.data.EntityStore, {
    constructor : function(config) {
        St.data.EntityStore.Polls.superclass.constructor.call(this, Ext.apply(config || {} , {
            autoLoad: true,
            entityName  : 'polls',
            fields      : [
                { name: 'id', mapping: 'id', type:'int' },
                { name: 'question', mapping: 'question' },
                { name: 'answers', mapping: 'answers' },
                { name: 'options', mapping: 'options' },
                { name: 'active', mapping: 'active', type: 'boolean'},
                { name: 'results', mapping: 'results'}
            ],
            sortInfo : {
                field: 'id',
                direction: 'DESC'
            }
        }));
    }
});