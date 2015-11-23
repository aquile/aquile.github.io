St.view.Overview = Ext.extend(Ext.Container, {
    
    initComponent: function(config){
        var today = new Date().clearTime();

        Ext.apply(this, {
            viewTitle   : 'Обзор',
            titleIconCls: 'icon-chart_org_inverted',
            items: [{
                xtype: 'extensible.calendarpanel',
                eventStore: St.StoreMgr.getStore('Lessons'),
                title: 'Basic Calendar',
                width: 700,
                height: 500
            }]
        });
        
        St.view.Overview.superclass.initComponent.call(this, config);
    }
});

Ext.reg('St.view.Overview', St.view.Overview);