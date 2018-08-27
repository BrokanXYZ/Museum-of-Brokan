
//Essential vars
var app = require('express')();
var http = require('http').Server(app);

//Config vars
var port = 6969;
var verbose = false;


app.get('/', function(req, res){
	IP = req.header('x-forwarded-for') || req.connection.remoteAddress;
	console.log('trying to load %s', __dirname + '/serving/index.html');
	res.sendFile(__dirname + '/serving/index.html');
});


app.get( '/*' , function(req, res, next) {
	//This is the current file they have requested
	var file = req.params[0]; 

	//For debugging, we can track what files are requested.
	if(verbose) console.log('\t :: Express :: file requested : ' + file);

	//Send the requesting client the file.
	res.sendFile( __dirname + '/' + file );
});


http.listen(port, function(){
	console.log('listening on *: ' + port);
});