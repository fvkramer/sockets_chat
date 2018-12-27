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
const PLAYER_LIST = {};

class Player {
  constructor(id) {
    this.x = 250;
    this.y = 250;
    this.id = id;
    this.number = "" + Math.floor(10 * Math.random());
    this.pressingRight = false;
    this.pressingLeft = false;
    this.pressingUp = false;
    this.pressingDown = false;
    this.maxSpd = 10;

    this.updatePosition = this.updatePosition.bind(this);
  }

  updatePosition() {
    if (this.pressingRight) {
      this.x += this.maxSpd;
    }
    if (this.pressingLeft) {
      this.x -= this.maxSpd;
    }
    if (this.pressingUp) {
      this.y -= this.maxSpd;
    }
    if (this.pressingDown) {
      this.y += this.maxSpd;
    }
  }
}

io.on('connection', socket => {
  socket.id = Math.random();
  SOCKET_LIST[socket.id] = socket;

  const player = new Player(socket.id)
  PLAYER_LIST[socket.id] = player;

  socket.on('disconnect', () => {
    delete SOCKET_LIST[socket.id]
    delete PLAYER_LIST[socket.id]
  })

  socket.on('keyPressed', (data) => {
    if (data.inputId === 'left')
      player.pressingLeft = data.state;
    if (data.inputId === 'right')
      player.pressingRight = data.state;
    if (data.inputId === 'up')
      player.pressingUp = data.state;
    if (data.inputId === 'down')
      player.pressingDown = data.state;
  })
})

setInterval(() => {
  var pack = [];
  for (var i in PLAYER_LIST) {
    let player = PLAYER_LIST[i];
    player.updatePosition();
    pack.push({ x: player.x, y: player.y, number: player.number });
  }

  for (var i in SOCKET_LIST) {
    let socket = SOCKET_LIST[i];
    socket.emit('newPositions', pack);
  }

}, 1000/25);
