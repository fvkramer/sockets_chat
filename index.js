// var app = require("express")();
// var http = require("http").Server(app);
// var io = require("socket.io")(http);

// app.get('/', (req, res) => {
//   return res.sendFile(__dirname + '/index.html');
// });

// io.on('connection', function (socket) {
//   console.log(`${socket.id}`);
//   socket.on('chat message', function (msg) {
//     io.emit('chat message', msg);
//   });
// });

// http.listen(3000, () => console.log("Listening on 3000"));


const app = require("express")();
const httpServer = require('http').Server(app)
const io = require("socket.io")(httpServer);

httpServer.listen(3000, () => console.log("Listening on server 3000"));

app.get('/', (req, res) => {
  return res.sendFile(__dirname + '/index.html');
})

const SOCKET_LIST = {};

io.on('connection', socket => {
  socket.id = Math.random();
  socket.x = 0;
  socket.y = 0;
  SOCKET_LIST[socket.id] = socket;
})

setInterval(() => {
  var pack = [];
  for (var i in SOCKET_LIST) {
    let socket = SOCKET_LIST[i];
    socket.x++;
    socket.y++;
    pack.push({ x: socket.x, y: socket.y });
  }

  for (var i in SOCKET_LIST) {
    let socket = SOCKET_LIST[i];
    socket.emit('newPositions', pack);
  }

}, 1000/25);