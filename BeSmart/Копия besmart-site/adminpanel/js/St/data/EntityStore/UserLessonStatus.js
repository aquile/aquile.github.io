St.data.EntityStore.UserLessonStatus = Ext.extend(St.data.EntityStore, {
    constructor : function(config) {
        St.data.EntityStore.UserLessonStatus.superclass.constructor.call(this, Ext.apply(config || {} , {
            autoLoad: true,
            entityName  : 'userlessonstatus',
            fields      : [
                { name: 'id', mapping: 'id', type:'int' },
                { name: 'name', mapping: 'name' },
                { name: 'color', mapping: 'color' }
            ],
            sortInfo: {
                field: 'id',
                direction: 'ASC'
            }
        }));
    }
});