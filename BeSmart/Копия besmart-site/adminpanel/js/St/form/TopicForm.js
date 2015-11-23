St.form.TopicForm = Ext.extend(Ext.form.FormPanel, {
    initComponent: function(){
        Ext.apply(this, {
            layout      : 'form',
            frame       : true,
            width       : 800,
            labelWidth  : 110,
            defaults    : {
                xtype  : 'textfield',
                anchor  : '0'
            },
            items       : this.createItems(),
            fbar        : this.buttomBar(),
            buttonAlign : 'left'
        });
        
        St.form.TopicForm.superclass.initComponent.call(this, arguments);
    },
    
    createItems: function(){
        return [{
            xtype   : 'fieldset',
            items   : [{
                fieldLabel  : 'ID',
                ref         : '../entityID',
                name        : 'id',
                xtype       : 'hidden'
            },{
                xtype       : 'textarea',
                name        : 'name',
                anchor      : '0',
                fieldLabel  : 'Тема'
            }, {
                xtype       : 'textarea',
                name        : 'body',
                anchor      : '0',
                fieldLabel  : 'Грамм. конструкция'
            }, {
                xtype       : 'St.form.ComboBox',
                fieldLabel  : 'Уровень',
                name        : 'levelID',
                anchor      : '0',
                store       : St.StoreMgr.getStore('Levels'),
                valueField  : 'ID',
                displayField: 'CalTitle'
            }, {
                xtype       : 'St.form.ComboBox',
                fieldLabel  : 'Тип урока',
                name        : 'lessontypeID',
                anchor      : '0',
                store       : St.StoreMgr.getStore('LessonTypes'),
                valueField  : 'id',
                displayField: 'name'
            }]
        }];
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

Ext.reg('St.form.TopicForm', St.form.TopicForm);