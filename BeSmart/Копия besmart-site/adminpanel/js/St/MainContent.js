St.MainContent = Ext.extend(Ext.Panel, {
    
    initComponent: function(config){
        this.addEvents('viewchanged');
        this.enableBubble('viewchanged');
        St.MainContent.superclass.initComponent.call(this, config);
    },
    
    showView: function(menuItem){
        var title = menuItem.name.split('.');
            title = title[title.length - 1];
            
        this.removeAll();
        this.add({
            xtype   : menuItem.name,
            ref     : title
        });
        
        this.doLayout();
        this.setTitle(this[title].viewTitle || menuItem.text, this[title].titleIconCls || menuItem.iconCls);
    }
});

Ext.reg('St.MainContent', St.MainContent);