/**
 * User: anch
 * Date: 10/28/11
 * Time: 12:55 AM
 */

'use strict';

Ext.Loader.setConfig({enabled:true});

Ext.namespace('BKAdmin.layout');
Ext.Loader.setPath('BKAdmin', './js');
//Ext.require('Ext.container.Viewport');

Ext.application({
    name: 'BKAdmin',

    appFolder: 'js',

    controllers : [
        'Login'
    ],

    launch: function() {
        Blogkit.util.TemplateManager.initialize('template');

        var ready = Ext.create('BKAdmin.view.Viewport');
        ready.done(Ext.bind(this.goToPage, this, ['Login']));
    },

    goToPage: function(page){
        var controller = this.getController(page);
        controller.start();
    }
});


