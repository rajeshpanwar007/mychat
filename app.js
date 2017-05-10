/**
 * Created by storehippo on 10/5/17.
 */


var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(function(req, res, next){

    console.log("Request >>>>> ", req.url);

    next();

})

io.on('connection', function(socket){
    console.log("user Connect");

    socket.on('disconnect', function(){
        console.log("user Disconnected", arguments);
    });

    setTimeout(function(){
        socket.send("Send a message in 5 seconds");
    }, 5000)

    setTimeout(function(){
        socket.send("Send a message in 10 seconds");
    }, 10000)

    setTimeout(function(){
        socket.send("Send a message in 15 seconds");
    }, 15000)

})


app.get('/', function (req, res, next) {
    res.sendfile('index.html');
});




http.listen(8081, function(){
    console.log("Server is listening on PORT 8081")
});
