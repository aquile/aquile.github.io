St.form.Abonement = Ext.extend(Ext.form.FormPanel, {
    
    initComponent: function(){
        Ext.apply(this, {
            layout      : 'form',
            frame       : true,
            width       : 650,
            labelWidth  : 160,
            defaults    : {
                xtype  : 'textfield',
                anchor  : '0'
            },
            items       : this.createItems(),
            fbar        : this.buttomBar(),
            buttonAlign : 'left'
        });
        
        St.form.Abonement.superclass.initComponent.call(this, arguments);
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
                fieldLabel  : 'Департамент',
                name        : 'department',
                value       : systemDepartment,
                xtype       : 'hidden'
            }, {
                fieldLabel  : 'Глобальный абонемент',
                name        : 'visibleForAll',
                xtype       : 'checkbox',
                hidden      : !St.isMainOffice,
                boxLabel    : '<span class="st-field-description">(Абонемент будет доступен для выбора во всех офисах BeSmart)</span>'
            }, {
                xtype       : 'textfield',
                name        : 'name',
                anchor      : '0',
                fieldLabel  : 'Название'
            }, {
                fieldLabel  : 'Время с',
                name        : 'timeFrom',
                minValue    : 8,
                maxValue    : 22,
                maxLength   : 2,
                xtype       : 'numberfield',
                width       : 40,
                value       : 8
            }, {
                fieldLabel  : 'Время до',
                name        : 'timeTo',
                minValue    : 8,
                maxValue    : 22,
                maxLength   : 2,
                xtype       : 'numberfield',
                width       : 40,
                value       : 22
            }, {
                fieldLabel  : 'Дней в месяц',
                name        : 'daysPerMonth',
                minValue    : 0,
                maxValue    : 31,
                xtype       : 'numberfield',
                width       : 40,
                value       : 0
            }, {
                fieldLabel  : 'Дней в расписании',
                name        : 'visibleDays',
                minValue    : 1,
                maxValue    : 7,
                maxLength   : 1,
                xtype       : 'numberfield',
                width       : 40,
                value       : 5
            }, {
                fieldLabel  : 'Регистрация доступна',
                name        : 'allowRegister',
                xtype       : 'checkbox',
                checked     : true
            }, {
                fieldLabel  : 'Во всех школах',
                name        : 'multischool',
                xtype       : 'checkbox',
                checked     : true
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

Ext.reg('St.form.Abonement', St.form.Abonement);