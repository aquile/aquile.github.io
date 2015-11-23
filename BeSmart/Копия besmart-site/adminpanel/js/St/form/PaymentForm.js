/**
 *  @author Victor Protsenko <protsenko.victor@gmail.com>
 **/
St.form.PaymentForm = Ext.extend(Ext.form.FormPanel, {
    userID: 0,
    
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
        
        St.form.PaymentForm.superclass.initComponent.call(this, arguments);
    },
    
    createItems: function(){
        return [{
            xtype   : 'fieldset',
            defaults: {
                anchor      : '0'
            },
            items   : [{
                fieldLabel  : 'ID',
                ref         : '../entityID',
                name        : 'id',
                xtype       : 'hidden'
            }, {
                name        : 'user',
                xtype       : 'hidden',
                value       : this.userID
            }, {
                name        : 'date',
                xtype       : 'St.form.DateField',
                fieldLabel  : 'Дата оплаты',
                allowBlank  : false,
                value       : new Date()
            }, {
                xtype       : 'St.form.ComboBox',
                store       : St.StoreMgr.getStore('Packages'),
                fieldLabel  : 'Ценовой пакет',
                valueField  : 'id',
                displayField: 'name',
                hidden      : !St.isMainOffice,
                listeners   : {
                    scope   : this,
                    select  : function ( combo, record, index) {
                        var days = record.get('days'),
                            amount = record.get('day_price') * days;
                    
                        this.days.setValue(days);
                        this.amount.setValue(amount);
                    }
                }
            }, {
                xtype       : 'numberfield',
                name        : 'days',
                allowNegative: false,
                allowDecimals: false,
                allowBlank  : St.isMainOffice ? false : true,
                minValue    : 0,
                ref         : '../days',
                fieldLabel  : 'Кол-во дней',
                hidden      : !St.isMainOffice,
                readOnly    : true
//                enableKeyEvents: true,
//                listeners   : {
//                    scope: this,
//                    'keyup': function (cmp, e) {
//                        var dayPriceStore = St.StoreMgr.getStore('DayPrice'),
//                            dayPrice = 0,
//                            value = Number(cmp.getValue());
//                        
//                        if (Ext.isNumber(value)) {
//                            dayPriceStore.each(function (record) {
//                                if (value >= record.get('days')) {
//                                    dayPrice = record.get('price');
//                                }
//                            }, this);
//                            
//                            this.amount.setValue(dayPrice * value);
//                        }
//                    }
//                }
            }, {
                xtype       : 'numberfield',
                name        : 'amount',
                allowNegative: false,
                allowDecimals: true,
                allowBlank  : false,
                minValue    : 0,
                ref         : '../amount',
                readOnly    : St.isMainOffice,
                fieldLabel  : 'К оплате'
            }, {
                fieldLabel  : 'Комментарий',
                xtype       : 'textarea',
                name        : 'comment'
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

Ext.reg('St.form.PaymentForm', St.form.PaymentForm);