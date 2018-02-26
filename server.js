var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var request = require("request");

app.get('/', function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.get('/upload.html', function(req, res){
    res.sendFile(__dirname + "/upload.html");
});

app.get('/main.js', function(req, res){
    res.sendFile(__dirname + "/main.js");
});
app.get('/main1.js', function(req, res){
    res.sendFile(__dirname + "/main1.js");
});

app.get('/style.css', function(req, res){
    res.sendFile(__dirname + "/style.css");
});

app.get('/tree1.png', function(req, res){
    res.sendFile(__dirname + "/tree1.png");
});
app.get('/tree2.png', function(req, res){
    res.sendFile(__dirname + "/tree2.png");
});
app.get('/tree3.png', function(req, res){
    res.sendFile(__dirname + "/tree3.png");
});
app.get('/tree4.png', function(req, res){
    res.sendFile(__dirname + "/tree4.png");
});

io.on('connection', function(socket){

  var options = { method: 'GET',
    url: 'https://trees-77d6.restdb.io/rest/new-trees',
    headers:
     { 'cache-control': 'no-cache',
       'x-apikey': '5e181b2c936d12c6abfd59330d49ac73166d4' } };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    socket.emit('updateTree', body);
    console.log(body);
  });

  socket.on('addTree', function (lat,lng,name) {

    var options = { method: 'POST',
      url: 'https://trees-77d6.restdb.io/rest/new-trees',
      headers:
       { 'cache-control': 'no-cache',
         'x-apikey': '5e181b2c936d12c6abfd59330d49ac73166d4',
         'content-type': 'application/json' },
      body: { coordX: ''+lat+'', coordY: ''+lng+'', tree: ''+name+'' },
      json: true };

    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      });

  });

    socket.on('disconnect', function(){

    });
});

http.listen(process.env.PORT || 3663, function(){
    console.log("server started at 3663");
});
