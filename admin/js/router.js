/**
 * User: anch
 * Date: 2/18/12
 * Time: 1:24 PM
 */

(function (){
    'use strict';
    BlogKit.namespace('Admin');

    var currentActiveController = null;

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
            controller['default'].apply(controller, arguments).done(
                function(){
                    currentActiveController = controller.classId;
                }
            );
        },

        login: function(){
            var controller = new Admin.Controller.Login();
            controller['default']().done(
                function(){
                    currentActiveController = controller.classId;
                }
            );
        },

        isControllerActive: function(classId){
            return currentActiveController == classId;
        }
    })

})();