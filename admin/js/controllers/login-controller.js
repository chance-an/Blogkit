/**
 * User: anch
 * Date: 2/19/12
 * Time: 3:46 AM
 */

(function(){
    'use strict';

    BlogKit.namespace('Admin.Controller');

    Admin.Controller.Login = Admin.Controller.AbstractController.extend({
        name: 'login',
        _view: null,

        initialize: function(){
            this._view = new Admin.View.Login();
        },

        'user_default': function(){
            _d('Enter Login:default');

            return this._view.render();
        },

        afterRender: function(){
            getApplication().getNavigationBar().activate('login');
        }
    });

})();

