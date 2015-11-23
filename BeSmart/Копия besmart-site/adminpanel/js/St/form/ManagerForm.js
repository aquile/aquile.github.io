/**
 *  @author Victor Protsenko <protsenko.victor@gmail.com>
 **/
St.form.ManagerForm = Ext.extend(Ext.form.FormPanel, {
    initComponent: function(){
        Ext.apply(this, {
            layout      : 'form',
            frame       : true,
            width       : 400,
            labelWidth  : 110,
            defaults    : {
                anchor  : '0'
            },
            items       : this.createItems(),
            fbar        : this.buttomBar(),
            buttonAlign : 'left'
        });
        
        St.form.ManagerForm.superclass.initComponent.call(this, arguments);
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
                name        : 'name',
                xtype       : 'textfield',
                anchor      : '0',
                fieldLabel  : 'ФИО'
            }, {
                xtype       : 'textfield',
                name        : 'tel',
                anchor      : '0',
                fieldLabel  : 'Телефон'
            }, {
                xtype       : 'textfield',
                name        : 'email',
                anchor      : '0',
                fieldLabel  : 'E-mail'
            }, {
                fieldLabel  : 'Школа',
                xtype       : 'St.form.ComboBox',
                store       : St.StoreMgr.getStore('Schools'),
                name        : 'school',
                valueField  : 'id',
                displayField: 'name',
                allowBlank  : false
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

Ext.reg('St.form.ManagerForm', St.form.ManagerForm);