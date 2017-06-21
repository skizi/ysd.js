

//まだiphoneのsafariに対応していない
YSD.CameraManager = (function(){
	
	var localMediaStream = null;
	this.video;
	this.canvas;
	var ctx;


	function CameraManager(){

		navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
 		window.URL = window.URL || window.webkitURL;

		this.video = $('<video>');
		this.canvas = $('<canvas>');
		ctx = this.canvas[0].getContext('2d');

		if (this.hasGetUserMedia()) {
			console.log("カメラ OK");
		} else {
			console.log("未対応ブラウザです。");
		}

		navigator.getUserMedia({video: true}, function(stream) {
		  if( this.video ) this.video.src = window.URL.createObjectURL(stream);
		  localMediaStream = stream;
		}, this.onFailSoHard);

	}


	CameraManager.prototype = {
	 
		hasGetUserMedia : function() {
			return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
				navigator.mozGetUserMedia || navigator.msGetUserMedia);
		},


		onFailSoHard : function( e ) {
			console.log('エラー!', e);
		},


		//----------------------------------グローバル関数-----------------------------------
		snapshot : function() {
			if (localMediaStream) {
				ctx.drawImage( this.video, 0, 0);
				return this.canvas.toDataURL('image/webp');
			}
		}


	}

	return CameraManager;

})();