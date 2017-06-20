YSD.CanvasMosaic = (function(){
	
	function CanvasMosaic( element, img ){

		this.element = $( element );
		this.ctx = this.element[0].getContext('2d');
		this.img = img;

	}


	CanvasMosaic.prototype = {

		mosaic : function( strength ){

			var dotSize = parseInt( strength, 10);

			var imgData;
			if( strength == 0 ){
				imgData = this.getDefaultData();
			}else{
				imgData = this.generateMosaic0( dotSize );
			}
		    // 生成したモノクロ画像データを適用
		    this.ctx.putImageData(imgData, 0, 0);

		},


		getMosaicData : function( strength ){

			var dotSize = parseInt( strength, 10);

			var imgData;
			if( strength == 0 ){
				imgData = this.getDefaultData();
			}else{
				imgData = this.generateMosaic0( dotSize );
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


		generateMosaic0 : function( dotSize ){

			var w = this.element.width();
			var h = this.element.height();
			this.ctx.drawImage( this.img, 0, 0, w, h );
			var imgData = this.ctx.getImageData( 0, 0, w, h );

			var imgDataW = imgData.width;
			var imgDataH = imgData.height;

			var halfDotSize = dotSize * .5;

			for ( var x = 0; x < imgDataW; x+=dotSize ) {

				for ( var y = 0; y < imgDataH; y+=dotSize ) {
					var i = ((y * 4) * imgDataW) + (x * 4);

	                for( var mx = x; mx < x + dotSize; mx++ ){
	                	var mx0 = mx;
	                	if( mx < 0 ) mx0 = 0;
	                	if( mx > imgDataW ) mx0 = imgDataW;

			            for( var my = y; my < y + dotSize; my++ ){
			            	var my0 = my;
			            	if( my > imgDataH ) my0 = imgDataH; 

		                    var m_i = ((my0 * 4) * imgDataW) + (mx0 * 4);
		                    imgData.data[m_i] = imgData.data[i];
		                    imgData.data[m_i + 1] = imgData.data[i + 1];
		                    imgData.data[m_i + 2] = imgData.data[i + 2];
		                    imgData.data[m_i + 3] = imgData.data[i + 3];
		                }
		            }

				}
			}

			return imgData;

		},


		generateMosaic1 : function( dotSize ){

			var w = this.element.width();
			var h = this.element.height();
			this.ctx.drawImage( this.img, 0, 0, w, h );
			var imgData = this.ctx.getImageData( 0, 0, w, h );

			var imgDataW = imgData.width;
			var imgDataH = imgData.height;

			var halfDotSize = dotSize * .5;

			var maxX = Math.floor( w / dotSize ) * dotSize;
			var maxY = Math.floor( h / dotSize ) * dotSize;
			
			this.ctx.save();
			for ( var x = 0; x < w; x+=dotSize ) {

				for ( var y = 0; y < h; y+=dotSize ) {
					var i = ((y * 4) * imgDataW) + (x * 4);

		            this.ctx.fillStyle = 'rgb(' + imgData.data[i] + ',' + imgData.data[i+1] + ',' + imgData.data[i+2] + ')';
					
					this.ctx.fillRect(x, y, dotSize, dotSize);
					
				}
			}
			this.ctx.restore();

			imgData = this.ctx.getImageData( 0, 0, w, h );


			return imgData;

		}

	}

	return CanvasMosaic;

})();