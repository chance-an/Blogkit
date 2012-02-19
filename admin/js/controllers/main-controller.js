/**
 * User: anch
 * Date: 2/19/12
 * Time: 3:46 AM
 */

(function(){
    'use strict';

    BlogKit.namespace('Admin.Controller.Main');

    Admin.Controller.Main = BlogKit.Controller.extend({
        'default': function(){
            var result = $.Deferred();
            console.log(this._created);

            result.resolve();
            return result;
        }
    });

})();

