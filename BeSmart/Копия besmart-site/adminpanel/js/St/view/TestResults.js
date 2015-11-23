St.view.TestResults = Ext.extend(St.View, {
    entityName  : 'TestResults',
    pageSize    : 5000,
    
    initComponent: function(config){
        Ext.apply(this, {     
            viewTitle   : 'Результаты теста'
        });

        St.view.TestResults.superclass.initComponent.call(this, config);
    },
    
    getToolBar : function(){
        return [{
            xtype: 'box',
            html: 'Поиск по телефону или имени'
        }, ' ', {
            xtype: 'textfield',
            ref: '../searchfield'
        }, ' ', {
            text: 'OK',
            scope: this,
            handler: this.onSearch
        }]; 
    },
    onSearch: function () {
        var searchField = this.searchfield,
            store = this.store,
            searchValue = searchField.getValue(),
            qualifier = '`tel` LIKE "%' + searchValue + '%" OR `name` LIKE "%' + searchValue + '%"';

        store.load({
            params: {
                limit: this.pageSize,
                start: 0,
                qualifier: !Ext.isEmpty(searchValue) ? qualifier : ''
            }
        });
    },
    getColumnModel: function(){
        var levelsStore = St.StoreMgr.getStore('Levels');
        return new Ext.grid.ColumnModel({
            defaults: {
                sortable: true
            },
            columns: [{
                id : 'id', 
                header : 'ID', 
                dataIndex : 'id', 
                width: 30
            }, {
                header: 'Имя', 
                dataIndex: 'name',
                width: 300
            }, {
                header: 'Телефон', 
                dataIndex: 'tel'
            }, {
                header: 'Email', 
                dataIndex: 'email'
            }, {
                header: 'Уровень',
                dataIndex: 'level',
                renderer: function (value, meta, record) {
                    var lv = levelsStore.getById(value);
                    return lv ? lv.get('CalTitle') : '';
                }
            }, {
                header: 'Время',
                dataIndex: 'time'
            }]
        });
    }
});

Ext.reg('St.view.TestResults', St.view.TestResults);