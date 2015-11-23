St.view.PollResults = Ext.extend(Ext.grid.GridPanel, {
    entityName  : 'PollResults',
    pollID: null,

    initComponent: function(config) {
        Ext.apply(this, {
            storeCfg    : {
                params: {
                    pollID: config.pollID
                }
            },
            viewTitle   : 'Результаты опроса',
            cellMenuHandler: Ext.emptyFn
        });
        
        St.view.PollResults.superclass.initComponent.call(this, config);
    },
    
    getColumnModel: function(){
        return new Ext.grid.ColumnModel({
            defaults: {
                sortable: true
            },
            columns: [
                { header: 'Вариант', dataIndex: 'option' },
                { header: 'Результат', dataIndex: 'answers', type: 'int' }
            ]
        });
    }
});

Ext.reg('St.view.PollResults', St.view.PollResults);