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

var client = 0;
io.on('connection', function(socket){
    console.log("user Connect");

    client++;
    socket.emit("newClient", "Welcome to chat Demo");

    socket.broadcast.emit("newClient", client + " user Connected")

    //io.sockets.emit("newClient", client + " user Connected");

    socket.on('disconnect', function(){
        console.log("user Disconnected", client);
        client--;
        socket.broadcast.emit("newClient", client + " user Connected")
        //io.sockets.emit("broadcast", client + " user Connected");
    });

    //setTimeout(function(){
    //    socket.emit("TestEvent", {description : "Custom event from Server"});
    //}, 2000)

    //socket.on("TestEvent", function(data){
    //    console.log("TestEvent : ", data);
    //})
})


app.get('/', function (req, res, next) {
    res.sendfile('index.html');
});


http.listen(8081, function(){
    console.log("Server is listening on PORT 8081")
});
