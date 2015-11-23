/**
 * To create a new Grid View you need:
 *  1. Define @entityName
 *  2. Define @pageSize (defaults to 20)
 *  3. Define @getColumnModel method
 *  4. Define @getToolBar method to add toolbar
 *  5. To listen CellDBLClick use @cellDblClickHandler
 *  6. To define cell context menu use @getCellMenuItems
 **/

St.View = Ext.extend(Ext.grid.GridPanel, {
    pageSize    : 1000,
    loadMask    : true,
    storeCfg    : undefined,
    alwaysFetchData: false,
    disableCellMenu: false,
    
    initComponent: function(config){
        if (!this.entityName) {
            console.error('You should define "entityName" for subclasses of St.View');
            return;
        }
        this.store = this.store || St.StoreMgr.getStore(this.entityName, this.alwaysFetchData, this.storeCfg);
        
        Ext.applyIf(this, {     
            colModel    : this.getColumnModel(),
            border      : false,
            anchor      : '0 0',
            autoScroll  : true,
            stateful    : true,
            stateId     : [this.entityName, 'GridView'].join('_'),
            selModel    : new Ext.grid.RowSelectionModel({ 
                singleSelect: true 
            }),
            viewConfig  : {
                forceFit    : true,
                getRowClass: this.getRowClass
            },
            listeners   : {
                scope           : this,
                celldblclick    : this.cellDblClickHandler
            },
            tbar    : this.getToolBar(),
            bbar    : this.getBottomBar()
        });
        
        if (!this.disableCellMenu) {
            this.on('cellcontextmenu', this.cellMenuHandler, this);
        }
        
        St.View.superclass.initComponent.call(this, config);
    },

    getRowClass: Ext.emptyFn,
    
    getColumnModel : function(){
        console.error('You should implement "getColumnModel" method for subclasses of St.View');
    },
    
    getBottomBar : function(){
        return {
            xtype       : 'paging',
            pageSize    : this.pageSize,
            lastText    : '', 
            firstText   : '', 
            nextText    : '', 
            prevText    : '', 
            refreshText : '',
            store       : this.store,
            displayInfo : true,
            displayMsg  : 'Страницы сайта {0} - {1} из {2}',
            emptyMsg    : 'Пока нет страниц',
            listeners   : {
                render : function(){
//                    this.store.load({
//                        params : {
//                            start : 0, 
//                            limit : this.pageSize
//                        }
//                    });
                }
            }
        };
    },
    
    cellMenuHandler: function(grid, rowIndex, cellIndex, evtObj){
        evtObj.stopEvent();

        grid.getSelectionModel().selectRow(rowIndex);

        if (!grid.rowCtxMenu) {
            grid.rowCtxMenu = new Ext.menu.Menu({
                items: this.getCellMenuItems()
            });
        }
        grid.rowCtxMenu.showAt(evtObj.getXY());
    },
    
    cellDblClickHandler: Ext.emptyFn,
    
    getCellMenuItems: Ext.emptyFn,
    
    getToolBar: Ext.emptyFn
});

Ext.reg('St.View', St.View);