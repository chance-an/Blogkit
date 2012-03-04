/**
 * User: anch
 * Date: 2/19/12
 * Time: 3:46 AM
 */

(function(){
    'use strict';

    BlogKit.namespace('Admin.Controller');

    Admin.Controller.Login = Admin.Controller.AbstractController.extend({
        _view: null,

        initialize: function(){
            this._view = new Admin.View.Login();
        },

        'default': function(){
            _d('Enter Login:default');

            this._view.render();
        }
    });

})();

