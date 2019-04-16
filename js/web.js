(function(){

    $.extend(String.prototype,{
        title: function(){
            return this.replace(/\b(\w)/ig,function($,$1){
                $1 = $1.toUpperCase();
                return $1;
            })
        },

        capitalize: function(){
            return this.replace(/\b(\w)/,function($,$1){
                $1 = $1.toUpperCase();
                return $1;
            })
        },

        format: function(...rest){
            let x = [...rest];
            return this.replace(/(\{(\d+)\})/ig,function($,$1,$2){
                $1 = x[$2];
                return $1;
            })
        },

        join: function(flag){
            return this.split('').join(flag);
        },

        max: function(start=0,end=this.lenght){
            let temp = this.slice(start,end).split(''),
                max = temp[0];
            for(let item of temp){
                if(max < item){
                    max = item;
                }
            }
            return max;
        }
    })

   

    function Web(){
        this.getUrlComponents = function(url){
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
            return obj;
        }

        this.phoneReg = function(tel){
            var reg = /^(13|15|17|18)\d{9}$/;
            return reg.test(tel);
        }

        this.emailReg = function(email){
            var reg = /^\w+\w*@\w+\.(com|cn|net)$/;
            return reg.test(email);
        }

        this.pwdReg = function(pwd){
            var reg = /^\w{6,12}$/;
            var numReg = /\d/g;
            var letterReg = /[A-z]/g;
            if(reg.test(pwd)&&numReg.test(pwd)&&letterReg.test(pwd)){
                return true;
            }else{
                return false;
            }
        }

        //清除所有空格键
        this.trims = function(){
            var str = this.replace(/\s/g,'');
            return str;
        }

        //数组去重
        this.unique = function(arr){
            if(typeof Set != 'undefined'){
                return [...new Set(arr)]
            }
            var arr = [];
            this.forEach(function(obj){
                if(arr.indexOf(obj) == -1){
                    arr.push(obj)
                }
            })
            return arr;
        }

        //ajax native
        this.myAjax = function(url,data,method,cb){
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
                    cb(res.target.responseText)
                }
            }
        }

        //localStorage
        this.storage = {
            set:function(key,obj){
                localStorage.setItem(key,JSON.stringify(obj));
            },
            del:function(key){
                localStorage.removeItem(key);
            },
            get:function(key){
                return localStorage.getItem(key);
            },
            clr:function(){
                localStorage.clear();
            }
        }

        //cookie
        this.cookie = {
            set:function(key,val,time){
                var times = new Date();
                time = time*24*60*60*1000;
                times.setTime(times.getTime() + time);
                var expires = "expires="+times.toGMTString();
                // document.cookie = `${key}=${val}; ${expires}`;
                document.cookie = key + '=' + val + '; ' + expires;
            },
            gets:function(){
                var ckArr = document.cookie.split("; ");
                var ckObj = {};
                ckArr.forEach(function(obj){
                    obj = obj.split('=');
                    ckObj[obj[0]] = obj[1];
                })
                return ckObj;
            },
            del:function(key){
                var times = new Date();
                times.setTime(times.getTime() - 1000);
                var expires = "expires="+times.toGMTString();
                // document.cookie = `${key}=1; ${expires}`;
                document.cookie = key + '=1' + '; ' + expires;
            },
            get:function(key){
                return this.gets()[key];
            }
        }

        //验证码
        this.yzm = function(len){
            var str = '', i = 0;
            while(i < len){
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

        //随机数
        this.random = function(max,min){
            return Math.floor(Math.random()*(max-min) + min);
        }

        //like array to array
        this.toArray = function(arrlike){
            return Array.from?Array.from(arrlike):[].slice.call(arrlike);
        }

        this.myBrowser = function(){
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
        }

        this.testBrowser = function(){
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

        this.IsPC = function(){
            var userAgentInfo = navigator.userAgent;
            var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");  
            var flag = true;  
            for (var v = 0; v < Agents.length; v++) {  
                if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }  
            }  
            return flag;
        }

        this.localCity = function(){
            $.ajax({
                url: 'http://api.map.baidu.com/location/ip?ak=ia6HfFL660Bvh43exmH9LrI6',  
                type: 'POST',  
                dataType: 'jsonp',
                success:function(data) {  
                    console.log(data);
                }
            });
        }

        this.localIp = function(){
            $.ajax({
                url: 'http://ip-api.com/json',
                success: function(data){
                console.log(data);
                },
                type: 'GET',
                dataType: 'JSON'
            });
        }

        this.dateStr = function(){
            var now = new Date();
            now = now.getFullYear() + '年' + 
                Number(now.getMonth())+1 + '月' +
                now.getDate() + '日';
            return now;
        }

        this.dateStrs = function(){
            var now = new Date();
            now = now.getHours() + ':' + 
                now.getMinutes()<9?'0'+(Number(now.getMinutes())+1):Number(now.getMinutes())+1 + ':' +
                now.getSeconds();
            return now;
        }

        this.search = function(){
            return location.search;
        }

    }
    return new Web();
})()