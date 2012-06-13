/**
 * User: anch
 * Date: 2/19/12
 * Time: 3:46 AM
 */

(function(){
    'use strict';

    BlogKit.namespace('Admin.Controller');

    Admin.Controller.Articles = Admin.Controller.AbstractController.extend({
        _view: null,

        initialize: function(){
        },

        'default': function(){
            _d('Enter Articles:default');

            return this.list();
        },

        list: function(){
            this._view = new Admin.View.Articles.List();

            var articles = new BlogKit.Collection.Articles();
            this._view.setArticlesCollection( articles  );


            return this._view.render().pipe(function(){
                articles.fetch();
            }.bind(this));
        }


    });

})();

