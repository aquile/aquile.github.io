St.data.EntityStore.Teachers = Ext.extend(St.data.EntityStore, {
    constructor : function(config) {
        St.data.EntityStore.Teachers.superclass.constructor.call(this, Ext.apply(config || {} , {
            autoLoad: true,
            entityName  : 'teachers',
            fields      : [
                { name: 'id', mapping: 'id', type:'int' },
                { name: 'fullname', mapping: 'fullname', type: 'string' },
                { name: 'firstname', mapping: 'firstname', type: 'string' },
                { name: 'lastname', mapping: 'lastname', type: 'string' },
                { name: 'photo', mapping: 'photo' },
                { name: 'photo2', mapping: 'photo2' },
                { name: 'photo3', mapping: 'photo3' },
                { name: 'tel', mapping: 'tel' },
                { name: 'email', mapping: 'email' },
                { name: 'education', mapping: 'education' },
                { name: 'hobby', mapping: 'hobby' },
                { name: 'fsong', mapping: 'fsong' },
                { name: 'fmovie', mapping: 'fmovie' },
                { name: 'fbook', mapping: 'fbook' },
                { name: 'fquote', mapping: 'fquote' }
            ],
            sortInfo : {
                field: 'lastname',
                direction: 'ASC'
            }
        }));
    }
});