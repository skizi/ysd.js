YSD.VideoManager3 = (function(){

	var ua;
	
	var expr = '';
	var containers;
	var length = 0;
	var swfPlayerUrl = '';
	var expressinstallUrl = '';
	var skinUrl = '';

	function VideoManager3( _expr, _swfPlayerUrl, _expressinstallUrl, _skinUrl ){

		expr = _expr;
		swfPlayerUrl = _swfPlayerUrl;
		expressinstallUrl = _expressinstallUrl;
		skinUrl = _skinUrl;

		ua = new YSD.UserAgent();
		this.init();

	}

	var p = VideoManager3.prototype;
	p.init = function(){

		containers = $( expr );
		length = containers.length;

		if( ua.browser == 'ie' && ua.ieVer < 9 ){
		//if( true ){
			this.setFlashVideo();
		}else{
			this.setHtml5Video();
		}

	}


	p.setHtml5Video = function(){

		for( var i = 0; i < length; i++ ){

			if( !containers[ i ].addFlag ){

				var src = $( containers[i] ).attr( 'src' );
				var thumbnailSrc = $( containers[i] ).attr( 'poster' );
				var video = $('<video>');
				video.attr({
					controls: true,
					src:src,
					poster:thumbnailSrc,
					width:'100%'
				});
				containers[ i ].addFlag = true;
				$( containers[i] ).append( video );

				this.addPoster( 'html5', containers[i], video );
			}
			
		}

	}


	p.setFlashVideo = function(){

		for( var i = 0; i < length; i++ ){

			if( !containers[ i ].addFlag ){

				var id = 'flash-video' + i;
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

				this.addPoster( 'flash', containers[i], id  );

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


	return VideoManager3;

})();