/**
 * User: anch
 * Date: 11/10/11
 * Time: 1:26 AM
 */

Ext.define('BKAdmin.view.Viewport', {
    extend: 'Ext.container.Viewport',
    requires: ['BKAdmin.layout.Percentage'],

    config: {
        ready: null
    },


    layout: 'percentage',
    items: [
        {
            id: 'MainDiv',
            xtype: 'component',
            title: 'Users',
            widthRatio: 0.9,
            cls: "",
            html: 'Loading. Dengzhe, ni ma de.'
        }
    ],

    constructor: function(){
        this.callParent(arguments);
        this.setReady(new $.Deferred());

        return this.getReady();
    },

    initComponent: function(){

        this.callParent(arguments);
        var request = Blogkit.util.TemplateManager.requestTemplate('basic.main');

        request.done(Ext.bind(this.installTemplate, this));
        request.done(Ext.bind(this.setupManualLayoutManager, this));
        request.done(Ext.bind(function(){
            this.getReady().resolve();
        }, this) );

        var aaa = 1;
    },

    installTemplate: function(template){
        var $mainDiv = this.down('#MainDiv');
        $mainDiv.update(template);

        Ext.create('BKAdmin.view.MainTabPanel', {renderTo: $($mainDiv.getEl().dom).find('#mainTabPanelArea')[0]});
    },

    setupManualLayoutManager: function(){
        this.on('afterlayout', this.Events.afterlayout, this);
        this.doLayout();
    },

    Events: {
        'afterlayout' : function(container, layout, eOpts){ //this method is for self-adjusting height
            var $elem = $(this.getEl().dom);

            var $mainTabPanelArea = $elem.find('#mainTabPanelArea');
            var mainTabPanel = Ext.ComponentQuery.query('#MainTabPanel')[0];

            var newHeight = $('#MainDiv').height() - $elem.find('#footer').collapsedHeight() - $elem.find('#header').collapsedHeight();
            $mainTabPanelArea.height(newHeight);
            mainTabPanel.setHeight(newHeight);
        }
    }
});
