# ysd.js
javaScript library


■YSD.CanvasRgbShiftAnimater、YSD.CanvasMosaicAnimater  
元画像をCanvasエフェクトさせる（マウスオーバーに合わせて実行や、逆再生も可能）  
![YSD.CanvasRgbShiftAnimater、YSD.CanvasMosaicAnimater](http://skizi.jp/github/assets/images/canvas_animater.gif)
```
var canvas1 = $( '#canvas1' );
var img = $( '#img1' );
var animater1 = new YSD.CanvasRgbShiftAnimater( canvas1[0], img[0], 10, 10, 30 );
animater1.loopFlag = true;
animater1.play();
```


■YSD.AudioManager  
PCブラウザ、スマホブラウザ両対応　音再生ライブラリ  
パソコンの場合はAudioタグ、スマホの場合はWebAudioが内部的に使われます
```
var audioManager = new YSD.AudioManager();
var datas = [
	{
		value:'se0',
		src:'assets/sound/0.ogg'
	},
	{
		value:'se1',
		src:'assets/sound/1.ogg'
	}
];
if( ua.platform != 'pc' ){
	datas[0].src = 'assets/sound/0.m4a';
	datas[1].src = 'assets/sound/1.m4a';
}

audioManager.loadAudios( datas, function(){
	$( '#audioBtn1' ).on( 'click', function(){
		audioManager.play( 'se0' );
	});
});
```


■YSD.CameraManager  
Webカメラ　ヘルパー  
```
var video = $( '#video1' );
var cameraManager = new YSD.CameraManager( video );
video.attr({ width:300 });
```


■YSD.TouchManager　　
PCブラウザ、スマホブラウザ両対応　マウスイベント/タッチイベント自動切り替え
```
var textarea = $( '#mousePosition' );
var touchManager = new YSD.TouchManager();
touchManager.setTouchStartFunc(function(){
	textarea.val( 'touchstart/mousedown' );
});

touchManager.setTouchMoveFunc(function(){
	textarea.val( 'touchmove/mousemove x:' + YSD.touch.x + ', y:' + YSD.touch.y );
});

touchManager.setTouchEndFunc(function(){
	textarea.val( 'touchend/mouseup' );
});
```


■YSD.UserAgent  
ユーザーエージェント情報を取得。スマホかパソコンか、何のブラウザかの判定、ブラウザのバージョンの確認
```
var ua = new YSD.UserAgent();
if( ua.browser == 'chrome' ) alert( 'chrome' );
if( ua.browser == 'ie' ) alert( ua.ieVer );
```


■YSD.utils.getStageProperty
ブラウザのwindow、documentのサイズを取得 
```
console.log( YSD.utils.getStageProperty() );
{
	h:894,
	w:833,
	clientH:894,
	clientW:816,
	documentH:1301,
	documentW:800
}
```