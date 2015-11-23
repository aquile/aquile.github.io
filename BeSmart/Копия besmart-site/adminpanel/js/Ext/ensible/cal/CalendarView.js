Ext.override(Ext.ensible.cal.CalendarView, {
	destroy: function () {
		this.store.un("datachanged", this.onDataChanged, this);
		this.store.un("clear", this.refresh, this);
		this.store.un("write", this.onWrite, this);
		this.store.un("exception", this.onException, this);
		
		Ext.ensible.cal.CalendarView.superclass.destroy.call(this);
	        if(this.el){
	            this.el.un('contextmenu', this.onContextMenu, this);
	        }
	        Ext.destroy(
	            this.editWin, 
	            this.eventMenu,
	            this.dragZone,
	            this.dropZone
	        );
		
	},
    getEventRecord : function(id){
        return this.store.getById(id);
    }
});