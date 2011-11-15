/**
 * User: anch
 * Date: 11/12/11
 * Time: 9:32 PM
 */

Ext.namespace('Blogkit.util');

Blogkit.util.TemplateManager = (function(){
    var _path = null;
    var _templateCache = {};

    var _$uiIframe = null;
    var _$iframeDocument = null;

    function _parseRequest(request){
        if(typeof request == 'string'){
            request = request.split('.').slice(0, 2);
        }else{
            request = arguments;
        }
        return {
            group : request[0],
            template: request[1]
        };
    }

    function _downloadTemplate(groupName, signal){
        var request = $.ajax(_path + '/' + groupName + '.' + 'html', {
            type: 'GET'
        });

        request.done(function(data, textStatus, jqXHR){
            _installTemplate(groupName, data);
            signal.resolve();
        });

        request.fail(function(jqXHR, textStatus, errorThrown){
            Ext.Error.raise('template group ' + groupName + ' cannot be found!' );
            signal.reject(errorThrown);
        });
    }

    function _installTemplate(groupName, content){
        _$iframeDocument[0].write(content);
        _$iframeDocument[0].close();
        _templateCache[groupName] = {};

        _$iframeDocument.find('[template]').each(function(index, elem){
            var $elem = $(elem);
            var templateName = $elem.attr('template');
            _templateCache[groupName][templateName] = $elem.html();
        });

    }

    return {
        initialize: function(path){
           _path = path;
            _$uiIframe = $('<iframe id="_templateHookUp"/>').appendTo('body');
           _$iframeDocument = _$uiIframe.contents();

           var aaa = 1;
        },

        requestTemplate: function(template){
            var request = new $.Deferred();
            var templateID = _parseRequest(template);

            if ( typeof _templateCache[templateID.group] === 'undefined'){
                _downloadTemplate(templateID.group, request);
            }else{
                request.resolve();
            }

            //return a deferred object
            return request.pipe(function(nomatterwhat){
                return _templateCache[templateID.group][templateID.template];
            });
        }
    }
})();


