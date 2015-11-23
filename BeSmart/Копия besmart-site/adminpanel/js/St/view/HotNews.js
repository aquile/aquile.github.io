St.view.HotNews = Ext.extend(St.View, {
    entityName  : 'HotNews',
    pageSize    : 1000,
    
    initComponent: function(config){
        Ext.apply(this, {     
            viewTitle   : 'Акции',
            autoExpandColumn: 'title',
            viewConfig  : {
                forceFit    : false
            }
        });
        
        St.view.HotNews.superclass.initComponent.call(this, config);
    },
    
    cellDblClickHandler : function(grid, rowDataOrIndex){
        this.editCommentsHandler.apply(this, arguments);
    },
    
    getToolBar : function(){
        return [{ 
            text      : 'Добавить акцию',
            listeners : {
                scope   : this,
                click   : this.addCommentsHandler
            }
        }];
    },
    
    getColumnModel: function(){
        return new Ext.grid.ColumnModel({
            defaults: {
                sortable: true
            },
            columns: [{ 
                id          : 'id', 
                header      : 'ID', 
                dataIndex   : 'id', 
                width       : 30
            }, {
                header      : 'Название акции',
                dataIndex   : 'title',
                id          : 'title'
            }, {
                header      : 'Активная',
                dataIndex   : 'status',
                width       : 70,
                renderer    : function (value, meta, record) {
                    return (value == 1 ? '+' : '-');
                }
            }]
        });
    },
    
    addCommentsHandler: function(){
        new Ext.Window({
            title   : 'Новая акция',
            shadow  : 'drop',
            shadowOffset: 5,
            resizable: false,
            border  : false,
            floating: true,
            modal   :  true,
            items   : [{
                ref         : 'addForm',
                xtype       : 'St.form.HotNewsForm',
                btnHandler  : this.saveNew(this)
            }]
        }).show();
    },
        
    editCommentsHandler: function(grid, rowDataOrIndex){
        var win = new Ext.Window({
            title   : 'Редактировать акцию',
            shadow  : 'drop',
            shadowOffset: 5,
            resizable: false,
            border  : false,
            floating: true,
            items   : [{
                ref     : 'addForm',
                xtype   : 'St.form.HotNewsForm',
                btnHandler: this.saveEdit(this)
            }]
        }).show();
        
        
        win.addForm.getForm().setValues(Ext.isObject(rowDataOrIndex) ? rowDataOrIndex : grid.store.getAt(rowDataOrIndex).data);
    },

    /**
     * this - link to the CommentsForm.js
     * @param scope - link to THIS class
     **/
    saveEdit : function(scope){
        return function(){
            var bForm = this.getForm(),
            record = scope.getStore().getById(this.entityID.getValue());

            bForm.updateRecord(record);

            this.ownerCt.close();
        };
    },
    
    /**
     * this - link to the CommentsForm.js
     * @param scope - link to THIS class
     **/
    saveNew: function(scope){
        return function(){
            var form = this.getForm(),
                values,
                record;
                
            if (form.isValid()) {
                values = form.getFieldValues();
                record = scope.getStore().createRecord(Ext.apply(values, {
                }));

                scope.getStore().add(record);
                this.ownerCt.close();
            }
        };
    }
    
});

Ext.reg('St.view.HotNews', St.view.HotNews);