YSD.CanvasRgbShift = (function(){
	
	function CanvasRgbShift( element, img ){

		this.element = $( element );
		this.ctx = this.element[0].getContext('2d');
		this.img = img;

	}


	CanvasRgbShift.prototype = {

		rgbShift : function( shiftType, shiftX, shiftY ){

			shiftX *= -1;
			shiftY *= -1;

			var imgData;
			if( shiftX == 0 && shiftY == 0 ){
				imgData = this.getDefaultData();
			}else{
				imgData = this.generateRgbShift0( shiftType, shiftX, shiftY );
			}
		    // 生成したモノクロ画像データを適用
		    this.ctx.putImageData(imgData, 0, 0);

		},


		getRgbShiftData : function( shiftType, shiftX, shiftY ){

			var imgData;
			if( shiftX == 0 && shiftY == 0 ){
				imgData = this.getDefaultData();
			}else{
				if( shiftType == 'all' ){

					var imgDatas = [];
					for( var i = 0; i < 3; i++ ){
						shiftX[i] *= -1;
						shiftY[i] *= -1;
						if( shiftX[i] == 0 ) shiftX[i] = 1;
						var type = 'r';
						if( i == 1 ) type = 'g';
						if( i == 2 ) type = 'b';
						imgDatas[i] = this.generateRgbShift0( type, shiftX[i], shiftY[i] );
					}

					var w = this.element.width();
					var h = this.element.height();
					imgData = this.ctx.getImageData( 0, 0, w, h );
					var imgDataW = imgData.width;
					var imgDataH = imgData.height;
					for ( var x = 0; x < imgDataW; x++ ) {
						for ( var y = 0; y < imgDataH; y++ ) {
							var i = ((y * 4) * imgDataW) + (x * 4);
		                    imgData.data[i] = imgDatas[0].data[i];
		                    imgData.data[i + 1] = imgDatas[1].data[i + 1];
		                    imgData.data[i + 2] = imgDatas[2].data[i + 2];
						}
					}

				}else{
					shiftX *= -1;
					shiftY *= -1;
					if( shiftX == 0 ) shiftX = 1;
					imgData = this.generateRgbShift0( shiftType, shiftX, shiftY );
				}
			}

		    return imgData;
		},


		getDefaultData : function(){

			var w = this.element.width();
			var h = this.element.height();
			this.ctx.drawImage( this.img, 0, 0, w, h );
			var imgData = this.ctx.getImageData( 0, 0, w, h );

			return imgData;
		},


		generateRgbShift0 : function( shiftType, shiftX, shiftY ){

			var w = this.element.width();
			var h = this.element.height();
			this.ctx.drawImage( this.img, 0, 0, w, h );
			var imgData = this.ctx.getImageData( 0, 0, w, h );

			var imgDataW = imgData.width;
			var imgDataH = imgData.height;

			if( shiftX < 0 ){

				for ( var x = imgDataW - 1; x > -1; x-- ) {
					var x2 = x + shiftX;
					imgData = this.getYImgData( imgData, x, x2, imgDataW, imgDataH, shiftType, shiftY );
				}

			}else{
				for ( var x = 0; x < imgDataW; x++ ) {
					var x2 = x + shiftX;
					imgData = this.getYImgData( imgData, x, x2, imgDataW, imgDataH, shiftType, shiftY );
				}
			}

			return imgData;

		},


		getYImgData : function( imgData, x, x2, imgDataW, imgDataH, shiftType, shiftY ){

			for ( var y = 0; y < imgDataH; y++ ) {
				var i = ((y * 4) * imgDataW) + (x * 4);

				var y2 = y + shiftY;
                var s_i = ((y2 * 4) * imgDataW) + (x2 * 4);
                if( shiftType == 'r' ){
                    imgData.data[i] = imgData.data[s_i];
                    imgData.data[i + 1] = imgData.data[i + 1];
                    imgData.data[i + 2] = imgData.data[i + 2];
                }else if( shiftType == 'g' ){
                    imgData.data[i] = imgData.data[i];
                    imgData.data[i + 1] = imgData.data[s_i + 1];
                    imgData.data[i + 2] = imgData.data[i + 2];
                }else if( shiftType == 'b' ){
            	    imgData.data[i] = imgData.data[i];
                    imgData.data[i + 1] = imgData.data[i + 1];
                    imgData.data[i + 2] = imgData.data[s_i + 2];
                }
                imgData.data[i + 3] = imgData.data[i + 3];
          
			}

			return imgData;

		}

	}

	return CanvasRgbShift;

})();