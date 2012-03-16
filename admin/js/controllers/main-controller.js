/**
 * User: anch
 * Date: 2/19/12
 * Time: 3:46 AM
 */

(function(){
    'use strict';

    BlogKit.namespace('Admin.Controller');

    Admin.Controller.Main = Admin.Controller.AbstractController.extend({
        _view: null,

        initialize: function(){
            this['test'] = new Date();
        },

        'default': function(){
            _d('Enter Main:default');

            return this.checkSessionValid().pipe(_.bind(function(isValid){
                _d('Dashboard Controller Session:' + isValid);

                if(!isValid){
                    return $.Deferred().reject();
                }

                this._view = new Admin.View.Dashboard();

                return this._view.render().pipe(_.bind(function(){
                    var application = getApplication();
                    var sessionModel = application.sessionModel;
                    this._view.setSessionModel(application.sessionModel); // bind model to view

                    sessionModel.loadUserData(); //update model. (will trigger view's listener)
                }, this));

            }, this));

        }

    });

})();

