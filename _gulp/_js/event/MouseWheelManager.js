YSD.MouseWheelManager = (function(){
	
	var funcs = [];
	var funcLength = 0;


	function MouseWheelManager(){

		this.delta = 0;

		var mousewheelevent = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';
		 $(document).on( mousewheelevent, this.wheelHandler.bind( this ) );

	}


	MouseWheelManager.prototype = {

		wheelHandler : function(e){

	        this.delta = e.originalEvent.deltaY || e.originalEvent.wheelDelta;

			for( var i = 0; i < funcLength; i++ ) funcs[ i ]( e );

	    },


	    setWheelFunc : function( func ){

	    	funcs.push( func );
	    	funcLength = funcs.length;

	    }

	}

	return MouseWheelManager;

})();