var FeedParser = require('feedparser');
var request = require('request');
var express = require('express');
var demo = 'http://phiary.me/rss';
var sakura = 'http://www.sakura.ad.jp/rss/mainte.rdf';

showData(sakura);

function showData(feed) {
    var req = request(feed);
    var feedParser = new FeedParser({});
    var items = [];

    req.on('response', function(res) {
        this.pipe(feedParser);
    });

    feedParser.on('readable', function() {
        while (item = this.read()) {
            items.push(item);
        }
    });

    feedParser.on('end', function() {
        //データを表示する
        items.forEach(function(item) {
          if(item.title.match("障害")){
            console.log('- [' + item.title + ']' + '(' + item.link + ')');
          };
        });
    });
};
