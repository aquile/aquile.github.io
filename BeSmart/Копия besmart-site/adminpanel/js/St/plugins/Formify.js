/**
 * Allows any container to be added to basic form
 * 
 * @class   St.plugins.Formify
 * @extends Object
 * @author  Victor Protsenko
 */

Ext.ns('St.plugins');

St.plugins.Formify = Ext.extend(Object, {
    
    /**
     * Required init method
     * 
     * @param {Object} parent
     * @return void
     */
    init : function(parent) {    
        this.parent = parent;
        Ext.applyIf(parent, {
            submitValue: true,
            isFormField: true,
            validate: this.validate,        
            getName: this.getName,        
            markInvalid: this.markInvalid,
            clearInvalid: this.clearInvalid,
            reset: this.reset
        });
           
        this.parent.addEvents(['beforeToggleComponent', 'toggleComponent']);
        this.parent.enableBubble(['beforeToggleComponent','toggleComponent']);
        
        // register shutdown method
        parent.on('destroy', this.onDestroy, this);        
    },
      
    validate: function() {
        return true;
    },

    // Needed for basicForm to evaluate this container as a form field    
    getName: function() {
        return this.name;
    },
    
    // Needed for basicForm to evaluate this container as a form field    
    markInvalid: function(){
        return true;
    },

    // Needed for basicForm to evaluate this container as a form field
    clearInvalid: function(){
        return true;
    },    
    
    // Needed for basicForm to evaluate this container as a form field
    reset: Ext.emptyFn,
    
    /**
     * Shutdown method
     * 
     * @private
     * @return void
     */
    onDestroy: function() {
        this.parent = null;
    }
});

Ext.preg('St.plugins.Formify', St.plugins.Formify);