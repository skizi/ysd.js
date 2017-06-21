# ysd.js
javaScript library

■HTML5オーディオライブラリ  
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

■ユーザーエージェントヘルパー  
YSD.UserAgent  
・スマホかパソコンか、何のブラウザかの判定、ブラウザのバージョンの確認
```
var ua = new YSD.UserAgent();
if( ua.browser == 'chrome' ) alert( 'chrome' );
if( ua.browser == 'ie' ) alert( ua.ieVer );
```
