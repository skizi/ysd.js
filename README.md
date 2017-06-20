# ysd.js
javaScript library

■HTML5オーディオライブラリ
YSD.AudioManager
・パソコン、スマホ両対応のオーディオライブラリ。
パソコンの場合はAudioタグ、スマホの場合はWebAudioが内部的に使われます
```
var audioManager = new AudioManager();
var data = {
  value:0,
  type:'bgm',
  src:'sound/0.ogg'
};
audioManager.loadAudio( data, function(){
  audioManager.play( 'bgm0' );
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
