/**
 * User: anch
 * Date: 2/19/12
 * Time: 3:46 AM
 */

(function(){
    'use strict';

    BlogKit.namespace('Admin.Controller');

    Admin.Controller.Articles = Admin.Controller.AbstractController.extend({
        name: 'articles',

        _view: null,

        initialize: function(){
        },

        beforeFilter: function(){
        },

        'user_default': function(){
            _d('Enter Articles:default');

            return this.list();
        },

        user_list: function(){
            this._view = new Admin.View.Articles.List(this);

            var articles = new BlogKit.Collection.Articles();
            this._view.setArticlesCollection( articles  );


            return this._view.render().pipe(function(){
                articles.fetch();
            }.bind(this));
        },

        user_edit: function(article_id){
            this._view = new Admin.View.Articles.Edit(this);

            return this._view.render().pipe(function(){
                var article = new BlogKit.Model.Article({id: article_id});
                this._view.setArticle(article);

                article.fetch();
            }.bind(this));


        },

        afterRender: function(){
            getApplication().getNavigationBar().activate('articles');
        }
    });

})();

