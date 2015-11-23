St.view.Polls = Ext.extend(Ext.Panel, {
    entityName  : 'Polls',
    
    initComponent : function() {
        var store = this.getStoreProxy();
        Ext.apply(this, {
            tbar    : this.getToolBar(),
            border  : false,
            autoScroll: true,
            items   : {
                xtype:'dataview',
                itemSelector: '.st-polls-item',
                overClass   : 'st-polls-item-over',
                store   : store,
                ref     : 'dataview',
                tpl     : this.getTemplate(),
                tbar    : this.getToolBar(),
                listeners: {
                    scope: this,
                    click: function (cmp, index) {
                        this.editWindow(cmp, index);
                    }
                }
            }
        });
        
        St.view.Polls.superclass.initComponent.apply(this, arguments);
    },

    getStoreProxy: function () {
        return St.StoreMgr.getStore('Polls', true);
    },

    getTemplate: function () {
        return new Ext.XTemplate('<tpl for=".">',
            '<div class="st-polls-item">',
                '<div class="st-polls-item-title">',
                    '<tpl if="active == 1"><span class="st-polls-item-active">Активный</span></tpl>',
                    '<tpl if="active != 1"><span class="st-polls-item-notactive">Неактивный</span></tpl>',
                    '{question}',
                '</div>',
                '<table class="st-polls-item-answers">',
                    '<tpl for="results">',
                        '<tr><td>{option}</td><td class="st-polls-item-answerscount">{answers}</td></tr>',
                    '</tpl>',
                '</table>',
            '</div>',
        '</tpl>');
    },
    
    getToolBar : function(){
        return [{ 
            text        : 'Создать опрос',
            listeners   : {
                scope   : this,
                click   : this.addWindow
            }
        }];
    },
    
    getCellMenuItems: function(grid, rowIndex, cellIndex, evtObj){
        return [{
            text    : 'Просмотреть результаты',
            iconCls : 'icon-page_find',
            listeners : {
                scope: this,
                click: function(btn, evt){
                    var data = this.getSelectionModel().getSelected().data;
                    
                    this.showResultsWindow(data);
                }
            }
        },{
            text    : 'Редактировать',
            iconCls : 'icon-page_edit',
            listeners : {
                scope: this,
                click: function(btn, evt){
                    this.editWindow(this, this.getSelectionModel().getSelected().data);
                }
            }
        },{
            text    : 'Удалить',
            style   : 'color: #ff0000',
            iconCls : 'icon-page_delete',
            listeners : {
                scope : this,
                click :  function(btn, evt){
                    this.deletePoll(this, this.getSelectionModel().getSelected().data);
                }
            } 
        }];
    },

    showResultsWindow: function (data) {
        new Ext.Window({
            title   : 'Результаты',
            shadow  : 'drop',
            shadowOffset: 5,
            resizable: false,
            border  : false,
            floating: true,
            modal   :  true,
            html    : 'Результаты'
        });
    },

    addWindow: function(){
        new Ext.Window({
            title   : 'Создание Опроса',
            shadow  : 'drop',
            shadowOffset: 5,
            resizable: false,
            border  : false,
            floating: true,
            modal   :  true,
            items   : [{
                ref         : 'addForm',
                xtype       : 'St.form.PollsForm',
                btnHandler  : this.saveNew(this)
            }]
        }).show();
    },
        
    editWindow: function(grid, rowDataOrIndex){
        var win = new Ext.Window({
            title   : 'Редактирование опроса',
            shadow  : 'drop',
            shadowOffset: 5,
            resizable: false,
            border  : false,
            floating: true,
            modal: true,
            items   : [{
                ref      : 'addForm',
                xtype   : 'St.form.PollsForm',
                btnHandler: this.saveEdit(this)
            }]
        }).show();
        
        
        win.addForm.getForm().setValues(Ext.isObject(rowDataOrIndex) ? rowDataOrIndex : grid.store.getAt(rowDataOrIndex).data);
    },
    
    deletePoll: function(grid, rowDataOrIndex){
        Ext.Msg.confirm(
            'Удаление опроса', 
            'Удалить опроса:<br><b>' + rowDataOrIndex.question + '</b>', 
            function(btn, text){
                if (btn == 'yes'){
                    grid.store.remove(grid.store.getById(rowDataOrIndex.id));
                }
            }
        );
    },
    
    /**
     * this - link to the PollsForm.js
     * @param scope - link to THIS class
     **/
    saveEdit : function(scope){
        return function(){
            var bForm = this.getForm(),
                record = scope.dataview.getStore().getById(this.entityID.getValue());
            if (!bForm.isValid()) {
                return;
            }
            
            bForm.updateRecord(record);

            this.ownerCt.close();
        };
    },
    
    /**
     * this - link to the PollsForm.js
     * @param scope - link to THIS class
     **/
    saveNew: function(scope){
        return function(){
            var record,
                form = this.getForm(),
                values = form.getFieldValues();
            
            if (!form.isValid()) {
                return;
            }
            
            record = scope.dataview.getStore().createRecord(Ext.apply(values, {
                // Add here default values
            }));

            scope.dataview.getStore().add(record);
            this.ownerCt.close();
        };
    }
    
});

Ext.reg('St.view.Polls', St.view.Polls);