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

app.get('/', (req, res) => {
  return res.sendFile(__dirname + '/index.html');
})

io.on('connection', socket => {
  console.log("Socket connected");
})

httpServer.listen(3000, () => console.log("Listening on server 3000"));