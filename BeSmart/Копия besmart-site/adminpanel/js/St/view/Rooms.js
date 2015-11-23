/**
 *  @author Victor Protsenko <protsenko.victor@gmail.com>
 **/
St.view.Rooms = Ext.extend(St.View, {
    entityName  : 'Rooms',
    pageSize    : 1000,
    
    initComponent: function(config){
        Ext.apply(this, {     
            viewTitle   : 'Аудитории'
        });

        St.view.Rooms.superclass.initComponent.call(this, config);
    },
    
    getToolBar : function(){
        return {
            items: [{ 
                text      : 'Добавить',
                listeners : {
                    scope   : this,
                    click   : this.addWindow
                }
            }]
        }; 
    },
    
    getColumnModel: function(){
        return new Ext.grid.ColumnModel({
            defaults: {
                sortable: true
            },
            columns: [{
                id : 'id', 
                header : 'ID', 
                dataIndex : 'id', 
                width: 30,
                hidden: true
            }, {
                header: 'Название комнаты', 
                dataIndex: 'name'
            }, {
                header: 'Лимит студентов', 
                dataIndex: 'limit'
            }, {
                header: 'Школа', 
                dataIndex: 'school',
                linkedEntity: {
                    storeEntity : 'Schools',
                    valueFn: function (data) {
                        return data.name;
                    }
                },
                renderer: St.Renderer.linkedEntity
            }]
        });
    },
    
    cellDblClickHandler : function(grid, rowDataOrIndex){
        this.editWindow(grid, rowDataOrIndex);
    },
    
    addWindow: function(){
        new Ext.Window({
            title   : 'Новая аудитория',
            shadow  : 'drop',
            shadowOffset: 5,
            resizable: false,
            border  : false,
            floating: true,
            modal   :  true,
            items   : [{
                ref     : 'addForm',
                xtype   : 'St.form.RoomForm',
                btnHandler: this.saveNew(this)
            }]
        }).show();
    },
    
    editWindow: function(grid, rowDataOrIndex){
        var win = new Ext.Window({
            title   : 'Редактирование аудитории',
            iconCls : 'icon-user_edit',
            shadow  : 'drop',
            shadowOffset: 5,
            resizable: false,
            border  : false,
            floating: true,
            modal   : true,
            items   : [{
                ref      : 'addForm',
                xtype   : 'St.form.RoomForm',
                btnHandler: this.saveEdit(this)
            }]
        }).show();

        win.addForm.getForm().setValues(Ext.isObject(rowDataOrIndex) ? rowDataOrIndex : grid.store.getAt(rowDataOrIndex).data);
    },
    
    deleteEntity: function(grid, rowDataOrIndex){
        Ext.Msg.confirm(
            'Удаление', 
            'Удалить аудиторию?', 
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
                record = scope.getStore().getById(this.entityID.getValue());
            if (!bForm.isValid()) {
                return;
            }
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
                form = this.getForm(),
                record;
        
            if (!form.isValid()) {
                return;
            }
            record = scope.getStore().createRecord(Ext.applyIf(values, {}));
            scope.getStore().add(record);
            this.ownerCt.close();
        };
    },
    
    getCellMenuItems : function(){
        return [{
            text    : 'Редактировать',
            iconCls : 'icon-user_edit',
            listeners : {
                scope: this,
                click: function(btn, evt){
                    this.editWindow(this, this.getSelectionModel().getSelected().data);
                }
            }
        }, {
            text    : 'Удалить',
            iconCls : 'icon-user_delete',
            style   : 'color: #ff0000',
            listeners : {
                scope : this,
                click :  function(btn, evt) {
                    var data = this.getSelectionModel().getSelected().data;
                    this.deleteEntity(this, data);
                }
            } 
        }];
    }
});

Ext.reg('St.view.Rooms', St.view.Rooms);