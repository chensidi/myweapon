//1.对象冒充
function Parent(name){
	this.name = name;
	this.sayhello = function(){
		console.log('hello');
	}
}

function Child(name,nickname){
	this.method = Parent;
	this.method(name);
	delete this.method;
	this.nickname = nickname;
	this.sayworld = function(){
		console.log('world');
	}
}

//2.call
function Child1(name,nickname){
	Parent.call(this,name);
	this.nickname = nickname;
	this.sayworld = function(){
		console.log('world');
	}
}

//3.apply 
function Child2(name,nickname){
	Parent.apply(this,[name]);
	this.nickname = nickname;
	this.sayworld = function(){
		console.log('world');
	}
}

//4.原型链
Parent.prototype.drink = function(){
	console.log("I'am drinking");
}
Parent.prototype.lastname = 'china';

function Child3(){}
Child3.prototype = new Parent();

//5.混合模式
function Child4(name,nickname){
	Parent.call(this,name);
	this.nickname = nickname;
	this.sing = function(){
		console.log('wonderful');
	}
}
Child4.prototype = new Parent();