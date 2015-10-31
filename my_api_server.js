// Load the Engine teams code
var engine = require('./engine');

// Load the Real-time signalling code
var ten_thousand_socket = require('./ten_thousand_socket');

// Set up the api server
var port = 8081;

var http = require('http');

var server = http.createServer(function (req, res) {

	var dictionary = require('url').parse(req.url, true);
	var callback = dictionary.query.callback;

	/** if statement about url name */

	res.writeHead(200, {'Content-Type': 'text/plain'});
  
	/** send engine a dictionary of queries, etc. */ 
	res.end(callback+'("'+engine.get_time()+'")'); //'currentTime'
	console.log(callback+'("'+engine.get_time()+'")'); //'currentTime'


}).listen(port);

// This sets up the websocket connections
ten_thousand_socket.set_up_socket(server);

console.log('API server running on port '+port+'.');

