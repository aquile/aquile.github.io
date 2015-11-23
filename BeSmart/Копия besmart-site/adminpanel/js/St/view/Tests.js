St.view.Tests = Ext.extend(St.View, {
    entityName  : 'Tests',
    pageSize    : 1000,
    
    initComponent: function(config){
        Ext.apply(this, {     
            viewTitle   : 'Тесты',
            autoExpandColumn: 'name',
            viewConfig  : {
                forceFit    : false
            }
        });
        
        St.view.Tests.superclass.initComponent.call(this, config);
    },
    
    cellDblClickHandler : function(grid, rowDataOrIndex){
        this.editRecordHandler.apply(this, arguments);
    },
    
    getCellMenuItems : function(){
        return [{
            text    : 'Список вопросов',
            listeners : {
                scope: this,
                'click' : function (btn, evt) {
                    this.showQuestionsList(this.getSelectionModel().getSelected().data);
                }
            }
        }, {
            text    : 'Редактировать',
//            iconCls : 'icon-comment_edit',
            listeners : {
                scope: this,
                click: function(btn, evt){
                    this.editRecordHandler(this, this.getSelectionModel().getSelected().data);
                }
            }
        }, {
            text    : 'Удалить',
//            iconCls : 'icon-comments_delete',
            style   : 'color: #ff0000',
            hidden  : true,
            listeners : {
                scope : this,
                click :  function(btn, evt){
                    this.deleteRecord(this, this.getSelectionModel().getSelected().data);
                }
            } 
        }];
    },
    
    getToolBar : function(){
        return [{ 
            text      : 'Добавить тест',
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
                header      : 'Название',
                id          : 'name',
                dataIndex   : 'name'
            }, {
                header      : 'Тип',
                dataIndex   : 'type', 
                width       : 150,
                linkedEntity: {
                    storeEntity : 'TestTypes',
                    valueFn: function (data) {
                        return data.name;
                    }
                },
                renderer    : St.Renderer.linkedEntity
            }, {
                header      : 'Уровень',
                dataIndex   : 'level',
                width       : 150,
                linkedEntity: {
                    storeEntity : 'Levels',
                    valueFn: function (data) {
                        return data.CalTitle;
                    }
                },
                renderer    : St.Renderer.linkedEntity
            }]
        });
    },
    
    addRecordHandler: function(){
        new Ext.Window({
            title   : 'Новый тест',
            shadow  : 'drop',
            shadowOffset: 5,
            resizable: false,
            border  : false,
            floating: true,
            modal   :  true,
            items   : [{
                ref         : 'addForm',
                xtype       : 'St.form.Tests',
                btnHandler  : this.saveNew(this)
            }]
        }).show();
    },
        
    editRecordHandler: function(grid, rowDataOrIndex){
        var win = new Ext.Window({
            title   : 'Редактирование теста',
            shadow  : 'drop',
            shadowOffset: 5,
            resizable: false,
            border  : false,
            floating: true,
            items   : [{
                ref     : 'addForm',
                xtype   : 'St.form.Tests',
                btnHandler: this.saveEdit(this)
            }]
        }).show();
        
        
        win.addForm.getForm().setValues(Ext.isObject(rowDataOrIndex) ? rowDataOrIndex : grid.store.getAt(rowDataOrIndex).data);
    },
    
    deleteRecord: function(grid, rowDataOrIndex){
        Ext.Msg.confirm(
            'Удаление теста', 
            'Удалить теста:<br><b>' + rowDataOrIndex.name + '</b>', 
            function(btn, text){
                if (btn == 'yes'){
                    grid.store.remove(grid.store.getById(rowDataOrIndex.id));
                }
            }
        );
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
//                    read : values.read.inputValue
                }));

                scope.getStore().add(record);
                this.ownerCt.close();
            }
        };
    },
    
    showQuestionsList: function (testInfo) {
        var win = new Ext.Window({
            title   : 'Вопросы',
            shadow  : 'drop',
            shadowOffset: 5,
            width   : 900,
            height  : 600,
            resizable: false,
            border  : false,
            floating: true,
            layout  : 'fit',
            items   : [{
                ref     : 'questionsForm',
                xtype   : 'St.view.TestQuestions',
                testInfo: testInfo
            }]
        }).show();
    }
    
});

Ext.reg('St.view.Tests', St.view.Tests);