St.view.Pages = Ext.extend(St.View, {
    entityName  : 'Pages',
    pageSize    : 20,
    templatesStore: undefined,
    
    initComponent: function(config){
        Ext.apply(this, {     
            viewTitle   : 'Страницы сайта',
            titleIconCls: 'icon-application_side_boxes'
        });
        
        St.view.Pages.superclass.initComponent.call(this, config);
    },
    
    getToolBar : function(){
        return {
            items: [{ 
                text      : 'Создать страницу',
                listeners : {
                    scope   : this,
                    click   : this.addPageWindow
                },
                iconCls : 'icon-page_add'
            }]
        }; 
    },
    
    getColumnModel: function(){
        return new Ext.grid.ColumnModel({
            defaults: {
                sortable: true
            },
            columns: [{
                header : 'Тип', 
                dataIndex : 'template', 
                width: 12, 
                menuDisabled: true, 
                renderer : function(value, meta, record){
                    var tmp = St.StoreMgr.getStore('Templates').getById(value),
                        cls = tmp ? tmp.get('icon') : '';
                    return '<div ext:qtip="' + tmp.get('templ_desc') + '" style="margin: 0 auto; width: 16px; height: 16px;" class="' + cls + '"></div>';
                }
            }, {
                id : 'id', 
                header : 'ID', 
                dataIndex : 'id', 
                width: 10
            }, {
                header: 'Адрес страницы (URL)', 
                dataIndex: 'name',
                renderer: function (value, meta, record) {
                    return '/' + value;
                }
            }, {
                header: 'Заголовок', 
                dataIndex: 'title'
            }, {
                header: 'Описание', 
                dataIndex: 'description'
            }, {
                header: 'Ключевые слова', 
                dataIndex: 'keywords'
            }, {
                header: '<img src="/panel/css/icons/lock.png">',
                dataIndex: 'protected',
                width: 10,
                sortable: false,
                menuDisabled: true,
                renderer: function (value, meta, record) {
                    if (value === '1') {
                        return '<img src="/panel/css/icons/lock.png">';
                    } else {
                        return '';
                    }
                }
            }]
        });
    },
    
    cellDblClickHandler : function(grid, rowDataOrIndex){
        this.editPageWindow(grid, rowDataOrIndex);
    },
    
    addPageWindow: function(){
        new Ext.Window({
            title   : 'Создание новой страницы',
            iconCls : 'icon-page_add',
            shadow  : 'drop',
            shadowOffset: 5,
            resizable: false,
            border  : false,
            floating: true,
            modal   :  true,
            items   : [{
                ref     : 'addForm',
                xtype   : 'St.form.PageForm',
                btnHandler: this.saveNew(this)
            }]
        }).show();
    },
    
    editPageWindow: function(grid, rowDataOrIndex){
        var win = new Ext.Window({
            title   : 'Редактирование страницы',
            iconCls : 'icon-page_edit',
            shadow  : 'drop',
            shadowOffset: 5,
            resizable: false,
            border  : false,
            floating: true,
            items   : [{
                ref      : 'addForm',
                xtype   : 'St.form.PageForm',
                btnHandler: this.saveEdit(this)
            }]
        }).show();
        
        
        win.addForm.getForm().setValues(Ext.isObject(rowDataOrIndex) ? rowDataOrIndex : grid.store.getAt(rowDataOrIndex).data);
    },
    
    deletePage: function(grid, rowDataOrIndex){
        Ext.Msg.confirm(
            'Удаление страницы', 
            'Удалить страницу:<br>URL: <b>' + rowDataOrIndex.name + '</b><br/>ID: <b>' + rowDataOrIndex.id + '</b>', 
            function(btn, text){
                if (btn === 'yes'){
                    grid.store.remove(grid.store.getById(rowDataOrIndex.id));
                }
            }
        );
    },
    
    saveEdit : function(scope){
        return function(){
            var bForm = this.getForm(),
            record = scope.getStore().getById(this.pageID.getValue());

            bForm.updateRecord(record);

            this.ownerCt.close();
        };
    },
    
    /**
     * scope - this component
     * this - window component
     */
    saveNew: function(scope){
        return function(){
            var values = this.getForm().getFieldValues(),
                record = scope.getStore().createRecord(Ext.applyIf(values, {
                    content_on_disc : 0,
                    template        : 1
                }));

            scope.getStore().add(record);
            this.ownerCt.close();
        };
    },
    
    getCellMenuItems : function(){
        return [{
            text    : 'Просмотреть на сайте',
            iconCls : 'icon-page_find',
            listeners : {
                scope: this,
                click: function(btn, evt){
                    var page_info = this.getSelectionModel().getSelected().data;
                    window.open(window.location.origin + '/' + page_info.name, '_blank');
                }
            }
        },{
            text    : 'Редактировать',
            iconCls : 'icon-page_edit',
            listeners : {
                scope: this,
                click: function(btn, evt){
                    this.editPageWindow(this, this.getSelectionModel().getSelected().data);
                }
            }
        },{
            text    : 'Удалить',
            iconCls : 'icon-page_delete',
            style   : 'color: #ff0000',
            listeners : {
                scope : this,
                click :  function(btn, evt) {
                    var data = this.getSelectionModel().getSelected().data;
                    
                    if (data['protected'] === '1') {
                        Ext.Msg.alert('Ошибка доступа', 'Эта страница не может быть удалена');
                    } else {
                        this.deletePage(this, data);
                    }
                }
            } 
        }];
    }
    
});

Ext.reg('St.view.Pages', St.view.Pages);