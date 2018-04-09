/*
	定义符合requirejs规范的模块
		* 引入模块的回调函数中得到什么，就return什么
 */
define(['jquery'],function($){

	return {
		randomNumber:function(min, max){
			return parseInt(Math.random() * (max - min + 1)) + min;
		},
		randomColor:function(){
			var r = randomNumber(0, 255);
			var g = randomNumber(0, 255);
			var b = randomNumber(0, 255);
			return 'rgb(' + r + ',' + g + ',' + b + ')';
		}
		// Cookie:{
		// /**
	 //  * [获取cookie]
	 //  * @param  {String} key [cookie名]
	 //  * @return {String}      [返回cookie自]
	 //  */
		// get: function get(key) {
		// 	// 先获取所有cookie
		// 	var cookies = document.cookie;
		// 	if (cookies.length === 0) {
		// 		return '';
		// 	}

		// 	// 拆分每一个cookie
		// 	cookies = cookies.split('; ');

		// 	for (var i = 0; i < cookies.length; i++) {
		// 		// 拆分key,value
		// 		var arr = cookies[i].split('=');

		// 		if (arr[0] === key) {
		// 			return arr[1];
		// 		}
		// 	}
		// },

		// *
	 //  * [设置/修改cookie]
	 //  * @param {String} key   [cookie名]
	 //  * @param {String} value [cookie值]
	 //  * @param {[Date]} date  [有效期，必须为Date类型]
	 //  * @param {[String]} path  [cookie保存路径]
	  
		// set: function set(key, value, date, path) {
		// 	var str = key + '=' + value;

		// 	// 有效期
		// 	if (date) {
		// 		str += ';expires=' + date.toUTCString();
		// 	}

		// 	// 路径
		// 	if (path) {
		// 		str += ';path=' + path;
		// 	}

		// 	document.cookie = str;
		// },

		// /**
	 //  * [删除cookie]
	 //  * @param  {String} key [cookie名]
	 //  * @param {[String]} path     [cookie保存的路径]
	 //  */
		// remove: function remove(key, path) {
		// 	var d = new Date();
		// 	d.setDate(d.getDate() - 1);

		// 	// document.cookie = key + '=x;expires=' + d.toUTCString();
		// 	this.set(key, 'x', d, path);
		// },

		// // 清空cookie
		// clear: function clear() {}
		// }
	}
})