var express = require('express');
var wil_engine = require('./wil_engine');
var app = express();

app.get('/', function(req, res){
  res.send('<a href="/records/San%20Francisco%20CA">Try it!</a>')
})

app.get('/records/:location', function (req, res) {
  var location = req.params.location;
  var cb = function(data){
    res.send(data)
  }
  wil_engine(location, cb);

});

var port = process.env.PORT || 3000
app.listen(port);