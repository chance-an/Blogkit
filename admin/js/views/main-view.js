/**
 * User: anch
 * Date: 2/19/12
 * Time: 1:08 PM
 */

(function(){
    'use strict';

    BlogKit.namespace('Admin.View');

    Admin.View.Main = Backbone.View.extend({
        render: _.once(function(){
            var request = BlogKit.util.TemplateManager.requestTemplate('basic.main');
            var instance = this;
            return request.pipe(function (template) {
                $('body').append(template);
                instance._setupEvent();
                return true;
            });
        }),

        _setupEvent: _.once(function(){
            var func = _.debounce(_.bind(this.resize, this));
            $(window).resize( func );
            func();
        }),

        resize: function(){
            var $window = $(window);
            var $mainTabPanelArea = $('#mainTabPanelArea');

            var height = $window.height() - $('#header').collapsedHeight() - $('#footer').collapsedHeight();
            $mainTabPanelArea .height(height);
            //adjust height
            var newHeight = $mainTabPanelArea.collapsedHeight();
            height-= newHeight - height;
            $mainTabPanelArea .height(height);
        }
    });
}());
