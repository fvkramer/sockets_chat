var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);

app.get('/', (req, res) => {
  return res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  console.log(`${socket.id}`);
  socket.on('chat message', function (msg) {
    io.emit('chat message', msg);
  });
});

http.listen(3000, () => console.log("Listening on 3000"));