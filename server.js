var http = require('http');
var express = require('express');
var wsServer = require('ws').Server;
var date = require('date-utils');
var subscriber = require('./subscriber');
startServer([]);

function startServer(init){
  var port = process.env.PORT || 8080;
  console.log('port:' + port);
  var app = express();
  app.use(express.static(__dirname + '/public'));

  var server = http.createServer(app)
  server.listen(port)

  var bufferSize = process.env.DATA_BUFFER_SIZE;
  var dataBuffer = init;
  if (dataBuffer.length > bufferSize){
      dataBuffer = dataBuffer.slice(dataBuffer.length - bufferSize);
  }

  var wss = new wsServer({server: server});
  wss.on('connection', function(ws){
    ws.send(JSON.stringify(dataBuffer));
  });

  var _subscriber = new subscriber();
  _subscriber.on('message', function(data){
    dataBuffer.push(data);
    if (dataBuffer.length > bufferSize){
        dataBuffer = dataBuffer.slice(dataBuffer.length - bufferSize);
    }
    wss.clients.forEach(function(c){
      c.send(JSON.stringify(dataBuffer));
    });
  });
}
