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
        _controller: null,

        initialize: function(controller){
            this._controller = controller;
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

        _showArticles: (function(){
            var mutex = false;
            var processing = false;
            var queued_execution = 0;
            return function(){
                if(mutex){
                    mutex = false;
                    return (new $.Deferred()).resolve();
                }
                if(processing){
                    queued_execution++;
                    return (new $.Deferred()).resolve();
                }
                var application = getApplication();

                var deferred = new $.Deferred();
                processing = true;
                BlogKit.util.TemplateManager.requestTemplate('articles.article-row').pipe(function(template){
                    var $articlesList = $('#articlesList');
                    $articlesList.empty(); //clear the target area first

                    template = _.template(template);
                    var index = 0;
                    var maxHeight = $articlesList.closest('.filling').height();
                    var iteration = function(){
                        if(index >= this._articlesCollection.length){
                            finalize(); return;
                        }

                        //play a trick to show as much as possible without using css overflow
                        var height = $articlesList.height();
                        if( height > maxHeight){
                            $articlesList.children().last().remove();
                            finalize(); return;
                        }

                        //or otherwise, add an article model
                        var articleModel = this._articlesCollection.at(index);
                        $articlesList.append(
                            template(articleModel.attributes)
                        );
                        var $articleRow = $articlesList.children().last();
                        $articleRow.find('a').attr('href', application.getActionUrl(
                            this._controller.name + '/edit/' + articleModel.get('id')));
                        index++;
                        setTimeout(iteration, 10); //call next iteration after 1 ms, so the UI could get redrawn
                    }.bind(this);

                    var finalize = function(){
                        processing = false;
                        mutex = true;
                        BlogKitUI.invalidateUI(this._contentArea);
                        if(queued_execution){
                            queued_execution--;
                            this._showArticles();
                        }
                        deferred.resolve();
                    }.bind(this);

                    setTimeout(iteration, 10);

                }.bind(this));

                return deferred;
            }
        }()),

        Events:{
            resize: function(_view){
                _view._showArticles();
            },

            'layout-finished' : function(_view){
                _view._showArticles();
            }
        }

    });

    Admin.View.Articles.Edit = Backbone.View.extend({
        _contentArea: null,
        _article: null,
        _controller: null,

        initialize: function(controller){
            this._controller = controller;
        },

        render: function(){
            var application = getApplication();
            var baseView = application.baseView;

            return baseView.turnPageToTemplate('articles.edit').pipe(_.bind(function(params){
                var element = params[1];
                this._contentArea =  element[0];
            }, this));
        }
    });
})();
