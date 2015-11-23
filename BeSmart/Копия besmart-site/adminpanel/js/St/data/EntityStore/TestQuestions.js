St.data.EntityStore.TestQuestions = Ext.extend(St.data.EntityStore, {
    constructor : function(config) {
        St.data.EntityStore.TestQuestions.superclass.constructor.call(this, Ext.apply(config || {} , {
            autoLoad: false,
            entityName  : 'testquestions',
            fields      : [
                { name: 'id', mapping: 'id', type:'int' },
                { name: 'header', mapping: 'header' },
                { name: 'body', mapping: 'body' },
                { name: 'group', mapping: 'group', type:'int' },
                { name: 'qnumber', mapping: 'qnumber', type:'int' },
                { name: 'points', mapping: 'points', type:'int' },
                { name: 'test', mapping: 'test', type:'int' }
            ],
            sortInfo : {
                field: 'group',
                direction: 'ASC'
            }
        }));
    }
});

