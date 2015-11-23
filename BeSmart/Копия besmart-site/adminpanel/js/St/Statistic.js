St.Statistic = Ext.extend(Ext.grid.GridPanel, {
    initComponent: function () {
        Ext.apply(this, {
            hideHeaders : true,
            colModel    : this.getColumnModel(),
            store       : St.StoreMgr.getStore('Statistics'),
            tbar        : this.getTopToolbar(),
            viewConfig: {
                forceFit    : true
            },
            listeners   : {
                scope: this,
                rowdblclick: this.onRowDblClick
            }
        });
        St.Statistic.superclass.initComponent.apply(this, arguments);
    },

    onRowDblClick: function (cmp, rowIndex, e) {
        var selRecord = this.selModel.getSelected();
        var win = new Ext.Window({
            layout  : 'fit',
            modal   : true,
            items: [{
                xtype   : 'St.view.Users',
                height  : 500,
                width   : 950,
                alwaysFetchData: true,
                storeCfg: {
                    baseParams: {
                        'bindings' : Ext.encode(selRecord.get('bindings'))
                    }
                }
            }]
        });
        win.show();
    },

    getColumnModel: function () {
        return new Ext.grid.ColumnModel({
            columns: [{
                dataIndex   : 'name'
            }, {
                dataIndex   : 'value',
                width       : 40
            }]
        });
    },
    
    getTopToolbar: function () {
        return [{
            text    : 'Обновить',
            iconCls : 'icon-arrow_refresh',
            listeners : {
                scope   : this,
                click   : function(){
                    this.store.reload();
                }
            }
        }];
    }
});

Ext.reg('St.Statistic', St.Statistic);