YSD.CanvasPixelIndex0 = (function(){
	
	function CanvasPixelIndex0( img, defaultColor ){

        var canvas = $( '<canvas>' );
        canvas.attr({ width:64, height:64 });
        canvas.hide();
        $( document.body ).append( canvas );
        
		this.element = $( canvas );
		this.ctx = this.element[0].getContext('2d');
		this.img = img;
		this.defaultColor = defaultColor;

		if( img.complete ){
			this.imgLoadComp();
		}else{
			img.onload = this.imgLoadComp.bind( this );
		}
	}


	CanvasPixelIndex0.prototype = {

		imgLoadComp : function(){

			// var imgData = this.generateIndex0();
		 	//this.ctx.putImageData( imgData, 0, 0 );

			var colors = this.generateIndex0();
			setTimeout(function(){
				this.element.triggerHandler( 'callback', { colors:colors } );
			}.bind( this ), 100 );

		},


		generateIndex0 : function(){

			var w = this.element.width();
			var h = this.element.height();
			this.ctx.drawImage( this.img, 0, 0, w, h );
			var imgData = this.ctx.getImageData( 0, 0, w, h );

			var imgDataW = imgData.width;
			var imgDataH = imgData.height;

			var pixelIndex = 0;
			var colors = [];
			for ( var x = 0; x < imgDataW; x++ ) {
				for ( var y = 0; y < imgDataH; y++ ) {

					var i = ((y * 4) * imgDataW) + (x * 4);

					var r = imgData.data[i];
					var g = imgData.data[i+1];
					var b = imgData.data[i+2];
					if( Math.abs( r - this.defaultColor ) < 10 &&
						Math.abs( g - this.defaultColor ) < 10 &&
						Math.abs( b - this.defaultColor ) < 10 ){

	                    // imgData.data[i] = 0;
	                    // imgData.data[i + 1] = 0;
	                    // imgData.data[i + 2] = this.defaultColor;
	                    // imgData.data[i + 3] = this.defaultColor;
	                
	                }else{
						colors[ pixelIndex ] = {
							x:x,
							y:y,
							z:( r+g+b )/3/255
						};
						

	                    // imgData.data[i + 1] = imgData.data[i + 1];
	                    // imgData.data[i + 2] = imgData.data[i + 2];
	                    // imgData.data[i + 3] = imgData.data[i + 3];
	                    pixelIndex++;

	                }
             
				}
			}

			//return imgData;
			return colors;

		}

	};
	
	return CanvasPixelIndex0;

})();