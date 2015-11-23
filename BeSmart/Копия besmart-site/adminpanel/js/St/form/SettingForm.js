/**
 *  @author Victor Protsenko <protsenko.victor@gmail.com>
 **/
St.form.SettingForm = Ext.extend(Ext.form.FormPanel, {
    initComponent: function(){
        Ext.apply(this, {
            layout      : 'form',
            frame       : true,
            width       : 500,
            labelWidth  : 110,
            defaults    : {
                anchor  : '0'
            },
            items       : this.createItems(),
            fbar        : this.buttomBar(),
            buttonAlign : 'left'
        });
        
        St.form.SettingForm.superclass.initComponent.call(this, arguments);
    },
    
    createItems: function(){
        return [{
            xtype   : 'fieldset',
            defaults: {
                xtype       : 'textfield',
                anchor      : '0'
            },
            items   : [{
                fieldLabel  : 'ID',
                ref         : '../entityID',
                name        : 'id',
                xtype       : 'hidden'
            },{
                name        : 'name',
                fieldLabel  : 'Ключ'
            },{
                name        : 'group',
                fieldLabel  : 'Группа'
            }, {
                xtype       : 'textarea',
                name        : 'description',
                fieldLabel  : 'Описание'
            }, {
                xtype       : 'textarea',
                name        : 'value',
                fieldLabel  : 'Значение' 
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

Ext.reg('St.form.SettingForm', St.form.SettingForm);