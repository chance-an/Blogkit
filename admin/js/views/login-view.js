/**
 * User: anch
 * Date: 3/3/12
 * Time: 2:44 AM
 */

(function(){
    'use strict';

    BlogKit.namespace('Admin.View');

    Admin.View.Login = Backbone.View.extend({
        _contentArea: null,

        initialize: function(){
            this.bindEvent();
        },

        render: function(){
            var application = getApplication();
            var baseView = application.baseView;

            baseView.turnPageToTemplate('login.main').pipe(_.bind(function(params){
                var element = params[1];
                this._contentArea =  element[0];
                FB.XFBML.parse(this._contentArea );
                this.resize();
                _d('login.main rendered');
            }, this));
        },

        bindEvent: function(){
            var baseView = getApplication().baseView;
            $(baseView).on('afterResize', _.bind(this.resize, this));
        },

        resize: function(){
            _d('resize');
            var contentArea = getApplication().baseView.mainArea;
            if(contentArea == null){
                return false;
            }
            var $contentArea = $(contentArea );
            var height = $contentArea .height() + parseInt($contentArea.css('padding-top'))
                + parseInt($contentArea.css('padding-bottom')) ;

            _d(height);

            $('#login-zone').height(height);

            //re-calculate special elements on this view whose dimension cannot be calculated automatically
            this._calculateDimension(contentArea);

        },

        _calculateDimension: function(contentArea){
            var $el = $(contentArea);
            //reset dimensions of 'inner-containers'
            $el.find('.inner-container').each(function(index, element){
                var $element = $(element);
                var height = parseInt($element.height());
                $element.height(height).css('margin-top', -height/2);
            })
        }
    });
})();
