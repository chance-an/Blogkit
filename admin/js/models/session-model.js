/**
 * User: anch
 * Date: 2/24/12
 * Time: 1:21 AM
 */

(function(){
    BlogKit.namespace('Admin.Model');

    Admin.Model.Session = Backbone.Model.extend({
        _userData: null,
        _userProfilePictureLocation: null,

        valid: function(callback) {
            var signal = new $.Deferred();

            if(callback && typeof callback === 'function'){
                signal.done(callback);
            }

            FB.getLoginStatus(function(response){
                signal.resolve(response.status === 'connected');
            });

            return signal;
        },

        getUserName: function(async){
            return this._getUserDataCommon(function(){
                return this._userData['first_name'] + ' ' + this._userData['last_name'];
            }, async);
        },

        getUserProfilePicture: function(){
            return '<img src="'+ this._userProfilePictureLocation+'" class="profile-picture"/>';
        },

        _getUserDataCommon: function(retrievalFunction, async){

            if(async == undefined){
                async = false;
            }

            retrievalFunction = _.bind(retrievalFunction, this);
            if(!async){
                return retrievalFunction();
            }
            if(!this._userData){
                return this.loadUserData().pipe(function(){
                    return retrievalFunction();
                });
            }else{
                return $.Deferred().resolve(retrievalFunction());
            }

        },

        loadUserData: function(){
            var deferred = $.Deferred(), deferred1 = $.Deferred();
            FB.api('/me', _.bind(function(response){
                this._userData = response;
                deferred.resolve();
            }, this));

            FB.api('/me/picture?type=large', _.bind(function(response){
                this._userProfilePictureLocation = response;
                deferred1.resolve();
            }, this));

            return $.when(deferred, deferred1).pipe(_.bind(function(){
                this.trigger('user-data-arrived');
            }, this));
        }
    });
})();