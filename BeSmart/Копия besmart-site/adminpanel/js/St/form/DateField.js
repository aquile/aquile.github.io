/**
 *  @author Victor Protsenko <protsenko.victor@gmail.com>
 **/
St.form.DateField = Ext.extend(Ext.form.DateField, {
    format: 'Y-m-d',
    getValue: function () {
        return Ext.form.DateField.superclass.getValue.call(this);
    }
});

Ext.reg('St.form.DateField', St.form.DateField);