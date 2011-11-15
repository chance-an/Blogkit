/**
 * User: anch
 * Date: 10/28/11
 * Time: 12:55 AM
 */
'use strict';

Ext.namespace('BKAdmin.layout');
Ext.Loader.setPath('BKAdmin', './js');

Ext.application({
    name: 'BKAdmin',

    appFolder: 'js',

    controllers : [
        'Login'
    ],

    launch: function() {
        Blogkit.util.TemplateManager.initialize('template');

        Ext.create('BKAdmin.view.Viewport');


    }
});

