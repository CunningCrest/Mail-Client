var express = require('express');
var path = require('path');

var app = express();

app.use(express.static(path.join(__dirname, 'public'))); //  "public" off of current is root

app.get('/api', function (req, res) {
  res.send('Mail Service');
});

app.post('/api/newletter', function (req, res) {
	var body = '';
	req.on('data', function(d) {
        body += d;
    });
    req.on('end', function() {
        console.log(JSON.parse(body));
    });

	res.send("Sent succesfully.");
});

app.get('/api/inbox', function (req, res) {
	res.send({
			"page": 1,
			"inbox": [
				"AngularJS discussion today at 5pm",
				"Linux conference in Gomel tomorrow",
				"Building RESTful services workshop",
				"Night cycling trip at weekend",
				"Morning cardio session"
			]
	});
});

app.get('/api/inbox/:topic', function (req, res) {
	res.send({
		"topic": req.params.topic,
		"date": new Date().toUTCString(),
		"message": "My message is " + req.params.topic + "."
	});
});

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});