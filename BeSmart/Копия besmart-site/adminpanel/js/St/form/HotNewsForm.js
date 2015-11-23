St.form.HotNewsForm = Ext.extend(Ext.form.FormPanel, {
    
    initComponent: function(){
        Ext.apply(this, {
            layout      : 'form',
            frame       : true,
            width       : 900,
            labelWidth  : 100,
            defaults    : {
                xtype  : 'textfield',
                anchor : '0'
            },
            items       : this.createItems(),
            fbar        : this.buttomBar(),
            buttonAlign : 'left'
        });
        
        St.form.HotNewsForm.superclass.initComponent.call(this, arguments);
    },
    
    createItems: function(){
        return [{
            fieldLabel  : 'ID',
            ref         : 'entityID',
            name        : 'id',
            xtype       : 'hidden'
        }, {
            fieldLabel  : 'Активная',
            xtype       : 'checkbox',
            name        : 'status',
            getValue    : function () {
                var val = Ext.form.Checkbox.prototype.getValue.apply(this, arguments);

                return val ? 1 : 0;
            }
        }, {
            xtype       : 'textfield',
            name        : 'title',
            fieldLabel  : 'Заголовок'
        },{
            fieldLabel  : 'Описание',
            name        : 'content',
            xtype       : 'htmleditor',
            height      : 300
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

Ext.reg('St.form.HotNewsForm', St.form.HotNewsForm);