St.form.NewsForm = Ext.extend(Ext.form.FormPanel, {
    
    initComponent: function(){
        Ext.apply(this, {
            layout      : 'form',
            frame       : true,
            width       : 900,
            labelWidth  : 110,
            defaults    : {
                xtype  : 'textfield',
                anchor : '0'
            },
            items       : this.createItems(),
            fbar        : this.buttomBar(),
            buttonAlign : 'left'
        });
        
        St.form.NewsForm.superclass.initComponent.call(this, arguments);
    },
    
    createItems: function(){
        var newForm = this;
        return [{
            xtype   : 'fieldset',
            title   : 'Информация о статье',
            defaults: {
                anchor  : '0'
            },
            items   : [{
                fieldLabel  : 'ID',
                ref         : '../entityID',
                name        : 'id',
                xtype       : 'hidden'
            },{
                xtype       : 'textfield',
                name        : 'title',
                fieldLabel  : 'Заголовок'
            },{
                fieldLabel  : 'Описание',
                name        : 'body',
                xtype       : 'htmleditor',
                height      : 300
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
            iconCls : 'icon-newspaper_add',
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

Ext.reg('St.form.NewsForm', St.form.NewsForm);