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
            "login" : 'login',
            "articles": 'articles'
        },

        main: function(){
            this._runDefaultMethod('Main');
        },

        login: function(){
            this._runDefaultMethod('Login');
        },

        articles: function(){
            this._runDefaultMethod('Articles');
        },

        isControllerActive: function(classId){
            return currentActiveController == classId;
        },

        _runDefaultMethod : function(controllerName){
            var controller = new Admin.Controller[controllerName]();
            controller['default']().done(
                function(){
                    currentActiveController = controller.classId;
                }
            );
        }
    })

})();