St.form.Tests = Ext.extend(Ext.form.FormPanel, {
    
    initComponent: function(){
        Ext.apply(this, {
            layout      : 'form',
            frame       : true,
            width       : 600,
            labelWidth  : 150,
            defaults    : {
                xtype  : 'textfield',
                anchor  : '0'
            },
            items       : this.createItems(),
            fbar        : this.buttomBar(),
            buttonAlign : 'left'
        });
        
        St.form.Tests.superclass.initComponent.call(this, arguments);
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
                name        : 'name',
                anchor      : '0',
                fieldLabel  : 'Название'
            }, {
                xtype       : 'St.form.ComboBox',
                fieldLabel  : 'Тип',
                name        : 'type',
                store       : St.StoreMgr.getStore('TestTypes'),
                anchor      : '0',
                value       : 1,
                valueField  : 'id',
                displayField: 'name'
            }, {
                xtype       : 'St.form.ComboBox',
                fieldLabel  : 'Доступен на уровене',
                name        : 'level',
                anchor      : '0',
                store       : St.StoreMgr.getStore('Levels'),
                value       : 1,
                valueField  : 'ID',
                displayField: 'CalTitle'
            }, {
                xtype       : 'numberfield',
                fieldLabel  : 'Лимит времени, мин.',
                name        : 'timeLimit',
                allowNegative: false,
                width       : 60
            }, {
                xtype       : 'numberfield',
                fieldLabel  : '% правильных ответов для прохождения',
                name        : 'successRate',
                minValue    : 0,
                maxValue    : 100,
                allowNegative: false,
                width       : 60
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

Ext.reg('St.form.Tests', St.form.Tests);