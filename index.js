
var express = require('express');
var pvrCrawler = require('./pvrCrawler')
var app = express();

app.set('port', (process.env.PORT || 5000));

app.get('/', function (req, res) {
  pvrCrawler.nowShowingMovies(function(data) {
      res.send(data)
  });
})

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
