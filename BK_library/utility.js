/**
 * User: anch
 * Date: 11/12/11
 * Time: 9:32 PM
 */

BlogKit.namespace('BlogKit.util');

BlogKit.util.TemplateManager = (function(){
    var _path = null;
    var _templateCache = {};

    var _$uiIframe = null;
    var _iframeDocument = null;

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
        var url = _path + '/' + groupName + '.' + 'html';

        //TODO option
        url+= '?cache=' + Math.random() * 10000;
        var request = $.ajax(url, {
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
        _iframeDocument.open();
        _iframeDocument.write(content);
        _iframeDocument.close();
        _templateCache[groupName] = {};

        $(_iframeDocument).find('[template]').each(function(index, elem){
            var $elem = $(elem);
            var templateName = $elem.attr('template');
            _templateCache[groupName][templateName] = $elem.html();
        });

    }

    return {
        initialize: function(path){
            var signal = $.Deferred();
           _path = path;
            _$uiIframe = $('<iframe id="_templateHookUp"></iframe>');

            _$uiIframe.load(function(){
                var document = _$uiIframe[0].contentWindow || _$uiIframe[0].contentDocument;
                if (document.document) {
                    document = document.document;
                }
                _iframeDocument = document;
                signal.resolve();
            });

            _$uiIframe.appendTo('body');

            return signal;

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


