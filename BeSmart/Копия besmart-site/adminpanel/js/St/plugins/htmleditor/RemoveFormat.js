/**
 * @author Shea Frederick - http://www.vinylfox.com
 * @class Ext.ux.form.HtmlEditor.RemoveFormat
 * @extends Ext.ux.form.HtmlEditor.MidasCommand
 * <p>A plugin that creates a button on the HtmlEditor that will remove all formatting on selected text.</p>
 */
St.plugins.htmleditor.RemoveFormat = Ext.extend(St.plugins.htmleditor.MidasCommand, {
    midasBtns: ['|', {
        enableOnSelection: true,
        cmd: 'removeFormat',
        tooltip: {
            title: 'Remove Formatting'
        },
        overflowText: 'Remove Formatting'
    }]
});

Ext.preg('St.plugins.htmleditor.RemoveFormat', St.plugins.htmleditor.RemoveFormat);
