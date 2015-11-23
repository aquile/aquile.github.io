
St.data.EntityStore = Ext.extend(Ext.data.JsonStore, {
    rcrd: undefined,
    entityName: undefined,
    loaded: false,
    constructor : function(config){
        if (!config.entityName) {
            console .error('Need to define "entityName" for each child of St.data.Store');
        }
        St.data.EntityStore.superclass.constructor.call(this, Ext.applyIf(config || {} , {
            autoSave    : true,
            root        : 'data',
            idProperty  : 'id',
            restful     : true,
            totalProperty: 'count',
            proxy       : new Ext.data.HttpProxy({ 
                api     : {
                    read    : { url: St.DATA_BASE + config.entityName, method: 'POST'},
                    create  : { url: St.DATA_BASE + config.entityName + '/new', method: 'POST'},
                    update  : { url: St.DATA_BASE + config.entityName + '/update', method: 'POST'},
                    destroy : { url: St.DATA_BASE + config.entityName + '/delete', method: 'POST'}
                }
            }),
            writer      : new Ext.data.JsonWriter({ encode: true, writeAllFields: false }),
            sortInfo    : {
                field       : 'id',
                direction   : 'DESC'
            },
            listeners   : {
                scope   : this,
                beforeload: function (store, options) {
                    if (options.params) {
                        options.params.department = systemDepartment;
                    }
                },
                load    : function(){
                    this.loaded = true;  
                },
                save    : function(store, bunch, data){
                    St.Msg('success', 'Сохранено');
                    store.reload();
                }
            }
        }));
        
        // define general record type
        this.rcrd = Ext.data.Record.create(config.fields);
    },
    
    createRecord : function(data){
        return new this.rcrd(data);
    }
});