/**
 * User: anch
 * Date: 11/18/11
 * Time: 3:55 AM
 */

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

       return result;
    };


})(jQuery);
