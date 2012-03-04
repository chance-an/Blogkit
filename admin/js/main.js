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

        //wait for the following signals before start
        var signals = [
            BlogKit.ready(),
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
        primaryNavBarView: null,

        sessionModel: null,


        _getRootURL: function(){
            //TODO Find a way to better retrieve this information
            return '/admin/';
        },

        _setupBasic: function(){
            this.baseView = new Admin.View.Main({
                el: 'body'
            });

            var request = this.baseView.render();
            this.sessionModel = new Admin.Model.Session();

            request = request.pipe(function(){
                //create primary navigation bar
                this.primaryNavBarView = new Admin.View.NavBar({
                    el: $(this.baseView.el).find('#mainNavBar')
                });
                //associate `baseView` with `primaryNavBarView`
                this.baseView.setNavBarView(this.primaryNavBarView);

                //add first tab
                this.primaryNavBarView.put(new Admin.View.NavBar.TabEntry(
                    __('Login'), 'login'
                ) );

                return this.primaryNavBarView.render();
            }.bind(this));

            return request;
        },

        getRouter: function(){
            return this.router;
        },

        getSession: function(){
            return this.sessionModel;
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