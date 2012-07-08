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
        var originalDisplay = $target.css('display');
        $target.css('display', 'none');
        $wrapper.append(target.clone(false));
        $wrapper.css({
           borderTop: '1px solid transparent',
           borderBottom: '1px solid transparent'
        });
        var result = $wrapper.outerHeight() - 2;
        $wrapper.remove();
        $target.css('display', originalDisplay);

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

//free-edit
(function(){
    var pluginName = 'freeEdit';

    var methods = {
        init: function(){
            var $this = $(this);
            var inputDummy = createInputDummy();
            var freeEditAgent = new FreeEditAgent($this, inputDummy);

            $this.data(pluginName, freeEditAgent);
            inputDummy.data(pluginName, freeEditAgent);
            $this.after(inputDummy);

            freeEditAgent.update($this.text());

            $this.on('click', Events['edit']);
            inputDummy.on('blur', Events['update']);
            inputDummy.on('keypress', function(event){
                if(event.keyCode == 13){ //`enter` key
                    Events['update'].apply(this, arguments);
                }
            });
        }
    };

    $.fn[pluginName] = function(method){

        if ( methods[method] ) {
            return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  method + ' does not exist on jQuery.' + pluginName );
        }
    };


    function createInputDummy(){
        var $input = $('<input type="text"/>');
        $input.css({
            display: 'none',
            backgroundColor: 'transparent'
        });
        return $input;
    }


    function measure($element){
        //measure it in the auxiliary div
        var measure = $('#meausre');
        if(measure.length == 0){
            measure = $('<div id="measure"></div>');
            measure.css({
                position: 'absolute',
                visibility: 'hidden',
                top: 0,
                left: 0
            });
            $('body').append(measure);
        }

        $.each(['font-family', 'font-size', 'font-weight', 'line-height', 'font-style'], function(i, propertyName){
            measure.css(propertyName, $element.css(propertyName));
        });
        measure.html($element.html());
        return measure.width();
    }

    function FreeEditAgent($label, $input){
        this.$label = $label;
        this.$input = $input;
        this.value = $label.text();
    }

    FreeEditAgent.prototype = $.extend(FreeEditAgent.prototype, {
        update: function(text){
            this.value = text;
            this.$label.html(this.value.replace(/ /g, '&nbsp;') );
            this.$input.val(this.value);

            var instance = this;
            $.each(['font-family', 'font-size', 'font-weight', 'line-height', 'height',
                'padding-top','padding-right', 'padding-bottom', 'padding-left',
                'margin-top', 'margin-right', 'margin-bottom', 'margin-left'], function(i, propertyName){
                instance.$input.css(propertyName, instance.$label.css(propertyName));
            });

            this.$input.css('width', measure(this.$label));
        }
    });

    var Events = {
        'edit': function(){
            var $this = $(this);
            var agent = $(this).data(pluginName);
            agent.update($this.text());
            agent.$label.hide();
            agent.$input.show().focus();
        },

        'update': function(){
            var $this = $(this);
            var agent = $(this).data(pluginName);
            agent.update($this.val());
            agent.$input.hide();
            agent.$label.show().trigger('update', agent.value);
        }
    }

}());
