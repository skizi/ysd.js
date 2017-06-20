
YSD.ScrollElement = (function(){


	function ScrollElement( expr, top, max, _offsetY ){

		this.stage;

		this.stageWidth = 0;
		this.scrollTop = 0;

		this.contentTop = 0;
		this.targetY = 0;
		this.defaultY = 0;

		this.height = 0;
		this.offsetY = 0;

		this.element = $( expr );
		this.element.css({ top:'0px' });
		this.height = this.element.height();

		this.contentTop = top;
		this.defaultY = top;
		this.scrollMax = max;
		this.offsetY = _offsetY;


		$( window ).scroll( this.windowScroll.bind( this ) );
		setInterval( this.animate.bind( this ), 1000 / 60 );

		this.resize();
		$( window ).on( 'resize', this.resize.bind( this ) );
	}

	var p = ScrollElement.prototype;
	p.windowScroll = function(){

		this.scrollTop = $( window ).scrollTop();
		
	}

	p.animate = function(){

		if( this.stageWidth < 641 ) return;
		
		this.targetY = ( this.scrollTop + this.stage.clientH - this.height - this.contentTop + this.offsetY );
		if( this.defaultY > this.targetY ) this.targetY = this.defaultY;
		if( this.scrollMax < this.targetY ) this.targetY = this.scrollMax;

		var nowY = this.element.offset().top - this.contentTop;
		var y = -( nowY - this.targetY ) * .1 + nowY;
		this.element.css({ top:y + 'px' });

	}

	p.resize = function(){

		this.stage = YSD.utils.getStageProperty();
		this.stageWidth = this.stage.w;
		
	}

	return ScrollElement;

})();

