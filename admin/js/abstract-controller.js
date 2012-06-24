/**
 * User: anch
 * Date: 2/25/12
 * Time: 11:11 PM
 */
(function(){
    'use strict';

    BlogKit.namespace('Admin.Controller');

    /**
     * The base controller class that provides common methods for the inheriting controllers
     * @type {*}
     */
    Admin.Controller.AbstractController = Backskin.Controller.extend({
        name: '__abstract_controller',
        checkSession: function(callback){
            _d('AbstractController check session');

            var application = getApplication();
            var session = application.getSession();
            var signal = session.valid().pipe(_.bind(function(isValid){
                if(!isValid){
                    _.defer(invokeLogin);
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
        }
    });

    //private functions (in closure)
    function addAllNavigationTabs(){
        var deferred = new $.Deferred();
        //test if admin user
        var navigationBar = getApplication().getNavigationBar();
        var config = new Admin.Model.Config();
        _.each(config['TABS']['logged_in'], function(entry){
            navigationBar.put(new Admin.View.NavBar.TabEntry(entry[0], __(entry[1]), entry[2]));
        });
        navigationBar.render();

        return deferred.resolve();
    }

    function invokeLogin(){
        var application = getApplication();
        var router = application.getRouter();

        router.navigate('login', {trigger: true, replace: true});
    }

})();
