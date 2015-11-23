/**
 * @author Shea Frederick - http://www.vinylfox.com
 * @class Ext.ux.form.HtmlEditor.plugins
 * <p>A convenience function that returns a standard set of HtmlEditor buttons.</p>
 * <p>Sample usage:</p>
 * <pre><code>
    new Ext.FormPanel({
        ...
        items : [{
            ...
            xtype           : "htmleditor",
            plugins         : Ext.ux.form.HtmlEditor.plugins()
        }]
    });
 * </code></pre>
 */
St.plugins.htmleditor.Plugins = function(){
    return [
        'St.plugins.htmleditor.Link',
//        'St.plugins.htmleditor.Divider',
//        'St.plugins.htmleditor.Word',
//        'St.plugins.htmleditor.FindAndReplace',
        'St.plugins.htmleditor.UndoRedo',
        'St.plugins.htmleditor.Divider',
//        'St.plugins.htmleditor.Image',
        'St.plugins.htmleditor.Table',
        'St.plugins.htmleditor.HR',
//        'St.plugins.htmleditor.SpecialCharacters',
        'St.plugins.htmleditor.HeadingMenu',
        'St.plugins.htmleditor.IndentOutdent',
//        'St.plugins.htmleditor.SubSuperScript',
//        'St.plugins.htmleditor.RemoveFormat'
    ];
};