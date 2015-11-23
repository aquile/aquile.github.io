Ext.ns('St.wizard');

St.wizard.Select = Ext.extend(Ext.Window, {
    viewXType: undefined,
    modal: true,
    initComponent: function () {
        if (!this.viewXType) {
            throw 'St.wizard.Select:: Не указан viewXType';
        }
        
        Ext.apply(this, {
            items: this.createItem()
        });
        
        St.wizard.Select.superclass.initComponent.apply(this, arguments);
        this.addEvents(['select']);
    },
    
    createItem: function () {
        return [{
            xtype: this.viewXType,
            cellMenuHandler: Ext.emptyFn,
            height: 500,
            cellDblClickHandler: (function (grid, rowIndex, columnIndex, e) {
                var record = grid.selModel.getSelected();
                if (this.fireEvent('select', this, record) !== false) {
                    this.close();
                }
            }).createDelegate(this)
        }];
    }
});

Ext.reg('St.wizard.Select', St.wizard.Select);