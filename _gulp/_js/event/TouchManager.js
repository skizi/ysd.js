			

YSD.touch = {
	x:0,
	y:0,
	oldX:0,
	oldY:0,
	dragDistX:0,
	dragDistY:0,
	offsetX:0, 
	offsetY:0,
	totalOffsetX:0,
	totalOffsetY:0,
	downFlag:false
};


YSD.TouchManager = (function(){

	var touchStartFuncs = [];
	var touchStartFuncLength = 0;
	var touchMoveFuncs = [];
	var touchMoveFuncLength = 0;
	var touchEndFuncs = [];
	var touchEndFuncLength = 0;
	var touch;
	var preventDefaultCheckFuncs = [];
	var preventDefaultCheckFuncLength = 0;



	function TouchManager(){
	 
		touch = YSD.touch;
		this.ua = new YSD.UserAgent();

		this.movePreventDefaultFlag = false;
		this.movePreventDefaultNoneFlag = false;

		if( this.ua.platform == 'pc' ){
			$( document ).off( 'mousedown' );
			$( document ).off( 'mousemove' );
			$( document ).off( 'mouseup' );
		    $( document ).on( 'mousedown', this.touchStartHandler.bind( this ) );
		    $( document ).on( 'mousemove', this.touchMoveHandler.bind( this ) );
		    $( document ).on( 'mouseup', this.touchEndHandler.bind( this ) );
		}else{
			document.removeEventListener( 'touchstart', this.touchStartHandler );
			document.removeEventListener( 'touchmove', this.touchMoveHandler );
			document.removeEventListener( 'touchend', this.touchEndHandler );
		    document.addEventListener('touchstart', this.touchStartHandler.bind( this ), false);
		    document.addEventListener('touchmove', this.touchMoveHandler.bind( this ), false);
		    document.addEventListener('touchend', this.touchEndHandler.bind( this ), false);
		}
	}


	TouchManager.prototype = {

		//------------------------タッチイベント------------------------
		touchStartHandler : function(e){
			
			touch.downFlag = true;

			if( this.ua.platform == 'pc' ){
				touch.x = e.clientX;
				touch.y = e.clientY;
			}else{
				if (e.touches.length) {
					touch.x = e.touches[0].pageX;
					touch.y = e.touches[0].pageY;
				}
			}

			for( var i = 0; i < touchStartFuncLength; i++ ) touchStartFuncs[ i ]( e );
		},


		touchMoveHandler : function(e){

			//if( nowPage == 'top' && touch.y > 680 ) return;
			
			touch.oldX = touch.x;
			touch.oldY = touch.y;
			if( this.ua.platform == 'pc' ){
				touch.x = e.clientX;
				touch.y = e.clientY;
			}else{
				if (e.touches.length) {
					touch.x = e.touches[0].pageX;
					touch.y = e.touches[0].pageY;
				}
			}

			if( touch.downFlag ){
				touch.offsetX = touch.x - touch.oldX;
				touch.offsetY = touch.y - touch.oldY;
				touch.totalOffsetX += touch.offsetX;
				touch.totalOffsetY += touch.offsetY;
		        touch.dragDistX = Math.abs(touch.offsetX);
		        touch.dragDistY = Math.abs(touch.offsetY);
		    }
		    
			for( var i = 0; i < touchMoveFuncLength; i++ ) touchMoveFuncs[ i ]( e );
	     	
			//AndroidでtouchEndを発火させる為の対策
        	if( e.touches && e.touches.length < 2 ){
        		if( this.preventDefaultCheck( e ) ) e.preventDefault();
    		}
	    	
		},


		preventDefaultCheck : function( e ){

            var preventDefaultFlag = false;
            if( touch.dragDistY < touch.dragDistX &&
                this.ua.platform != 'pc' ) preventDefaultFlag = true;
            if( this.movePreventDefaultFlag ) preventDefaultFlag = true;

        	for( var i = 0; i < preventDefaultCheckFuncLength; i++ ){
        		if( preventDefaultCheckFuncs[ i ]( e ) ) preventDefaultFlag = true;
        	}
        	if( this.movePreventDefaultNoneFlag )preventDefaultFlag = false;

            if( preventDefaultFlag ) e.preventDefault();

		},


		setPreventDefaultCheckFunc : function( func ){

			preventDefaultCheckFuncs.push( func );
			preventDefaultCheckFuncLength = preventDefaultCheckFuncs.length;

		},


		touchEndHandler : function(e){
			
			touch.downFlag = false;
			touch.offsetX = 0;
			touch.offsetY = 0;
			touch.totalOffsetX = 0;
			touch.totalOffsetY = 0;
	        touch.dragDistX = 0;
	        touch.dragDistY = 0;

			for( var i = 0; i < touchEndFuncLength; i++ ) touchEndFuncs[ i ]( e );
		},


		//------------------------グローバル関数------------------------
		setTouchStartFunc : function( func ){

			touchStartFuncs.push( func );
			touchStartFuncLength = touchStartFuncs.length;

		},

		setTouchMoveFunc : function( func ){

			touchMoveFuncs.push( func );
			touchMoveFuncLength = touchMoveFuncs.length;

		},

		setTouchEndFunc : function( func ){

			touchEndFuncs.push( func );
			touchEndFuncLength = touchEndFuncs.length;

		}

	}

	return TouchManager;

})();


