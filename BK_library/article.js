/**
 * User: anch
 * Date: 3/15/12
 * Time: 11:30 PM
 */

(function (){
    var sql = 1;
    'use strict';
    BlogKit.namespace('BlogKit.Model');

    BlogKit.Model.Article = Backbone.Model.extend({

        defaults: {

        },

        url: function(){
            return BlogKit.getAPIRoot() + '/article/' + this.get('id');
        }
    });

    BlogKit.namespace('BlogKit.Collection');
    BlogKit.Collection.Articles = Backbone.Collection.extend({
        model: BlogKit.Model.Article,

        url: function(){
            return BlogKit.getAPIRoot() + '/articles';
        },

        parse: function(response){
            return response.data;
        }
    })

})();
