/**
 * User: anch
 * Date: 11/1/11
 * Time: 2:33 AM
 */

Ext.define('BKAdmin.controller.Login', {
    extend: 'Ext.app.Controller',

    constructor: function(){
        this.callParent(arguments);
        this.suspendEvents(false);
    },

    init: function() {
        console.log('Initialized Users! This happens before the Application launch function is called');
    },

    start: function(){
        this.resumeEvents();

        var view = Ext.ComponentManager.get('TabPanelLogin');
        if(!view){
            var mainTabPanel = Ext.ComponentManager.get('MainTabPanel');
            view = Ext.create('BKAdmin.view.TabPanelLogin');
            mainTabPanel.add(view);
            mainTabPanel.setActiveTab(view);
            view.on('deployed', function(){this.bindEvents(view)}, this);
        }

        var aaa = 1;
    },

    stop: function(){
        this.suspendEvents(false);
    },


    bindEvents: function(view){
        var button = view.isolatedItems['button'] ;
        var form = view.isolatedItems['form'] ;

        button.on('click', function(){ this.Events.submit.call(this, form); }, this);
    },

    Events:{
        submit: function(form){
            var record = form.getForm().getValues();
            var request = this.getController('User').login(record);
        }
    }
});
