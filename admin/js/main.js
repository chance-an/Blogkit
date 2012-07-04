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
            this._setupBasic(),
            this._setupCKEditor()
        ];
        $.when.apply(null, signals).done(function(){
            Backbone.history.start()
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
            this.sessionModel = new BlogKit.Model.Session();

            request = request.pipe(function(){
                //create primary navigation bar
                this.primaryNavBarView = new Admin.View.NavBar({
                    el: $(this.baseView.el).find('#mainNavBar')
                });
                //associate `baseView` with `primaryNavBarView`
                this.baseView.setNavBarView(this.primaryNavBarView);

                return this.primaryNavBarView.render();
            }.bind(this));


            return request;
        },

        _setupCKEditor: function(){
            window['CKEDITOR_BASEPATH'] = this._getRootURL() + '../3rd_party/ckeditor/';

            return (new $.Deferred()).resolve();
        },

        getRouter: function(){
            return this.router;
        },

        getSession: function(){
            return this.sessionModel;
        },

        /**
         *
         * @return Admin.View.NavBar
         */
        getNavigationBar: function(){
            return this.primaryNavBarView;
        },

        getActionUrl: function(actionHash){
            return this._getRootURL() + '#' + actionHash;
        },


        loadCKEditor: function(){
            if (typeof CKEDITOR != 'undefined'){
                return (new $.Deferred()).resolve();
            }

            return $.ajax({
                url: this._getRootURL() + '../3rd_party/ckeditor/ckeditor.js',
                dataType: "script",
                cache: true
            });
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