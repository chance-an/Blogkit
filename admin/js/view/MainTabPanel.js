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


    layout: 'fit',
    plain: true,

    items:[
        {title:  'README', html: 'test'}
    ],

    constructor: function(){
        this.callParent(arguments);
        return this;
    },

    initComponent: function(){
        this.callParent(arguments);
        this.on('resize', this.Events.resize, this);
    },

    Events: {
        resize: function(){
            var panels = this.query('>panel');
            $.each(panels, function(index, panel){
                var element = panel.getEl();
                if(!element){
                    return;
                }
                panel.setHeight($(element.dom).parent().height());
            });
        }
    }
});
