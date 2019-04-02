var app = require('express')();
var server = require('http').createServer(app);
// Upgrade http server to socket.io server
var io = require('socket.io')(server);

// When connecting to the server with localhost: 3000, it sends index.html to the client
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    // Send a connected string message from client to connect event
    socket.on('connect', function (msg) {
        // Taking a console log (connected message will be displayed)
        console.log(msg);
    });

    // Received from the client in the from client event from the callback function
    socket.on('from client', function(data) {
        // Taking a console log
        console.log(data.text);
        // Send a message back to client from server event
        socket.emit('from server', {text: 'Message from the server'});
    });
    
    // Terminate server connection
    socket.on('disconnect', function() {
        console.log('Good-bye');
    });
});

server.listen(3000, function() {
  console.log('Socket IO server listening on port 3000');
});