/**
 * User: anch
 * Date: 10/28/11
 * Time: 12:55 AM
 */
Ext.application({
    name: 'BKAdmin',

    appFolder: 'js',

    controllers : [
        'Login'
    ],

    launch: function() {
        Ext.create('Ext.container.Viewport', {
            layout: 'fit',
            items: [
                {
                    xtype: 'panel',
                    title: 'Users',
                    html : 'List of users will go here'
                }
            ]
        });
    }
});

