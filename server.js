/* express : le socle du server */
var express = require('express');
var app = express();

/*******************************************/
/* Config du server express                */
/*******************************************/
/* exposition du dossier de l'application */
app.use(express.static('app'));
app.get('/', function (req, res) {
    /* On envoie sur notre application angular */
    res.sendFile(__dirname + '/app/index.html');
});

/*******************************************/
/* Config du server io                */
/*******************************************/
var http = require('http').Server(app);
var io = require('socket.io')(http);
io.on('connection', function (socket) {
    console.log('a user connected');
});

io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
});
io.on('connection', function (socket) {
    socket.on('chat message', function (msg) {
        console.log('message: ' + msg);
        socket.broadcast.emit('chat message', msg);
    });
});

http.listen(3000, function () {
    console.log('listening on *:3000');
});