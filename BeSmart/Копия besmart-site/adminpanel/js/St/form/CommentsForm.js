St.form.CommentsForm = Ext.extend(Ext.form.FormPanel, {
    
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
        
        St.form.CommentsForm.superclass.initComponent.call(this, arguments);
    },
    
    createItems: function(){
        return [{
            fieldLabel  : 'ID',
            ref         : 'entityID',
            name        : 'id',
            xtype       : 'hidden'
        },{
            xtype       : 'radiogroup',
            fieldLabel  : 'Опубликоано',
            name        : 'read',
            items       : [{
                inputValue  : 0,
                name        : 'read',
                boxLabel    : 'нет'
            }, {
                inputValue  : 1,
                name        : 'read',
                checked     : true,
                boxLabel    : 'да'
            }]
        }, {
            xtype       : 'St.form.ComboBox',
            fieldLabel  : 'Оценка',
            width       : 200,
            allowBlank  : false,
            name        : 'rating',
            store       : St.data.RatingStore,
            valueField  : 'id',
            displayField: 'name',
            value       : 5
        },{
            xtype       : 'textfield',
            allowBlank  : false,
            name        : 'name',
            fieldLabel  : 'Имя пользователя'
        }, {
            fieldLabel  : 'Содержание',
            name        : 'content',
            allowBlank  : false,
            xtype       : 'htmleditor',
            height      : 200
        }, {
            fieldLabel  : 'Ответ',
            name        : 'answer',
            xtype       : 'htmleditor',
            height      : 200
        }, {
            fieldLabel  : 'Странца',
            xtype       : 'St.form.ComboBox',
            store       : St.StoreMgr.getStore('Pages'),
            name        : 'page',
            valueField  : 'id',
            displayField: 'title',
            allowBlank  : false
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
            iconCls : 'icon-comment_add',
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

Ext.reg('St.form.CommentsForm', St.form.CommentsForm);