var def = $.Deferred(); //全局延迟对象

function changestatus(def){
	var change = function(){
		def.resolve();
	}
	setTimeout(()=>{
		change();
	},3000)
	return def; //返回该延迟对象
}

function changestatus1(def){
	var change = function(){
		def.resolve();
	}
	setTimeout(()=>{
		change();
	},3000)
	return def.promise();//返回的是promise对象
}

function changestatus2(){ //内部产生延迟对象
	var def = $.Deferred();
	var change = function(){
		def.resolve();
	}
	setTimeout(()=>{
		change();
	},3000)
	return def.promise();
}

var nowdone = function(){
	$.when(changestatus()).done(()=>{ //立即执行，$.when()只能接受延迟对象或者ajax请求。
		console.log('done');
	}).fail(()=>{
		console.log('fail');
	})
}


$.when(changestatus(def)).done(()=>{ //延迟执行。观察def的状态
	console.log('done');
}).fail(()=>{
	console.log('fail');
})

$.when(changestatus1(def)).done(()=>{ //延迟执行。观察def的promise状态
	console.log('done');
}).fail(()=>{
	console.log('fail');
})

$.when(changestatus2()).done(()=>{ //延迟执行。将def变为内部变量，外部无法修改
	console.log('done');
}).fail(()=>{
	console.log('fail');
})

$.Deferred(changestatus1).done(()=>{ //延迟执行。$.Defered()产生的延迟对象作为函数的参数
	console.log('done');
}).fail(()=>{
	console.log('fail');
})
