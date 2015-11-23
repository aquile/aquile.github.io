St.form.LessonDetails = Ext.extend(Ext.form.FormPanel, {
    lessonRecord: undefined,
    initComponent: function(){
        if (!this.lessonRecord) {
            console.error('You should set "lessonID" to view lesson details');
            return;
        }
        this.store = new St.data.EntityStore.UserLesson({
            autoload: true,
            baseParams: {
                lessonID: this.lessonRecord.id
            },
            autoSave: false
        });
        this.mon(this.store, {
	    scope: this,
            'add': this.checkNewUserLesson
        });

        Ext.apply(this, {
            layout      : 'form',
            frame       : true,
            width       : 900,
            labelWidth  : 110,
            defaults    : {
                xtype  : 'textfield'
            },
            items       : this.createItems(),
            fbar        : this.buttomBar(),
            buttonAlign : 'left',
            listeners   : {
                scope: this,
                'beforedestroy': function () {
                    this.clearStoreFilter();
                    this.store.destroy();
                }
            }
        });
        
        St.form.LessonDetails.superclass.initComponent.call(this, arguments);
    },
    
    createItems: function(){
        return [{
            xtype   : 'St.form.ComboBox',
            store   : St.StoreMgr.getStore('LessonStatus'),
            displayField: 'name',
            fieldLabel: 'Статус урока',
            name    : 'status',
            ref     : 'lessonStatus',
            value   : this.lessonRecord.get('status'),
            width   : 130,
            valueField: 'id'
        }, {
            xtype   : 'fieldset',
            title   : 'Информация о студентах',
            defaults: {
                
            },
            items   : [{
                xtype: 'button',
                text: 'Добавить студента',
                scope: this,
                handler: this.addNewStudent,
                style: 'margin-bottom: 5px;'
            }, {
                xtype: 'editorgrid',
                store: this.store,
                autoExpandColumn: 'fullname',
                clicksToEdit: 1,
                height: 300,
                border: true,
                colModel: this.getGridColumns(),
                selModel    : new Ext.grid.RowSelectionModel({ 
                    singleSelect: true 
                }),
                viewConfig: {
                    emptyText: 'Студенты не зарегистрированы'
                }
            }]
        }];
    },

    setValues : function (data) {
        this.getForm().setValues(data);
        this.filterUsers();
    },

    addNewStudent: function () {
       (new St.wizard.Select({
           viewXType: 'St.view.Users',
           listeners: {
               scope: this,
               'select': function (wizard, selectedRecord) {
                   var record = new this.store.recordType({
                        user: selectedRecord.id,
                        lesson: this.lessonRecord.id,
                        status: 1,
                        fullname: selectedRecord.get('fullname'),
                        login: selectedRecord.get('login')
                   });
                   
                   this.store.add(record);
               }
           }
       })).show();
    },

    getGridColumns: function () {
        var ulStore = St.StoreMgr.getStore('UserLessonStatus');
        return new Ext.grid.ColumnModel({
            columns: [{
                dataIndex: 'id',
                header: 'System ID',
                hidden: true
            }, {
                dataIndex: 'login',
                header: 'ID',
                width: 40
            }, {
                header: 'Имя студента',
                dataIndex: 'fullname',
                id: 'fullname'
            }, {
                header: 'Статус',
                dataIndex: 'status',
                width: 160,
                renderer: function (value, meta, record) {
                    var color,
                        status = ulStore.getById(value);
                    if (status) {
                        color = status.get('color');
                        meta.style += 'background-color: #' + color + '; color: ' + ('#' + color).contrastColor();
                        return status.get('name');
                    }
                },
                editor: new St.form.ComboBox({
                    store: St.StoreMgr.getStore('UserLessonStatus'),
                    displayField: 'name',
                    valueField: 'id',
                    lazyRender: true
                })
            }]
        });
    },
    buttomBar: function(){
        return [{
            xtype   : 'button', 
            text    : 'Закрыть', 
            listeners: {
                scope   : this,
                click   : function(){
                    this.ownerCt.close();
                }
            }
        }, '->', {
            xtype   : 'button', 
            text    : 'Сохранить', 
            listeners: {
                scope   : this,
                click   : this.btnHandler
            }
        }];
    },
    
    btnHandler: function() {
        var saved = this.store.save();
        var statusValue = this.lessonStatus.getValue();
        if (statusValue != this.lessonRecord.get('status')) {
            this.form.updateRecord(this.lessonRecord);
        } else if (saved) {
            this.lessonRecord.store.reload();
        }
//        this.ownerCt.close();
    },
    mask: function (msg) {
        this.ownerCt.el.mask(msg);
    },

    unmask: function () {
        this.ownerCt.el.unmask();
    },

    filterUsers: function () {
        var store = St.StoreMgr.getStore('Users');
        if (!store.loaded) {
            this.mon(store, 'load', this.filterUsers, this, {
                single: true
            });
        }
        store.clearFilter();
        store.filter('isActive', true);
    },
    
    clearStoreFilter: function () {
        var store = St.StoreMgr.getStore('Users');
        store.clearFilter();
    },
    
    checkNewUserLesson: function (store, records) {
        var record = records[0],
            userID = record.get('user'),
            lessonID = record.get('lesson'),
            failureFn = function () {
                store.remove(record);
                St.Msg('error', 'Произошла ошибка во премя проверки пользовтеля. Повторите попытку позже');
            };
        this.mask('Идет проверка пользователя...');
        
        
        Ext.Ajax.request({
            url: '/panel/checkUser.php',
            method: 'POST',
            params: {
                user    : userID,
                lesson  : lessonID
            },
            scope: this,
            callback: function () {
                this.unmask();
            },
            success: function (response) {
                var data;
                try {
                    data = Ext.decode(response.responseText)
                } catch(e) {
                    failureFn();
                    return;
                }
                if (!data.success) {
                    Ext.Msg.show({
                        title   : 'Уведомление',
                        buttons : Ext.MessageBox.OK,
                        msg     : data.msg,
                        width   : 500,
                        icon    : Ext.MessageBox.ERROR,
                        modal   : true
                    });
                    store.remove(record);
                }
            },
            failure: failureFn
        });
    }
});

Ext.reg('St.form.LessonDetails', St.form.LessonDetails);