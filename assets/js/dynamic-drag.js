(function($) {
    $.dragScroll = function(options) {
    	var settings = $.extend({
        	scrollVertical: true,
        	scrollHorizontal: true,
        	cursor: null
      	}, options);
  
		var clicked = false,
			clickY, clickX;
	
		var getCursor = function() {
			if (settings.cursor) return settings.cursor;
			if (settings.scrollVertical && settings.scrollHorizontal) return 'move';
			if (settings.scrollVertical) return 'row-resize';
			if (settings.scrollHorizontal) return 'col-resize';
		}
	
		var updateScrollPos = function(e, el) {
			$('html').css('cursor', getCursor());
			var $el = $(el);
			settings.scrollVertical && $el.scrollTop($el.scrollTop() + (clickY - e.pageY));
			settings.scrollHorizontal && $el.scrollLeft($el.scrollLeft() + (clickX - e.pageX));
		}
	
		$(document).on({
			'mousemove': function(e) {
				clicked && updateScrollPos(e, this);
			},
			'mousedown': function(e) {

				if(
					e.target == $(document)[0].childNodes[1] || 
					e.target == $("#tech-tree").find("svg")[0] ||
					e.target == $("#tech-tree").find("svg")[1] ||
					e.target == $("#tech-tree").find("svg")[2] ||
					e.target == $("#tech-tree").find("svg")[3] ||
					e.target == $("#tech-tree").find("svg")[4] ||
					e.target == $("#tech-tree").find("svg")[5]
				  )
				{
					console.log("1",e.target);
					clicked = true;
					clickY = e.pageY;
					clickX = e.pageX;
				}
				else
				{
					console.log("2",e.target);
					clicked = false;
				}
			},
			'mouseup': function() {
				clicked = false;
				$('html').css('cursor', 'auto');
			}
		});
    }
}(jQuery))
  
$.dragScroll();
