/**
 * User: anch
 * Date: 3/3/12
 * Time: 2:44 AM
 */

(function(){
    'use strict';

    BlogKit.namespace('Admin.View.Articles');

    Admin.View.Articles.List = Backbone.View.extend({
        _contentArea: null,
        _articlesCollection: null,

        initialize: function(){
        },

        render: function(){
            var application = getApplication();
            var baseView = application.baseView;

            return baseView.turnPageToTemplate('articles.main').pipe(_.bind(function(params){
                var element = params[1];
                this._contentArea =  element[0];
                BlogKitUI.invalidateUI();
                $(window).bind('layout', (function(_view){
                    return function(){
                        _view.Events['layout-finished'].apply(this, [_view].concat(arguments));
                        //so this function still receive event issuer as `this` pointer,
                        // and also receives the view object for reference
                    };
                })(this));
            }, this));
        },

        /**
         * store the articles collection and bind update handler to it.
         * @param collection ArticlesCollection
         */
        setArticlesCollection: function(collection){
            this._articlesCollection = collection;
            this._articlesCollection.bind('reset', this._showArticles, this);
        },

        _showArticles: function(){
            return BlogKit.util.TemplateManager.requestTemplate('articles.article-row').pipe(function(template){
                var $articlesList = $('#articlesList');
                $articlesList.empty(); //clear the target area first

                template = _.template(template);

                var maxHeight = $articlesList.closest('.filling').height();
                for(var i = 0, l = this._articlesCollection.length; i < l; i++){
                    var articleModel = this._articlesCollection.at(i);
                    $articlesList .append(
                        template(articleModel.attributes)
                    );

                    //play a trick to show as much as possible without using css overflow
                    if( $articlesList.height() >maxHeight ){
                        $articlesList.children().last().remove();
                        break;
                    }
                }

                BlogKitUI.invalidateUI(this._contentArea);

            }.bind(this));
        },

        Events:{
            resize: function(_view){
                _view._showArticles();
            },

            'layout-finished' : function(_view){
                _view._showArticles();
            }
        }

    });
})();
