St.data.EntityStore.Levels = Ext.extend(St.data.EntityStore, {
    constructor : function(config) {
        this.initMapping();

        St.data.EntityStore.Levels.superclass.constructor.call(this, Ext.apply(config || {} , {
            autoLoad: true,
            entityName  : 'levels',
            sortInfo: {
                field: 'ID',
                direction: 'ASC'
            },
            fields      : Ext.ensible.cal.CalendarRecord.prototype.fields.getRange()
        }));
    },
    initMapping: function () {
        Ext.ensible.cal.CalendarMappings = {
            // Same basic concept for the CalendarMappings as above
            CalendarId:   {name:'ID', mapping: 'id', type: 'int'}, // int by default
            Title:        {name:'CalTitle', mapping: 'name', type: 'string'},
            Description:  {name:'Desc', mapping: 'cal_desc', type: 'string'},
            ColorId:      {name:'Color', mapping: 'color', type: 'int'},
            IsHidden:     {name:'Hidden', mapping: 'hidden', type: 'boolean'}
        };
        // Don't forget to reconfigure!
        Ext.ensible.cal.CalendarRecord.reconfigure();
    }
});