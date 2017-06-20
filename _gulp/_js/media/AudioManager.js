YSD.AudioManager = (function(){

	var loadCount = 0;
	var length = 0;
	var callback;

	var sources = {};
	var gainNode;



	function AudioManager(){

		if( !YSD.ua ) YSD.ua = new YSD.UserAgent();

		this.audios = {};
		this.loadingAudios = {};

		this.volume = 0.5;
	}


	AudioManager.prototype = {

		loadAudios : function( datas, callback ){

			for( var key in datas ){
				var data = datas[key];
				if( this.audios[data.value] ) this.delete( data.value );

				this.loadingAudios[data.value] = true;
			}

			new YSD.AudioLoader( datas, function(){
				var _audios = arguments[1];
				for( var key in _audios ){
					this.audios[key] = _audios[key];
					delete this.loadingAudios[key];
				}
				arguments[0]();
			}.bind( this, callback ) );

		},


		loadAudio : function( data, callback ){

			if( this.audios[data.value] ) this.delete( data.value );
			this.loadingAudios[data.value] = true;

			new YSD.AudioLoader( data, function(){
				var _audios = arguments[1];
				for( var key in _audios ){
					this.audios[key] = _audios[key];
					delete this.loadingAudios[key];
				}
				
				arguments[0]();
			}.bind( this, callback ) );

		},


		play : function( value, fadeFlag, fadeTime ){

			this.playStep2( value, fadeFlag, fadeTime );

		},


		playStep2 : function( value, fadeFlag, fadeTime ){

			if( !this.audios[ value ] ) return;

			var loopFlag = this.audios[ value ].loop;

			if( YSD.ua.is_iOS || YSD.ua.isAndroid ){

				var source = YSD.audioContext.createBufferSource();
                source.start = source.start || source.noteOn;
				source.buffer = this.audios[ value ];
				//source.connect(YSD.audioContext.destination);	//ボリューム調整するときはいらない

				//volume
				gainNode = this.getGainNode( source );
				if( loopFlag ) source.loop = true;
				
				//
				source.start(0);
				sources[ value ] = source;

			}else{

				this.audios[ value ].volume = this.volume;

				this.audios[ value ].play().catch(function() {});
			
			}


			if( fadeFlag ) this.fade( 'fadeIn', value, fadeTime, gainNode );

		},


		getGainNode : function( source ){

			gainNode = YSD.audioContext.createGain();
		 	gainNode.gain.value = this.volume;
			source.connect(gainNode);
			gainNode.connect(YSD.audioContext.destination);

			return gainNode;
		},


		checkSampleRateBug : function(){
		  if(YSD.audioContext.sampleRate !== 44100){
		    YSD.audioContext.close();
		    YSD.audioContext = new AudioContext();
		    return true;
		  }
		  return false;
		},


		fade : function( type, value, fadeTime, gainNode, callback ){

			if( YSD.ua.is_iOS || YSD.ua.isAndroid ){
				gainNode.gain.value = 0;
			}else{
				this.audios[ value ].volume = 0;
			}
			var _volume = 1;
			var startVolume = 0;
			if( type == 'fadeIn' ){
				_volume = this.volume;
			}else{
				startVolume = this.volume;
				_volume = 0;
			}

            $( { volume:startVolume } ).animate({ volume:_volume }, {
                duration:fadeTime,
                easing: 'linear',
                progress:function () {
                    var _volume = arguments[1].elem.volume;
                    var _value = arguments[0];
                    if( YSD.ua.is_iOS || YSD.ua.isAndroid ){
                    	gainNode.gain.value = _volume;
                    }else{
	                    this.audios[ _value ].volume = _volume;
	                }
                }.bind( this, value ),
                complete:function(){
                	if( callback ) callback();
                }
            });

		},


		stop : function( name ){

			if( name ){

				if( YSD.ua.is_iOS || YSD.ua.isAndroid ){
					if( !sources[name] ) return;
					sources[name].stop(0);
					delete sources[name];
				}else{
					if( !this.audios[name] ) return;
					this.audios[name].currentTime = 0;
					this.audios[name].pause();
				}
				return;
			}

			if( YSD.ua.is_iOS || YSD.ua.isAndroid ){
				for( var key in sources ){
					sources[key].stop(0);
				}
				sources = {};
			}else{
				for( var key in this.audios ){
					this.audios[key].currentTime = 0;
					this.audios[key].pause();
				}
			}

		},



		fadeOut : function( value, fadeTime ){

			if( !value ) return;

			if( YSD.ua.is_iOS || YSD.ua.isAndroid ){
				var source = YSD.audioContext.createBufferSource();
                source.start = source.start || source.noteOn;
				source.buffer = this.audios[ value ];
				gainNode = this.getGainNode( source );
			}
				
			var callback = function(){

				var _value = arguments[0];
				if( YSD.ua.is_iOS || YSD.ua.isAndroid ){
					if( sources[_value] ) sources[_value].stop(0);
					delete sources[_value];
				}else{
					this.audios[_value].currentTime = 0;
					this.audios[_value].pause();
				}

			}.bind( this, value );


			this.fade( 'fadeOut', value, fadeTime, gainNode, callback );
			
		},


		pause : function( value ){

			if( !this.audios[ value ] ) return;

			if( YSD.ua.is_iOS || YSD.ua.isAndroid ){
				sources[value].stop(0);
				delete sources[value];
			}else{
				this.audios[value].pause();
			}

		},


		getDuration : function( value ){
			
			if( !this.audios[ value ] ) return;

			var audio = this.audios[value];
			var duration = audio.duration;

			return duration;

		},


		delete : function( value ){

			if( !this.audios[ value ] ) return;

			$( this.audios[ value ] ).remove();
			delete this.audios[ value ];

		}


	}

	return AudioManager;

})();



