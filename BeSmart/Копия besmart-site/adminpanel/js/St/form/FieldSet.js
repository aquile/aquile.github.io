St.form.FieldSet = Ext.extend(Ext.form.FieldSet, {
    initValue   : {},
    hideLabel   : true,
    labelWidth  : 110,
    
    initComponent : function(){
        
        Ext.apply(this, {
            defaults : Ext.apply(this.defaults, {
                submitValue : false,
                itemCls     : 'show-label'
            }),
            plugins : ['St.plugins.Formify']
        });
        
        St.form.FieldSet.superclass.initComponent.apply(this, arguments);
    },
    
    getValue : function(){
        var result = {};
        
        this.items.each(function(item, index){
            var newVal;
            if (item && item.name) {
                if (item.refField && Ext.isFunction(item.refField)) {
                    newVal = item.refField().getValue();
                } else {
                    newVal = item.getValue();
                }
                result[item.name] = newVal;
            }
        }, this);
        
        return result;
    },
    
    setValue : function(value){
        this.initValue = value;
        
        if (this.initValue) {
            this.items.each(function(item, index){
                if (item && item.name && this.initValue[item.name]) {
                    if (item.refField && Ext.isFunction(item.refField)) {
                        item.refField().setValue(this.initValue[item.name]);
                    } else {
                        item.setValue(this.initValue[item.name]);
                    }
                }
            }, this);
        }
    },
    
    isDirty : function(oldVal, newVal){
        var dirty = false;
//        Ext.iterate(function(key, value){
//            if (!oldVal[key] || oldVal[key] != value) {
//                dirty = true;
//                return false;
//            }
//        }, this);
       
        return dirty;
    }    
});

Ext.reg('St.form.FieldSet', St.form.FieldSet);