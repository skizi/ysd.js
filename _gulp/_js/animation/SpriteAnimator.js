YSD.SpriteAnimator = (function(){
	
	function SpriteAnimator( element, spriteUrl, json, fps ){

		this.element = $( element );
		this.spriteUrl = spriteUrl;
		this.json = json;
		this.frames = this.json.frames;

		this.stopFlag = true;
		this.spriteFrame = 0;
		this.animations = {};
		this.nowAnimationName = '';
		setInterval( this.animate.bind( this ), 1000 / fps );

		var dummyElement = $('<div>');
		dummyElement.css({backgroundImage:this.spriteUrl});
	}

	
	SpriteAnimator.prototype = {

		show:function(){

			this.element.show();

		},


		hide: function(){

			this.element.hide();

		},


		animate:function(){

			if( this.stopFlag ){
				return;
			}else{
				var animation = this.animations[ this.nowAnimationName ];
			}

			var obj = this.frames[ this.spriteFrame ];
			if( this.spriteFrame > animation.end ){
				this.spriteFrame = animation.start;
				if( !animation.loopFlag ){
					this.stopFlag = true;
					if( !animation.forwardFlag ){
						this.element.css({backgroundImage:'none'});
					}
					return;
				}
			}
			this.spriteFrame++;

			var x = -obj.frame.x;
			var y = -obj.frame.y;

			this.element.css({
				backgroundPosition:x + 'px ' + y + 'px'
			});

		},


		start:function( name ){

			if( name ) this.nowAnimationName = name;
			var animation = this.animations[ this.nowAnimationName ];
			this.stopFlag = false;
			this.spriteFrame = animation.start;
			this.element.css({backgroundImage:'url("' + this.spriteUrl + '")'});

		},


		stop:function(){

			this.stopFlag = true;
			this.element.css({backgroundImage:'none'});
					
		},


		pause:function(){

			this.stopFlag = true;
					
		},


		refresh:function(){

			this.stopFlag = false;
			this.spriteFrame = 0;

		},


		setAnimation:function( name, start, end, loopFlag, forwardFlag ){

			this.animations[ name ] = {
				start:start,
				end:end,
				loopFlag:loopFlag,
				forwardFlag:forwardFlag
			};

		}

	}

	return SpriteAnimator;

})();