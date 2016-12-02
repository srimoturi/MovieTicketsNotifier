
var express = require('express');
var pvrCrawler = require('./pvrCrawler')
var app = express();

app.set('port', (process.env.PORT || 5000));

// app.use(express.static(__dirname + '/public'));
//
// // views is directory for all template files
// app.set('views', __dirname + '/views');
// app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  pvrCrawler.getParsedData(function(data) {
    // console.log(data)
      res.send(data)
  });
})

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
