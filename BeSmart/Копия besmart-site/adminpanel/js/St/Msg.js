St.Msg = function(type, body, pause) {
    if(!this.msgCt){
        this.msgCt = Ext.DomHelper.insertFirst(document.body, {id:'msg-div'}, true);
    }
    this.msgCt.alignTo(document, 't-t');
    var html = '<p>' + body + '</p>',
        m = Ext.DomHelper.append(this.msgCt, {html: '<div class="msg ' + type + '">' + html + '</div>'}, true);

    m.slideIn('t').pause(pause || 2).ghost('t', {remove:true});
};

