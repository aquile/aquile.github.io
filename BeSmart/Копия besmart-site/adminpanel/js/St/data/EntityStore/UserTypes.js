St.data.EntityStore.UserTypes = Ext.extend(St.data.EntityStore, {
    constructor : function(config) {
        St.data.EntityStore.UserTypes.superclass.constructor.call(this, Ext.apply(config || {} , {
            autoLoad: true,
            entityName  : 'usertypes',
            fields      : [
                { name: 'id', mapping: 'id', type:'int' },
                { name: 'name', mapping: 'name' },
                { name: 'timeFrom', mapping: 'timeFrom', type: 'int'  },
                { name: 'timeTo', mapping: 'timeTo', type: 'int'  },
                { name: 'daysPerMonth', mapping: 'daysPerMonth', type: 'int' },
                { name: 'allowRegister', mapping: 'allowRegister', type: 'boolean' },
                { name: 'visibleDays', mapping: 'visibleDays', type: 'int' },
                { name: 'multischool', mapping: 'multischool', type: 'boolean' },
                { name: 'department', mapping: 'department', type: 'int'},
                { name: 'visibleForAll', mapping: 'visibleForAll', type: 'boolean' }
            ]
        }));
    }
});