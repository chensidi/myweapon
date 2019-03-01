//1.获取url参数，返回一个json对象
function getUrlComponents(url){
	var obj = {};
	url = decodeURIComponent(url);
	url = url.split("?")[1];
	var urlArr = url.split("&");
	urlArr.forEach(function(objs){
		objs = objs.split("=");
		if(objs[1]!=''){
			obj[objs[0]] = objs[1];
		}else{
			obj[objs[0]] = 'undefined';
		}
	})
	return JSON.stringify(obj);
}
//2.手机正则
function phoneReg(tel){
	var reg = /^(13|15|17|18)\d{9}$/;
	return reg.test(tel);
}
//3.邮箱正则
function emailReg(email){
	var reg = /^\w+\w*@\w+\.(com|cn|net)$/;
	return reg.test(email);
}
//4.密码验证6-12位数字字母混合
function pwdReg(pwd){
	var reg = /^\w{6,12}$/;
	var numReg = /\d/g;
	var letterReg = /[A-z]/g;
	if(reg.test(pwd)&&numReg.test(pwd)&&letterReg.test(pwd)){
		return true;
	}else{
		return false;
	}
}
//5.清除所有空格键
String.prototype.trims = function(){
	var str = this.replace(/\s/g,'');
	return str;
}
//6.获取一个字符串出现最多字符
function getMostCountFromStr(str){
	var obj = {},max = 1,letter = '';
	str = str.split('');
	str.forEach(function(objs){
		if(!obj[objs]){
			obj[objs] = 1;
		}else{
			obj[objs] += 1;
		}
	})
	for(x in obj){
		if(max < obj[x]){
			letter = x;
			max = obj[x];
		}
	}
	return {letter,max};
}
//7.数组去重
Array.prototype.unique = function(){
	var arr = [];
	this.forEach(function(obj){
		if(arr.indexOf(obj) == -1){
			arr.push(obj)
		}
	})
	return arr;
}
//8.ajax原生方法
function myAjax(url,data,method){
	var ajax = new XMLHttpRequest();
	var str = '';
	for(x in data){
		if(data[x] != ''){
			str += `${x}=${data[x]}&`
		}
	}
	str = str.split('');
	str.pop();
	str = str.join('');
	if(method == "get"){
		ajax.open('get',url+'?'+str);
		ajax.send();
	}
	else if(method == "post"){
		ajax.open('post',url);
		ajax.setRequestHeader("CONTENT-TYPE", "application/x-www-form-urlencoded");
		ajax.send(data);
	}
	ajax.onreadystatechange = function(res){
		if(ajax.readyState == 4 && ajax.status == 200){
			console.log(res.target.responseText);
		}
	}
}
//9.深度拷贝
function deepClone(org,tag){
	var orgType = Object.prototype.toString.call(org);
	if(orgType == '[object Object]'){
		tag = {};
	}else if(orgType == '[object Array]'){
		tag = [];
	}
	for(var attr in org){
		if(org.hasOwnProperty(attr)){
			if(typeof org[attr] != 'Object'){
				tag[attr] = org[attr];
			}else{
				if(Array.isArray(org[attr])){
					tag[attr] = [];
				}else{
					tag[attr] = {};
				}
				deepClone(org[attr],tag[attr]);
			}
		}
	}
	return tag;
}
//10.圣杯模式
function inherit(org,tag){
	function F(){}
	F.prototype = org.prototype;
	return (function(){
		tag.prototype = new F();
		tag.prototype.constructor = tag;
		tag.prototype.super = org;
	})()
}
//11.localStorage
const storage = {
	save:function(name,obj){
		localStorage.setItem(name,JSON.stringify(obj));
	},
	del:function(name){
		localStorage.removeItem(name);
	},
	get:function(name){
		return localStorage.getItem(name);
	},
	clr:function(){
		localStorage.clear();
	}
};
//12.console.log
function log(obj){
	console.log(obj);
};
//13.原生js的cookie技术
const ck = {
	setCookie:(name,val,time)=>{
		var times = new Date();
		time = time*24*60*60*1000;
		var expires = times.setTime(Number(times.toGMTString()) + time);
		document.cookie = `${name}=${val};expires=${expires}`;
	},
	getAllCookie:()=>{
		var ckArr = document.cookie.split("; ");
		var ckObj = {};
		ckArr.forEach(function(obj){
			obj = obj.split('=');
			ckObj[obj[0]] = obj[1];
		})
		return ckObj;
	},
	delCookie:(name)=>{
		var times = new Date();
		var expires = times.setTime(Number(times.toGMTString()) - 1000);
		document.cookie = `${name}=1;expires=${expires}`;
	},
	getOneCookie:function(name){
		return this.getAllCookie()[name]
	}
}
//14.总结
//1.NaN参与任何运算（字符串相加除外）都是NaN
//2.Infinity*0 = NaN,IInfinity / 0 = IInfinity,IInfinity % number = NaN;
//3.typeof 返回的是字符串
//4.null == uundefined;
//5.六种布尔值为假的情况 '',0,false,null,undefined,NAnalyserNode
//6.数组方法不改变原数组 join，concat，slice，toString，改变 splice,pop,shift,unshift,push,sort,reverse



