function move(obj,json,s){
					clearInterval(obj.timer);
					obj.timer = setInterval(function(){
						var key = true;
						for(var attr in json){
							var cur ;
							cur = parseInt(getStyle(obj,attr));
							var speed = (json[attr] - cur) / s;
							speed = speed >0 ? Math.ceil(speed) : Math.floor(speed);
							if(cur != json[attr]){
								key = false;
							}else{
								key = true;
							}
							obj.style[attr] = cur + speed + "px";
						}
						if(key){
							clearInterval(obj.timer);
						}
					},80)
				}
function getStyle(elem,prop){
return getComputedStyle(elem) ? getComputedStyle(elem)[prop] : elem.currentStyle[prop];
}