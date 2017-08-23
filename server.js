var express = require('express');
var app = express();
var path = require('path');
var moment = require('moment');
var jade = require('jade');

var bodyParser = require('body-parser')

app.set('views', __dirname + '/');
app.set('view engine', 'jade');

app.get('/', function(req, res) {
      res.sendFile(path.join(__dirname + '/index.htm'));
});


app.get('/:id', function(req, res) {
	var input;
	var unix_output;
	var natural_output;
	var date_natural;
	var date_unix;	


	input = req.params.id;
	date_unix = moment(input, 'X', true).isValid();

	if(moment(input).isValid()){
		natural_output = input;
		unix_output = moment(input).unix();
	}
	else if(date_unix){
		natural_output = moment.unix(input).format('YYYY-MMM-DD');;
		unix_output = input;
	}
	else {
		natural_output = "null";
		unix_output = "null"
	};	

	var output = '{"unix": ' + '"' + unix_output  +'"' + ', "natural": ' + '"' + natural_output + '"}';
  	res.render('index', { title: 'JSON Output', head: "JSON Output", message: output });

    //res.send(output);
});


// Tell express to use the body-parser middleware and to not parse extended bodies
app.use(bodyParser.urlencoded({ extended: false }))

// Route that receives a POST request to /
app.post('/', function (req, res) {
  const body = req.body
  res.set('Content-Type', 'text/plain')
  res.send(`You sent: ${body} to Express`)
})


app.listen(process.env.PORT || 3000)
console.log("Server is listening you!");