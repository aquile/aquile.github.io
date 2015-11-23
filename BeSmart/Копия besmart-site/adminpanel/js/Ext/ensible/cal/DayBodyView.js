Ext.override(Ext.ensible.cal.DayBodyView, {
	getTemplateEventData : function(evt) {
            var M = Ext.ensible.cal.EventMappings,
                extraClasses = [this.getEventSelectorCls(evt[M.EventId.name])],
                data = {},
                colorCls = 'x-cal-default',
                title = evt[M.Title.name],
                fmt = Ext.ensible.Date.use24HourTime ? 'G:i ' : 'g:ia ',
                recurring = evt[M.RRule.name] != '',
                lessonType = this.ownerCalendarPanel.lessonTypeStore.getById(evt[M.lesson_type.name]),
                room = this.ownerCalendarPanel.roomStore.getById(evt[M.room.name]),
                teacher = this.ownerCalendarPanel.teacherStore.getById(evt[M.teacher.name]),
                topic = this.ownerCalendarPanel.topicsStore.getById(evt.lessonTopicID);

            this.getTemplateEventBox(evt);

            if(this.calendarStore && evt[M.CalendarId.name]){
                var rec = this.calendarStore.getById(evt[M.CalendarId.name]);
                if(rec){
                    colorCls = 'x-cal-' + rec.data[Ext.ensible.cal.CalendarMappings.ColorId.name];
                }
            }
            colorCls += (evt._renderAsAllDay ? '-ad' : '') + (Ext.isIE || Ext.isOpera ? '-x' : '');
            extraClasses.push(colorCls);

            if(this.getEventClass){
                var rec = this.getEventRecord(evt[M.EventId.name]),
                    cls = this.getEventClass(rec, !!evt._renderAsAllDay, data, this.store);
                extraClasses.push(cls);
            }
            
            if (evt.status == 2) {
                extraClasses.push('st-ev-inactive');
            } else if (evt.status == 4) {
                extraClasses.push('st-ev-onvote');
            }
            

            data._extraCls = extraClasses.join(' ');
            data._isRecurring = evt.Recurrence && evt.Recurrence != '';
            data._isReminder = evt[M.Reminder.name] && evt[M.Reminder.name] != '';
//            data.Title = (evt[M.IsAllDay.name] ? '' : evt[M.StartDate.name].format(fmt)) + (!title || title.length == 0 ? this.defaultEventTitleText : title);
            data.Title = (evt[M.IsAllDay.name] ? '' : evt[M.StartDate.name].format(fmt));
            
            data.Title += ' (' + evt.userCount + ', ' + evt.waitingCount + ')';
            if (lessonType) {
                data.Title += ' <b>' + lessonType.get('name') + '</b>';
            }
            if (room) {
                data.Title += '<div>Комната: ' + room.get('name') + '</div>';
            }
            if (topic) {
                data.Title += '<div>Тема: ' + topic.get('name') + '</div>';
            }

            if (teacher) {
                data.Title += '<div>Препод.: ' + teacher.get('fullname') + '</div>';
            }
//          TODO: IMPLEMENT 
//            if (lessonTopicID) {
//                data.Title += '<div>Тема: ' + room.get('lessonTopicID') + '</div>';
//            }
            return Ext.applyIf(data, evt);
        }
});