St.data.EntityStore.Topics = Ext.extend(St.data.EntityStore, {
    constructor : function(config) {
        St.data.EntityStore.Topics.superclass.constructor.call(this, Ext.apply(config || {} , {
            autoLoad: true,
            entityName  : 'topics',
            fields      : [
                { name: 'id', mapping: 'id', type:'int' },
                { name: 'name', mapping: 'name' },
                { name: 'levelID', mapping: 'levelID', type:'int' },
                { name: 'lessontypeID', mapping: 'lessontypeID', type:'int' },
                { name: 'grammar', mapping: 'grammar' }
            ],
            sortInfo : {
                field: 'id',
                direction: 'DESC'
            }
        }));
    }
});