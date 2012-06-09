/**
 * User: anch
 * Date: 2/18/12
 * Time: 1:24 PM
 */

(function (){
    'use strict';
    BlogKit.namespace('Admin');

    var currentActiveController = null;
    var currentInvokedAction = null;

    function _checkEvent(route){
        currentInvokedAction = route.replace(/^route:/i, '');
        currentInvokedAction  = currentInvokedAction.match(/^[a-z_]+/i)[0];
    }

    Admin.Router = Backbone.Router.extend({
        _application: null,

        initialize: function(application){
            this._application = application;
            this.bind('all', _checkEvent);
        },

        routes: {
            "" : 'main',
            "dashboard" : 'main',
            "login" : 'login',
            "article" : 'articles'
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

        getCurrentInvokedAction: function(){
            return currentInvokedAction;
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