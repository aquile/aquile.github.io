// [VP] used in Ext.grid.ColumnModel
Ext.chromeVersion = Ext.isChrome ? parseInt((/chrome\/(\d{2})/).exec(navigator.userAgent.toLowerCase())[1], 10) : NaN;
    
Ext.override(Ext.grid.ColumnModel, {
    
    // [VP] Fixed width of grid in Chrome version > 18
    getTotalWidth: function (includeHidden) {
        if (!this.totalWidth) {
            var boxsizeadj = (Ext.isChrome && Ext.chromeVersion > 18 ? 2 : 0);
            this.totalWidth = 0;
            for (var i = 0, len = this.config.length; i < len; i++) {
                if (includeHidden || !this.isHidden(i)) {
                    this.totalWidth += (this.getColumnWidth(i) + boxsizeadj);
                }
            }
        }
        return this.totalWidth;
    }
});