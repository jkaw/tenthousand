var port = 8080;
var express = require('express');
var	app = express();
var http = require('http').Server(app);

app.get('/*',function(req,res){
	var dictionary = require('url').parse(req.url, true);
	//console.log(dictionary.pathname);
	res.sendFile(__dirname + '/public'+dictionary.pathname);
});

http.listen(port,function(){
	console.log('Web Server running on port '+port+'.');
});
