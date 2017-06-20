YSD.CanvasRgbShiftAnimater0 = (function( _super ){
	
    __extends(CanvasRgbShiftAnimater0, _super);

	function CanvasRgbShiftAnimater0( canvas, img, length, strength, fps ){

        _super.call( this, canvas, img, length, strength, fps );

	}


	var p = CanvasRgbShiftAnimater0.prototype;
	
	p.imgLoadComp = function(){

		this.imgLoadCompFlag = true;

		//generate rgbShift data
		var canvasRgbShift = new YSD.CanvasRgbShift( this.element[0], this.img );

		this.imgDatas = [];

		var strength = this.strength;
		var shiftX = [];
		var shiftY = [];
		this.imgDatas[0] = canvasRgbShift.getRgbShiftData( 'all', 0, 0 );
		for( var i = 1; i < this.length - 1; i++ ){
			strength = strength * 2;
			var halfStrength = strength * .5;
			shiftX[0] = Math.round( strength * Math.random() - halfStrength );
			shiftX[1] = Math.round( strength * Math.random() - halfStrength );
			shiftX[2] = Math.round( strength * Math.random() - halfStrength );
			shiftY[0] = Math.round( strength * Math.random() - halfStrength );
			shiftY[1] = Math.round( strength * Math.random() - halfStrength );
			shiftY[2] = Math.round( strength * Math.random() - halfStrength );

			this.imgDatas[i] = canvasRgbShift.getRgbShiftData( 'all', shiftX, shiftY );
		}
		this.imgDatas[this.length-1] = canvasRgbShift.getRgbShiftData( 'all', 0, 0 );


		this.ctx = this.element[0].getContext('2d');

		this.element.triggerHandler( 'callback', { type:'imgLoadcomp' } );
	
	};

	return CanvasRgbShiftAnimater0;

})( YSD.CanvasAnimater0 );