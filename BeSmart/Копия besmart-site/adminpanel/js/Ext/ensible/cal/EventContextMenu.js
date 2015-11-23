Ext.override(Ext.ensible.cal.EventContextMenu, {
    /**
     * Overrideable method intended for customizing the menu items. This should only to be used for overriding 
     * or called from a subclass and should not be called directly from application code.
     */
    buildMenu: function(){
        if(this.rendered){
            return;
        }
        this.dateMenu = new Ext.menu.DateMenu({
            scope: this,
            handler: function(dp, dt){
                dt = Ext.ensible.Date.copyTime(this.rec.data[Ext.ensible.cal.EventMappings.StartDate.name], dt);
                this.fireEvent('eventmove', this, this.rec, dt);
            }
        });
        
        Ext.apply(this, {
            items: [{
                text: 'Печать урока',
                iconCls: 'icon-printer',
                scope: this,
                handler: function() {
                    var id = this.rec.id;
                    window.open('/print.php?id=' + id);
                }
            },'-',{
                text: 'Список студентов',
                iconCls: 'icon-application_view_detail',
                scope: this,
                handler: function() {
//                    var id = this.rec.id;
                    var win = new Ext.Window({
                        title   : 'Список студентов',
                        shadow  : 'drop',
                        shadowOffset: 5,
                        resizable: false,
                        border  : false,
                        floating: true,
                        modal   :  true,
                        items   : [{
                            ref     : 'addForm',
                            xtype   : 'St.form.LessonDetails',
                            lessonRecord: this.rec
                        }]
                    }).show();
                    win.addForm.setValues(this.rec.data);
                }
            },'-',{
                text: 'Перенести на:',
                iconCls: 'extensible-cal-icon-evt-move',
                menu: this.dateMenu
            },'-', {
                text: 'Удалить',
                iconCls: 'extensible-cal-icon-evt-del',
                style: 'color: #ff0000',
                scope: this,
                handler: function(){
                    Ext.Msg.confirm(
                        '<span style="color: #ff0000">УДАЛЕНИЕ УРОКА</span>',
                        'Вы уверены, что хотите удалить этот урок?',
                        function (btn, text) {
                            if (btn === 'yes') {
                                this.fireEvent('eventdelete', this, this.rec, this.ctxEl);
                            }
                        }, this
                    );
                }
            }]
        });
    }
});