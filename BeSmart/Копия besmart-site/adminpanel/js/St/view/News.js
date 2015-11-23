St.view.News = Ext.extend(St.View, {
    entityName  : 'News',
    pageSize    : 20,
    
    initComponent: function(config){
        Ext.apply(this, {     
            viewTitle   : 'Новости сайта',
            titleIconCls: 'icon-news_icon',
            cellDblClickHandler : this.editNewsWindow
        });
        
        St.view.News.superclass.initComponent.call(this, config);
    },
    
    getToolBar : function(){
        return [{ 
            text        : 'Создать новость',
            iconCls     : 'icon-newspaper_add',
            listeners   : {
                scope   : this,
                click   : this.addNewsWindow
            }
        }];
    },
    
    getColumnModel: function(){
        return new Ext.grid.ColumnModel({
            defaults: {
                sortable: true
            },
            columns: [
                { id : 'id', header : 'ID', dataIndex : 'id', width: 5},
                { header: 'Заголовок', dataIndex: 'title' }
            ]
        });
    },

    getCellMenuItems: function(grid, rowIndex, cellIndex, evtObj){
        return [{
            text    : 'Просмотреть на сайте',
            iconCls : 'icon-page_find',
            listeners : {
                scope: this,
                click: function(btn, evt){
                    var page_info = this.getSelectionModel().getSelected().data;
                    window.open(window.location.origin + '/news/view/' + page_info.id, '_blank');
                }
            }
        },{
            text    : 'Редактировать',
            iconCls : 'icon-page_edit',
            listeners : {
                scope: this,
                click: function(btn, evt){
                    this.editNewsWindow(this, this.getSelectionModel().getSelected().data);
                }
            }
        },{
            text    : 'Удалить',
            iconCls : 'icon-newspaper_delete',
            style   : 'color: #ff0000',
            listeners : {
                scope : this,
                click :  function(btn, evt){
                    this.deleteNews(this, this.getSelectionModel().getSelected().data);
                }
            } 
        }];
    },
    
    addNewsWindow: function(){
        new Ext.Window({
            title   : 'Создание новости',
            iconCls : 'icon-newspaper_add',
            shadow  : 'drop',
            shadowOffset: 5,
            resizable: false,
            border  : false,
            floating: true,
            modal   :  true,
            items   : [{
                    ref         : 'addForm',
                    xtype       : 'St.form.NewsForm',
                    btnHandler  : this.saveNew(this)
            }]
        }).show();
    },
        
    editNewsWindow: function(grid, rowDataOrIndex){
        var win = new Ext.Window({
            title   : 'Редактирование новости',
            iconCls : 'icon-page_edit',
            shadow  : 'drop',
            shadowOffset: 5,
            resizable: false,
            border  : false,
            floating: true,
            items   : [{
                    ref      : 'addForm',
                    xtype   : 'St.form.NewsForm',
                    btnHandler: this.saveEdit(this)
            }]
        }).show();
        
        
        win.addForm.getForm().setValues(Ext.isObject(rowDataOrIndex) ? rowDataOrIndex : grid.store.getAt(rowDataOrIndex).data);
    },
    
    deleteNews: function(grid, rowDataOrIndex){
        Ext.Msg.confirm(
            'Удаление новости', 
            'Удалить новость:<br>URL: <b>' + rowDataOrIndex.title + '</b><br/>ID: <b>' + rowDataOrIndex.id + '</b>', 
            function(btn, text){
                if (btn == 'yes'){
                    grid.store.remove(grid.store.getById(rowDataOrIndex.id));
                }
            }
        );
    },
    
    /**
     * this - link to the NewsForm.js
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
     * this - link to the NewsForm.js
     * @param scope - link to THIS class
     **/
    saveNew: function(scope){
        return function(){
            var values = this.getForm().getFieldValues();
            
            var record = scope.getStore().createRecord(Ext.apply(values, {
                // Add here default values
            }));

            scope.getStore().add(record);
            this.ownerCt.close();
        };
    }
    
});

Ext.reg('St.view.News', St.view.News);