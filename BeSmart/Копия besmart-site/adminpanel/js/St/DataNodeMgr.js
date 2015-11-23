St.DataNodeMgr = {
    dataNodes: {},
    store: null,
    stores: {},
    init: function () {
        this.store = St.StoreMgr.getStore('DataNodes');
        
        this.store.data.each(function (record, index) {
            var type = record.get('type'),
                value = record.get('value');
            if (!this.dataNodes[type]) {
                this.dataNodes[type] = {};
            }
            this.dataNodes[type][value] = record.data;
        }, this);
    },

    getByType: function (type) {
        return this.dataNodes[type];
    },

    getStore: function (type) {
        if (!this.stores[type]) {
            this.stores[type] = this.createStore(type);
        }
        
        return this.stores[type];
    },

    createStore: function (type) {
        var data = [],
            values = this.getByType(type);

        Ext.iterate(values, function (key, value) {
            data.push(value);
        });
        
        return new Ext.data.ArrayStore({
            loaded: true,
            idProperty: 'id',
            fields: [
                { name: 'id', mapping: 'id', type:'int' },
                { name: 'type', mapping: 'type' },
                { name: 'value', mapping: 'value' },
                { name: 'description', mapping: 'description' }
            ],
            data: data
        });
    }
};