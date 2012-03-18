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

        fetch: function(options){
            options = options || {success: $.noop, error: $.noop};

            var deferred = $.Deferred(), deferred1 = $.Deferred();
            var profile_id = this.get('userID');
            if(!profile_id){
                return deferred.reject();
            }

            FB.api('/' + profile_id, _.bind(function(response){
                this._userData = response;
                this.set({'username': this._userData['first_name'] + ' ' + this._userData['last_name']}, {silent: true});
                this.set({'userid': this._userData['id']}, {silent: true});
                deferred.resolve();
            }, this));

            deferred.done(_.bind(function(){
                FB.api('/' + profile_id + '/picture?type=large', _.bind(function(response){
                    this.set({'profilePicture': response}, {silent: true});
                    deferred1.resolve();
                }, this));
            }, this));

            return deferred1.pipe(
                /*doneFilter*/_.bind(function(message){
                    options.success(this, message);
                    this.trigger('change');
                }, this),
                /*failFilter*/_.bind(function(cause){
                    options.error(this, cause);
                    this.trigger('error');
                }, this)
            );
        }
    });
})();