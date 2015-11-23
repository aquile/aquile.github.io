Ext.override(Ext.form.Field, {
    
    isDirty : function(oldValue, newValue){
        var val1, val2;
        if (this.alwaysDirty) {
            return true;
        } else if(this.alwaysNotDirty || this.disabled || !this.rendered) {
            return false;
        }
        
        val1 = oldValue || (this.refField && Ext.isFunction(this.refField) ? this.refField().getValue() : this.getValue());
        val2 = newValue || this.originalValue;
            
        return String(val1) !== String(val2);
    }
    
});