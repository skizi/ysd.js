
YSD.VideoManager = (function(){

	var ua;
	
	var expr = '';
	var containers;
	var length = 0;
	var swfPlayerUrl = '';
	var expressinstallUrl = '';
	var skinUrl = '';

	function VideoManager( _expr, _swfPlayerUrl, _expressinstallUrl, _skinUrl ){

		expr = _expr;
		swfPlayerUrl = _swfPlayerUrl;
		expressinstallUrl = _expressinstallUrl;
		skinUrl = _skinUrl;

		ua = new YSD.UserAgent();
		
		if( ua.browser == 'ie' && ua.ieVer < 9 ){
		//if( true ){
			this.init();
		}else{
			var videos = $( expr );
			var length = videos.length;
			for( var i = 0; i < length; i++ ){
				$( videos[i] ).on( 'mousedown', function(){
					var _index = arguments[0];
					if( videos[_index].playFlag ){
						videos[_index].playFlag = false;
						$( videos[_index] )[0].pause();
					}else{
						videos[_index].playFlag = true;
						$( videos[_index] )[0].play();
					}
				}.bind( this, i ) );
			}
		}

	}

	var p = VideoManager.prototype;
	p.init = function(){

		var videos = $( expr );
		length = videos.length;
		var objs = [];
		for( var i = 0; i < length; i++ ){
			var container = $( videos[i] );
			objs[i] = {};
			objs[i].src = container.attr('src');
			objs[i].poster = container.attr('poster');
			objs[i].class0 = container.attr('class');
			objs[i].width = $( videos[i] ).attr('width');
			if( !objs[i].width ) objs[i].width = 600;
			objs[i].height = $( videos[i] ).attr('height');
			if( !objs[i].height ) objs[i].height = 300;
			videos[i] = $( videos[i] ).replaceWith('<div class="video-div"></div>');
		}

		containers = $('.video-div');
		for( var i = 0; i < length; i++ ){
			$( containers[i] ).attr({ src:objs[i].src, poster:objs[i].poster });
			$( containers[i] ).addClass( objs[i].class0 );
			$( containers[i] ).css({
				width:objs[i].width + 'px',
				height:objs[i].height + 'px'
			});
		}

		this.setFlashVideo();

	}

	p.setFlashVideo = function(){

		for( var i = 0; i < length; i++ ){

			if( !containers[ i ].addFlag ){

				var id = 'flash-video' + i;
				var class0 =  $( containers[i] ).attr( 'class' );
				containers[ i ].addFlag = true;
				$( containers[i] ).append('<div id="' + id + '"></div>');
				var src = $( containers[i] ).attr( 'src' );

				var vars = {
					file:src,
					skin:skinUrl
					//thumb:'',
				};
				swfobject.embedSWF(
						swfPlayerUrl,
						id,
						"100%", "100%",
						"11",
						expressinstallUrl,
						vars,
						{wmode:"transparent"}
					);

				//this.addPoster( 'flash', containers[i], id  );
			}

		}

	}


	p.addPoster = function( type, container, video ){

		var src = $( container ).attr( 'poster' );
		if( !src ) return;

		var poster = $( '<img>' );
		poster.attr({
			src:src
		});
		poster.addClass('poster');
		if( type == 'html5' ){
			video.attr( 'poster', src );
		}else{
			$( container ).css({height:'369px'});
			poster.css({top:'0px'});
		}
		poster.on('click', this.posterClickHandler.bind( this, type, video, poster ));
		$( container ).append( poster );

	}

	p.posterClickHandler = function(){

		var type = arguments[0];

		var video = arguments[1];
		if( type == 'html5' ){
			video[0].play();
		}else{	//flash
			var id = video;
			var swfObj = document.all? window[ id ] : document[ id ];
			swfObj.playFromJs();	
		}

		var poster = arguments[2];
		poster.hide();

	}


	return VideoManager;

})();