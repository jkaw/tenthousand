var port = 8080;
var express = require('express');
var	app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/*',function(req,res){
	var dictionary = require('url').parse(req.url, true);
	//console.log(dictionary.pathname);
	res.sendFile(__dirname + '/public'+dictionary.pathname);
});

io.on('connection', function(socket){
	socket.on('chat_message', function(msg){
		io.emit('chat_message', msg);
	});
});

//io.on('connection',function(socket){
//		console.log('connection established');
//		socket.on('chat message', function(msg){
//				console.log('message: '+msg);
//		});
//		socket.on('disconnect',function(){
//				console.log('disconnected');
//		});
//});

http.listen(port,function(){
	console.log('Server running on port '+port+'.');
});
