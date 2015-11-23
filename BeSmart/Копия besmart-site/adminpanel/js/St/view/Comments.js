St.view.Comments = Ext.extend(St.View, {
    entityName  : 'Comments',
    pageSize    : 1000,
    
    initComponent: function(config){
        
            
        Ext.apply(this, {     
            viewTitle   : 'Комментарии',
            titleIconCls: 'icon-user_comment',
            autoExpandColumn: 'page',
            viewConfig  : {
                forceFit    : false
            }
        });
        
        St.view.Comments.superclass.initComponent.call(this, config);
    },
    
    cellDblClickHandler : function(grid, rowDataOrIndex){
        this.editCommentsHandler.apply(this, arguments);
    },
    
    getCellMenuItems : function(){
        return [{
            text    : 'Просмотреть на сайте',
            iconCls : 'icon-page_find',
            listeners : {
                scope: this,
                click: function(btn, evt) {
                    var selectedRecord = this.getSelectionModel().getSelected(),
                        pagesStore = St.StoreMgr.getStore('Pages'),
                        pageId = selectedRecord.get('page'),
                        teacherID = selectedRecord.get('teacherID'),
                        url;

                    if (pageId) {
                        url = pagesStore.getById(pageId).get('name');
                    } else if (teacherID) {
                        url = 'teachers/info/' + teacherID;
                    }

                    window.open(window.location.origin + '/' + url, '_blank');
                }
            }
        },{
            text    : 'Редактировать',
            iconCls : 'icon-comment_edit',
            listeners : {
                scope: this,
                click: function(btn, evt){
                    this.editCommentsHandler(this, this.getSelectionModel().getSelected().data);
                }
            }
        }, {
            text    : 'Удалить',
            iconCls : 'icon-comments_delete',
            style   : 'color: #ff0000',
            hidden  : true,
            listeners : {
                scope : this,
                click :  function(btn, evt){
                    this.deleteComments(this, this.getSelectionModel().getSelected().data);
                }
            } 
        }];
    },
    
    getToolBar : function(){
        return [{
            text    : 'Обновить список',
            iconCls : 'icon-arrow_refresh',
            listeners : {
                scope   : this,
                click   : function(){
                    this.store.reload();
                }
            }
        }, '-', { 
            text      : 'Добавить комментарий',
            listeners : {
                scope   : this,
                click   : this.addCommentsHandler
            },
            iconCls : 'icon-comment_add'
        }];
    },
    
    getColumnModel: function(){
        return new Ext.grid.ColumnModel({
            defaults: {
                sortable: true
            },
            columns: [{
                menuDisabled: true,
                align       : 'center',
                width       : 40,
                fixed       : true,
                header      : '<span ext:qtip="Видимость" class="eye-grid icon-eye"></span>',
                dataIndex   : 'read',
                renderer    : function(value, meta, record){
                    return '<span class="eye-grid ' + (value != 0 ? 'icon-eye' : 'icon-eye_close') + '"></span>';
                }
            }, {
                header      : 'Ответ',
                width       : 40,
                dataIndex   : 'answer',
                renderer    : function (value, meta, record) {
                    meta.style += 'text-align: center';
                    return value.length > 0 ? '+' : '-';
                }
            }, { 
                id          : 'id', 
                header      : 'ID', 
                dataIndex   : 'id', 
                width       : 30
            }, {
                header      : 'Имя',
                dataIndex   : 'name' 
            }, {
                header      : 'Login',
                dataIndex   : 'userLogin'
            }, {
                header      : 'Адрес страницы (URL)', 
                id          : 'page',
                dataIndex   : 'page', 
                renderer    : function(value, meta, record){ 
                    var tID = record.get('teacherID'),
                        pagesStore = St.StoreMgr.getStore('Pages'),
                        pageRecord = pagesStore.getById(value),
                        pageName = pageRecord ? pageRecord.get('name') : '';
                    
                    if (!pageName && tID) {
                        pageName = 'teachers/info/' + tID;
                    }
                
                    return '/' + pageName;
                }
            }, { 
                header      : 'Дата создания', 
                dataIndex   : 'posted_time', 
                width       : 140,
                renderer    : function(value, meta, record){
                    var d = (new Date(value*1000));
                    return d.format('d.m.Y') + ' <span class="st-date-time">' + d.format('H:i:s') + '</span>';
                }
            }, { 
                header      : 'Оценка', 
                align       : 'center',
                width       : 90,
                dataIndex   : 'rating',
                renderer    : function(value, meta, record){
                    return '<span class="st-rating-stars s' + value + '"></span>';
                }
            }]
        });
    },
    
    addCommentsHandler: function(){
        new Ext.Window({
            title   : 'Новый комментарий',
            iconCls : 'icon-comment_add',
            shadow  : 'drop',
            shadowOffset: 5,
            resizable: false,
            border  : false,
            floating: true,
            modal   :  true,
            items   : [{
                ref         : 'addForm',
                xtype       : 'St.form.CommentsForm',
                btnHandler  : this.saveNew(this)
            }]
        }).show();
    },
        
    editCommentsHandler: function(grid, rowDataOrIndex){
        var win = new Ext.Window({
            title   : 'Редактирование комментария',
            iconCls : 'icon-comment_edit',
            shadow  : 'drop',
            shadowOffset: 5,
            resizable: false,
            border  : false,
            floating: true,
            items   : [{
                ref     : 'addForm',
                xtype   : 'St.form.CommentsForm',
                btnHandler: this.saveEdit(this)
            }]
        }).show();
        
        
        win.addForm.getForm().setValues(Ext.isObject(rowDataOrIndex) ? rowDataOrIndex : grid.store.getAt(rowDataOrIndex).data);
    },
    
    deleteComments: function(grid, rowDataOrIndex){
        Ext.Msg.confirm(
            'Удаление комментария', 
            'Удалить комментарий:<br>ID: <b>' + rowDataOrIndex.id + '</b>', 
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
                    read : values.read.inputValue
                }));

                scope.getStore().add(record);
                this.ownerCt.close();
            }
        };
    }
    
});

Ext.reg('St.view.Comments', St.view.Comments);