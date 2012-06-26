/**
 * User: anch
 * Date: 11/18/11
 * Time: 3:55 AM
 */

//calculate collapsed height
(function($) {

    $.fn.collapsedHeight = function( target ) {
        if(target === undefined){
            target = this;
        }
       //http://stackoverflow.com/questions/7909956/how-to-calculate-an-elements-height-considering-collapsed-margins
       var $wrapper = $('<div />'),
         $target = $(target);

       $wrapper.insertAfter($target);
       $target.appendTo($wrapper);
       $wrapper.css({
           borderTop: '1px solid transparent',
           borderBottom: '1px solid transparent'
       });
       var result = $wrapper.outerHeight() - 2;
       $target.insertAfter($wrapper);
       $wrapper.remove();

       return Math.max(result, $target.outerHeight());
    };


})(jQuery);

//layout manager

(function($){

    var pluginName = 'layout';

    var adjustLayout = _.debounce(function(){
        //clear event if the element is removed from dom tree
        if($(this).closest('html').length == 0){
            $(window).off('resize', $(this).data('resizeHandler'));
            return;
        }

        var data = this.data( pluginName );

        var containerHeight= this.collapsedHeight();
        var containerWidth= this.outerWidth();
        var centerRowHeight = containerHeight;

        if(data['top'].length!=0){
            centerRowHeight -= data['top'].collapsedHeight();
        }
        if(data['bottom'].length!=0){
            centerRowHeight -= data['bottom'].collapsedHeight();
        }

        $([data['left'], data['filling'], data['right']]).each(function(i, e){
            if(e.length==0){return;}
            var diff = _getValue(e.css('marginTop')) + _getValue(e.css('marginBottom')) +
                _getValue(e.css('borderTopWidth')) + _getValue(e.css('borderBottomWidth')) ;
            e.height(centerRowHeight - diff);
        });

        if(data['left'].length!=0){
            containerWidth -= data['left'].outerWidth(true);
        }

        if(data['right'].length!=0){
            containerWidth -= data['right'].outerWidth(true);
        }
        var e = data['filling'];
        var diff = _getValue(e.css('marginRight')) + _getValue(e.css('marginLeft')) +
            _getValue(e.css('borderLeftWidth')) + _getValue(e.css('borderRightWidth')) ;
        e.width(containerWidth - diff);

        setTimeout(function(){
            $(window).trigger('layout');
        }, 10);

    }, 100);

    function rearrange( $container ){
        var data = {
            top: $container.find('> .docked-top').detach(),
            bottom: $container.find('> .docked-bottom').detach(),
            left: $container.find('> .docked-left').detach(),
            right: $container.find('> .docked-right').detach(),
            filling: $container.find('> .filling').detach()
        };

        $container.data(pluginName, data);

        $.each(['top', 'left', 'filling', 'right', 'bottom'], function(i, v){
            data[v].appendTo($container);

        });
        adjustLayout.apply($container);
    }

    function _getValue(v){
        return parseFloat(v.replace('px$', '')) || 0;
    }

    var methods = {
        init: function(){
            this.find('.fill-container').andSelf().filter('.fill-container').each(function(index, element){
                var $element = $(element);
                rearrange( $element );
                var resizeHandler = (function($1){
                    return function(){
                        return adjustLayout.apply($1, arguments);
                    }
                })($element);
                $element.data('resizeHandler', resizeHandler);
                $(window).on('resize', resizeHandler);
            });

            return this;

        },

        established: function(){
            return !this.data(pluginName) == null;
        }
    };

    $.fn[pluginName] = function(method){

        if ( methods[method] ) {
            return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  method + ' does not exist on jQuery.layout' );
        }
    }

})(jQuery);
