YSD.CanvasAnimater0 = (function(){
	
	function CanvasAnimater0( canvas, img, length, strength, fps ){

		this.playFlag = false;
		this.loopFlag = false;
		this.reverseFlag = false;
		this.imgLoadCompFlag = false;

		this.element = $( canvas );
		this.img = img;

		this.length = length;
		if( !this.length ) this.length = 10;
		this.strength = strength;
		if( !this.strength ) this.strength = 10;
		this.fps = fps;
		if( !fps ) this.fps = 20;

		this.time = new YSD.Time();
		this.countTime = 0;
		this.oneFrameTime = 1000 / this.fps;

		this.index = 0;

		if( img.complete ){
			this.imgLoadComp();
		}else{
			img.onload = this.imgLoadComp.bind( this );
		}

		setInterval( this.animate.bind( this ), 1000 / 30 );
	}


	CanvasAnimater0.prototype = {

		imgLoadComp :function(){

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
		},


		play : function(){

			this.playFlag = true;
			if( this.reverseFlag ){
				this.index = this.length - 1;
			}else{
				this.index = 0;
			}

		},


		stop : function(){

			this.playFlag = false;

		},


		reverse : function( flag ){

			if( flag != false && !flag ) flag = true;
			this.reverseFlag = flag;

			if( flag ){
				this.index = this.length - 1;
			}else{
				this.index = 0;
			}

		},


		setFps : function( fps ){

			this.fps = fps;	
			this.oneFrameTime = 1000 / this.fps;

		},


		animate : function(){

			var delta = this.time.getDelta();
			this.countTime += delta;
			if( this.countTime < this.oneFrameTime ) return;
			this.countTime = 0;

			if( !this.imgLoadCompFlag ) return;

			if( this.playFlag ){
		    	this.ctx.putImageData( this.imgDatas[this.index], 0, 0 );

		    	if( this.reverseFlag ){
					this.index--;
					if( this.index < 0 ){
						this.index = this.length - 1;
						this.comp();
					}
		    	}else{
					this.index++;
					if( this.index > this.length - 1 ){
						this.index = 0;
						this.comp();
					}
				}
			}

		},


		comp : function(){
			
			if( !this.loopFlag ){
				this.playFlag = false;
				this.element.triggerHandler( 'callback', { type:'comp', reverse:this.reverseFlag } );
			}

		}

	}

	return CanvasAnimater0;

})();