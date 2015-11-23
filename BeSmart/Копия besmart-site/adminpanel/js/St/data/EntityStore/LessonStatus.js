St.data.EntityStore.LessonStatus = Ext.extend(St.data.EntityStore, {
    constructor : function(config) {
        St.data.EntityStore.LessonStatus.superclass.constructor.call(this, Ext.apply(config || {} , {
            autoLoad: true,
            entityName  : 'lessonstatus',
            fields      : [
                { name: 'id', mapping: 'id', type:'int' },
                { name: 'name', mapping: 'name' },
                { name: 'color', mapping: 'color' }
            ],
            sortInfo    : {
                field       : 'id',
                direction   : 'ASC'
            }
        }));
    }
});