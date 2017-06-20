
/****************************************************************/
//FPS、this.deltaTimeの取得クラス
/****************************************************************/
YSD.Time = (function(){
	
	function Time(){

		this.interval = 0;
		this.lastTime = 0;
		this.deltaTime = 0;
	
	}


	Time.prototype = {

		//------------------------フレームレート測定------------------------
		getFps : function(){

			this.deltaTime = this.getDelta();

	        this.interval += this.deltaTime;
	        if (this.interval > 1000) {
	            this.interval = 0;
	            var fps = Math.floor(1000 / this.deltaTime);
	            return "this.deltaTime:" + this.deltaTime + ", fps:" + fps;
	        } 

		},

		//------------------------デルタタイム取得------------------------
		getDelta : function(){
	        var dateNow = Date.now();
	        this.deltaTime = dateNow - this.lastTime;
	        this.lastTime = dateNow;
			return this.deltaTime;
		},


		//------------------------ミリ秒の取得------------------------
		getTime : function(){
	        var dateNow = Date.now();
			return dateNow;
		},


		//------------------------twitterのタイムコードを日付に変換------------------------
		// "Tue Feb 17 17:13:02 +0900 2015" -> '2015/02/09 19:49'
		getDate1 : function( dateStr ){
			
			var strs = dateStr.split(" ");
			dateStr = strs[1]+" "+strs[2]+", "+strs[5]+" "+strs[3];
			//dateStr = strs[0]+", " +strs[2]+" "+strs[1]+" "+strs[5]+" "+strs[3]+" "+strs[4];
			var dd = new Date( dateStr );

			return this.getDateTime( dd );

		},


		//1424160782 -> '2015/02/09 19:49'
		getDate2 : function( EpochSec ){

			var dd = new Date();
			//EpochSec = EpochSec + 32400;
			dd.setTime( EpochSec * 1000 );

			return this.getDateTime( dd );
			
		},


		getDateTime : function( dd ){

			var year = dd.getFullYear();	//getYear
			if( year < 1900 ) year += 1900;
			var month = dd.getMonth() + 1;
			var day = dd.getDate();
			var hour = dd.getHours();// + 9;
			//if( hour > 23 ){
			//	hour -= 24;
			//	day += 1;
			//}
			var min = dd.getMinutes();

			//'PM 01:00'
			var time = this.getTime1( hour, min );

			//'2015/2/20'
			var date = year + '/' + month + '/' + day;

			return { date:date, time:time };
		},


		getTime1 : function( hour, min ){

			min = '' + min;
			if( min.length == 1 ) min = '0' + min;

			if( hour < 13 ){
				hour += '';
				if( hour.length == 1 ) hour = '0' + hour;
				var time = 'AM ' + hour + ':' + min;
			}else{
				hour = hour - 12;
				hour += '';
				if( hour.length == 1 ) hour = '0' + hour;
				var time = 'PM ' + hour + ':' + min;
			}

			return time;

		}

	}

	return Time;

})();


