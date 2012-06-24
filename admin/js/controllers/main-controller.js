/**
 * User: anch
 * Date: 2/19/12
 * Time: 3:46 AM
 */

(function(){
    'use strict';

    BlogKit.namespace('Admin.Controller');

    Admin.Controller.Main = Admin.Controller.AbstractController.extend({
        name: 'dashboard',
        _view: null,

        initialize: function(){
            this['test'] = new Date();
            this._view = new Admin.View.Dashboard();
        },

        'user_default': function(){
            _d('Enter Main:default');

            return this._view.render().pipe(_.bind(function(){
                this._view.setSessionModel(getApplication().sessionModel); // bind model to view
                this._view.updateUserInfo();
                this._getLatestArticles();
            }, this));

        },

        _getLatestArticles: function(){
            if( !this._view._articlesList ){

                this._view.setArticleCollection( new BlogKit.Collection.Articles() );
            }
            return this._view._articlesList.fetch();
        },

        afterRender: function(){
            getApplication().getNavigationBar().activate('main');
        }

    });

})();

