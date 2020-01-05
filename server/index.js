const express = require("express")();
const serveStatic = require('serve-static');
const path = require('path');
const server = require("http").createServer(express);
const io = require("socket.io")(server);
const fs = require("fs");
// const actions = require("../client/store/action-types");
const PORT = process.env.PORT || 3000

express.use('/', serveStatic(path.join(__dirname, '../dist/client/')));

let connectedUserCount = 0;
io.on("connection", socket => {
  console.log(socket.id, ' connected');
  connectedUserCount++;
  io.emit('connectedUserCount', connectedUserCount);
  // io.emit(actions.PLAYER_COUNT_UPDATE, connectedUserCount);

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
    // io.emit(actions.PLAYER_COUNT_UPDATE, connectedUserCount);
    io.emit('userDisconnected', socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Listening at :${PORT}`);
});