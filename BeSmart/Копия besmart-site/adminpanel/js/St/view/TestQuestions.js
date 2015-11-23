St.view.TestQuestions = Ext.extend(St.View, {
    entityName  : 'TestQuestions',
    pageSize    : 1000,
    testInfo    : undefined,
    alwaysFetchData: true,

    initComponent: function(config) {
        Ext.apply(this, {     
            viewTitle   : 'Вопросы',
            autoExpandColumn: 'body',
            viewConfig  : {
                forceFit    : false
            }
        });
        
        St.view.TestQuestions.superclass.initComponent.call(this, config);
        
        this.store.setBaseParam('testId', this.testInfo ? this.testInfo.id : 0);
        this.store.load();
    },
    
    cellDblClickHandler : function(grid, rowDataOrIndex){
        this.editRecordHandler.apply(this, arguments);
    },
    
    getCellMenuItems : function(){
        return [{
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
//            hidden  : true,
            listeners : {
                scope : this,
                click :  function(btn, evt){
                    this.deleteRecord(this, this.getSelectionModel().getSelected().data);
                }
            } 
        }];
    },
    
    getToolBar : function() {
        return [{ 
            text      : 'Добавить вопрос',
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
                width       : 50
            }, {
                header      : 'Текст вопроса',
                id          : 'body',
                dataIndex   : 'body'
            }, {
                header      : 'Группа',
                dataIndex   : 'group',
                linkedEntity: {
                    storeEntity : 'TestGroups',
                    valueFn: function (data) {
                        return data.name;
                    }
                },
                renderer    : St.Renderer.linkedEntity
            }, {
                header      : 'Номер вопроса',
                dataIndex   : 'qnumber'
            }, {
                header      : 'Баллы',
                dataIndex   : 'points'
            }, {
                header      : 'Тест',
                dataIndex   : 'test',
                width       : 150,
                linkedEntity: {
                    storeEntity : 'Tests',
                    valueFn: function (data) {
                        return data.name;
                    }
                },
                renderer    : St.Renderer.linkedEntity
            }]
        });
    },
    
    addRecordHandler: function(){
        new Ext.Window({
            title   : 'Новый вопрос',
            shadow  : 'drop',
            shadowOffset: 5,
            resizable: false,
            border  : false,
            floating: true,
            modal   :  true,
            items   : [{
                ref         : 'addForm',
                xtype       : 'St.form.TestQuestion',
                testInfo    : this.testInfo,
                btnHandler  : this.saveNew(this)
            }]
        }).show();
    },
        
    editRecordHandler: function(grid, rowDataOrIndex){
        var win = new Ext.Window({
            title   : 'Редактирование вопроса',
            shadow  : 'drop',
            shadowOffset: 5,
            resizable: false,
            border  : false,
            floating: true,
            items   : [{
                ref     : 'addForm',
                xtype   : 'St.form.TestQuestion',
                btnHandler: this.saveEdit(this)
            }]
        }).show();
        
        
        win.addForm.getForm().setValues(Ext.isObject(rowDataOrIndex) ? rowDataOrIndex : grid.store.getAt(rowDataOrIndex).data);
    },
    
    deleteRecord: function(grid, rowDataOrIndex){
        Ext.Msg.confirm(
            'Удаление вопроса', 
            'Удалить вопрос:<br><b>' + rowDataOrIndex.id + '</b>', 
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
    }
});

Ext.reg('St.view.TestQuestions', St.view.TestQuestions);