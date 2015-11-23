St.form.PageForm = Ext.extend(Ext.form.FormPanel, {
    
    initComponent: function(){
        Ext.apply(this, {
            layout      : 'form',
            frame       : true,
            width       : 800,
            labelWidth  : 130,
            defaults    : {
                xtype  : 'textfield',
                anchor : '0'
            },
            items       : this.createItems(),
            fbar        : this.buttomBar(),
            buttonAlign : 'left'
        });
        
        St.form.PageForm.superclass.initComponent.call(this, arguments);
    },
    
    createItems: function(){
        return [{
                fieldLabel  : 'ID',
                ref         : 'pageID',
                name        : 'id',
                xtype       : 'hidden'
            }, {
                fieldLabel  : 'Адрес страницы',
                name        : 'name'
            }, {
                fieldLabel  : 'Заголовок',
                name        : 'title'
            }, {
                fieldLabel  : 'Description',
                name        : 'description'
            }, {
                fieldLabel  : 'Keywords',
                name        : 'keywords'
            }, {
                xtype       : 'St.form.ComboBox',
                fieldLabel  : 'Шаблон',
                name        : 'template',
                store       : St.StoreMgr.getStore('Templates'),
                value       : 1,
                valueField  : 'id',
                displayField: 'templ_desc'
            }, {
                hideLabel   : true,
                fieldLabel  : 'Содержание',
                name        : 'content',
                xtype       : 'htmleditor',
                anchor      : '0 -106',
                plugins     : St.plugins.htmleditor.Plugins()
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
            iconCls : 'icon-page_save',
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

Ext.reg('St.form.PageForm', St.form.PageForm);