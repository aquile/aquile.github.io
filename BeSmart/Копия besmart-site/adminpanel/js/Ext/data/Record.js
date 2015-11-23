Ext.override(Ext.data.Record, {
    
    set : function(name, value){
        var encode;
        
        if (Ext.isObject(value)) {
            if (St.objCmp(value, this.data[name])) {
                return;
            }
        } else {
            encode = Ext.isPrimitive(value) ? String : Ext.encode;
            if(encode(this.data[name]) === encode(value)) {
                return;
            }
        }
        
        this.dirty = true;
        if(!this.modified){
            this.modified = {};
        }
        if(this.modified[name] === undefined){
            this.modified[name] = this.data[name];
        }
        this.data[name] = value;
        if(!this.editing){
            this.afterEdit();
        }
    }
});