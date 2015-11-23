St.form.TestQuestion = Ext.extend(Ext.form.FormPanel, {
    testInfo: undefined,
    
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
        
        St.form.TestQuestion.superclass.initComponent.call(this, arguments);
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
                xtype       : 'textfield',
                name        : 'header',
                anchor      : '0',
                fieldLabel  : 'Заголовок'
            }, {
                xtype       : 'textarea',
                name        : 'body',
                anchor      : '0',
                fieldLabel  : 'Текст вопроса'
            }, {
                xtype       : 'St.form.ComboBox',
                fieldLabel  : 'Группа',
                name        : 'group',
                anchor      : '0',
                store       : St.StoreMgr.getStore('TestGroups'),
                valueField  : 'id',
                displayField: 'name'
            }, {
                xtype       : 'numberfield',
                name        : 'qnumber',
                anchor      : '0',
                fieldLabel  : 'Номер вопроса'
            }, {
                xtype       : 'numberfield',
                name        : 'points',
                anchor      : '0',
                fieldLabel  : 'Баллы'
            }, {
                xtype       : 'St.form.ComboBox',
                fieldLabel  : 'Тест',
                name        : 'test',
                anchor      : '0',
                store       : St.StoreMgr.getStore('Tests'),
                value       : this.testInfo ? this.testInfo.id : 1,
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

Ext.reg('St.form.TestQuestion', St.form.TestQuestion);