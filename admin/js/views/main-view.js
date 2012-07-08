/**
 * User: anch
 * Date: 2/19/12
 * Time: 1:08 PM
 */

(function(){
    'use strict';

    BlogKit.namespace('Admin.View');

    Admin.View.Main = Backbone.View.extend({

        navBarView: null,
        mainArea: null,

        render: _.once(function(){
            var request = BlogKit.util.TemplateManager.requestTemplate('basic.main');
            var instance = this;
            return request.pipe(_.bind(function (template) {
                $('body').append(template);

                this.mainArea = $('#mainContent');

                this._setupEvent();
                return true;
            }, this));
        }),

        turnPageToTemplate : function(templateName){
            var request = BlogKit.util.TemplateManager.requestTemplate(templateName);
            return request.pipe(_.bind(function(template){
                this.mainArea.html(template);

                return [template, this.mainArea]; // pass different parameters to relaying deferred object
            }, this));
        },

        getMainArea: function(){
            return this.mainArea;
        },

        _setupEvent: _.once(function(){
            var func = _.debounce(_.bind(this.resize, this));
            $(window).resize( func );

            $('.free-edit').livequery(function(){
                $(this).freeEdit();
            });
            func();
        }),

        setNavBarView: function(navBarView){
            if(this.navBarView ){
                $( this.navBarView.el).off('afterRender');
            }
            this.navBarView = navBarView;
            $(this.navBarView.el).on('afterRender', _.bind(this.resize, this));
        },

        resize: function(){
            var $window = $(window);
            var $mainTabPanelArea = $('#mainTabPanelArea');

            var height = $window.height() - $('#header').collapsedHeight() - $('#footer').collapsedHeight();
            $mainTabPanelArea .height(height);
            //adjust height
            var newHeight = $mainTabPanelArea.collapsedHeight();
            height-= newHeight - height;
            $mainTabPanelArea .height(height);

            //resize dependent
            this._resizeMainPanel($mainTabPanelArea, height);

            //trigger `after-resize` event, so interested subscriber will be notified
            $(this).trigger('afterResize');
        },

        _resizeMainPanel: function($mainTabPanelArea, height){
            var $navBar = $mainTabPanelArea.find('.nav-tabs');
            var paddingTop= parseInt($mainTabPanelArea.css('paddingTop'));
            var paddingBottom = parseInt($mainTabPanelArea.css('paddingTop'));
            var navBarHeight = $navBar.collapsedHeight();

            height = height - paddingTop - paddingBottom - navBarHeight;
            $navBar.next().height(height);
        }
    });
}());
