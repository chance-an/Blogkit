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

            'Controller': (function(){
                function BaseController(){
                    this._created = (new Date()).getTime();
                }
                _.extend(BaseController.prototype, {
                    _created: null,
                    'default' : function(){}
                });

                BaseController.extend = function(properties){
                    var klass= function Controller(){
                        if(klass['_instance'] !== undefined ){ //try to simulate Singleton
                            return klass['_instance'];
                        }
                        BaseController.apply(this, arguments);
                        if(this['initialize'] !== undefined){
                            this['initialize'].apply(this, arguments);
                        }

                        klass['_instance'] = this;
                    };

                    klass.prototype = new BaseController();
                    _.extend(klass.prototype, properties);

                    klass.prototype.constructor = klass;

                    return klass;
                };
                return BaseController;
            })()
        }
    }

    window.BlogKit = new BlogKit();
})();