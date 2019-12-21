const express = require("express")();
const server = require("http").createServer(express);
const io = require("socket.io")(server);


express.get('/', (req, res, next) => {
  res.send('hello world');
});
let connectedUserCount = 0;
io.on("connection", socket => {
  connectedUserCount++;
  io.emit('connectedUserCount', connectedUserCount);
  socket.on('advertise', gameId => {
    socket.broadcast.emit('advertise', gameId);
  });
  socket.on('join', ({ gameId, playerId, playerName, color }) => {
    console.log(gameId,playerName);
    socket.join(`game-${gameId}`);
    //io.to(`game-${gameId}`).emit('playerJoin', playerName);
    io.to(`game-${gameId}`).emit('playerJoin', {playerId, playerName, color})
  });
  socket.on('leave', gameId => {
    socket.leave(`game-${gameId}`);
    socket.broadcast.to(`game-${gameId}`).emit('playerLeft');
  });
  socket.on('sync', game => {
    socket.broadcast.to(`game-${game.id}`).emit('sync', game);
  });
  socket.on('disconnect', data => { 
    connectedUserCount--;
    io.emit('connectedUserCount', connectedUserCount);
  });
});

server.listen(3000, () => {
  console.log("Listening at :3000");
});