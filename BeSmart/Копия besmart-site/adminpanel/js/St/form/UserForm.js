St.form.UserForm = Ext.extend(Ext.form.FormPanel, {
    userID: 0,

    initComponent: function(){
        Ext.apply(this, {
            layout      : 'form',
            frame       : true,
            width       : 1000,
            labelWidth  : 130,
            items       : this.createItems(),
            fbar        : this.buttomBar(),
            buttonAlign : 'left'
        });
        
        St.form.UserForm.superclass.initComponent.call(this, arguments);
    },
    
    createItems: function () {
        var items = [];
        if (this.userID) {
            items.push({
                xtype: 'container',
                layout: {
                    type: 'hbox',
                    pack: 'start',
                    align: 'stretchmax'
                },
                defaults: {
                    margins: '0 10 0 0'
                },
                items: [this.getGeneralFieldset(), this.getPaymentFieldset()]
            });
        } else {
            items.push(this.getGeneralFieldset());
        }
        
        items.push({
            xtype: 'container',
            layout: {
                type: 'hbox',
                pack: 'start',
                align: 'stretchmax'
            },
            defaults: {
                margins: '0 10 0 0'
            },
            items : [this.getAbonementFieldset(), this.getCommentsFieldset()]
        });
        
        return items;
    },
    
    getAbonementFieldset: function () {
        return {
            xtype   : 'fieldset',
            title   : 'Абонемент',
            flex    : 1,
            items   : [{
                 xtype       : 'St.form.ComboBox',
                 fieldLabel  : 'Тип абонемента',
                 name        : 'userTypeID',
                 store       : St.StoreMgr.getStore('UserTypes'),
                 value       : 1,
                 valueField  : 'id',
                 displayField: 'name'
            }, {
                 xtype      : 'St.form.DateField',
                 name       : 'availableFrom',
                 fieldLabel : 'Активный с'
            }, {
                 xtype      : 'St.form.DateField',
                 name       : 'availableTo',
                 fieldLabel : 'Активный до'
            }, {
                 xtype      : 'St.form.DateField',
                 name       : 'blockedTill',
                 fieldLabel : 'Заблокирован до'
            }]
        };
    },
    getCommentsFieldset: function () {
        return {
            xtype   : 'fieldset',
            title   : 'Комментарии',
            width   : 550,
            margins : '0 0 0 0',
            items   : [{
                xtype   : 'St.form.Notes',
                name    : 'comments',
                hideLabel: true,
                anchor  : '0',
                height  : 100 
            }]
        };
    },
    getGeneralFieldset: function () {
        return {
            xtype   : 'fieldset',
            title   : 'Общая информация',
            flex    : 1,
            defaults    : {
                xtype   : 'textfield',
                width   : 250
            },
            items: [{
                fieldLabel  : 'ID',
                ref         : (this.userID ? '../' : '') + '../entityID',
                name        : 'id',
                xtype       : 'hidden'
            }, {
                fieldLabel  : 'Номер договора',
                name        : 'contractNumber'
            }, {
                fieldLabel  : 'Цена абонемента',
                name        : 'price'
            }, {
                fieldLabel  : 'Логин (ID клиента)',
                name        : 'login',
                readOnly    : true,
                disabled    : true,
                emptyText   : 'Логин будет присвоен после создания'
            }, {
                fieldLabel  : 'Пароль',
                name        : 'pass',
                allowBlank  : false,
                xtype       : 'St.form.PasswordField'
            }, {
                fieldLabel  : 'Фамилия',
                name        : 'lastname'
            }, {
                fieldLabel  : 'Имя',
                name        : 'firstname'
            }, {
                xtype       : 'St.form.DateField',
                name        : 'birthdate',
                fieldLabel  : 'Дата рождения'
            }, {
                fieldLabel  : 'Телефон',
                name        : 'tel'
            }, {
                fieldLabel  : 'E-mail',
                allowBlank  : false,
                name        : 'email'
            }, {
                xtype       : 'St.form.ComboBox',
                fieldLabel  : 'Уровень',
                name        : 'level',
                store       : St.StoreMgr.getStore('Levels'),
                value       : 1,
                valueField  : 'ID',
                displayField: 'CalTitle'
            }, {
                xtype       : 'St.form.ComboBox',
                fieldLabel  : 'Ответственный консультант',
                name        : 'managerID',
                store       : St.StoreMgr.getStore('Managers'),
                valueField  : 'id',
                displayField: 'name'
            }, {
                xtype       : 'St.form.ComboBox',
                fieldLabel  : 'Школа',
                name        : 'school',
                store       : St.StoreMgr.getStore('Schools'),
                valueField  : 'id',
                allowBlank  : false,
                displayField: 'name'
            }, {
                xtype       : 'checkbox',
                name        : 'hasBook',
                fieldLabel  : 'Книги выданы'
            }, {
                xtype       : 'container',
                fieldLabel  : 'Это преподаватель',
                layout      : 'hbox',
                items       : [{
                    xtype       : 'checkbox',
                    name        : 'hasTeacher',
                    margins     : '0 10 0 0',
                    listeners   : {
                        'check' : function (cmp, checked) {
                            var owner = this.ownerCt,
                                teacherField = owner.toTeacher;
                            if (!checked) {
                                teacherField.setValue();
                            }
                            teacherField.setVisible(checked);
                            owner.doLayout();
                        }
                    }
                }, {
                    xtype       : 'St.form.ComboBox',
                    name        : 'toTeacher',
                    store       : St.StoreMgr.getStore('Teachers'),
                    valueField  : 'id',
                    displayField: 'fullname',
                    ref         : 'toTeacher',
                    hidden      : true
                }]
            }]
        };
    },
    
    getPaymentFieldset: function () {
        return {
            width: 550,
            xtype: 'fieldset',
            title: 'Платежи',
            margins: '0 0 0 0',
            items: [{
                xtype: 'St.view.Payments',
                userID: this.userID
            }]
        };
    },
    
    buttomBar: function(){
        return [{
            xtype   : 'button', 
            text    : 'Отмена', 
            iconCls : 'icon-cancel',
            listeners: {
                scope   : this,
                click   : function(){
                    this.ownerCt.close();
                }
            }
        }, '->', {
            xtype   : 'button', 
            text    : 'Сохранить', 
            iconCls : 'icon-user_add',
            listeners: {
                scope   : this,
                click   : this.btnHandler
            }
        }];
    },
    
    btnHandler: function(){
        Ext.MessageBox.alert('Not implemented yet');
    }
});

Ext.reg('St.form.UserForm', St.form.UserForm);