//15.随机四位验证码
function getCode(){
	var str = '', i = 0;
	while(i < 4){
		var num = random(91,0);
		if(num>=0&&num<=10){
			str += num;
			i ++;
		}else if(num>64){
			num = String.fromCharCode(num);
			str += num;
			i ++;
		}
	}
	return str;
}
//16.随机数
function random(max,min){
	return Math.floor(Math.random()*(max-min) + min);
}
//17.es6 数组去重
function unique(arr){
	var newArr = new Set(arr);
	return [...newArr];
}
//18.3种遍历对象属性方法
//for...in
//Object.keys(tag)
//Object.getOwnPropertyNames(tag)
//19.promise 异步

//Promise 对象生成ajax
function ajaxs(method,obj,url){
	var objstr = '';
	for(var x in obj){
		if(obj.hasOwnProperty(x)){
			objstr += x + '=' + obj[x] + '&';
		}
	}
	objstr = objstr.split('');
	objstr.pop();
	objstr = objstr.join('');
	var promise = new Promise(function(res,rej){
		var myAjax = new XMLHttpRequest();
		if(method == 'get'){
			myAjax.open('get',url+'?'+objstr);
			myAjax.send();
		}else{
			myAjax.open('post',url);
			myAjax.setRequestHeader("CONTENT-TYPE", "application/x-www-form-urlencoded");
			myAjax.send(objstr);
		}

		myAjax.onreadystatechange = function(){
			if(this.readyState == 4 && this.status == 200){
				res(this.responseText);
			}
		};
	})
	return promise;
}

function toArr(arrlike){ //类数组转化为数组	
	return Array.from?Array.from(arrlike):[].slice.call(arrlike);
}

function flats(arr,num){
	if(Array.prototype.flat){
		return newarr = arr.flat(num);
	}
}

function myBrowser(){// 判断浏览器类型
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
    var isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器
    var isSafari = userAgent.indexOf("Safari") > -1; //判断是否Safari浏览器
 	var isChrome = userAgent.indexOf('Chrome') > -1;
 	var isEdge = userAgent.indexOf('Trident') > -1;
    if (isIE) {
        var IE5 = IE55 = IE6 = IE7 = IE8 = IE9 = IE10 = IE11 = false;
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        IE55 = fIEVersion == 5.5;
        IE6 = fIEVersion == 6.0;
        IE7 = fIEVersion == 7.0;
        IE8 = fIEVersion == 8.0;
        IE9 = fIEVersion == 9.0;
        IE10 = fIEVersion == 10.0;
        IE11 = fIEVersion == 11.0;
        if (IE55) {
            return "IE55";
        }
        if (IE6) {
            return "IE6";
        }
        if (IE7) {
            return "IE7";
        }
        if (IE8) {
            return "IE8";
        }
 		if(IE9) {
 			return "IE9";
 		}
 		if(IE10) {
 			return "IE10";
 		}
 		if(IE11) {
 			return "IE11";
 		}
    }//isIE end
	    if (isFF) {
	        return "FF";
	    }
	    if (isOpera) {
	        return "Opera";
	    }
	    if(isChrome){
	    	return 'Chrome';
	    }
	    if(isEdge){
	    	return 'Edge';
	    }
}//myBrowser() end
 
//以下是调用上面的函数
function testBrowser(){
	if (myBrowser() == "FF") {
	    console.log("我是 Firefox");
	}
	if (myBrowser() == "Opera") {
	    console.log("我是 Opera");
	}
	if (myBrowser() == "Safari") {
	    console.log("我是 Safari");
	}
	if(myBrowser() == 'Chrome'){
		console.log('google')
	}
	if(myBrowser() == 'Edge'){
		console.log('Edge');
	}
	if (myBrowser() == "IE55") {
	   console.log("我是 IE5.5");
	}
	if (myBrowser() == "IE6") {
	    console.log("我是 IE6");
	}
	if (myBrowser() == "IE7") {
	    console.log("我是 IE7");
	}
	if (myBrowser() == "IE8") {
	   console.log("我是 IE8");
	}
	if (myBrowser() == "IE9") {
	   console.log("我是 IE9");
	}
	if (myBrowser() == "IE10") {
	   console.log("我是 IE10");
	}
	if (myBrowser() == "IE11") {
	   console.log("我是 IE11");
	}
}

//Set Map 数据结构
//Set: add,delete,has,clear,size
//Map: set,delete,has,get,clear,size

//PC移动端判断
function IsPC(){  
    var userAgentInfo = navigator.userAgent;
    var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");  
    var flag = true;  
        for (var v = 0; v < Agents.length; v++) {  
            if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }  
        }  
    return flag;  
 }

