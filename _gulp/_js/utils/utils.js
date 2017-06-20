YSD.utils = {
	
	toRad:Math.PI / 180,

	getStageProperty : function(){

		var w = window.innerWidth;
		var h = window.innerHeight;
		var documentW = document.body.clientWidth;
		var documentH = document.body.clientHeight;
		var clientW = document.documentElement.clientWidth;
		var clientH = document.documentElement.clientHeight;

		return {
				w:w, h:h,
				documentH:documentH, documentW:documentW,
				clientW:clientW, clientH:clientH
			};
	},


	setOpacity : function( element, opacity ){

		var ua = new YSD.UserAgent();

		if( ua.browser == 'ie' &&
			ua.ieVer < 9 ){
			element.style.filter = 'alpha(opacity=' + ( opacity * 100 ) + ')'; 
		}else{
			$( element ).css({ opacity:opacity } );
		}

	}

};