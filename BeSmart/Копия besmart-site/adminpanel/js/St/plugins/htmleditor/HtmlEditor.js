St.plugins.HtmlEditor = Ext.extend(Ext.util.Observable, {
    init: function(cmp){
        this.cmp = cmp;
        this.cmp.on('render', this.onRender, this);
    },
    onRender: function(){
        var toolbar = this.cmp.getToolbar();
        toolbar.insert(21, {
            xtype   : 'button',
            iconCls : 'icon-text_horizontalrule', //your iconCls here
            handler : function(){
                this.cmp.insertAtCursor('<hr>');
            },
            scope   : this,
            tooltip : 'horizontal ruler',
            overflowText: 'horizontal ruler'
        });
        toolbar.insert(22,'-');
        toolbar.insert(23,'->');
    }
});

Ext.preg('St.plugins.HtmlEditor', St.plugins.HtmlEditor);