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
        _articlesList: null,

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

        setArticleCollection: function(articleCollection){
            this._articlesList = articleCollection;
            this._articlesList.bind('reset', this.showArticles, this);
        },

        updateUserInfo: function(){
            if( !$.contains(this._contentArea, this.el) ){
                return;
            }

            //TODO Temporary logic
            $('#dashboard-view-user-profile').html(
                this._userModel.get('username')
            );

            $('#dashboard-view-user-picture').html(
                '<img src="' + this._userModel.get('profilePicture') + '" />'
            );
        },

        showArticles: function(){
            BlogKit.util.TemplateManager.requestTemplate('dashboard.articles-list').done(_.bind(function(template){
                $('#dashboard-articles-list').html(template);

                var $template = $('#dashboard-articles-list .data-row').remove();
                var $tbody = $('#dashboard-articles-list tbody');
                if(this._articlesList){
                    this._articlesList.each(function(model){
                        var $row = $template.clone();
                        $row.find('.date').html(new Date());
                        $row.find('.title').html(model.get('title'));
                        $tbody.append($row);
                    }, this)
                }
            }, this))

        }
    });
})();
