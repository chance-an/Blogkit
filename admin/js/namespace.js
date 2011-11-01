/**
 * User: anch
 * Date: 10/29/11
 * Time: 3:29 AM
 */

(function(){

    var prefix = 'admin';

    if(typeof (window.Blogkit) === 'undefined'){
        window.Blogkit = {};
    }

    _.extend(Blogkit, {
        admin: {
            controller:{},
            model:{},
            view:{},
            registry: {}
        },

        helper: (function(){

            function Helper(){

            }

            _.extend(Helper.prototype, {

            });

            return new Helper();
        })()
    });
})();


