/**
 * User: anch
 * Date: 2/24/12
 * Time: 1:21 AM
 */

(function(){
    BlogKit.namespace('Admin.Model');

    Admin.Model.Session = Backbone.Model.extend({
        valid: function() {
            return false;
        }
    });
})();