YSD.AudioLoader = (function(){

	function AudioLoader( datas, callback ){

		this.loadCount = 0;
		this.audios = {};

		if( datas.length ){
			this.length = datas.length;
			for( var i = 0; i < this.length; i++ ){
				this.load( datas[i] );
			}
		}else{
			this.length = 1;
			this.load( datas );
		}

		this.callback = callback;

	}


	AudioLoader.prototype ={

		load : function( obj ){
			
			if( YSD.ua.is_iOS || YSD.ua.isAndroid ){

				var request = new XMLHttpRequest();
				request.open('GET', obj.src, true);
				request.responseType = 'arraybuffer';
				request.onload = function() {

					var _obj = arguments[0];
					YSD.audioContext.decodeAudioData(request.response, function(buffer) {
						
						var key = _obj.value;
						this.audios[ key ] = buffer;

						this.loadCompHandler();
					
					}.bind( this ),
					function( e ){
						//エラー
						this.audios[ value ] = null;
						this.loadErrorHandler();

					}.bind( this));
				}.bind( this, obj );
				request.send();

			}else{

				var ele = $( '<audio src="' + obj.src + '"></audio>' );
				//ele.append( '<source>' );

				if( obj.loop == true ) ele[0].loop = true;
				
				var value = obj.value;
				this.audios[ value ] = ele[0];


				ele.on( 'loadedmetadata', this.loadCompHandler.bind( this ) );
				ele.on( 'error', function(){
					
					var _ele = arguments[0];
					var _value = arguments[1];
					
					_ele.remove();

					//delete this.audios[ _value ];
					this.audios[ _value ] = null;
					this.loadErrorHandler();
				
				}.bind( this, ele, value ) );

				ele[0].load();
				$( document.body ).append( ele );

			}

		},


		loadCompHandler : function( e ){
			
			if( YSD.ua.platform == 'pc' ){
				$( e.target ).off( 'loadedmetadata' );
				$( e.target ).off( 'error' );
			}

			this.loadCount++;
			if( this.loadCount >= this.length ){
				this.callback( this.audios );
			}

		},


		loadErrorHandler : function(){

			console.log( 'load audio error...' );

			this.loadCount++;
			if( this.loadCount >= this.length ){
				this.callback( this.audios );
			}

		}

	}

	return AudioLoader;

})();