/**
 *  @author Victor Protsenko <protsenko.victor@gmail.com>
 **/
St.data.EntityStore.Packages = Ext.extend(St.data.EntityStore, {
    constructor : function(config) {
        St.data.EntityStore.Packages.superclass.constructor.call(this, Ext.apply(config || {} , {
            autoLoad: true,
            entityName  : 'packages',
            fields      : [
                { name: 'id', mapping: 'id', type:'int' },
                { name: 'name', mapping: 'name' },
                { name: 'days', mapping: 'days' },
                { name: 'day_price', mapping: 'day_price'}
            ],
            sortInfo : {
                field: 'id',
                direction: 'ASC'
            }
        }));
    }
});