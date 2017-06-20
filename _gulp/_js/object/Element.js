
/****************************************************************/
//Elementクラス
/****************************************************************/
YSD.Element = (function(){

	function Element( expr, index ){

		if( index == null ){
			this.element = $( expr );
		}else{
			this.element = $( $( expr )[index] );
		}

	}

	return Element;

})();