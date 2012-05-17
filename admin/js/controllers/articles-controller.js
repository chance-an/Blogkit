/**
 * User: anch
 * Date: 2/19/12
 * Time: 3:46 AM
 */

(function(){
    'use strict';

    BlogKit.namespace('Admin.Controller');

    Admin.Controller.Articles = Admin.Controller.AbstractController.extend({
        _view: null,

        initialize: function(){
            this._view = new Admin.View.Articles();
        },

        'default': function(){
            _d('Enter Articles:default');

            return this._view.render();
        }
    });

})();

