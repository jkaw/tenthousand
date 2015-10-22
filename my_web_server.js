var port = 8080;
var express = require('express'),
	app = express();

app.use(express.static(__dirname + '/public'));

app.listen(port);
console.log('Server running on port '+port+'.');
