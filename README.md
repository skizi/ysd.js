# ysd.js
javaScript library

■音のヘルパー  
YSD.AudioManager  
・パソコン、スマホ両対応のオーディオライブラリ。  
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

audioManager.loadAudios( datas, function(){
	audioManager.play( 'se1' );
});
```

■ユーザーエージェントのヘルパー  
YSD.UserAgent  
・スマホかパソコンか、何のブラウザかの判定、ブラウザのバージョンの確認
```
var ua = new YSD.UserAgent();
if( ua.browser == 'chrome' ) alert( 'chrome' );
if( ua.browser == 'ie' ) alert( ua.ieVer );
```


■マウスイベント・タッチイベントのヘルパー  
YSD.TouchManager　　
```
var touchManager = new YSD.TouchManager();
touchManager.setTouchStartFunc(function(){
	console.log( 'touchstart/mousedown' );
});

touchManager.setTouchMoveFunc(function(){
	console.log( 'touchmove/mousemove' );
	console.log( 'x:' + YSD.touch.x + ', y:' + YSD.touch.y ); //座標取得
});

touchManager.setTouchEndFunc(function(){
	console.log( 'touchend/mouseup' );
});
```


■window、documentの縦横のサイズを取得  
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


■Webカメラのヘルパー  
YSD.CameraManager　　
```
var cameraManager = new YSD.CameraManager();
$( document.body ).append( cameraManager.video );
```


■画像をcanvasを使用しRGBシフトエフェクトさせる
```
var canvas = $( 'canvas' );
var img = $( '#img1' );
canvas.attr({ width:img.width(), height:img.height() });

var animater = new YSD.CanvasRgbShiftAnimater0(
	canvas[0], //canvasエレメント
	img[0], //imgエレメント
	10, //アニメーションフレーム数
	10, //RGBシフトの強度
	30 //fps
);
animater.play();
```