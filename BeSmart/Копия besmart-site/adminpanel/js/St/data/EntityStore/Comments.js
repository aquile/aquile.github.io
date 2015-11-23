St.data.EntityStore.Comments = Ext.extend(St.data.EntityStore, {
    constructor : function(config){
        St.data.EntityStore.Comments.superclass.constructor.call(this, Ext.apply(config || {} , {
            entityName  : 'comments',
            autoLoad    : true,
            fields      : [
                { name: 'id',   mapping: 'id' , type: 'int'  },
                { name: 'page', mapping: 'page' },
                { name: 'posted_time', mapping: 'posted_time' },
                { name: 'name', mapping: 'name'},
                { name: 'content', mapping: 'content'},
                { name: 'rating', mapping: 'rating', type: 'int' },
                { name: 'read', mapping: 'read'},
                { name: 'page', mapping: 'page', type: 'int' },
                { name: 'answer', mapping: 'answer'},
                { name: 'teacherID', mapping: 'teacherID', type: 'int' },
                { name: 'userID', mapping: 'userID', type: 'int' },
                { name: 'userLogin', mapping: 'userLogin', type: 'String'}
            ]
        }));
    }
});