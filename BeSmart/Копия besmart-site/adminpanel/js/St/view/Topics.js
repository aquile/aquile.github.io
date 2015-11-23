St.view.Topics = Ext.extend(St.View, {
    entityName  : 'Topics',
    pageSize    : 1000,
    
    initComponent: function(config){
        Ext.apply(this, {     
            viewTitle   : 'Темы уроков'
        });

        St.view.Topics.superclass.initComponent.call(this, config);
    },
    
    getToolBar : function(){
        return {
            items: [{ 
                text      : 'Добавить',
                listeners : {
                    scope   : this,
                    click   : this.addWindow
                }
            }, '-', {
                xtype       : 'St.form.ComboBox',
                entityName  : 'Levels',
                ref         : '../levels',
                valueField  : 'ID',
                displayField: 'CalTitle'
            }, ' ', {
                xtype       : 'St.form.ComboBox',
                entityName  : 'LessonTypes',
                ref         : '../lessontypes',
                valueField  : 'id',
                displayField: 'name'
            }, ' ', {
                xtype       : 'button',
                text        : 'Фильтровать',
                scope       : this,
                handler     : this.filterGrid
            }, ' ', {
                xtype       : 'button',
                text        : 'Очистить',
                scope       : this,
                handler     : this.clearFilter
            }]
        }; 
    },
    clearFilter: function () {
        this.lessontypes.setValue('');
        this.levels.setValue('');
        this.store.clearFilter();
    },
    filterGrid: function () {
        var lessonTypeID = this.lessontypes.getValue(),
            levelID = this.levels.getValue();
    
        this.store.clearFilter();
        
        if (lessonTypeID || levelID) {
            this.store.filterBy(function(item) {
                if ((lessonTypeID && item.data.lessontypeID != lessonTypeID) 
                        || (levelID && item.data.levelID != levelID)) {
                    return false;
                } else {
                    return true;
                }
            });
        }
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
                header: 'Тема', 
                dataIndex: 'name',
                width: 400
            }, {
                header: 'Уровень', 
                dataIndex: 'levelID',
                renderer: St.Renderer.linkedEntity,
                linkedEntity: {
                    storeEntity : 'Levels',
                    valueFn: function (data) {
                        return data.CalTitle;
                    }
                }
            }, {
                header: 'Тип урока', 
                dataIndex: 'lessontypeID',
                renderer: St.Renderer.linkedEntity,
                linkedEntity: {
                    storeEntity : 'LessonTypes',
                    valueFn: function (data) {
                        return data.name;
                    }
                }
            }, {
                header: 'Грамм. конструкция',
                dataIndex: 'grammar'
            }]
        });
    },
    
    cellDblClickHandler : function(grid, rowDataOrIndex){
        this.editWindow(grid, rowDataOrIndex);
    },
    
    addWindow: function(){
        new Ext.Window({
            title   : 'Новая тема',
            shadow  : 'drop',
            shadowOffset: 5,
            resizable: false,
            border  : false,
            floating: true,
            modal   :  true,
            items   : [{
                ref     : 'addForm',
                xtype   : 'St.form.TopicForm',
                btnHandler: this.saveNew(this)
            }]
        }).show();
    },
    
    editWindow: function(grid, rowDataOrIndex){
        var win = new Ext.Window({
            title   : 'Редактирование темы',
            iconCls : 'icon-user_edit',
            shadow  : 'drop',
            shadowOffset: 5,
            resizable: false,
            border  : false,
            floating: true,
            items   : [{
                ref      : 'addForm',
                xtype   : 'St.form.TopicForm',
                btnHandler: this.saveEdit(this)
            }]
        }).show();

        win.addForm.getForm().setValues(Ext.isObject(rowDataOrIndex) ? rowDataOrIndex : grid.store.getAt(rowDataOrIndex).data);
    },
    
    deleteEntity: function(grid, rowDataOrIndex){
        Ext.Msg.confirm(
            'Удаление', 
            'Удалить тему?', 
            function(btn, text){
                if (btn === 'yes'){
                    grid.store.remove(grid.store.getById(rowDataOrIndex.id));
                }
            }
        );
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
    
    getCellMenuItems : function(){
        return [{
            text    : 'Редактировать',
            iconCls : 'icon-user_edit',
            listeners : {
                scope: this,
                click: function(btn, evt){
                    this.editWindow(this, this.getSelectionModel().getSelected().data);
                }
            }
        }, {
            text    : 'Удалить',
            iconCls : 'icon-user_delete',
            style   : 'color: #ff0000',
            listeners : {
                scope : this,
                click :  function(btn, evt) {
                    var data = this.getSelectionModel().getSelected().data;
                    this.deleteEntity(this, data);
                }
            } 
        }];
    }
});

Ext.reg('St.view.Topics', St.view.Topics);