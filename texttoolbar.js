(function($){
	
	jQuery.fn.textToolbar = function(options){
		options = $.extend({'buttons': [], 'margin': 3, 'position': 'top', 'border': true}, options);
	
		var el = 0;
	
		var toolbar = $('<div class="texttoolbar"/>');
		var isblur = true;
		
		if(options.border){
			$(toolbar).addClass('texttoolbar-border');
		}
		
		$(toolbar)
			.hover(function(){
				$(el).attr('data-cancel-blur', '1');
			}, function(){
				$(el)
					.removeAttr('data-cancel-blur')
					.focus();
			})
			.appendTo('body');
		toolbar.html('<ul></ul>');
		
		for(var i=0; i<options.buttons.length; i++){
			var img = options.buttons[i].img;
			
			var func = function(){
				if(el){
					/* если текст не выделен */
					var textbefore = '';
					var textafter = '';
					
					var textselect = el.val();
					
					if(typeof(el[0].selectionStart)=="number"){
						/* если текст выделен */
						if(el[0].selectionStart!=el[0].selectionEnd){
							var start = el[0].selectionStart;
							var end = el[0].selectionEnd;
						
							var textbefore = textselect.substr(0, start);
							var textafter = textselect.substr(end);
						
							var textselect = textselect.substr(start, end-start);
						}
					}
					
					options.buttons[$(this).index()].func(el, textbefore, textselect, textafter);
				}
			};
			
			$('<li/>').html(
				$('<img/>').attr({'src': img})
			).click(func).appendTo($('ul', toolbar));
		}
		
		var make = function(){
			$(this).focus(function(){
				el = $(this);
			
				var offset = $(this).offset();
			
				var left = offset.left;
				var top = offset.top;
			
				var height = $(this).outerHeight();
				var toolbar_height = $(toolbar).outerHeight();
				var width = $(this).outerWidth();
				var toolbar_width = $(toolbar).outerWidth();
				
				if(options.position=='top'){
					var newleft = left;
					var newtop = top - toolbar_height - options.margin;
				}
				if(options.position=='bottom'){
					var newleft = left;
					var newtop = top + height + options.margin;
				}
				if(options.position=='left'){
					var newleft = left - toolbar_width - options.margin;
					var newtop = top - Math.abs(height - toolbar_height)/2;
				}
				if(options.position=='right'){
					var newleft = left + width + options.margin;
					var newtop = top - Math.abs(height - toolbar_height)/2;
				}
				if(options.position=='inset left'){
					var newleft = left + options.margin + Math.abs(height - toolbar_height)/2;
					var newtop = top + Math.abs(height - toolbar_height)/2;
				}
				if(options.position=='inset right'){
					var newleft = left + width - toolbar_width - options.margin - Math.abs(height - toolbar_height)/2;
					var newtop = top + Math.abs(height - toolbar_height)/2;
				}
			
				$(toolbar)
					.offset({
						left: newleft,
						top: newtop
					})
					.addClass('active');
			});
			$(this).blur(function(){
				if(!$(this).is('[data-cancel-blur]')){
					$(toolbar).removeAttr('style').removeClass('active');
				}
			});
		};

		return this.each(make);
	};
})(jQuery);
