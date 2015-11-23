St.form.ComboBox = Ext.extend(Ext.form.ComboBox, {
    preventDubpSetValue : true,
    prevValue   : undefined,
    editable    : false,
    mode        : 'local',
    triggerAction: 'all',
    entityName  : null,
    
    initComponent: function(){
        
        Ext.apply(this, {
            tpl: new Ext.XTemplate('<tpl for=".">', 
                '<div class="x-combo-list-item" style="color:{[this.getContrastColor(values.color)]}; background-color: #{color};">{' + this.displayField + '}</div>',
            '</tpl>',{
                getContrastColor: function (color) {
                    var contrast = color ? ('#' + color).contrastColor() : '#000';
                    return contrast;
                }
            })
        });
        
        St.form.ComboBox.superclass.initComponent.apply(this, arguments);
        
        if (!this.store) {
            if (!this.entityName) {
                throw 'Вы должны определить entityName или store для St.form.ComboBox::' + this.name;
            }
            this.store = St.StoreMgr.getStore(this.entityName);
        }
        
        if (this.selectFirst && this.store) {
            if (!this.store.loaded) {
                this.store.on('load', function(store){
                    this.setValue(store.getAt(0)[store.idProperty]);
                }, this, {single: true});
            } else {
                var record = this.store.getAt(0);
                if (record) {
                    this.value = this.store.getAt(0)[this.store.idProperty];
                }
            }
        }
    },
    
    setValue: function(value){
        if (this.preventDubpSetValue && this.prevValue == value) {
            return;
        }
        
        if (this.store && !this.store.loaded) {
            this.store.on('load', function(){
                this.setValue(value);
            }, this, {single: true});
        } else {
            if (this.rendered) {
                St.form.ComboBox.superclass.setValue.call(this, value);
                this.prevValue = this.getValue();
            } else {
                this.on('afterrender', function(){
                    this.setValue(value);
                }, this, {single: true});
            }
        }
    },
    
    getValue : function(){
        var val = St.form.ComboBox.superclass.getValue.call(this);
        return val;
    }
});

Ext.reg('St.form.ComboBox', St.form.ComboBox);