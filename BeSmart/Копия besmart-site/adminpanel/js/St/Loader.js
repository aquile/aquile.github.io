St.Loader = Ext.apply({}, {
    
    load: function(fileList, callBack, scope, preserveOrder, hash){
        Ext.Loader.load(this.fileListFilter(fileList, hash), callBack, scope, preserveOrder);
    },
    
    fileListFilter: function(fileList, hash){
        var files = [];
        Ext.each(fileList, function(fileName){
            files.push(St.JS_FOLDER + '/' + fileName.replace(/\./g, '/') + '.js?v=' + hash);
        });
        return files;
    }
});