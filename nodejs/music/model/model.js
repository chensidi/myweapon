var http = require('http'),
	https = require('https'),
	cheerio = require('cheerio'),
	fs = require('fs'),
	iconv = require('iconv-lite'),
	mysql = require('mysql'),
	CircularJSON = require('circular-json');
var connection = mysql.createConnection({//创建连接数据库/表
	host : 'localhost',
	user : 'root',
	password : 'root',//root
	database : 'images',
	multipleStatements: true 
})
connection.connect();
module.exports = {
	getOne:function(url,songName,res){	
		http.get(url,(ress)=>{
			var resstr = '';
			ress.setEncoding('binary');
			var path = songName + '.mp3';
			ress.on('data',function(chunk){
				resstr += chunk;
			})
			ress.on('end',function(){
				fs.writeFile('static/music/'+path,resstr,'binary',function(err){
					if(!err){
						console.log('down load');
						res.end('down load');
					}
				})
			})
		})
	},
	getmv:function(url2,mvName,res){
		http.get(url2,(ress)=>{
			var mvstr = '',mv = mvName + '.mp4';
			ress.pipe(fs.createWriteStream('static/music/'+mv)).on('close',()=>{
				console.log('mv down');
				res.end('mv down');
			})
		})
	},
	getimg:function(imgurl,mmName,res){
		http.get(imgurl,(ress)=>{
			var dtstr = '';
			var buffers = [],len = 0;
			// ress.setEncoding('utf-8');
			ress.on('data',(chunk)=>{
				// dtstr += chunk;
				buffers.push(chunk);
				len += chunk.length;
			})
			ress.on('end',()=>{
				var newdtstr = Buffer.concat(buffers,len);
				var change_data = iconv.decode(newdtstr,'gb2312');
				// console.log(change_data.toString())
				filterimg(change_data.toString(),mmName);
			})
		})
	},
	tosql:function(dturl,res){
		http.get(dturl,(ress)=>{
			var buffers = [],len = 0;
			ress.on('data',(chunk)=>{
				buffers.push(chunk);
				len += chunk.length;
			})
			ress.on('end',()=>{
				var newdtstr = Buffer.concat(buffers,len);
				var change_data = iconv.decode(newdtstr,'gb2312');
				writeToSql(change_data,res);
			})
		})
	},
	bigtosql:function(bigimgurl,res){
		http.get(bigimgurl,(ress)=>{
			var buffers = [],len = 0;
			ress.on('data',(chunk)=>{
				buffers.push(chunk);
				len += chunk.length;
			})
			ress.on('end',()=>{
				var newdtstr = Buffer.concat(buffers,len);
				var change_data = iconv.decode(newdtstr,'gb2312');
				filterbigimg(change_data,res);
			})
		})
	},
	getinitjson:function(res){
		https.get('https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=you',(ress)=>{
			// console.log(ress);
			ress = CircularJSON.stringify(ress);
			res.end(ress);
		})
	},
	getindexdt:function(res){
		var sql = `select * from mm where kind = ? order by id desc limit 0,4;
				   select * from mm where kind = ? order by id desc limit 0,5;
				   select * from mm where kind = ? order by id desc limit 0,5;
				   select * from mm where kind = ? order by id desc limit 0,4;
				   select * from mm where kind = ? order by id desc limit 0,4;
				   select * from mm where kind = ? order by id desc limit 0,4;
				   select * from mm where kind = ? order by id desc limit 0,4;
				   `;
			params = ['电脑壁纸','手机壁纸','性感美女','性感美女','网友自拍','高跟丝袜','国内美女'];
		connection.query(sql,params,(err,dt)=>{
			if(!err){
				// console.log(dt);
				res.json(dt)
			}else{
				console.log(err);
			}
		})
	},
	getmode:function(wd,res){
		var sql = `select * from mm where kind = ? order by id desc limit 0,4;
				   select * from mm where kind = ? order by id desc limit 4,20;`;
			params = [wd,wd];
		connection.query(sql,params,(err,dt)=>{
			if(!err){
				// console.log(dt);
				res.json(dt);
			}else{
				console.log(err);
			}
		})
	},
	getlrcurl:function(lrcurl,res){
		http.get(lrcurl,(ress)=>{
			var dtstr = '';
			ress.setEncoding('utf-8');
			ress.on('data',(chunk)=>{
				dtstr += chunk;
			})
			ress.on('end',()=>{
				// console.log(dtstr);
				filterLrc(dtstr,res);
			})
		})
	},
	getsinger:function(singer,res){
		http.get(singer,(ress)=>{
			var dtstr = '';
			ress.setEncoding('utf-8');
			ress.on('data',(chunk)=>{
				dtstr += chunk;
			})
			ress.on('end',()=>{
				filtersong(dtstr,res);
			})
		})
	},
	dqd:function(page,res){
		console.log(page)
		var url =`http://www.dongqiudi.com/?tab=1&page=${page}`;
		http.get(url,(ress)=>{
			var dtstr = '';
			ress.on('data',(chunk)=>{
				dtstr += chunk;
			})
			ress.on('end',()=>{
				// console.log(dtstr.toString());
				filterDQD(dtstr,res);
			})
		})
	},
	dqd3:function(page,res){
		console.log(page)
		var url =`api?tab=1&page=${page}`;
		http.get(url,(ress)=>{
			var dtstr = '';
			ress.on('data',(chunk)=>{
				dtstr += chunk;
			})
			ress.on('end',()=>{
				// console.log(dtstr.toString());
				filterDQD3(dtstr,res);
			})
		})
	},
	news:function(url,res){
		https.get(url,(ress)=>{
			var dtstr = '';
			ress.on('data',(chunk)=>{
				dtstr += chunk;
			})
			ress.on('end',()=>{
				// console.log(dtstr.toString());
				filternews(dtstr,res);
			})
		})
	},
	getarticle:function(cur,res){
		var sql = 'select * from article order by id desc limit ?,10;',
			params = [(cur-1)*10];
		connection.query(sql,params,(err,dt)=>{
			if(!err){
				// console.log(dt);
				res.json(dt);
			}else{
				console.log(err);
			}
		})
	},
	getone:function(titlea,res){
		var sql = 'select * from details where h1 = ?;',
			params = [titlea];
		connection.query(sql,params,(err,dt)=>{
			if(!err){
				console.log(dt);
				res.json(dt);
			}
		})
	},
	baidu:function(kw,res){
		https.get(`https://www.baidu.com/su?&wd=${kw}&t=${new Date().getTime()}`,(ress)=>{
			var dtstr = '';
			var buffers = [],len = 0;
			ress.on('data',(chunk)=>{
				buffers.push(chunk);
				len += chunk.length;
			})
			ress.on('end',()=>{
				dtstr = Buffer.concat(buffers,len);
				dtstr = iconv.decode(dtstr,'gb2312')
				// console.log(dtstr);
				res.json(dtstr)
			})
		})
	}
}

