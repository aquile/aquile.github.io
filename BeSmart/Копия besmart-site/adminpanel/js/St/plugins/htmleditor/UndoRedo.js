/**
 * @author Shea Frederick - http://www.vinylfox.com
 * @contributor vizcano - http://www.extjs.com/forum/member.php?u=23512
 * @class Ext.ux.form.HtmlEditor.UndoRedo
 * @extends Ext.ux.form.HtmlEditor.MidasCommand
 * <p>A plugin that creates undo and redo buttons on the HtmlEditor. Incomplete.</p>
 */

St.plugins.htmleditor.UndoRedo = Ext.extend(St.plugins.htmleditor.MidasCommand, {
    // private
    midasBtns: ['|', {
        cmd: 'undo',
        iconCls : 'icon-edit_undo',
        tooltip: {
            title: 'Undo'
        },
        overflowText: 'Undo'
    }, {
        cmd: 'redo',
        iconCls : 'icon-edit_redo',
        tooltip: {
            title: 'Redo'
        },
        overflowText: 'Redo'
    }]
});

Ext.preg('St.plugins.htmleditor.UndoRedo', St.plugins.htmleditor.UndoRedo)