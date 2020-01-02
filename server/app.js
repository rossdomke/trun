const express = require("express")();
const server = require("http").createServer(express);
const io = require("socket.io")(server);
const PORT = process.env.PORT || 3000

express.get('/', (req, res, next) => {
  res.send('hello world');
});
let connectedUserCount = 0;
io.on("connection", socket => {
  connectedUserCount++;
  io.emit('connectedUserCount', connectedUserCount);

  socket.on('advertise', game => {
    socket.broadcast.emit('advertise', game);
  });
  socket.on('join', ({ gameId, playerName, playerColor }) => {
    socket.join(`game-${gameId}`);
    io.to(`game-${gameId}`).emit('playerJoin', {id: socket.id, name: playerName, color: playerColor});
  });
  socket.on('leave', gameId => {
    socket.leave(`game-${gameId}`);
    io.to(`game-${gameId}`).emit('userDisconnected', socket.id);
  });
  socket.on('sync', game => {
    socket.broadcast.to(`game-${game.id}`).emit('sync', game);
  });
  socket.on('disconnect', data => { 
    connectedUserCount--;
    io.emit('connectedUserCount', connectedUserCount);
    io.emit('userDisconnected', socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Listening at :${PORT}`);
});