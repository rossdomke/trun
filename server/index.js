import Express from 'express';
import path from 'path';
import serveStatic from 'serve-static';
import http from 'http';
import socketIO from 'socket.io';
import * as actions from '../client/store/action-types';
import * as mutations from '../client/store/mutation-types';

const express = new Express();
const server = http.createServer(express);

const io = socketIO(server);


const PORT = process.env.PORT || 3000;

express.use('/', serveStatic(path.join(__dirname, '../dist/client/')));

let connectedUserCount = 0;
io.on('connection', (socket) => {
  connectedUserCount += 1;
  io.emit(mutations.PLAYER_COUNT_UPDATE, connectedUserCount);
  socket.emit(mutations.CONNECT, socket.id);
  socket.on(actions.JOIN_GAME, ({ gameId, player }) => {
    socket.join(`game-${gameId}`);
    io.to(`game-${gameId}`).emit(actions.PLAYER_JOIN, player);
  });
  socket.on(actions.LEAVE_GAME, (gameId) => {
    socket.leave(`game-${gameId}`);
    io.to(`game-${gameId}`).emit(actions.PLAYER_DISCONNECT, socket.id);
  });
  socket.on(actions.SYNC, (game) => {
    const sGame = game;
    sGame.lastSync = Date.now();
    socket.broadcast.to(`game-${sGame.id}`).emit(mutations.SYNC, sGame);
    if (sGame.advertising) {
      socket.broadcast.emit(mutations.ADVERTISE, sGame);
    }
  });
  socket.on(actions.MESSAGE_SEND, (message) => {
    console.log('message recieved', message);
    const newMessage = message;
    newMessage.sentAt = Date.now();
    io.to(`game-${message.gameId}`).emit(mutations.MESSAGE_RECIEVE, newMessage);
  });
  socket.on('disconnect', () => {
    connectedUserCount -= 1;
    io.emit(mutations.PLAYER_COUNT_UPDATE, connectedUserCount);
    io.emit(mutations.PLAYER_DISCONNECT, socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Listening at :${PORT}`);
});
