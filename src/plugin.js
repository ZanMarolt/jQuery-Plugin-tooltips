/*
 *  jquery-boilerplate - v4.0.0
 *  A jump-start for jQuery plugins development.
 *  http://jqueryboilerplate.com
 *
 *  Made by Zeno Rocha
 *  Under MIT License
 */
// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;( function( $, window, document, undefined ) {

    "use strict";

    // undefined is used here as the undefined global variable in ECMAScript 3 is
    // mutable (ie. it can be changed by someone else). undefined isn't really being
    // passed in so we can ensure the value of it is truly undefined. In ES5, undefined
    // can no longer be modified.

    // window and document are passed through as local variable rather than global
    // as this (slightly) quickens the resolution process and can be more efficiently
    // minified (especially when both are regularly referenced in your plugin).

    // Create the defaults once
    var pluginName = "popoverjs",
        defaults = {
            propertyName: "value"
        };

    // The actual plugin constructor
    function Plugin ( element, options ) {
        this.element = element;

        // jQuery has an extend method which merges the contents of two or
        // more objects, storing the result in the first object. The first object
        // is generally empty as we don't want to alter the default options for
        // future instances of the plugin
        this.settings = $.extend( {}, defaults, options );
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    // Avoid Plugin.prototype conflicts
    $.extend( Plugin.prototype, {
        init: function() {

            // Place initialization logic here
            // You already have access to the DOM element and
            // the options via the instance, e.g. this.element
            // and this.settings
            // you can add more functions like the one below and
            // call them like the example bellow

            $(this.element).css({
                textDecoration: 'underline',
                whiteSpace: 'nowrap'
            });


            $(this.element).on('mouseover', this.mouseOver.bind(this))
            $(this.element).on('mouseout', this.mouseOut.bind(this))
        },
        mouseOver:function(){

            var top = $(this.element).offset().top;
            var left = $(this.element).offset().left;

            var width = $(this.element).width();
            var height = $(this.element).height();
            
            var position = $(this.element).attr('position');
            
            var messages = [1,2];
            var message = [];
            
            var head = [];
            
            var finalAppendMsg = '';
            
            
            for(var i=1;i<messages.length+1;i++){
                message[i] = $(this.element).attr('message'+i);
                head[i] = $(this.element).attr('head'+i);
                if(finalAppendMsg != 'undefined'){
                    finalAppendMsg = finalAppendMsg+'<li><b class="head">'+head[i]+'</b>'+message[i]+'</li>'
                }
                
            }

            

            if(message === undefined){
                throw new Error ('Message in not provided.')
            }

            var popover = $('<div>');
            popover.append(finalAppendMsg);
            $('body').append(popover);

            popover.css({

                position:'absolute',
                width: width,
                zIndex: 2,
                backgroundColor: '#ffffff',
                padding:5,
                borderRadius:3,
                boxShadow:'0 0 4px #888'

            });
            

            if(position === 'left'){

                popover.css({
                    left: left-width/2-$(popover).outerWidth()/2+'px',
                    top: top+height/2-$(popover).outerHeight()/2+'px'
                });

            }else if(position === 'top'){
                
                console.log($(popover).height());
                
                popover.css({
                    left: left+width/2-$(popover).outerWidth()/2,
                    top: top-$(popover).outerHeight()-6
                });
                
                popover.addClass('popover-top');
                
            }else if(position === 'bottom'){
                
                popover.css({
                    left: left+width/2-$(popover).outerWidth()/2,
                    top: top+height+6
                });
                
                popover.addClass('popover-bottom'); 
                
            }
            else{

                popover.css({
                    left: left+width/2-$(popover).outerWidth()/2,
                    top: top-$(popover).outerHeight()
                });

            }

            this.popover = popover;

        },
        mouseOut:function(){
            this.popover.remove();
        }
    } );

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[ pluginName ] = function( options ) {
        return this.each( function() {
            if ( !$.data( this, "plugin_" + pluginName ) ) {
                $.data( this, "plugin_" +
                    pluginName, new Plugin( this, options ) );
            }
        } );
    };

} )( jQuery, window, document );
