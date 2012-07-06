/**
 * User: anch
 * Date: 3/3/12
 * Time: 2:44 AM
 */

(function(){
    'use strict';

    var uiEventBound = false;

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
                if(!uiEventBound){
                    uiEventBound = true;
                    $(window).bind('layout', (function(_view){
                        return function(){
                            _view.Events['layout-finished'].apply(this, [_view].concat(arguments));
                            //so this function still receive event issuer as `this` pointer,
                            // and also receives the view object for reference
                        };
                    })(this));
                }
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
                    _d('queued');
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
                        setTimeout(iteration, 10); //call next iteration after 10 ms, so the UI could get redrawn
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
        _ckeditorReady: null,
        _lastEditorHeight: 0,
        _initializeSignal: null,

        initialize: function(controller){
            this._controller = controller;
            this._ckeditorReady = new $.Deferred();
            this._initializeSignal = new $.Deferred();
        },

        render: function(){
            var application = getApplication();
            var baseView = application.baseView;

            var uiReady = baseView.turnPageToTemplate('articles.edit').pipe(_.bind(function(params){
                var element = params[1];
                this._contentArea =  element[0];

            }, this));

            $.when(uiReady, this._initializeSignal).done(
                this.bindEvents.bind(this)
            );

            return uiReady;
        },

        bindEvents: function(){
            var $contentArea = $(this._contentArea);
            $.each([
                ['click', 'input[type="submit"]', 'save']
            ], function(i, e){
                $contentArea.find(e[1]).on(e[0], this.Events[e[2]].bind(this));
            }.bind(this));
        },

        renderModel: function(){
            var $contentArea = $(this._contentArea);
            $contentArea.find('#article-title').html(this._article.get('title'));
            $contentArea.find('#article-content').html(this._article.get('content'));

            return this.redrawCKEditor().done(function(){
                this._initializeSignal.resolve();
            }.bind(this));
        },

        setArticle: function(articleModel){
            this._article = articleModel;
            this._article.bind('read', this.renderModel.bind(this));
        },

        redrawCKEditor: function(){
            return getApplication().loadCKEditor().pipe(function(){
                var deferred = new $.Deferred();
                if(CKEDITOR.instances['article-content']){
                    CKEDITOR.instances['article-content'].on('destroy', _.once(function(){
                        $('#cke_article-content').remove();
                        deferred.resolve();
                    }));
                    CKEDITOR.instances['article-content'].destroy(true);
                }else{
                    deferred.resolve();
                }
                return deferred;
            }).pipe(function(){
                this._ckeditorReady = new $.Deferred();

                CKEDITOR.replace('article-content', {
                    customConfig : ''
                }).on('instanceReady', function(){
                    this._ckeditorReady.resolve();
                }.bind(this));

                return this._ckeditorReady;
            }.bind(this))
            .pipe(function(){
                //adjust size if window is resized;
                var closure = {
                    id : CKEDITOR.instances['article-content'].id
                };

                var handler = (function(c, view){
                    return function(){
                        if(!CKEDITOR.instances['article-content'] || CKEDITOR.instances['article-content'].id != c.id ||
                            $('#cke_article-content').length == 0){
                            //unload event, since there might be other handler attached somewhere else
                            $(getApplication().baseView).off('afterResize', c.handler);
                            return (new $.Deferred()).reject();
                        }
                        //else, launch the real event handler
                        view.Events['adjustCKEditorSize'].apply(view, arguments);
                    }
                })(closure, this);
                closure.handler = handler;
                $(getApplication().baseView).on('afterResize', handler);
                this.Events['adjustCKEditorSize'].apply(this, arguments);
            }.bind(this));

        },

        Events: {
            adjustCKEditorSize:_.throttle(function(){
                return function(){
                    var $textarea = $(this._contentArea).find('#article-content');
                    var $container = $textarea.parent();
                    var $ui = $container.children('#cke_article-content').hide();
                    $textarea.css('visibility', 'visible').show();

                    var newHeight = $container.height();
                    if( newHeight != this._lastEditorHeight){
                        this._lastEditorHeight = newHeight;
                        var width = $container.width();
                        var fix = function(){
                            CKEDITOR.instances['article-content'].removeListener('resize', fix); //1 time only
                            var diff = $('#cke_article-content').height() - newHeight;
                            CKEDITOR.instances['article-content'].resize(width, newHeight - diff);
                        };

                        CKEDITOR.instances['article-content'].on('resize', fix);
                        CKEDITOR.instances['article-content'].resize(width, newHeight);
                    }

                    $ui.show();
                    $textarea.css('visibility', 'hidden').hide();
                }
            }(), 50),

            save: function(){
                _d('save');
            }
        }
    });
})();
