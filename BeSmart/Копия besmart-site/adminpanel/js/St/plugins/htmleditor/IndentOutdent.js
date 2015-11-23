/**
 * @author Shea Frederick - http://www.vinylfox.com
 * @class Ext.ux.form.HtmlEditor.IndentOutdent
 * @extends Ext.ux.form.HtmlEditor.MidasCommand
 * <p>A plugin that creates two buttons on the HtmlEditor for indenting and outdenting of selected text.</p>
 */
St.plugins.htmleditor.IndentOutdent = Ext.extend(St.plugins.htmleditor.MidasCommand, {
    // private
    midasBtns: ['|', {
        cmd: 'indent',
        iconCls: 'icon-text_indent',
        tooltip: {
            title: 'Indent Text'
        },
        overflowText: 'Indent Text'
    }, {
        cmd: 'outdent',
        iconCls: 'icon-text_indent_remove',
        tooltip: {
            title: 'Outdent Text'
        },
        overflowText: 'Outdent Text'
    }]
});

Ext.preg('St.plugins.htmleditor.IndentOutdent', St.plugins.htmleditor.IndentOutdent);
