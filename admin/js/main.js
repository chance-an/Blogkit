/**
 * User: anch
 * Date: 10/28/11
 * Time: 12:55 AM
 */
(function(){
    'use strict';

    BlogKit.namespace('Admin');
    var _application = null;

    /**
     * Classes
     */
    Admin.Application = function Application(){
        this.router = new Admin.Router(this);
        var rootURL = this._getRootURL();

        var signals = [
            BlogKit.util.TemplateManager.initialize(rootURL + 'template'),
            this._setupBasic()
        ];
        $.when.apply(null, signals).done(function(){
            Backbone.history.start({pushState:true, root: rootURL})
        });

    };
    _.extend(Admin.Application.prototype, {
        router: null,
        baseView: null,

        _getRootURL: function(){
            //TODO Find a way to better retrieve this information
            return '/admin/';
        },

        _setupBasic: function(){
            this.baseView = new Admin.View.Main({
                el: 'body'
            });

            var request = this.baseView.render();

            return request;
        }
    });

    /**
     * Procedures
     */
    function initialize(){
        _application = new Admin.Application();
    }

    window.getApplication = function(){
        return _application;
    };

    $(document).ready(initialize);
})();