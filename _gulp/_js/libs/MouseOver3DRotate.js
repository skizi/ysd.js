
YSD.MouseOver3DRotate = (function(){

	var maxRotate = 25;
	
	function MouseOver3DRotate( expr, touch, shadowFlag ){

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
		setInterval( this.intervalAnimate.bind( this ), 200 );
			
		this.init();
	}

	MouseOver3DRotate.prototype = {

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
				target.css({
					transitionDuration:'.3s'
				});
			}

		},


		addElements : function( elements ){

			var length = elements.length;
			for( var i = 0; i < length; i++ ){
				var target = $( elements[i] );
				target.off();
				target.on( 'mouseover', { target:target }, this.overHandler.bind( this ) );
				target.on( 'mouseout', { target:target }, this.outHandler.bind( this ) );
				target.css({
					transitionDuration:'.3s'
				});
			}

		},


		overHandler : function( e ){

			var target = e.data.target;
			this.nowTarget = target;
			this.rotateHalfW = this.nowTarget.width() * .5;
			this.rotateHalfH = this.nowTarget.height() * .5;
			this.rotateLiOffset = this.nowTarget.offset();

			var cssObj = { zIndex:10 };
			if( this.shadowFlag ){
				cssObj.boxShadow = 'rgba(71, 71, 71, 0.509804) 7px 8px 5px 0px';
			}
			this.nowTarget.css( cssObj );

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


		intervalAnimate : function(){

			if( this.nowTarget ){
				var offset = this.rotateLiOffset;
				var halfW = this.rotateHalfW;
				var halfH = this.rotateHalfH;

				var x = offset.left + halfW;
				var y = offset.top + halfH - this.scrollTop;
				
				var offsetX = this.touch.x - x;
				var offsetY = y - this.touch.y;
				var perX = offsetX / halfW;
				var perY = offsetY / halfH;

				var rotX = perX * maxRotate;
				var rotY = perY * maxRotate;

				this.nowTarget.css({
					transform:'rotateY(' + rotX + 'deg) rotateX(' + rotY + 'deg) translateZ(30px)'
				});
			}
		},


		windowScroll : function(){

			this.scrollTop = $( window ).scrollTop();
			
		}

	}

	return MouseOver3DRotate;

})();