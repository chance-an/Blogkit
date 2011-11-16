/**
 * User: anch
 * Date: 11/10/11
 * Time: 2:38 AM
 */

Ext.define('BKAdmin.view.MainTabPanel', {
    id: 'MainTabPanel',
    extend: 'Ext.tab.Panel',
    alias : 'widget.mainTabPanel',
    requires: ['BKAdmin.layout.Percentage'],


    title : 'Edit User',
    activeTab: 0,
    layout: 'percentage',

    items: [{
        title: 'Foo',
        html: 'aaa'
    }, {
        title: 'Bar',
        html: 'bbb',
        tabConfig: {
            title: 'Custom Title',
            tooltip: 'A button tooltip'
        }
    }],

    constructor: function(){
        this.callParent(arguments);
        return this;
    },

    initComponent: function(){
        this.on('beforerender', this.Events.beforeRender, this);
        this.on('render', this.Events.render, this);
        this.callParent(arguments);
    },

    Events: {
        beforeRender: function(){
            var aaa = 1;
            return true;
        },

        render: function(){
            var height = $(this.getEl().dom).parent().height();
            this.setHeight(height);
            return true;
        }
    }
});
