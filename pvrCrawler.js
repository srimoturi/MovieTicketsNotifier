var request = require('request');
var cheerio = require('cheerio');
var _ = require('underscore');

var url = 'http://www.pvrcinemas.com/nowshowing/hyderabad'

var nowshowingtag = "now-showing";
var comingsoon = "coming-soon";

exports.comingsoonMovies = function(callback) {
  moviesDictionary(comingsoon, callback);
}

exports.nowShowingMovies = function(callback) {
  moviesDictionary(nowshowingtag, callback);
}

function moviesDictionary(movieTypeTag, callback) {
  var tag = _.template("div[id=<%= tagId %>]");
  var movieTag = tag({tagId: movieTypeTag});
  console.log(movieTag);

  request(url, function(err, response, body) {
    var data = [];
    parsedBody = cheerio.load(body, {
      normalizeWhitespace: true,
      xmlMode: true
    });

    nowshowing = parsedBody(movieTag).find('.poster-holder > div > .poster');

    parsedBody(nowshowing).each(function(i, element) {
      var dict = new Object();

      parsedBody(element).find('img').each(function(j, img) {
        dict['posterLink'] = parsedBody(img).attr('src');
      })

      parsedBody(element).find('.m-name').each(function(j, name) {
        var name = parsedBody(name).text();
        if (name.length > 0) {
          dict['title'] = name;
        }
      })

      parsedBody(element).find('.other-det').each(function(j, otherDetails) {
        otherDetText = parsedBody(otherDetails).text();
        runtime = otherDetText.replace(/\D/g,'');
        var langWithoutMins = otherDetText.replace('mins', '');
        var lang = langWithoutMins.replace(/\d+|^\s+|\s+$/g,'');

        if (lang.length > 0) {
          dict['lang'] = lang;
          dict['runtime'] = runtime + ' mins';
        }
      })

      data[i] = dict;

    });

    callback(data);
  });
}
