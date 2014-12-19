'use strict';

var https = require('https');
var bitlyUrl = "https://api-ssl.bitly.com//v3/shorten?";

exports.shorten = function(url, access_token, callback){
  var requestUrl =
    bitlyUrl +
    "access_token=" + access_token +
    "&longUrl=" + encodeURIComponent(url);

  https.get(requestUrl, function(res) {
    var data = [];
    res
    .on('data', function(chunk) { data.push(chunk); })
    .on('end', function() {
      var result;
      try {
        var responseData = data.join('').trim();
        result = JSON.parse(responseData);
      } catch (e) {
        return callback({'status_code': 500, 'status_text': 'JSON Parse Failed'});
      }
      callback(null, result);
    });
  })
  .on('error', function(e) {
    callback(e);
  });
};
