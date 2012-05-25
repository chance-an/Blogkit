/**
 * User: anch
 * Date: 2/24/12
 * Time: 1:34 AM
 */
(function(){
    'use strict';

    BlogKit.namespace('Admin.View');

    Admin.View.NavBar = Backbone.View.extend({
        tabs: [],

        initialize: function(){

        },

        render: function(){
            var request = BlogKit.util.TemplateManager.requestTemplate('components.navTab');
            request.pipe(function(template){
                var $el = $(this.el).empty();
                template = _.template(template); //compile template
                _.each(this.tabs, function(tab){
                    $el.append(template(tab));
                });
                $(this.el).trigger('afterRender');
            }.bind(this));

        },

        put: function(tabEntry){
            if( ! (tabEntry instanceof Admin.View.NavBar.TabEntry)
                /* or a tab with the same name exists*/
                || _.indexOf(_.pluck(this.tabs, 'name'), tabEntry['name']) != -1 ){
                return false;
            }
            this.tabs.push(tabEntry);
        }
    });

    _.extend(Admin.View.NavBar, {
        TabEntry: (function(){
            function TabEntry(name, title, link){
                this.name = name;
                this.title = title;
                this.link = link;
            }
            _.extend(TabEntry.prototype, {
                'name': null,
                'title': __('untitled'),
                'link' : ''
            });
            return TabEntry;
        })()
    })
})();