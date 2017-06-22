YSD.CanvasMosaicAnimater = (function( _super ){
	
    __extends(CanvasMosaicAnimater, _super);

	function CanvasMosaicAnimater( canvas, img, length, strength, fps ){

        _super.call( this, canvas, img, length, strength, fps );

	}


	var p = CanvasMosaicAnimater.prototype;
	
	p.imgLoadComp = function(){

		this.imgLoadCompFlag = true;

		//generate mosaic data
		var canvasMosaic = new YSD.CanvasMosaic( this.element[0], this.img );
		var strength = 0;
		this.imgDatas = [];
		for( var i = 0; i < this.length; i++ ){
			this.imgDatas[i] = canvasMosaic.getMosaicData( strength );
			strength += this.strength;
		}


		this.ctx = this.element[0].getContext('2d');

		this.element.triggerHandler( 'callback', { type:'imgLoadcomp' } );
	};

	return CanvasMosaicAnimater;

})( YSD.CanvasAnimater );