function filterimg(html,mmName){
	var $ = cheerio.load(html,{decodeEntities: false});
	// var bigimgs = $('.big_img img');
	// bigimgs = Array.from(bigimgs);
	// var imgArr = [];
	// bigimgs.map(x=>imgArr.push(x.attribs.src));
	// downloadimgs(imgArr);
	// 
	if(!fs.existsSync(`static/img/${mmName}`)){
		fs.mkdirSync(`static/img/${mmName}`);
	}
	var prd = $('.product01 a img');
	prd = Array.from(prd);
	downloadimgs(prd,mmName);
}

function downloadimgs(imgArr,mmName){
	imgArr.map((img)=>{
		http.get(img.attribs.src,(res)=>{
			var alt = img.attribs.alt;
			alt = alt.replace(/\//g,'&');
			res.pipe(fs.createWriteStream(`static/img/${mmName}/${alt}.jpg`)).on('close',()=>{
				console.log('图片下载完成');
			})
		})
	})
}

function writeToSql(html,res){
	var $ = cheerio.load(html,{decodeEntities:false});
	var prd = $('.product01 a img'),kind = $('.title').eq(1).text();
	prd = Array.from(prd);
	prd.map((dt)=>{
		var sql = 'insert into mm values(null,?,?,?)',
			params = [kind,dt.attribs.alt,`img/${kind}/${dt.attribs.alt}.jpg`];
		connection.query(sql,params,(err,dt)=>{
			if(!err){
				console.log('写入成功');
				res.end('写入成功');
			}else{
				console.log(err);
			}
		})
	})
}

function filterbigimg(html,res){
	var $ = cheerio.load(html,{decodeEntities:false});
	var bigimgs = $('.big_img img');
	bigimgs = Array.from(bigimgs);
	var kind = $('.position a').eq(1).text();
	var titlea = $('title').text();
	bigimgs.map((img)=>{
		http.get(img.attribs.src,(ress)=>{
			var time = new Date().getTime();
			// ress.pipe(fs.createWriteStream(`static/img/upload/${time}.jpg`)).on('close',()=>{
			// 	console.log('下载完成');
			// 	res.end(`下载完成${time}`);
			// 	var sql = 'insert into bigimgs values(null,?,?,?)',
			// 		params = [kind,titlea,`img/upload/${time}.jpg`];
			// 	connection.query(sql,params,(err)=>{
			// 		if(!err){
			// 			console.log('big 写入成功');
			// 			res.end(`big 写入成功${time}`)
			// 		}
			// 	})
			// })
			ress.setEncoding('binary');
			var imgstr = '';
			ress.on('data',(chunk)=>{
				imgstr += chunk;
			})
			ress.on('end',()=>{
				fs.writeFile('static/img/upload/'+time+'.jpg',imgstr,'binary',(err)=>{
					if(!err){
						console.log('下载完成');
						res.end(`下载完成${time}`);
						var sql = 'insert into bigimgs values(null,?,?,?)',
						params = [kind,titlea,`img/upload/${time}.jpg`];
						connection.query(sql,params,(err)=>{
							if(!err){
								console.log('big 写入成功');
								res.end(`big 写入成功${time}`)
							}
						})
					}else{
						console.log(err)
					}
				})
			})
		})
	})
}

function filterLrc(html,res){
	var $ = cheerio.load(html,{decodeEntities:false});
	var lrc = $('.geciInfo').eq(1).text();
	var titlea = $('.geciText li').eq(0).find('a').text();
	var newlrc = lrc.replace(/.+?(?=\[)/,'');
	var sql = 'insert into lrcs values(null,?,?);',
		params = [titlea,newlrc];
	connection.query(sql,params,(err)=>{
		if(!err){
			console.log('歌词下载完成');
			res.end('歌词下载完成');
		}else{
			console.log(err);
		}
	})
}

function filtersong(html,res){
	var $ = cheerio.load(html,{decodeEntities:false});
	var song = $('.chi');
	song = Array.from(song);
	var tagArr = [];
	song.map((obj)=>{
		tagArr.push(obj.attribs.href);
	})
	// tagArr.shift();
	console.log(tagArr)
	for(let i = 0; i < tagArr.length; i ++){
		setTimeout(()=>{
			http.get(tagArr[i],(ress)=>{
				var dtstr = '';
				ress.setEncoding('utf-8');
				ress.on('data',(chunk)=>{
					dtstr += chunk;
				})
				ress.on('end',()=>{
					filterLrc(dtstr,res);
				})
			})
		},i*1000)
	}
}

function filterDQD(html,res){
	var $ = cheerio.load(html,{decodeEntities:false});
	var arr = [];
	$('#news_list ol li').each(function(){
		var img = $(this).find('img').attr('src'),
			title = $(this).find('h2 a').text(),
			time = $(this).find('.time').text(),
			txt = $(this).find('p').text();
		var obj = {img,title,time,txt};
		arr.push(obj);
	})
	arr.reverse();
	res.json(arr);
	arr.map((obj)=>{
		var sql = 'insert into article values(null,?,?,?,?)',
			params = [obj.img,obj.title,obj.time,obj.txt];
		connection.query(sql,params,(err)=>{
			if(!err){
				console.log('写入成功');
			}
		})
	})
}
function filterDQD3(html,res){
	var $ = cheerio.load(html,{decodeEntities:false});
	var arr = [];
	$('#news_list ol li').each(function(){
		var href = $(this).find('a').attr('href');
		arr.push(href);
	})
	// console.log(arr);
	arr.map((href)=>{
		https.get(href,(ress)=>{
			var dtstr = '';
			ress.on('data',(chunk)=>{
				dtstr += chunk;
			})
			ress.on('end',()=>{
				filternews(dtstr,res);
			})
		})
	})
}
function filternews(html,res){
	var $ = cheerio.load(html,{decodeEntities:false});
	var h1 = $('.detail>h1').html(),
		h4 = $('.detail>h4').html(),
		div = $('.detail>div').eq(0).html();
	var obj = {h1,h4,div};
	// console.log(h4)
	// res.json(obj);
	var sql = 'insert into details values(null,?,?,?)',
		params = [h1,h4,div];
	connection.query(sql,params,(err)=>{
		if(!err){
			console.log('写入成功');
		}
	})
}