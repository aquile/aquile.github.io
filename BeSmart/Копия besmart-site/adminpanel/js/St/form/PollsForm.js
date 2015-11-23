/**
 *  @author Victor Protsenko <protsenko.victor@gmail.com>
 **/
St.form.PollsForm = Ext.extend(Ext.form.FormPanel, {
    initComponent: function(){
        Ext.apply(this, {
            layout      : 'form',
            frame       : true,
            width       : 800,
            labelWidth  : 110,
            defaults    : {
                anchor  : '0'
            },
            items       : this.createItems(),
            fbar        : this.buttomBar(),
            buttonAlign : 'left'
        });
        
        St.form.PollsForm.superclass.initComponent.call(this, arguments);
    },
    
    createItems: function(){
        return [{
            xtype   : 'fieldset',
            items   : [{
                fieldLabel  : 'ID',
                ref         : '../entityID',
                name        : 'id',
                xtype       : 'hidden'
            }, {
                name        : 'active',
                xtype       : 'checkbox',
                fieldLabel  : 'Активный'
            }, {
                name        : 'question',
                xtype       : 'textfield',
                anchor      : '0',
                fieldLabel  : 'Вопрос'
            }, {
                name        : 'options',
                xtype       : 'textarea',
                anchor      : '0',
                height      : 100,
                fieldLabel  : 'Варианты'
            }, {
                xtype       : 'box',
                html        : '<div class="field_description">Форматирование вариантов ответа: <b>["Вариант1", "Вариант2"]</b></div>'
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

Ext.reg('St.form.PollsForm', St.form.PollsForm);