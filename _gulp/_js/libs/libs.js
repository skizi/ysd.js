
YSD.libs = {};

/****************************************************************/
//スムーススクロール
/****************************************************************/
YSD.libs.smoothScroll = function( speed, offsetY ){
	if( !speed ) speed = 400;
	if( !offsetY ) offsetY = 0;

	$('a[href^=#]').off( 'click', scrollClickHandler );
	$('a[href^=#]').on( 'click', scrollClickHandler );
	function scrollClickHandler(){
		var href= $(this).attr("href");
		var target = $(href == "#" || href == "" ? 'html' : href);
		var position = target.offset().top + offsetY;
		$('body,html').animate({scrollTop:position}, speed, 'swing');
		return false;
	}
}


/****************************************************************/
//ディレイ
/****************************************************************/
YSD.libs.delay = function( delay, func ){

	setTimeout(func, delay);

}

