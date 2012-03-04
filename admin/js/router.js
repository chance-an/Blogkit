/**
 * User: anch
 * Date: 2/18/12
 * Time: 1:24 PM
 */

(function (){
    'use strict';
    BlogKit.namespace('Admin');

    Admin.Router = Backbone.Router.extend({
        _application: null,

        initialize: function(application){
            this._application = application;
        },

        routes: {
            "" : 'main',
            "login" : 'login'
        },

        main: function(){
            var controller = new Admin.Controller.Main();
            controller['default'].apply(controller, arguments);
        },

        login: function(){
            var controller = new Admin.Controller.Login();
            controller['default']();
        }
    })

})();