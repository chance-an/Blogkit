/**
 * User: anch
 * Date: 2/25/12
 * Time: 11:11 PM
 */
(function(){
    'use strict';

    BlogKit.namespace('Admin.Controller');

    Admin.Controller.AbstractController = {
        checkSessionValid: function(callback){
            var application = getApplication();
            var session = application.getSession();

            var signal = session.valid().pipe(_.bind(function(isValid){
                if(!isValid){
                    _.defer(this.invokeLogin);
                }
                return isValid;
            }, this));
            if(callback && typeof callback === 'function'){
                signal.done(callback);
            }
            return signal;
        },

        invokeLogin: function(){
            var application = getApplication();
            var router = application.getRouter();

            router.navigate('login', {trigger: true});
        },

        isActive: function(){
            var application = getApplication();
            var router = application.router;

            return router.isControllerActive(this.classId);
        }

    };


    Admin.Controller.AbstractController.extend = function(properties){
        //get around of singleton inheritance issue by using mixin
        return BlogKit.Controller.extend(_.extend(Admin.Controller.AbstractController, properties));
    }

})();
