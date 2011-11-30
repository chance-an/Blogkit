/**
 * User: anch
 * Date: 11/30/11
 * Time: 2:23 AM
 */
Ext.define('BKAdmin.view.TabPanelLogin', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.TabPanelLogin',

    title: 'Login',
    html: 'Welcome please login',

    constructor: function(){
        this.callParent(arguments);
    }
});
