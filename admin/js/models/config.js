/**
 * User: anch
 * Date: 3/15/12
 * Time: 11:30 PM
 */

(function (){
    'use strict';
    BlogKit.namespace('Admin.Model');


    Admin.Model.Config = (function(){
        var _instance = null;

        function create(){
            if( _instance == null){
                _instance = new Config();
            }
            return _instance;
        }

        function Config(){

        }

        _.extend(Config.prototype, {
            TABS: {
                logged_in : [
                    ['login', 'Log off', '#login'],
                    ['main', 'Dashboard', '#dashboard'],
                    ['articles', 'Articles', '#articles']
                ]
            }
        });

        return create;
    })();

})();
