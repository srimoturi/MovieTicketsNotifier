var htmlparser = require('htmlparser2')
var http = require('https');
var domutils = require('domutils');

var url = 'https://www.pvrcinemas.com/cinemas/Hyderabad'

exports.getParsedData = function(callback) {
  http.get(url, function(response) {
      response.on('data', function(data) {
        domParse(data,callback)
      });

  });
}

function domParse(html, callback) {
 var handler = new htmlparser.DomHandler(function (error, dom) {
     if (error) {
       console.error();
     }
     else {
       var values = domUtils.getElements({ tag_contains: "div" }, dom, true);
        console.log(values[0]);
         callback();
     }
 });

 var parser = new htmlparser.Parser(handler);
 parser.write(html);
 parser.done();
}

// var parseResponse = function(response, callback) {
//   var data = "";
//   response.on('data', function(chunk) {
//     data += chunk;
//   });
//   var tags = [];
//   var texts = [];
//   var tagsCount = {};
//   var tagsWithCount = [];
//   var add = 0;
//   response.on('end', function(chunk) {
//     var parsedData = new htmlparser.Parser({
//      onopentag: function(name, attribs) {
//        console.log(name + "---->" + attribs);
//        if(name === "div" && attribs.id === "now-showing"){
//             add = 1;
//         }
//
//       if(tags.indexOf(name) === -1) {
//        tags.push(name);
//  tagsCount[name] = 1;
//        } else {
//  tagsCount[name]++;
//        }
//      },
//      ontext: function(text) {
//        if(add === 1) {
//          texts.push(text)
//        }
//
//      },
//      onend: function() {
//        console.log("END");
//       for(var i = 1;i < tags.length;i++) {
//        tagsWithCount.push({name:tags[i], count:tagsCount[tags[i]]});
//      }
//     }
//    }, {decodeEntities: true});
//    parsedData.write(data);
//    parsedData.end();
//    //console.log(tagsWithCount);
//    callback(texts)
//   });
// }
