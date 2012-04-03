/**
 * User: anch
 * Date: 3/3/12
 * Time: 2:44 AM
 */

(function(){
    'use strict';

    BlogKit.namespace('Admin.View');

    Admin.View.Dashboard = Backbone.View.extend({
        _contentArea: null,

        _sessionModel: null,
        _userModel: null,

        initialize: function(){
        },

        render: function(){
            var application = getApplication();
            var baseView = application.baseView;

            return baseView.turnPageToTemplate('dashboard.main').pipe(_.bind(function(params){
                var element = params[1];
                this._contentArea = element[0];
                this.$el =  $('#dashboard-view');
                this.el =  this.$el[0];
            }, this));
        },

        setSessionModel: function(model){
            this._sessionModel = model;
            this._userModel = this._sessionModel.getUser();

            this._userModel.bind('change', this.updateUserInfo, this);
        },

        updateUserInfo: function(){
            if( !$.contains(this._contentArea, this.el) ){
                return;
            }
            $('#dashboard-view-user-profile').html(
                this._userModel.get('username')
            );

            $('#dashboard-view-user-picture').html(
                '<img src="' + this._userModel.get('profilePicture') + '" />'
            );
        }
    });
})();
