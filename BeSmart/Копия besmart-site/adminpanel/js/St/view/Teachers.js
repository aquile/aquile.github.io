St.view.Teachers = Ext.extend(St.View, {
    entityName  : 'Teachers',
    pageSize    : 1000,
    
    initComponent: function(config){
        Ext.apply(this, {     
            viewTitle   : 'Преподаватели',
            uploadImageConfig: {
                url: '/panel/upload.php',
                method: 'POST',
//                waitMsg: 'Загрузка фотографий...',
                failure: function(form, action) {
                    console.log('failure', arguments);
                    switch (action.failureType) {
                    case Ext.form.Action.CLIENT_INVALID:
                        this.msg('Ошибка', 'Form fields may not be submitted with invalid values');
                        break;
                    case Ext.form.Action.CONNECT_FAILURE:
                        this.msg('Ошибка', 'Ajax communication failed');
                        break;
                    case Ext.form.Action.SERVER_INVALID:
                        this.msg('Ошибка', action.result.msg);
                        break;
                    }
                    this.ownerCt.close();
                }
            }
        });

        St.view.Teachers.superclass.initComponent.call(this, config);
    },
    
    getToolBar : function(){
        return {
            items: [{ 
                text      : 'Добавить',
                listeners : {
                    scope   : this,
                    click   : this.addWindow
                },
                iconCls : 'icon-user_add'
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
                header: 'Имя Фамилия', 
                dataIndex: 'fullname',
                width: 400
            }, {
                header: 'Телефон', 
                dataIndex: 'tel',
                renderer: St.Renderer.userRowHighlight
            }, {
                header: 'Email', 
                dataIndex: 'email',
                width: 150,
                renderer: St.Renderer.userRowHighlight
            }]
        });
    },
    
    cellDblClickHandler : function(grid, rowDataOrIndex){
        this.editWindow(grid, rowDataOrIndex);
    },
    
    addWindow: function(){
        new Ext.Window({
            title   : 'Новый преподаватель',
            iconCls : 'icon-user_add',
            shadow  : 'drop',
            shadowOffset: 5,
            resizable: false,
            border  : false,
            floating: true,
            modal   :  true,
            items   : [{
                ref     : 'addForm',
                xtype   : 'St.form.TeacherForm',
                btnHandler: this.saveNew(this)
            }]
        }).show();
    },
    
    editWindow: function(grid, rowDataOrIndex){
        var win = new Ext.Window({
            title   : 'Редактирование информации о преподавателе',
            iconCls : 'icon-user_edit',
            shadow  : 'drop',
            shadowOffset: 5,
            resizable: false,
            border  : false,
            floating: true,
            items   : [{
                ref      : 'addForm',
                xtype   : 'St.form.TeacherForm',
                btnHandler: this.saveEdit(this)
            }]
        }).show();

        win.addForm.getForm().setValues(Ext.isObject(rowDataOrIndex) ? rowDataOrIndex : grid.store.getAt(rowDataOrIndex).data);
    },
    
    deleteEntity: function(grid, rowDataOrIndex){
        Ext.Msg.confirm(
            'Удаление', 
            'Удалить преподавателя:<br>ФИ: <b>' + rowDataOrIndex.firstname + ' ' + rowDataOrIndex.lastname + '</b>', 
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
            bForm.submit(Ext.apply({
                scope: this, // Ext window scope
                success: function(form, action){
                    var data = action.result.data;
                    if (data && (data.photo || data.photo2 || data.photo3)) {
                        St.Msg('success', 'Новые фотографии успешно загружены на сервер');
                    }

                    Ext.iterate(data, function(key, value) {
                        bForm.findField(key).setValue(value);
                    }, this);
                    bForm.updateRecord(record);

                    this.ownerCt.close();
                }
            }, scope.uploadImageConfig));
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
            form.submit(Ext.apply({
                scope: this, // Ext window scope
                success: function(form, action) {
                    
                    var data = action.result.data;
                    if (data && (data.photo || data.photo2 || data.photo3)) {
                        St.Msg('success', 'Новые фотографии успешно загружены на сервер');
                    }
                    record = scope.getStore().createRecord(Ext.apply(values, data));
                    scope.getStore().add(record);
                    
                    this.ownerCt.close();
                }
            }, scope.uploadImageConfig));
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

Ext.reg('St.view.Teachers', St.view.Teachers);