/**
 *  @author Victor Protsenko <protsenko.victor@gmail.com>
 **/
St.form.Select = Ext.extend(Ext.form.TriggerField, {
    store: undefined,
    editable: false,
    selectedValue: undefined,
    displayField: 'name',
    valueField: 'id',
    triggerClass: 'x-form-search-trigger',
    value: undefined,

    initComponent: function () {
        Ext.apply(this, {
            disabled: !this.store.loaded
        });
        
        if (!this.store.loaded) {
            this.mon(this.store, 'load', function () {
                this.setDisabled(false);
            }, this, {
                single: true
            });
        }
        
        St.form.Select.superclass.initComponent.apply(this, arguments);
    },

    onTriggerClick: function () {
        (Ext.create({
            xtype: 'St.wizard.Select',
            viewXType: this.viewXType,
            listeners: {
                'scope' : this,
                'select': this.onSelect
            }
        })).show();
    },

    setValue: function (value) {
        var val,
            record;
    
        this.valueID = value;
        
        if (!this.store.loaded) {
            this.mon(this.store, {
                'scope' : this,
                'load'  : function () {
                    this.setValue(value);
                }
            });
            return;
        }
        if (Ext.isNumber(Number(value))) {
            record = this.store.getById(value);
            if (record) {
                val = record.get(this.displayField);
            }
        } else {
            val = value;
        }
        
        Ext.form.TriggerField.superclass.setValue.apply(this, [val]);
    },
    
    getValue: function () {
        return this.valueID;
    },
    
    onSelect: function (cmp, record) {
        this.setValue(Number(record.id));
    }
});

Ext.reg('St.form.Select', St.form.Select);