/**
 *  @author Victor Protsenko <protsenko.victor@gmail.com>
 **/
St.form.Notes = Ext.extend(Ext.form.TriggerField, {
    initComponent: function () {
        Ext.apply(this, {
            triggerClass    : 'x-form-date-trigger',
            autoCreate      : {
                tag             : 'textarea',
                autocomplete    : 'off',
                style          : (Ext.isNumber(this.height) ? 'height: ' + this.height + 'px' : '')
            }
        });
        
        St.form.Notes.superclass.initComponent.apply(this, arguments);
    },
    
    onTriggerClick : function (btn) {
        if (this.readonly) {
            return;
        }
        var dateString = '[' + (new Date()).format('d-m-Y H:i') + ']',
            oldValue = this.getValue(),
            newValue,
            cursorPosition;

        newValue = dateString + " \n" + oldValue;
        cursorPosition = dateString.length + 1; // set cursor after 'timestamp' and 'space'

        this.setValue(newValue);

        this.setCursorPosition(cursorPosition);
    },
    
    getCursorPosition: function () {
        var txtEl = this.el.dom,
            r,
            re,
            rc;
        if (!this.hasFocus) {
            return 0;
        }
        if (txtEl.selectionStart) {
            return txtEl.selectionStart;
        } else if (document.selection) {
            txtEl.focus();

            r = document.selection.createRange();
            if (r == null) {
                return 0;
            }

            re = txtEl.createTextRange();
            rc = re.duplicate();
            re.moveToBookmark(r.getBookmark());
            rc.setEndPoint('EndToStart', re);

            return rc.text.length;
        }
        return 0;

    },
    
    setCursorPosition : function (position) {
        var txtEl = this.el.dom, range;
        txtEl.focus();
        if (txtEl.setSelectionRange) {
            txtEl.setSelectionRange(position, position);
        } else if (txtEl.createTextRange) {
            range = txtEl.createTextRange();
            range.collapse(true);
            range.moveEnd('character', position);
            range.moveStart('character', position);
            range.select();
        }
    }
});

Ext.reg('St.form.Notes', St.form.Notes);
