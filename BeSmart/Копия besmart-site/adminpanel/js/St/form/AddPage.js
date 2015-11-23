St.form.AddPage = Ext.extend(Ext.form.FormPanel, {
    
    initComponent: function(){
        Ext.apply(this, {
            name        : 'formName',
            layout      : 'form',
            frame       : true,
            width       : 800,
            height      : 500,
            labelWidth  : 130,
            defaults    : {
                xtype       : 'textfield',
                anchor      : '0'
            },
            items       : this.createItems(),
            bbar        : this.buttomBar()
        });
        
        St.form.AddPage.superclass.initComponent.call(this, arguments);
    },
    
    createItems: function(){
        return [{
                fieldLabel  : 'ID',
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
                hideLabel   : true,
                fieldLabel  : 'Содержание',
                name        : 'content',
                xtype       : 'htmleditor',
                anchor      : '0 -106'
            }];
    },
    
    buttomBar: function(){
        return ['->', {
                xtype   : 'button', 
                text    : 'Save', 
                iconCls : 'icon-page_save',
                listeners: {
                    scope   : this,
                    click   : this.addNewPage
                }
            }]
    },
    
    addNewPage: function(){
        var values = this.getForm().getValues();
        var record = new St.data.PageRecord(Ext.apply(values, {
            content_on_disk : 0,
            template        : 1
        }));
        
        St.stores.PageStore.add(record);
        this.ownerCt.close();
    }
});

Ext.reg('St.form.AddPage', St.form.AddPage);