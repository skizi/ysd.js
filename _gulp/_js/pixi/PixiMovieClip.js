
if( typeof( PIXI ) != 'undefined' ){

	YSD.PixiMovieClip = (function( _super ){

	    __extends( PixiMovieClip, _super );

		function PixiMovieClip( spriteSheet, frameLate ){

	        _super.call( this, spriteSheet );

	        this.animations = {};
	        this.nowAnimation = '';
	        this.renderFlag = false;
	        this.loop = false;

	        if( !frameLate ) frameLate = 30;
	        setInterval( this.animate.bind( this ), 1000 / frameLate );

		}


		var p = PixiMovieClip.prototype;
		
		p.setAnimation = function( name, start, end, loop, callback ){

			this.nowAnimation = name;
			this.animations[ name ] = {
				start:start,
				end:end,
				loop:loop,
				callback:callback
			};

		};


		p.playByName = function( name ){

			this.nowAnimation = name;
			var animation = this.animations[ this.nowAnimation ];
			this.gotoAndPlay( animation.start );
			if( !this.playing ) this.play();

		};


		p.animate = function(){

			if( !this.playing ) return;

			var animation = this.animations[ this.nowAnimation ];

			if( animation ){
				if( this.currentFrame >= animation.end ){
					if( animation.loop ){
						this.gotoAndPlay( animation.start );
					}else{
						this.stop();
						if( animation.callback ){
							animation.callback();
						}
					}
				}
			}

		};


		
		return PixiMovieClip;

	})( PIXI.MovieClip );

}