/**
 *  @author Victor Protsenko <protsenko.victor@gmail.com>
 **/
St.data.EntityStore.Payments = Ext.extend(St.data.EntityStore, {
    constructor : function(config) {
        St.data.EntityStore.Payments.superclass.constructor.call(this, Ext.apply(config || {} , {
            autoLoad: true,
            entityName  : 'payments',
            fields      : [
                { name: 'id', mapping: 'id', type:'int' },
                { name: 'date', mapping: 'date' },
                { name: 'amount', mapping: 'amount', type: 'float' },
                { name: 'comment', mapping: 'comment' },
                { name: 'user', mapping: 'user' },
                { name: 'days', mapping: 'days', type: 'int' },
                { name: 'userDescription', mapping: 'userDescription'}
            ],
            sortInfo : {
                field: 'id',
                direction: 'DESC'
            }
        }));
    }
});