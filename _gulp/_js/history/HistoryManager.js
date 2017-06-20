


/****************************************************************/
//HistoryManagerクラス
/****************************************************************/
YSD.HistoryManager = (function(){


	function Manager( callback ){
	
		this.callback = callback;
		$(window).on('popstate', this.popstate.bind( this ) );

	}


	Manager.prototype = {

	    push : function( name, directory ){
	    
	    	var obj = {top:0, product:1, detail:2};
	        history.pushState( name, '', directory );
	    
	    },

	    popstate : function(e){
	    
	    	var state = e.originalEvent.state;
			this.callback( 'pageChange', state );
	    
	    }

	}

	return Manager;

})();
