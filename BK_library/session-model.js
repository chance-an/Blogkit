/**
 * User: anch
 * Date: 2/24/12
 * Time: 1:21 AM
 */

(function(){
    BlogKit.namespace('BlogKit.Model');

    BlogKit.Model.Session = Backbone.Model.extend({
        _user: null,

        defaults:{
            facebook_access_token: null
        },

        initialize: function(){
            this._user = new BlogKit.Model.FreshBookUser();
        },

        valid: function(callback) {
            //TODO need caching Facebook call results
            var signal = new $.Deferred();

            if(callback && typeof callback === 'function'){
                signal.done(callback);
            }

            FB.getLoginStatus(_.bind(function(response){
                var isLoggedIn = response.status === 'connected';
                if( isLoggedIn ){
                    this.set({facebook_access_token: response.authResponse.accessToken});
                    this.loadUser(response.authResponse.userID).always(function(){
                        signal.resolve(true);
                    });
                }else{
                    signal.resolve(false);
                }
            }, this));

            return signal;
        },

        getUser: function(){
            return this._user;
        },

        loadUser: function(userID){
            var deferred = $.Deferred();
            this._user.set({userID: userID}, {silent:true});
            this._user.fetch({
                success: function(model, response){
                    deferred.resolve(model);
                },
                error: function(model, response){
                    deferred.reject(response);
                }
            });
            return deferred;
        }
    });
})();