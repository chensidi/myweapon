var model = require('../model/model');
module.exports = function(app){
	// app.all("*",function(req,res,next){
	// 	res.header("Access-Control-Allow-Origin", "*");  
	//     res.header("Access-Control-Allow-Headers", "X-Requested-With");  
	//     res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");  
	//     res.header("X-Powered-By",' 3.2.1')  
	//     res.header("Content-Type", "application/json;charset=utf-8");  
	//     next();  
	// })
	app.get('/',(req,res)=>{
		res.render('index.html');
	})
	app.get('/getOne',(req,res)=>{
		var url = req.query.url,
			songName = req.query.songName;
		model.getOne(url,songName,res);
	})
	app.post('/getmv',(req,res)=>{
		var url2 = req.body.url2,
			mvName = req.body.mvName;
		model.getmv(url2,mvName,res);
	})
	app.post('/getimg',(req,res)=>{
		var imgurl = req.body.picurl,
			mmName = req.body.mmName;
		model.getimg(imgurl,mmName,res);
	})
	app.post('/tosql',(req,res)=>{
		var dturl = req.body.dturl;
		model.tosql(dturl,res);
	})
	app.post('/bigtosql',(req,res)=>{
		var bigimgurl = req.body.bigimgurl;
		model.bigtosql(bigimgurl,res);
	})
	app.get('/engine',(req,res)=>{
		res.render('engine.html');
	})
	app.get('/getinitjson',(req,res)=>{
		model.getinitjson(res);
	})
	app.post('/getlrcurl',(req,res)=>{
		var lrcurl = req.body.lrcurl;
		model.getlrcurl(lrcurl,res);
	})
	app.post('/getsinger',(req,res)=>{
		var singer = req.body.singer;
		model.getsinger(singer,res);
	})
	app.get('/dqd',(req,res)=>{
		var page = req.query.page;
		model.dqd(page,res);
	})
	app.get('/dqd3',(req,res)=>{
		var page = req.query.page;
		model.dqd3(page,res);
	})
	app.post('/news',(req,res)=>{
		var url = req.body.url;
		model.news(url,res);
	})
	app.get('/indexdt',(req,res)=>{
		res.header("Access-Control-Allow-Origin", "*");
	    res.header("Access-Control-Allow-Headers", "X-Requested-With");
	    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
	    res.header("X-Powered-By",' 3.2.1')
	    res.header("Content-Type", "application/json;charset=utf-8");
	    model.getindexdt(res);
	})
	app.get('/getmode',(req,res)=>{
		res.header("Access-Control-Allow-Origin", "*");
	    res.header("Access-Control-Allow-Headers", "X-Requested-With");
	    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
	    res.header("X-Powered-By",' 3.2.1')
	    res.header("Content-Type", "application/json;charset=utf-8");
	    var wd = req.query.wd;
	    model.getmode(wd,res);
	})
	app.get('/getarticle',(req,res)=>{
		res.header("Access-Control-Allow-Origin", "*");
	    res.header("Access-Control-Allow-Headers", "X-Requested-With");
	    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
	    res.header("X-Powered-By",' 3.2.1')
	    res.header("Content-Type", "application/json;charset=utf-8");
	    var cur = req.query.cur;
	    model.getarticle(cur,res);
	})
	app.post('/getonearticle',(req,res)=>{
		res.header("Access-Control-Allow-Origin", "*");
	    res.header("Access-Control-Allow-Headers", "X-Requested-With");
	    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
	    res.header("X-Powered-By",' 3.2.1')
	    res.header("Content-Type", "application/json;charset=utf-8");
	    var titlea = req.body.titlea;
	    console.log(req.body)
	    model.getone(titlea,res);
	})
	app.post('/baidu',(req,res)=>{
		var kw = req.body.kw;
		kw = encodeURIComponent(kw);
		model.baidu(kw,res);
	})
}