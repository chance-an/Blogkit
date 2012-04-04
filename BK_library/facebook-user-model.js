/**
 * User: anch
 * Date: 2/24/12
 * Time: 1:21 AM
 */

(function(){
    BlogKit.namespace('BlogKit.Model');

    BlogKit.Model.FreshBookUser = Backbone.Model.extend({
        _userData: null,

        defaults: {
            "userID": null,
            "username": null,
            "profilePicture": null
        },

        initialize: function(){
            this._userData = null;

        },

        sync: function(method, model, options){
            options = options || {success: $.noop, error: $.noop};
            if( method != 'read'){
                options.error(model, 'unimplemented');
                return false;
            }

            var attributes = {};

            var profile_id = model.get('userID');
            var deferred = $.Deferred();
            //1. get profile basic information
            FB.api('/' + profile_id, _.bind(function(response){
                model._userData = response;
                attributes['username'] = model._userData['first_name'] + ' ' + model._userData['last_name'];
                attributes['userid'] = model._userData['id'];
                deferred.resolve();
            }, this));

            //2. chain the deferred objec to obtain profile picture url
            return deferred.pipe(function(){
                var deferred = new $.Deferred();
                FB.api('/' + profile_id + '/picture?type=large', _.bind(function(response){
                    attributes['profilePicture'] = response;
                    deferred.resolve(response);
                }, this));
                return deferred;
            }).pipe(function(value){
                //3 chain the chained deferred object to trigger `success` callback
                model.set(attributes);
                options.success(model, value);
                return value;
            }, function(){
                //4 trigger the 'error' callback when error occurs
                options.error(model, 'pullling date from facebook failed');
            })
        }
    });
})();