var express = require('express');

// Create our app
var app = express();

const PORT = process.env.PORT || 3000; // way to access environment variables through node.

/*
	Redirects https to http
	req: could be index.html, or bundle.js, etc
	res: update what gets sent back
	next: can be called when this piece of middleware is done
*/
app.use(function (req, res, next) {
		
	if (req.headers['x-forwarded-proto'] === 'https')	{
		res.redirect('http://' + req.hostname + req.url);	
	} else {
		next();	
	}
});

app.use(express.static('public'));

//Heroku will tell us what port we need to bind to via a environment variable
//app.listen(3000, function () { 
app.listen(PORT, function () { 
	console.log('Express server is up on port ' + PORT);
});

