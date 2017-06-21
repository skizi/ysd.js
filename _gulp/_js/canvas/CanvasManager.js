YSD.CanvasManager = (function(){

	function CanvasManager(){

		this.element = $( '<div>' );

	}


	CanvasManager.prototype = {

		getGrayScaleData : function( img, defaultColor, _callback ){

			var callback = function(){
				var datas = this.getGrayScaleDataStep2( img, defaultColor );
				_callback( datas );
			}.bind( this );
			
			if( img.complete ){
				this.imgLoadComp( callback );
			}else{
				img.onload = this.imgLoadComp.bind( this, callback );
			}

		},


		imgLoadComp : function( callback ){

		 	callback();

		},


		//色情報の配列を返す
		//xとyにはピクセル座標が、zにはグレースケールの色情報が入る
		getGrayScaleDataStep2 : function( img, defaultColor ){

			var canvas = $( '<canvas>' );
	        canvas.attr({ width:64, height:64 });
	        canvas.hide();
	        $( document.body ).append( canvas );
	        
			var ctx = canvas[0].getContext('2d');

			var w = canvas.width();
			var h = canvas.height();
			ctx.drawImage( img, 0, 0, w, h );
			var imgData = ctx.getImageData( 0, 0, w, h );

			var imgDataW = imgData.width;
			var imgDataH = imgData.height;

			var pixelIndex = 0;
			var datas = [];
			for ( var x = 0; x < imgDataW; x++ ) {
				for ( var y = 0; y < imgDataH; y++ ) {

					var i = ((y * 4) * imgDataW) + (x * 4);

					var r = imgData.data[i];
					var g = imgData.data[i+1];
					var b = imgData.data[i+2];
					if( Math.abs( r - defaultColor ) < 10 &&
						Math.abs( g - defaultColor ) < 10 &&
						Math.abs( b - defaultColor ) < 10 ){

	                    // imgData.data[i] = 0;
	                    // imgData.data[i + 1] = 0;
	                    // imgData.data[i + 2] = this.defaultColor;
	                    // imgData.data[i + 3] = this.defaultColor;
	                
	                }else{
						datas[ pixelIndex ] = {
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
			return datas;

		}

	}

	return CanvasManager;

})();