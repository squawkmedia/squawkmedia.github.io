var http = require('http'),
    url = require('url');
var tweets = {"tweets":[]};

http.createServer(function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
    query = url.parse(req.url,true).query;
    var response = {};
    //res.end(JSON.stringify(query));
    if(query.action){
      console.log("Moving on to phase two!");
      if(query.action === "read") {
          console.log("Listing off the posts");
          response = tweets;
      }
      else {
        if(query.action === "post"){
          if(query.message) {
            var tweet = {};
            tweet.message = query.message;
            tweets.tweets.push(tweet);
            response.stat = "All Good!";
          }
        }
      }
    } else {
      response.error = "No Action";
    }
    response.url = req.url;
    res.write(JSON.stringify(response));
    console.log(JSON.stringify(response));
    res.end();
}).listen(8080);
