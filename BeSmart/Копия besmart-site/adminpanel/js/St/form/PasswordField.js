St.form.PasswordField = Ext.extend(Ext.form.TriggerField, {
    triggerClass: 'x-form-password-trigger',
    keylist: "abcdefghijklmnopqrstuvwxyz123456789ABCDEFGHIJKLMNOPRSTUVWXYZ",
    passLength: 8,

    initComponent: function () {
        St.form.PasswordField.superclass.initComponent.apply(this, arguments);
    },
            
    onTriggerClick: function () {
        this.setValue(this.generatePass());
    },
            
    generatePass: function (plength) {
        var temp = '',
            i;

        for (i = 0; i < this.passLength; i++) {
            temp += this.keylist.charAt(Math.floor(Math.random() * this.keylist.length));
        }

        return temp;
    }
});

Ext.reg('St.form.PasswordField', St.form.PasswordField);