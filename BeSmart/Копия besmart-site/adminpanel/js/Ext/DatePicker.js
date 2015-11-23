/**
 *  @author Victor Protsenko <protsenko.victor@gmail.com>
 **/
Ext.override(Ext.DatePicker, {
    setValue : function(value){
        if (!Ext.isDate(value)) {
            value = new Date(value);
        }
        this.value = value.clearTime(true);
        this.update(this.value);
    },
});