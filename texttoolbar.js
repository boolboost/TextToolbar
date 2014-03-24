(function($){
	
	jQuery.fn.textToolbar = function(options){
		options = $.extend({'buttons': [], 'margin': 3}, options);
	
		var el = 0;
	
		var toolbar = $('<div class="texttoolbar"/>');
		
		$(toolbar)
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
				$('.texttoolbar').removeAttr('style').removeClass('active');
				el = $(this);
			
				var offset = $(this).offset();
			
				var left = offset.left;
				var top = offset.top;
			
				var height = $(this).outerHeight();
				var toolbar_height = $(toolbar).outerHeight();
			
				var newleft = left;
				var newtop = top - toolbar_height - options.margin;
			
				$(toolbar)
					.offset({
						left: newleft,
						top: newtop
					})
					.addClass('active');
			});
		};

		return this.each(make);
	};
})(jQuery);
