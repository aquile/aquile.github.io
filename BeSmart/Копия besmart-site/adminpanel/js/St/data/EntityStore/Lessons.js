St.data.EntityStore.Lessons = Ext.extend(St.data.EntityStore, {
    constructor: function (config) {
        this.initMapping();
        
        St.data.EntityStore.Lessons.superclass.constructor.call(this, Ext.apply(config || {} , {
//            autoLoad    : true,
            idProperty  : 'id',
            fields      : Ext.ensible.cal.EventRecord.prototype.fields.getRange(),
            entityName  : 'lessons',
            sortInfo    : {
                field       : 'CalID',
                direction   : 'ASC'
            }
        }));
    },
            
    initMapping: function () {
        Ext.apply(Ext.ensible.cal.EventMappings, {
            // These are the same fields as defined in the standard EventRecord object but the
            // names and mappings have all been customized. Note that the name of each field
            // definition object (e.g., 'EventId') should NOT be changed for the default fields
            // as it is the key used to access the field data programmatically.
            EventId:     {name: 'ID', mapping:'id', type:'string'}, // int by default
            CalendarId:  {name: 'CalID', mapping: 'level', type: 'string'}, // int by default
//            Title:       {name: 'EvtTitle', mapping: 'lesson_type'},
            StartDate:   {name: 'StartDt', mapping: 'timestart', type: 'date', dateFormat: 'H:i:s m/d/Y'},
            EndDate:     {name: 'EndDt', mapping: 'timeend', type: 'date', dateFormat: 'H:i:s m/d/Y'},
//            RRule:       {name: 'RecurRule', mapping: 'recur_rule'},
//            Location:    {name: 'Location', mapping: 'location'},
//            Notes:       {name: 'Desc', mapping: 'full_desc'},
//            Url:         {name: 'LinkUrl', mapping: 'link_url'},
//            IsAllDay:    {name: 'AllDay', mapping: 'all_day', type: 'boolean'},
//            Reminder:    {name: 'Reminder', mapping: 'reminder'},
            lesson_type: {name: 'lesson_type', mapping: 'lesson_type'},
            userCount:  {name: 'userCount', mapping: 'userCount', type:'auto'},
            waitingCount:  {name: 'waitingCount', mapping: 'waitingCount', type:'auto'},
            teacher:  {name: 'teacher', mapping: 'teacher'},
            lessonTopicID:  {name: 'lessonTopicID', mapping:'lessonTopicID', type: 'int'},
            room:  {name: 'room', mapping: 'room', type: 'int'},
            topic:  {name: 'topic', mapping:'topic'},
            status: {name: 'status', mapping: 'status', type: 'int'}
        });
        
        Ext.ensible.cal.EventRecord.reconfigure();
    },
            
    load: function (o) {
        Ext.ensible.log('store load');
        
        // if params are passed delete the one-time defaults
        if(o.params){
            delete this.initialParams;
        }
        // this.initialParams will only be set if the store is being loaded manually
        // for the first time (autoLoad = false) so the owning calendar view set
        // the initial start and end date params to use. Every load after that will
        // have these params set automatically during normal UI navigation.
        if(this.initialParams){
            o = Ext.isObject(o) ? o : {};
            o.params = o.params || {};
            Ext.apply(o.params, this.initialParams);
            delete this.initialParams;
        }
        
        Ext.ensible.cal.EventStore.superclass.load.call(this, o);
    }
});