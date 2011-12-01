/**
 * User: anch
 * Date: 11/30/11
 * Time: 2:23 AM
 */
Ext.define('BKAdmin.view.TabPanelLogin', {
    id: 'TabPanelLogin',
    extend: 'Ext.panel.Panel',

    title: 'Login',
    html: 'Welcome please login',
//
//    items: [
//        {xtype: 'panel', title: 'bbb', html: 'test'}
//    ],

    constructor: function(){
        this.callParent(arguments);
    },

    initComponent: function(){
        this.callParent(arguments);
        this.on('added', this.deploy, this);
    },

    deploy: function(){
        var request = Blogkit.util.TemplateManager.requestTemplate('login.main');
        request.done(Ext.bind(this.installTemplate, this));
    },

    installTemplate: function(template){
        this.update(template);
    }
});
