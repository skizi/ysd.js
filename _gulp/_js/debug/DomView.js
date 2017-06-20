YSD.DomView = (function(){

	function DomView(){
		
		var container = $('<div>');
		container.css({
			position:'absolute',
			top:'0px',
			left:'0px'
		});
		$(document.body).append( container );

		$( '*' ).each(function(){

			var target = $(this);
			var offset = target.offset();
			var color = Math.floor(Math.random() * 0xFFFFFF).toString(16);

			//add border
			var border = $('<div>');
			border.css({
				width:target.width() + 'px',
				height:target.height() + 'px',
				boxSizing:'border-box',
				border:'1px solid #' + color,
				position:'absolute',
				//left:'0px',
				//top:'0px',
				left:offset.left,
				top:offset.top
			});
			container.append( border );


			//add tooltip
			var tooltip = $('<div>');
			var id = target.attr( 'id' );
			if( !id ) id = '';
			var className = target.attr( 'class' );
			if( !className ) className = '無';

			var html = 'id:' + id + ', class:' + className;
			tooltip.html( html );

			tooltip.css({
				position:'absolute',
				left:'0px',
				top:'0px',
				fontSize:'20px',
				//left:offset.left,
				//top:offset.top,
				backgroundColor:'#' + color
			});
			border.append( tooltip );

		});


	}


	DomView.prototype = {



	}

	return DomView;

})();