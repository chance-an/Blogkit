// BlogKit Kernel files
// Copyright (c) 2012 Changsi An
//
// Permission is hereby granted, free of charge, to any person obtaining
// a copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to
// permit persons to whom the Software is furnished to do so, subject to
// the following conditions:
// 
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

/*--------------------------------------------------------------------------*/
(function(){
    'use strict';
    //todo check dependency
    var _apiRoot = null;

    var _facebookLoaded = new $.Deferred();

    function BlogKit () {
        return {
            namespace: function(namespaceString){
                var components = namespaceString.split('.');
                var node = window;
                for(var i = 0, l = components.length; i < l; i++){
                    if(node[components[i]] === undefined){
                        node[components[i]] = {};
                    }
                    node = node[components[i]];
                }
            },

            getAPIRoot: function(){
                if( _apiRoot == null ){
                    var fallbackValue = '/BK_library/api';
                    var src = _.filter($('script').map(function(index, entry){return $(entry).attr('src')}),
                        function(value){return value.match(/blogkit\.js$/) != null});
                    if(src.length != 1){
                        _apiRoot = fallbackValue;
                    }else{
                        src = src[0];
                        if(src.charAt(0) == '/'){ //start with `/`, absolute path
                            var path = window.location.protocol + '//' + ( window.location.host + '/' + src )
                                .replace(/\/{2,}/g, '/') ;
                        }else{ //relative path
                            path = window.location.href.replace(/\/[^\/]*$/, '') + '/' + src;
                        }
                        _apiRoot = path.replace(/blogkit\.js$/, 'api')
                    }
                }
                return _apiRoot;
            },

            facebookLoaded: function(func){
                if(func !== undefined && typeof func === 'function'){
                    _facebookLoaded.done(func);
                }
                return _facebookLoaded;
            },

            ready: function(func){
                var deferredObject = $.when(_facebookLoaded);
                if(func !== undefined && typeof func === 'function'){
                    deferredObject.done(func);
                }
                return deferredObject;
            },

            'Controller': (function(){
                function BaseController(){
                    this._created = (new Date()).getTime();
                }
                _.extend(BaseController.prototype, {
                    _created: null,
                    'default' : function(){}
                });

                BaseController.extend = function(properties){
                    var instance = undefined;
                    var klass = function Controller(){
                        if(instance !== undefined ){ //try to simulate Singleton
                            return instance;
                        }
                        BaseController.apply(this, arguments);
                        if(this['initialize'] !== undefined){
                            this['initialize'].apply(this, arguments);
                        }

                        instance = this;
                        return instance;
                    };

                    klass.prototype = new BaseController();
                    _.extend(klass.prototype, properties);

                    klass.prototype.constructor = klass;
                    klass.prototype.classId = _.uniqueId('controller_');

                    return klass;
                };
                return BaseController;
            })()
        }
    }

    function initialize(){
        initializeFacebook();
    }

    function initializeFacebook(){
        window.fbAsyncInit = function() {

            FB.init({
                appId      : '393416427339555', // App ID
                channelUrl : '//blogkit.dyndns-web.com/3rd_party/facebook/channel.html', // Channel File
                status     : true, // check login status
                cookie     : true, // enable cookies to allow the server to access the session
                xfbml      : true  // parse XFBML
            });

            // Additional initialization code here
            //notification
            _facebookLoaded.resolve((new Date()).getTime());
        };

        $('<div id="fb-root"></div>').prependTo('body');

        (function(d){
            var js, id = 'facebook-jssdk'; if (d.getElementById(id)) {return;}
            js = d.createElement('script'); js.id = id; js.async = true;
            js.src = "//connect.facebook.net/en_US/all.js";
            d.getElementsByTagName('head')[0].appendChild(js);
        }(document));
    }

    window.BlogKit = new BlogKit();
    window.__ = function(text){return text;};
    window._d = function(message){
        console.log(message);
    };
    window._e = function(message){
        console.log(message);
    };

    _.extend(Function.prototype, {
        bind: function(_this){
            return _.bind(this, _this);
        }
    });

    $(document).ready(initialize);
})();