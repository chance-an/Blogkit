/**
 * User: anch
 * Date: 11/10/11
 * Time: 1:26 AM
 */

Ext.define('BKAdmin.view.Viewport', {
    extend: 'Ext.container.Viewport',
    requires: ['BKAdmin.layout.Percentage'],


    layout: 'percentage',
    items: [
        {
            id: 'MainDiv',
            xtype: 'component',
            title: 'Users',
            widthRatio: 0.9,
            cls: "",
            html: 'aaa'
        }
    ],

    initComponent: function(){

        this.callParent(arguments);
        var request = Blogkit.util.TemplateManager.requestTemplate('basic.main');

        request.done(Ext.bind(function(template){
            this.down('#MainDiv').update(template);
        }, this));

        var aaa = 1;
    }
});
