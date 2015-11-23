St.form.TeacherForm = Ext.extend(Ext.form.FormPanel, {
    
    initComponent: function(){
        Ext.apply(this, {
            layout      : 'form',
            frame       : true,
            fileUpload  : true,
            width       : 800,
            height      : 500,
            autoScroll  : true,
            labelWidth  : 130,
            defaults    : {
                defaults: {
                    xtype  : 'textfield',
                    anchor : '0'
                }
            },
            items       : this.createItems(),
            fbar        : this.buttomBar(),
            buttonAlign : 'left'
        });
        
        St.form.TeacherForm.superclass.initComponent.call(this, arguments);
    },
    
    createItems: function(){
        return [{
            xtype: 'fieldset',
            title   : 'Основная информация',
            items: [{
                fieldLabel  : 'ID',
                ref         : '../entityID',
                name        : 'id',
                xtype       : 'hidden'
            }, {
                fieldLabel  : 'Фамилия',
                allowBlank  : false,
                name        : 'lastname'
            }, {
                fieldLabel  : 'Имя',
                allowBlank  : false,
                name        : 'firstname'
            }, {
                fieldLabel  : 'Телефон',
                name        : 'tel'
            }, {
                fieldLabel  : 'E-mail',
                allowBlank  : false,
                name        : 'email'
            }]
        }, {
            xtype: 'fieldset',
            title   : 'Анкетные данные',
            items: [{
                fieldLabel  : 'Образование',
                name        : 'education',
                xtype       : 'textarea'
            }, {
                fieldLabel  : 'Хобби',
                name        : 'hobby',
                xtype       : 'textarea'
            }, {
                fieldLabel  : 'Любимая песня',
                name        : 'fsong',
                xtype       : 'textarea'
            }, {
                fieldLabel  : 'Любимый фильм',
                name        : 'fmovie',
                xtype       : 'textarea'
            }, {
                fieldLabel  : 'Любимая книга',
                name        : 'fbook',
                xtype       : 'textarea'
            }, {
                fieldLabel  : 'Любимая цитата',
                name        : 'fquote',
                xtype       : 'textarea'
            }]
        }, {
            xtype: 'fieldset',
            title: 'Фотографии',
            items: [{
                xtype   : 'box',
                style   : 'padding: 10px; background: rgb(252, 252, 172); color: red; margin-bottom: 8px; border: 1px solid #fff',
                html    : 'Суммарный размер всех фотографий не должен превышать <b>2 МБ</b>. Иначе фотографии не будут добавлены'
            }, {
                fieldLabel  : 'Фото 1',
                name        : 'photo',
                xtype       : 'St.form.FileUploadField'
            }, {
                fieldLabel  : 'Фото 2',
                name        : 'photo2',
                xtype       : 'St.form.FileUploadField'
            }, {
                fieldLabel  : 'Фото 3',
                name        : 'photo3',
                xtype       : 'St.form.FileUploadField'
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
            iconCls : 'icon-user_add',
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

Ext.reg('St.form.TeacherForm', St.form.TeacherForm);