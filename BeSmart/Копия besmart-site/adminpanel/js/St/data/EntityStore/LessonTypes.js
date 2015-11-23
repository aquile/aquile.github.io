St.data.EntityStore.LessonTypes = Ext.extend(St.data.EntityStore, {
    constructor : function(config) {
        St.data.EntityStore.LessonTypes.superclass.constructor.call(this, Ext.apply(config || {} , {
            autoLoad: true,
            entityName  : 'lessontypes',
            fields      : [
                { name: 'id', mapping: 'id', type:'int' },
                { name: 'name', mapping: 'name' }
            ],
            sortInfo : {
                field: 'id',
                direction: 'ASC'
            }
        }));
    }
});