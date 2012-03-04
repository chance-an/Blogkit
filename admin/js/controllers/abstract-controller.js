/**
 * User: anch
 * Date: 2/25/12
 * Time: 11:11 PM
 */
(function(){
    'use strict';

    BlogKit.namespace('Admin.Controller');

    Admin.Controller.AbstractController = {
        checkSessionValid: function(){
            var application = getApplication();
            var session = application.getSession();

            if(!session.valid()){
                _.defer(this.invokeLogin);
                return false;
            }
            return true;
        },

        invokeLogin: function(){
            var application = getApplication();
            var router = application.getRouter();

            router.navigate('login', {trigger: true});
        }


    };


    Admin.Controller.AbstractController.extend = function(properties){
        //get around of singleton inheritance issue by using mixin
        return BlogKit.Controller.extend(_.extend(Admin.Controller.AbstractController, properties));
    }

})();
