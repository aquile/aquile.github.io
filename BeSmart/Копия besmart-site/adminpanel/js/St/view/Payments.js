/**
 *  @author Victor Protsenko <protsenko.victor@gmail.com>
 **/
St.view.Payments = Ext.extend(St.View, {
    entityName  : 'Payments',
    pageSize    : 1000,
    userID      : 0,
    showUserColumn: false,

    initComponent: function(){
        Ext.apply(this, {
            autoExpandColumn: 'comment',
            alwaysFetchData : true,
            viewConfig      : {},
            storeCfg        : {
                baseParams  : {
                    userID  : this.userID
                }
            },
            viewTitle   : 'Платежи'
        });

        St.view.Payments.superclass.initComponent.apply(this, arguments);
    },
    
    getToolBar : function() {
        return {
            items: [{ 
                text      : 'Добавить платеж',
                listeners : {
                    scope   : this,
                    click   : this.addWindow
                }
            }]
        }; 
    },
    
    getColumnModel: function(){
        return new Ext.grid.ColumnModel({
            defaults: {
                sortable: true
            },
            columns: [{
                id : 'id', 
                header : 'ID', 
                dataIndex : 'id', 
                width: 30,
                hidden: true
            }, {
                header: 'Дата', 
                dataIndex: 'date',
                width: 100
            }, {
                header: 'Кол-во дней',
                dataIndex: 'days',
                hidden: !St.isMainOffice
            }, {
                header: 'Сумма', 
                dataIndex: 'amount',
                width: 100
            }, {
                header: 'Комментарий', 
                dataIndex: 'comment',
                id: 'comment'
            }, {
                header: 'Пользователь',
                dataIndex: 'userDescription',
                hidden: !this.showUserColumn
            }]
        });
    },

    addWindow: function(){
        new Ext.Window({
            title   : 'Новый платеж',
            shadow  : 'drop',
            shadowOffset: 5,
            resizable: false,
            border  : false,
            floating: true,
            modal   :  true,
            items   : [{
                ref     : 'addForm',
                xtype   : 'St.form.PaymentForm',
                userID  : this.userID,
                btnHandler: this.saveNew(this)
            }]
        }).show();
    },
    
    editWindow: function(grid, rowDataOrIndex){
        var data = Ext.isObject(rowDataOrIndex) ? rowDataOrIndex : grid.store.getAt(rowDataOrIndex).data,
            win = new Ext.Window({
                title   : 'Редактирование',
                iconCls : 'icon-user_edit',
                shadow  : 'drop',
                shadowOffset: 5,
                resizable: false,
                border  : false,
                floating: true,
                modal   : true,
                items   : [{
                    ref     : 'addForm',
                    xtype   : 'St.form.PaymentForm',
                    btnHandler: this.saveEdit(this)
                }]
            }).show();

        win.addForm.getForm().setValues(data);
    },
    
    saveEdit : function(scope){
        return function(){
            var bForm = this.getForm(),
                record = scope.getStore().getById(this.entityID.getValue());
            if (!bForm.isValid()) {
                return;
            }
            bForm.updateRecord(record);

            this.ownerCt.close();
        };
    },
    
    /**
     * scope - this component
     * this - window component
     */
    saveNew: function(scope){
        return function(){
            var values = this.getForm().getFieldValues(),
                form = this.getForm(),
                record;
        
            if (!form.isValid()) {
                return;
            }
            record = scope.getStore().createRecord(Ext.applyIf(values, {}));
            scope.getStore().add(record);
            this.ownerCt.close();
        };
    },
    
    cellMenuHandler: Ext.emptyFn,
    
    getBottomBar: Ext.emptyFn
});

Ext.reg('St.view.Payments', St.view.Payments);