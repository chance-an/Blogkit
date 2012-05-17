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

(function (){
    'use strict';


    function BlogKitUI(){
        return {
            invalidateUI: function(){
                resizeAdjustment();
            }
        }
    }

    function initialize(){
        bindEvents();
    }

    function bindEvents(){
        $(window).on('resize', _.debounce(resizeAdjustment, 100));
    }

    function resizeAdjustment(){
        _d('triggered');
        //1. deal with fill-to-parent
        $('.fill-container').each(function(index, element){
            var $container = $(element);
            var $filling = $container.find('.filling');
            if($filling.length != 1){
                return;
            }
            var queryResults = $container.find('> .docked-top, > .dock-bottom');
            if( queryResults.length != 0 ){
                var $dockTop = $container.find('> .docked-top');
                if($dockTop.length != 0){
                    $dockTop.css('float', 'none');

                    $dockTop.detach();
                }

            }else{
                queryResults = $container.find('> .docked-left, > .dock-right');
                if(queryResults.length != 0){
                    //TODO
                }
            }
        });

        //2. deal with vertical-alignment
        $('.vertical-center > .inner-container').each(function(index, element){
            var $element = $(element);
            var height = parseInt($element.height());
            $element.height(height).css('margin-top', -height/2);
        })
    }

    $(document).ready(initialize);

    window.BlogKitUI = BlogKitUI();
})();
