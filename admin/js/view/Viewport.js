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

        request.done(Ext.bind(this.installTemplate, this));

        var aaa = 1;
    },

    installTemplate: function(template){
        var $mainDiv = this.down('#MainDiv');
        $mainDiv.update(template);

        Ext.create('BKAdmin.view.MainTabPanel', {renderTo: $($mainDiv.getEl().dom).find('#mainTabPanelArea')[0]});
//        this.add(Ext.create('BKAdmin.view.MainTabPanel', {renderTo: $($mainDiv.getEl().dom).find('#mainTabPanelArea')[0]}));


        var aaa = 1;
    }
});
