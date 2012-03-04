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
            if(!this.checkSessionValid()){
                return false;
            }

        }
    });

})();

