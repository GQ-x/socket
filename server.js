//To provide actual HTML file with file system module, url module, path module.
let http = require('http'),
    fs = require('fs'),
    path = requre('path'),
    //npm install socket.io
    io = require('socket.io');

let server = http.createServer(function(req, res) {
    //Convert request url path into absolute path.
    let filename = path.join(process.cwd(), req.url);
    //Determine if the existence of file.
    //if it does not exist, return 404 code.
    path.exists(filename, function(exists) {
        if(!exists) {
            res.writeHead(404, {"Content-Type": "text/plain"});
            res,write("404 Not Found\n");
            res.end();
            return;
        }
        //Return it back to index.html for all requests instead of providing another file according to the URL
        //if it exists, read file through function "fs.readFile()", and send 200 code and file contents to client.
        fs.readFile('./index.html', encoding = 'urf-8', function(err, data) {
                if (err) {
                    //if error occurs during read the file, return 500 code.
                    res.writeHead(500, {"Content-Type": "text/plain"});
                    res.write(err + "\n");
                    res.end();
                    return;
                }
                res.writeHead(200, {
                    "Content-Type": "text/html; charset=utf-8"
                });
                res.end(data);
            });
    });
});

server.listen(3000);
io = io.listen(server);
io.configure(function(){
    //Attribute that are set to true or false in setting -> io.enable(), io.disable()
    io.enable('browser client etag');
    //Other setting
    io.set('log level', 3);
    io.set('transports', [
        'websocket',
        'flashsocket',
        'htmlfile',
        'xhr-polling',
        'jsonp-polling'
    ]);
});

// sockets ?????
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

consloe.log("server is working. http://localhost:3000");