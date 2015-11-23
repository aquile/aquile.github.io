Ext.ns('St.form.DisplayField');

St.form.DisplayField.Date = Ext.extend(Ext.form.DisplayField, {
    realValue: '',
    format: '<b>H:i</b> d.m.Y',
    
    setValue: function (value) {
        this.realValue = value;
        
        St.form.DisplayField.Date.superclass.setValue.call(this, (Ext.isDate(value) ? value.format(this.format): value));
    },

    getValue: function () {
        return this.realValue;
    }
});

Ext.reg('St.form.DisplayField.Date', St.form.DisplayField.Date);