var express = require('express'),
	body = require('body-parser').urlencoded({extended:false}),
	router = require('./control/router');

var app = express();
app.use(body);
app.use(express.static("static"));

app.set("views",__dirname+"/views");
app.engine(".html",require("ejs").__express);
app.set("view engine","ejs");

router(app);
app.listen(80,()=>{
	console.log('success!')
})