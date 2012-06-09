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

            router.navigate('login', {trigger: true, replace: true});
        },

        isActive: function(){
            var application = getApplication();
            var router = application.router;

            return router.isControllerActive(this.classId);
        },

        //default methods
        default: function(){
            var deferred = new $.Deferred();

            this.checkSessionValid().pipe(_.bind(function(isValid){
                if(!isValid){
                    deferred.reject();
                    return;
                }

                //active tab for the current controller
                deferred.done(function(){
                    var action = getApplication().getRouter().getCurrentInvokedAction();
                    getApplication().getNavigationBar().activate(action);
                });

                //if the child doesn't define 'default' method, then skip
                if(typeof this['_defaultChild'] == 'undefined'){
                    deferred.resolve.apply(this, arguments);
                    return;
                }

                //call child method
                var result = this['_defaultChild']();
                if(result['state'] && typeof result['state'] == 'function'){ //TODO need a better way to test if it's deferred
                    result.done(function(){
                        deferred.resolve.apply(this, arguments);
                    });
                    result.fail(function(){
                        deferred.reject.apply(this, arguments);
                    });
                }
            }, this));

            return deferred;
        }

    };

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


    Admin.Controller.AbstractController.extend = function(properties){
        //special handling of method override in inheritance
        var tmpAbstractControllerProperties = _.extend({}, Admin.Controller.AbstractController);
        _.each(['default'], function(v){
            if(v in properties){
                tmpAbstractControllerProperties['_' + v + 'Child'] = properties[v];
            }
        });

        //get around of singleton inheritance issue by using mixin
        return BlogKit.Controller.extend(_.extend(properties, tmpAbstractControllerProperties));
    }

})();
