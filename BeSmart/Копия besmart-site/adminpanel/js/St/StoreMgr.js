Ext.apply(St.StoreMgr, {
    preLoad: [
        'Templates',
        'Levels',
        'Rooms',
        'LessonTypes',
        'UserTypes',
        'UserLessonStatus',
        'LessonStatus',
        'Teachers',
        'TestTypes',
        'TestGroups',
        'Topics',
        'Schools',
        'Packages'
    ],

    init: function (callback, scope) {
        // Init template store
        var storeLoaded = 0;
        if (this.preLoad.length) {
            Ext.each(this.preLoad, function (storeName) {
                var store = this.getStore(storeName);
                store.on('load', function () {
                    storeLoaded++;
                    if (storeLoaded === this.preLoad.length) {
                        console.log('Stores loaded(' + storeLoaded + '): ' + this.preLoad);
                        callback.call(scope);
                    }
                }, this, {
                    single: true
                });
            }, this);
        }
    },
    
    /**
     * @param {String}  name name of entity
     * @param {Boolean} force true to create uncached store
     * @param {Object}  config extra store configs
     */
    getStore : function(name, force, config){
        if (force) {
            if (St.data.EntityStore[name]) {
                return new St.data.EntityStore[name](config);
            } else {
                return undefined;
            }
        } else {
            if (!St.stores[name] && St.data.EntityStore[name]) {
                St.stores[name] = new St.data.EntityStore[name](config);
            }
            return St.stores[name];
        }
    }
});