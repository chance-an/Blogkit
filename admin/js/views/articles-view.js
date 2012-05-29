/**
 * User: anch
 * Date: 3/3/12
 * Time: 2:44 AM
 */

(function(){
    'use strict';

    BlogKit.namespace('Admin.View');

    Admin.View.Articles = Backbone.View.extend({
        _contentArea: null,

        initialize: function(){
        },

        render: function(){
            var application = getApplication();
            var baseView = application.baseView;

            return baseView.turnPageToTemplate('articles.main').pipe(_.bind(function(params){
                var element = params[1];
                this._contentArea =  element[0];
                BlogKitUI.invalidateUI();
            }, this));
        }
    });
})();
