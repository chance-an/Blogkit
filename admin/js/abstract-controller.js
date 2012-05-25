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
                }else{
                    return addAllNavigationTabs().pipe(function(){
                        return isValid; // isValid is True
                    });
                }
                return isValid; // isValid is False
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

    //private functions (in closure)
    function addAllNavigationTabs(){
        var deferred = new $.Deferred();
        //test if admin user
        var navigationBar = getApplication().getNavigationBar();
        var tabs = new Admin.Model.Config();
        _.each(tabs['TABS']['logged_in'], function(entry){
            navigationBar.put(new Admin.View.NavBar.TabEntry(entry[0], __(entry[1]), entry[2]));
        });
        navigationBar.render();

        return deferred.resolve();
    }


    Admin.Controller.AbstractController.extend = function(properties){
        //get around of singleton inheritance issue by using mixin
        return BlogKit.Controller.extend(_.extend(Admin.Controller.AbstractController, properties));
    }

})();
