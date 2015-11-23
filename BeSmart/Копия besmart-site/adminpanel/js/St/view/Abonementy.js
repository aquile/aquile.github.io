St.view.Abonementy = Ext.extend(St.View, {
    entityName  : 'UserTypes',
    pageSize    : 1000,
    disableCellMenu: true,

    initComponent: function(config){
        Ext.apply(this, {     
            viewTitle   : 'Типы абонементов',
            autoExpandColumn: 'name',
            viewConfig  : {
                forceFit    : false
            }
        });
        
        St.view.Abonementy.superclass.initComponent.call(this, config);
    },
    
    cellDblClickHandler : function(grid, rowDataOrIndex){
        this.editRecordHandler.apply(this, arguments);
    },
    
    getToolBar : function(){
        return [{ 
            text      : 'Добавить абонемент',
            listeners : {
                scope   : this,
                click   : this.addRecordHandler
            }
        }];
    },
    
    getColumnModel: function(){
        return new Ext.grid.ColumnModel({
            defaults: {
                sortable: true
            },
            columns: [{ 
                id          : 'id', 
                header      : 'ID', 
                dataIndex   : 'id', 
                width       : 30
            }, {
                header      : 'Название абонемента',
                dataIndex   : 'name',
                id          : 'name'
            }, {
                header      : 'Действует с',
                dataIndex   : 'timeFrom',
                width       : 100,
                renderer    : function (value, meta, record) {
                    meta.style += 'text-align: center';
                    return (value ? value + ':00' : '8:00');
                }
            }, {
                header      : 'Действует до',
                dataIndex   : 'timeTo',
                width       : 100,
                renderer    : function (value, meta, record) {
                    meta.style += 'text-align: center';
                    return (value ? value + ':00' : '22:00');
                }
            }, {
                header      : 'Количество дней в месяц',
                dataIndex   : 'daysPerMonth',
                width       : 150,
                renderer    : function (value, meta, record) {
                    meta.style += 'text-align: center';
                    return value || '<span style="font-size: 18px;">&infin;</span>';
                }
            }, {
                header      : 'Регистрация доступна',
                dataIndex   : 'allowRegister',
                width       : 150,
                renderer    : function (value, meta, record) {
                    meta.style += 'text-align: center';
                    return value ? '+' : '-';
                }
            }, {
                header      : 'Дней в расписании',
                dataIndex   : 'visibleDays',
                width       : 150
            }]
        });
    },
    
    addRecordHandler: function(){
        new Ext.Window({
            title   : 'Новай абонемент',
            shadow  : 'drop',
            shadowOffset: 5,
            resizable: false,
            border  : false,
            floating: true,
            modal   :  true,
            items   : [{
                ref         : 'addForm',
                xtype       : 'St.form.Abonement',
                btnHandler  : this.saveNew(this)
            }]
        }).show();
    },
        
    editRecordHandler: function(grid, rowDataOrIndex){
        var win = new Ext.Window({
            title   : 'Редактировать абонемент',
            shadow  : 'drop',
            shadowOffset: 5,
            resizable: false,
            border  : false,
            floating: true,
            items   : [{
                ref     : 'addForm',
                xtype   : 'St.form.Abonement',
                btnHandler: this.saveEdit(this)
            }]
        }).show();
        
        
        win.addForm.getForm().setValues(Ext.isObject(rowDataOrIndex) ? rowDataOrIndex : grid.store.getAt(rowDataOrIndex).data);
    },

    /**
     * this - link to the CommentsForm.js
     * @param scope - link to THIS class
     **/
    saveEdit : function(scope){
        return function(){
            var bForm = this.getForm(),
            record = scope.getStore().getById(this.entityID.getValue());

            bForm.updateRecord(record);

            this.ownerCt.close();
        };
    },
    
    /**
     * this - link to the CommentsForm.js
     * @param scope - link to THIS class
     **/
    saveNew: function(scope){
        return function(){
            var form = this.getForm(),
                values,
                record;
                
            if (form.isValid()) {
                values = form.getFieldValues();
                record = scope.getStore().createRecord(Ext.apply(values, {
                }));

                scope.getStore().add(record);
                this.ownerCt.close();
            }
        };
    }
    
});

Ext.reg('St.view.Abonementy', St.view.Abonementy);