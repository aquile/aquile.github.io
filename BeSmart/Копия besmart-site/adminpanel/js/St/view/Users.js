St.view.Users = Ext.extend(St.View, {
    entityName  : 'Users',
    pageSize    : 5000,
    
    initComponent: function(config){
        Ext.apply(this, {     
            viewTitle   : 'Студенты'
        });

        St.view.Users.superclass.initComponent.call(this, config);
        
        this.mon(this.store, 'beforeload', function (store, options) {
            if (options.params) {
                options.params.bindings = Ext.encode({
                    isActive: this.onlyActive.getValue() ? 1 : 0
                });
            }
        }, this);
    },
    
    getToolBar : function(){
        return {
            items: [{ 
                text      : 'Создать',
                listeners : {
                    scope   : this,
                    click   : this.addWindow
                },
                iconCls : 'icon-user_add'
            }, '-', {
                xtype       : 'checkbox',
                boxLabel    : 'Только активные пользователи',
                ref         : '../onlyActive',
                ctCls       : 'st-only-active-checkbox',
                checked     : true,
                stateful    : true,
                stateId     : 'st_only_active_users',
                stateEvents : ['check'],
                getState    : function () {
                    return {
                        checked: this.getValue()
                    };
                },
                listeners   : {
                    scope   : this,
                    'check': function () {
                        this.store.reload();
                    }
                }
            }]
        }; 
    },

    getRowClass : function(record, rowIndex, rp, ds){ // rp = rowParams
        var css = '';
        if(!record.get('isActive')){
            css += 'st-grid-notactive';
        } else if (record.get('isBlocked')) {
            css += 'st-grid-isblocked';
        }
        var userTypeID = record.get('userTypeID');
        css += ' user_type' + userTypeID;
        
        return css;
    },

    getColumnModel: function(){
        var levelsStore = St.StoreMgr.getStore('Levels');
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
                header: '№ договора', 
                dataIndex: 'contractNumber',
                width: 100
            }, {
                header: 'Тип абонемента',
                dataIndex: 'userTypeID',
                renderer: function (value, meta, record) {
                    var store = St.StoreMgr.getStore('UserTypes'),
                        rec = store.getById(value),
                        text = value;

                    if (rec) {
                        text = rec.get('name');
                    }

                    return text;
                }
            }, {
                header: 'Цена', 
                dataIndex: 'price',
                width: 60,
                hidden: true
            }, {
                header: 'Логин', 
                dataIndex: 'login',
                width: 60
            }, {
                header: 'Имя Фамилия', 
                dataIndex: 'firstname',
                width: 300,
                renderer: function (value, meta, record) {
                    return value + ' ' + record.get('lastname');
                }
            }, {
                header: 'Телефон', 
                dataIndex: 'tel'
            }, {
                header: 'Email', 
                dataIndex: 'email',
                width: 150,
                hidden: true
            }, {
                header: 'Статус',
                dataIndex: 'isActive',
                width: 100,
                renderer: St.Renderer.isActive,
                hidden: true
            }, {
                header: 'Уровень',
                dataIndex: 'level',
                renderer: function (value, meta, record) {
                    var lv = levelsStore.getById(value);
                    return lv ? lv.get('CalTitle') : '';
                }
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
            }, {
                dataIndex: 'birthdate',
                header: 'Дата рождения'
            }, {
                header: 'Активный до',
                dataIndex: 'availableTo'
            }, {
                header: 'Блок до',
                dataIndex: 'blockedTill'
            }, {
                header: 'Дата создания',
                dataIndex: 'creationDate',
                hidden  : true
            }, {
                header: 'Дата изменения',
                dataIndex: 'modificationDate',
                hidden  : true
            }]
        });
    },
    
    cellDblClickHandler : function(grid, rowDataOrIndex){
        this.editWindow(grid, rowDataOrIndex);
    },
    
    addWindow: function(){
        new Ext.Window({
            title   : 'Новый студент',
            iconCls : 'icon-user_add',
            shadow  : 'drop',
            shadowOffset: 5,
            resizable: true,
            border  : false,
            floating: true,
            modal   :  true,
            items   : [{
                ref     : 'addForm',
                xtype   : 'St.form.UserForm',
                btnHandler: this.saveNew(this)
            }]
        }).show();
    },
    
    editWindow: function(grid, rowDataOrIndex){
        var data = Ext.isObject(rowDataOrIndex) ? rowDataOrIndex : grid.store.getAt(rowDataOrIndex).data,
            win = new Ext.Window({
                title   : 'Редактирование информации о студенте',
                iconCls : 'icon-user_edit',
                shadow  : 'drop',
                shadowOffset: 5,
                resizable: true,
                border  : false,
                modal   :  true,
                floating: true,
                items   : [{
                    ref     : 'addForm',
                    xtype   : 'St.form.UserForm',
                    userID  : data.id,
                    btnHandler: this.saveEdit(this)
                }]
            }).show();

        win.addForm.getForm().setValues(data);
    },
    
    deleteEntity: function(grid, rowDataOrIndex){
        Ext.Msg.confirm(
            'Удаление студента', 
            'Удалить студента:<br>ФИ: <b>' + rowDataOrIndex.firstname + ' ' + rowDataOrIndex.lastname + '</b><br/>Login: <b>' + rowDataOrIndex.login + '</b>', 
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
            record = scope.getStore().createRecord(Ext.applyIf(values, {
                userTypeID: 1
            }));
            scope.getStore().add(record);
            this.ownerCt.close();
        };
    },
    
    getCellMenuItems : function(){
        return [{
            text    : 'Отправить данные пользователю',
            iconCls : 'icon-mail',
            listeners : {
                scope: this,
                click: function(btn, evt){
                    var data = this.getSelectionModel().getSelected().data;
                    Ext.Ajax.request({
                        url: '/panel/data/users/service/reminduserinfo',
                        method: 'POST',
                        success: function () {
                            St.Msg('success', 'Информация успешно отправлена пользователю на почту');
                        },
                        failure: function () {
                            St.Msg('error', 'Произошла ошибка при отправке почты');
                        },
                        params: {
                            id: data.id 
                        }
                     });
                }
            }
        }, {
            text    : 'Редактировать',
            iconCls : 'icon-user_edit',
            listeners : {
                scope: this,
                click: function(btn, evt){
                    this.editWindow(this, this.getSelectionModel().getSelected().data);
                }
            }
        }/*, {
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
        }*/];
    }
});

Ext.reg('St.view.Users', St.view.Users);