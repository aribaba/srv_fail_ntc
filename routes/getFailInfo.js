var FeedParser = require('feedparser');
var request = require('request');
var express = require('express');
var router = express.Router();
var demo = 'http://phiary.me/rss';
var sakura = 'http://www.sakura.ad.jp/rss/mainte.rdf';


router.get('/parse', function(request, response) {

      var req = request(sakura);
      var feedParser = new FeedParser({});
      var items = [];
      var fetchedRecords = [];

      req.on('response', function(res) {
          this.pipe(feedParser);
      });

      feedParser.on('readable', function() {
          while (item = this.read()) {
              if (item.title.match("障害")) {
                  var fetchedRecord = {
                      'title': item.title,
                      'mediaUrl': item.link
                  };
                  fetchedRecords.push(fetchedRecord);
              };
          };
      });

      feedParser.on('end', function() {
          //データを格納する
          var result;
          result = {
              'fetchedRecords': fetchedRecords
          };
          response.json(result);
      });
});
