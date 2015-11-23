St.view.Pages.Search = Ext.extend(St.view.Pages, {
    
    getColumnModel: function(){
        return new Ext.grid.ColumnModel({
            defaults: {
                sortable: true
            },
            columns: [
                { id : 'id', header : 'ID', dataIndex : 'id', width: 35, fixed: true, hideable: false, menuDisabled: true},
                { header: 'Адрес страницы (URL)', dataIndex: 'name',hideable: false },
                { header: 'Заголовок', dataIndex: 'title' },
                { header: 'Описание', dataIndex: 'description', hidden: true }
            ]
        });
    },
    
    cellMenuHandler: function(grid, rowIndex, cellIndex, evtObj){
        evtObj.stopEvent();
    },
    
    cellDblClickHandler : function(grid, rowDataOrIndex){ 
        this.onOk.call(this.scope, Ext.isObject(rowDataOrIndex) ? rowDataOrIndex : grid.store.getAt(rowDataOrIndex).data);
    }
});

Ext.reg('St.view.Pages.Search', St.view.Pages.Search);