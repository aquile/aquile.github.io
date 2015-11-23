St.form.LessonForm = Ext.extend(Ext.form.FormPanel, {
    
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
            buttonAlign : 'left',
            listeners   : {
                'scope': this,
                'beforedestroy' : function () {
                    this.lessonTopics.store.clearFilter();
                }
            }
        });
        
        St.form.LessonForm.superclass.initComponent.call(this, arguments);
    },
    
    createItems: function(){
        return [{
                fieldLabel  : 'ID',
                ref         : 'entityID',
                name        : 'ID',
                xtype       : 'hidden'
            }, {
                xtype       : 'St.form.DisplayField.Date',
                name        : 'StartDt',
                fieldLabel  : 'Начало'
            }, {
                xtype       : 'St.form.DisplayField.Date',
                name        : 'EndDt',
                fieldLabel  : 'Окончание'
            }, {
                fieldLabel  : 'Статус',
                xtype       : 'St.form.ComboBox',
                store       : St.StoreMgr.getStore('LessonStatus'),
                name        : 'status',
                valueField  : 'id',
                displayField: 'name',
                value       : 1
            }, {
                fieldLabel  : 'Тип урока',
                name        : 'lesson_type',
                xtype       : 'St.form.ComboBox',
                store       : St.StoreMgr.getStore('LessonTypes'),
                value       : 1,
                valueField  : 'id',
                displayField: 'name',
                ref         : 'lessontypeID',
                listeners   : {
                    scope   : this,
                    'select': this.filterTopics
                }
            }, {
                fieldLabel  : 'Уровень',
                name        : 'CalID',
                xtype       : 'extensible.calendarcombo',
                editable    : false,
                ref         : 'levelID',
                mode        : 'local',
                triggerAction: 'all',
                store       : St.StoreMgr.getStore('Levels'),
                value       : 1,
                valueField  : 'ID',
                displayField: 'CalTitle',
                listeners   : {
                    scope   : this,
                    'select': this.filterTopics
                }
            }, {
                fieldLabel  : 'Аудитория',
                name        : 'room',
                xtype       : 'St.form.ComboBox',
                store       : St.StoreMgr.getStore('Rooms'),
                valueField  : 'id',
                displayField: 'nameAndLimitAndSchool',
                allowBlank  : false
            }, {
                fieldLabel  : 'Преподаватель',
                name        : 'teacher',
                xtype       : 'St.form.ComboBox',
                store       : St.StoreMgr.getStore('Teachers'),
                valueField  : 'id',
                displayField: 'fullname'
            }, {
                fieldLabel  : 'Тема урока',
                name        : 'lessonTopicID',
                xtype       : 'St.form.Select',
                store       : St.StoreMgr.getStore('Topics'),
                viewXType   : 'St.view.Topics',
                valueField  : 'id',
                displayField: 'name',
                ref         : 'lessonTopics',
                parent      : this
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
    },
    
    setValues : function (data) {
        this.getForm().setValues(data);
        this.filterTopics();
    },
    
    filterTopics: function () {
        if (!this.lessonTopics.store.loaded) {
            this.mon(this.lessonTopics.store, {
                'scope': this,
                'load': this.filterTopics
            });
        }
        var levelID = this.levelID.getValue(),
            lessontypeID = this.lessontypeID.getValue();
        
        this.lessonTopics.store.clearFilter();
        
        this.lessonTopics.store.filterBy(function (record) {
            return record.data.levelID == levelID && record.data.lessontypeID == lessontypeID;
        });
    }
});

Ext.reg('St.form.LessonForm', St.form.LessonForm);