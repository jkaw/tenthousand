// This is the server-side combined server for handling both the static files
// and the API
// It is maintained by the API team

// Load the Engine teams code
var engine = require('./engine/our_engine');

// Load the Real-time signalling code
var our_socket = require('./socket/our_socket');

// Set up the http server
var port = 8080;
var express = require('express');
var	app = express();
var http = require('http').Server(app);



//URLs that start with /ui/ get files returned from the public subdirectory
app.get('/ui/*',function(req,res){
	var dictionary = require('url').parse(req.url, true);
	var pathname = dictionary.pathname.substring(3);
	console.log("Static:     requested: "+pathname);
	res.sendFile(__dirname + '/ui'+pathname);
});

//URLs that start with /api/ get data returned from the engine module 
app.get('/api/*',function(req,res){
	var dictionary = require('url').parse(req.url, true);
	var method = dictionary.pathname.substring(4);

	console.log("API   :      called : "+method);
	console.log("               data : "+JSON.stringify(dictionary.query));

	var response;
	if(method === "/api_create_game"){
		response = engine.from_api_create_game(dictionary.query);
	}
	else if(method === "/api_join_game"){
		response = engine.from_api_join_game(dictionary.query);
	}
	else if(method === "/api_start_game"){
		response = engine.from_api_start_game(dictionary.query);
	}
	else{
		response = engine.from_api_get_time();
	}

	//Generic response code
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end(JSON.stringify(response));
	console.log("           returned : "+JSON.stringify(response));
});

//Basic redirect for launching if anythin else is accessed
app.get('/*',function(req,res){
	res.redirect('/ui/index.html');
});


// This sets up the websocket connections
our_socket.set_up_socket(http);

// This turns on the webserver
http.listen(port,function(){
	console.log('Web/API/Socket Server running on port '+port+'.');
});
