var http = require('http');
var engine = require('./engine');

http.createServer(function (req, res) {

	var dictionary = require('url').parse(req.url, true);
	var callback = dictionary.query.callback;

	/** if statement about url name */

	res.writeHead(200, {'Content-Type': 'text/plain'});
  
	/** send engine a dictionary of queries, etc. */ 
	res.end(callback+'("'+engine.get_time()+'")'); //'currentTime'

}).listen(8081);

console.log('Server running on port 8081.');

