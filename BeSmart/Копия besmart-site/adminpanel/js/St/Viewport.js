St.Viewport = Ext.extend(Ext.Viewport, {
    
    initComponent: function(config){
        Ext.apply(this, {
            layout: 'border',
            autoScroll: true,
            items: [
                this.header, 
                this.mainMenu, 
                this.mainContent,
                this.footer
            ]
        });

        St.Viewport.superclass.initComponent.call(this, config);
    },
    
    header : {
        region      : 'north',
        html        : '<img src="' + St.LOGO_SRC + '" style="height: 80px; margin-left: 200px; margin-top: 10px"/>',
        bodyStyle   : 'background: url(/panel/images/bg-header.png) no-repeat 30px 0px',
        border      : false,
        height      : 100
    },
    mainMenu : {
        xtype       : 'container',
        region      : 'west',
        collapsible : true,
        layout      : 'accordion',
        style       : 'border-top: 1px solid #99bbe8',
        margins     : '0 5 0 0',
        width       : 250,
        items       : [{
            xtype       : 'St.MainMenu',
            title       : 'Меню'
        }, {
            xtype       : 'St.Statistic',
            title       : 'Статистика'
        }]
    },
    
    mainContent : {
        region      : 'center',
        border      : true,
        title       : 'Загрузка ...',
        iconCls     : 'icon-chart_org_inverted',
        xtype       : 'St.MainContent',
        id          : 'stMainContent',
        layout      : 'fit'
    },
    
    footer : {
        region      : 'south',
        border      : false,
        height      : 23,
        collapsible : false,
        html        : '<div style="text-align: center; font-size: 10px; line-height: 23px; color: #555;">created by <a href="mailto:pro.victorr@gmail.com" style="font-weight: bold">Victor Protsenko</a></div>'
    }
});

Ext.reg('St.Viewport', St.Viewport);