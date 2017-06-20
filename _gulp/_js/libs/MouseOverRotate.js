
YSD.MouseOverRotate = (function(){

	var maxRotate = 5;
	
	function MouseOverRotate( expr, touch, shadowFlag ){

		if( typeof expr == 'string' ){
			this.expr = expr;
		}else{
			this.elementFlag = true;
			this.elements = expr;
		}
		this.touch = touch;	//YSD.touch
		this.shadowFlag = shadowFlag;

		this.scrollTop = 0;
		this.windowScroll();
		$( window ).scroll( this.windowScroll.bind( this ) );
			
		this.init();
	}

	MouseOverRotate.prototype = {

		init : function(){

			if( !this.elementFlag ){
				this.elements = $( this.expr );
			}
			var length = this.elements.length;
			for( var i = 0; i < length; i++ ){
				var target = $( this.elements[i] );
				target.off();
				target.on( 'mouseover', { target:target }, this.overHandler.bind( this ) );
				target.on( 'mouseout', { target:target }, this.outHandler.bind( this ) );
				
			}

		},


		addElements : function( elements ){

			var length = elements.length;
			for( var i = 0; i < length; i++ ){
				var target = $( elements[i] );
				target.off();
				target.on( 'mouseover', { target:target }, this.overHandler.bind( this ) );
				target.on( 'mouseout', { target:target }, this.outHandler.bind( this ) );
				
			}

		},


		overHandler : function( e ){

			var target = e.data.target;
			this.nowTarget = target;
			this.rotateHalfW = this.nowTarget.width() * .5;
			this.rotateHalfH = this.nowTarget.height() * .5;
			this.rotateLiOffset = this.nowTarget.offset();

			this.rotate();

		},


		outHandler : function( e ){

			var target = e.data.target;
			target.css({
				zIndex:'auto',
				transform:'none',
				boxShadow:'none'
			});
			this.nowTarget = null;

		},


		rotate : function(){

			var offset = this.rotateLiOffset;
			var halfW = this.rotateHalfW;
			var halfH = this.rotateHalfH;

			var x = offset.left + halfW;
			var y = offset.top + halfH - this.scrollTop;
			
			var offsetX = this.touch.x - x;
			var offsetY = y - this.touch.y;
			var perX = -offsetX / halfW;
			var perY = offsetY / halfH;
			var per = perX * perY;

			var cssObj = { transform:'rotateZ(' + ( maxRotate * per ) + 'deg)' };
			if( this.shadowFlag ){
				cssObj.boxShadow = 'rgba(113, 135, 164, 0.380392) 7px 6px 4px -4px';
			}
			this.nowTarget.css( cssObj );

		},


		windowScroll : function(){

			this.scrollTop = $( window ).scrollTop();
			
		}

	}

	return MouseOverRotate;

})();