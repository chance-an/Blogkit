/**
 * User: anch
 * Date: 11/1/11
 * Time: 2:33 AM
 */

Ext.define('BKAdmin.controller.Login', {
    extend: 'Ext.app.Controller',

    config:{
        view: null
    },

    constructor: function(){
        this.callParent(arguments);
        this.suspendEvents(false);
    },

    init: function() {
        console.log('Initialized Users! This happens before the Application launch function is called');
    },

    start: function(){
        this.resumeEvents();

        if(!this.getView()){
            var mainTabPanel = Ext.ComponentManager.get('MainTabPanel');
            var view = Ext.create('BKAdmin.view.TabPanelLogin');
            mainTabPanel.add(view);
            this.setView(view);
        }

        var aaa = 1;
    },

    stop: function(){
        this.suspendEvents(false);
    }
});
