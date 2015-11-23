var St = Ext.apply({}, {
    JS_FOLDER   : '/panel/js',
    LOADER_PATH : 'St/Loader.js',
    LOGO_SRC    : '/panel/images/logo2.png',
    DEFAULT_VIEW: {    
        name    : 'St.view.Calendar'
    },
    DATA_BASE   : (location.pathname + '/data/').replace('//', '/'),
    version: systemVersion,
    viewport: undefined,
    mask    : undefined,
    isMainOffice : systemDepartment == 1,

    start: function(){
        this.mask = new Ext.LoadMask(Ext.getBody(), {
            msg : 'Подождите, идет загрузка...',
            removeMask : false
        });
        this.mask.show();
        this.registerNamespaces();
        this.loadResourses();
    },
    
    init: function() {
        Ext.QuickTips.init();
        Ext.state.Manager.setProvider(new Ext.state.CookieProvider({
            expires: new Date(new Date().getTime()+(1000*60*60*24*365 * 10)) //10 years
        }));
        
        this.viewport = new St.Viewport();
            
        St.StoreMgr.init(function () {
            // Initialize data node store
//            St.DataNodeMgr.init();

            if (this.viewport.rendered) {
                Ext.getCmp('stMainContent').showView(St.DEFAULT_VIEW);
            } else {
                this.viewport.on('afterrender', function () {
                    Ext.getCmp('stMainContent').showView(St.DEFAULT_VIEW);
                }, this);
            }
            Ext.ensible.Date.use24HourTime = true;
            this.mask.hide();
        }, this);
    },
    
    loadResourses: function (){
        Ext.Loader.load([this.JS_FOLDER + '/' + this.LOADER_PATH + '?v=' + this.version], function(){
            St.Loader.load(this.includes, this.init, this, true, this.version);
        }, this, true);
    },
    
    registerNamespaces: function(){
        Ext.each(this.includes, function(res){
            Ext.ns(res);
        });
        
        Ext.each(this.ns, function(res){
            Ext.ns(res);
        });
    },
    
    applyIf: function(o, c, r){
        if(o && c){
            for(var p in c){
                if(typeof o[p] == "undefined"){
                    o[p] = c[p];
                }else if(typeof o[p] == "object" && r){
                    if (typeof r == "number"){
                        r--;
                    }
                    Ext.applyIf(o[p], c[p], r);
                }
            }
        }
        return o;
    },
    
    objCmp : function(objFrom, objTo){
        var res = true;
        Ext.iterate(objFrom, function(key, value){
            if (Ext.isObject(value) && Ext.isObject(objTo[key])) {
                res = St.objCmp(value, objTo[key]);
            } else {
                res = (objTo[key] == value);
            }
            return res;
        });
        
        return res;
    },
    
    includes : [
        'shared.String',
        // Parent classes
        'St.View',
        'St.Msg',
        'St.Renderer',
        'St.data.EntityStore',
        
        // Overrides
        'Ext.DatePicker',
        'Ext.grid.ColumnModel',
        'Ext.form.Field',
        'Ext.data.Record',
        'Ext.ensible.cal.DayBodyView',
        'Ext.ensible.cal.CalendarView',
        'Ext.ensible.cal.EventContextMenu',
        'Ext.ensible.cal.CalendarPanel',
        'Ext.ux.TreeCombo',
        
        // General core
        'St.data.EntityStore.LessonStatus',
        'St.data.EntityStore.UserLesson',
        'St.data.EntityStore.UserLessonStatus',
        'St.data.EntityStore.Pages',
        'St.data.EntityStore.News',
        'St.data.EntityStore.Comments',
        'St.data.EntityStore.Templates',
        'St.data.EntityStore.LessonTypes',
        'St.data.EntityStore.Levels',
        'St.data.EntityStore.Schools',
        'St.data.EntityStore.Rooms',
        'St.data.EntityStore.Users',
        'St.data.EntityStore.Lessons',
        'St.data.EntityStore.TestResults',
        'St.data.EntityStore.DataNodes',
        'St.data.EntityStore.UserTypes',
        'St.data.EntityStore.Teachers',
        'St.data.EntityStore.HotNews',
        'St.data.EntityStore.TestTypes',
        'St.data.EntityStore.Tests',
        'St.data.EntityStore.TestQuestions',
        'St.data.EntityStore.TestGroups',
        'St.data.EntityStore.Topics',
        'St.data.EntityStore.Statistics',
        'St.data.EntityStore.Settings',
        'St.data.EntityStore.Polls',
        'St.data.EntityStore.Payments',
        'St.data.EntityStore.Managers',
        'St.data.EntityStore.Packages',
        'St.DataNodeMgr',
        'St.StoreMgr',
        
        'St.data.RatingStore',
        
        // Forms
        'St.form.FieldSet',
        'St.form.PageForm',
        'St.form.FileUploadField',
        'St.form.NewsForm',
        'St.form.TeacherForm',
        'St.form.ComboBox',
        'St.form.CommentsForm',
        'St.form.UserForm',
        'St.form.PasswordField',
        'St.form.LessonForm',
        'St.form.HotNewsForm',
        'St.form.LessonDetails',
        'St.form.DisplayField.Date',
        'St.form.Abonement',
        'St.form.Tests',
        'St.form.TestQuestion',
        'St.form.TopicForm',
        'St.form.RoomForm',
        'St.form.SettingForm',
        'St.form.Select',
        'St.form.PollsForm',
        'St.form.PaymentForm',
        'St.form.DateField',
        'St.form.ManagerForm',
        'St.form.Notes',
        
        // Viewport elements
        'St.MainContent',
        'St.MainMenu',
        'St.Statistic',
        'St.Viewport',
        
        // Views
        'St.view.Pages',
        'St.view.Overview',
        'St.view.News',
        'St.view.Comments',
        'St.view.Calendar',
        'St.view.Users',
        'St.view.TestResults',
        'St.view.Teachers',
        'St.view.HotNews',
        'St.view.Abonementy',
        'St.view.Tests',
        'St.view.TestQuestions',
        'St.view.Topics',
        'St.view.Rooms',
        'St.view.Polls',
        'St.view.PollResults',
        'St.view.Settings',
        'St.view.Payments',
        'St.view.Managers',
        
        // Plugins
        'St.plugins.Formify',
        'St.plugins.htmleditor.Font',
        'St.plugins.htmleditor.MidasCommand',
        'St.plugins.htmleditor.Plugins',
        'St.plugins.htmleditor.Link',
        'St.plugins.htmleditor.Divider',
        'St.plugins.htmleditor.Word',
        'St.plugins.htmleditor.FindAndReplace',
        'St.plugins.htmleditor.UndoRedo',
        'St.plugins.htmleditor.Image',
        'St.plugins.htmleditor.Table',
        'St.plugins.htmleditor.HR',
        'St.plugins.htmleditor.SpecialCharacters',
        'St.plugins.htmleditor.HeadingMenu',
        'St.plugins.htmleditor.IndentOutdent',
        'St.plugins.htmleditor.SubSuperScript',
        'St.plugins.htmleditor.Word',
        'St.plugins.htmleditor.RemoveFormat',
        
        // View
        'St.view.Pages.Search',
        
        // Wizards
        'St.wizard.Select'
    ],
    
    ns : [
        'St.stores'
    ]
});

Ext.onReady(function(){
    St.start();
});