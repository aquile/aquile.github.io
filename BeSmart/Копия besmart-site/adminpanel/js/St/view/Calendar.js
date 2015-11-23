St.view.Calendar = Ext.extend(Ext.ensible.cal.CalendarPanel, {
    roomStore: undefined,
    lessonTypeStore: undefined,
    border: false,
    activeItem: 0,
// These show by default, turn them off
//    showDayView: false,
    showMonthView: false,

    // Defaults to 3 days. You could also set the dayCount config
    // inside multiDayViewCfg to change that.
    showMultiDayView: true,
    todayText: 'Сегодня',
    goText: 'ОК',
    jumpToText: 'Перейти к:',
    // Show a custom 3-week view
    showMultiWeekView: false,
//    dayViewCfg: {
//        ddIncrement: 60,
//        viewStartHour: 7,
//        viewEndHour: 23,
//        showHourSeparator: false
//    },
//    multiDayViewCfg: {
//        viewStartHour: 7,
//        // End the view at 8:00pm / 20:00
//        viewEndHour: 23,
//        showHourSeparator: false,
//        ddIncrement: 60
//    },
    viewConfig: {
        viewStartHour: 7,
        // End the view at 8:00pm / 20:00
        viewEndHour: 23,
        hourHeight: 66,
        showHourSeparator: true,
        ddIncrement: 30,
        ddCreateEventText: 'Новый урок: {0}',
        enableDD: true,
        enableEventResize: false
    },
    weekViewCfg: {
        // These settings create a fixed weekday view. 
        // This view will only show Mon-Fri.
        dayCount: 7,
        // Always start the view on Monday
        startDay: 1,
        startDayIsStatic: false,
        // NOTE: the configs below apply to any DayView or WeekView. If you wanted all day
        // and week views to share these same settings, you could simply pass these configs
        // in the general viewCfg. Any views that do not use them will ignore them. They are
        // only on this view in this sample to demonstrate how they can be easily customized per view.

        // Hide the half-hour marker line
//        showHourSeparator: false,
        // Start the view at 6:00
//        viewStartHour: 7,
        // End the view at 8:00pm / 20:00
//        viewEndHour: 23,
        // Default the scroll position on load to 8:00 if the body is overflowed
        scrollStartHour: 8,
        // Customize the hour (and event) heights. See the docs for details on setting this.
        // This example will be double-height (the default is 42)
//        hourHeight: 84,
        // Allow drag-drop, drag-create and resize of events in 10-minute increments
//        ddIncrement: 60,
        // Since the hour blocks are double-height, we can shorten the minimum event display 
        // height to match the ddIncrement
        minEventDisplayMinutes: 10
    },
    initComponent: function(config) {
        this.roomStore = St.StoreMgr.getStore('Rooms');
        this.lessonTypeStore = St.StoreMgr.getStore('LessonTypes');
        this.teacherStore = St.StoreMgr.getStore('Teachers');
        this.topicsStore = St.StoreMgr.getStore('Topics');
        
        Ext.apply(this, {
            calendarStore: St.StoreMgr.getStore('Levels'),
            eventStore: St.StoreMgr.getStore('Lessons', true),
            listeners: {
                'eventclick': function (cmp, record, el) {
                    this.editLessonWindow(record);
                    return false;
                },
                'rangeselect': function (cal, dates, callback) {
                    this.addLessonWindow(dates);
                    callback();
                    return false;
                },
                'dayclick': function (cal, datestart, allday, el) {
                    if (allday || !datestart) {
                        return false;
                    }
                    this.addLessonWindow({
                        StartDt: datestart,
                        EndDt: datestart.add(Date.HOUR, 1)
                    });
                    return false;
                },
                'afterrender' : function (cal) {
                    this.store.load({});
                },
//                'beforeeventmove': this.prevenAction,
                'beforeeventresize': this.prevenAction
            }
        });
        
        this.mon(this.eventStore, {
            scope: this,
            'beforeload' : function (store, options) {
                if (options.params) {
                    options.params.school = this.school.getValue();
                }
           }
        });
        
        St.view.Calendar.superclass.initComponent.call(this, config);
    },
    
    initTBar: function () {
        St.view.Calendar.superclass.initTBar.apply(this, arguments);
        this.tbar.items.unshift({
            width       : 180,
            xtype       : 'St.form.ComboBox',
            store       : St.StoreMgr.getStore('Schools'),
            valueField  : 'id',
            displayField: 'name',
            ref         : '../school',
            stateful    : St.isMainOffice,
            selectFirst : true,
            stateId     : 'st_current_school',
            stateEvents : ['select'],
            getState    : function () {
                return {
                    value: this.getValue()
                };
            }
        }, ' ', {
            xtype: 'button',
            text : 'Обновить',
            scope: this,
            handler: function () {
                this.store.reload();
            }
        }, '-');
    },
    
    prevenAction: function () {
        return false;
    },
    addLessonWindow: function(data){
        var win = new Ext.Window({
            title   : 'Новый урок',
            iconCls : 'icon-page_add',
            shadow  : 'drop',
            shadowOffset: 5,
            resizable: false,
            border  : false,
            floating: true,
            modal   :  true,
            items   : [{
                ref     : 'addForm',
                xtype   : 'St.form.LessonForm',
                btnHandler: this.saveNew(this)
            }]
        }).show();
        
        win.addForm.setValues(data);
    },

    editLessonWindow: function(record){
        var win = new Ext.Window({
            title   : 'Редактирование урока',
            iconCls : 'icon-page_edit',
            shadow  : 'drop',
            shadowOffset: 5,
            resizable: false,
            border  : false,
            floating: true,
            modal   :  true,
            items   : [{
                ref     : 'addForm',
                xtype   : 'St.form.LessonForm',
                btnHandler: this.saveEdit(this)
            }]
        }).show();
        
        win.addForm.setValues(record.data);
    },

    saveEdit: function (scope){
        return function(){
            var bForm = this.getForm(),
            record = scope.getActiveView().store.getById(this.entityID.getValue());
            if (!bForm.isValid()) {
                return;
            }
            bForm.updateRecord(record);
            this.ownerCt.close();
        };
    },

    saveNew: function(scope){
        return function(){
            var form = this.getForm(),
                values = form.getFieldValues(),
                record = scope.getActiveView().store.createRecord(Ext.applyIf(values, {
                }));
            if (!form.isValid()) {
                return;
            }
            scope.getActiveView().store.add(record);
            this.ownerCt.close();
        };
    }
});

Ext.reg('St.view.Calendar', St.view.Calendar);