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
  socket.on('advertise', (game) => {
    socket.broadcast.emit('advertise', game);
  });
  socket.on(actions.JOIN_GAME, ({ gameId, player }) => {
    socket.join(`game-${gameId}`);
    io.to(`game-${gameId}`).emit(actions.PLAYER_JOIN, player);
  });
  socket.on(actions.LEAVE_GAME, (gameId) => {
    socket.leave(`game-${gameId}`);
    io.to(`game-${gameId}`).emit(mutations.PLAYER_DISCONNECT, socket.id);
  });
  socket.on(actions.SYNC, (game) => {
    console.log('SYNC', game);
    socket.broadcast.to(`game-${game.id}`).emit(mutations.SYNC, game);
    if (game.advertising) {
      console.log('ADVERT');
      socket.broadcast.emit(mutations.ADVERTISE, game);
    }
  });
  socket.on(actions.MESSAGE_SEND, (message) => {
    io
      .to(`game-${message.gameId}`)
      .emit(mutations.MESSAGE_RECIEVE, { sentAt: Date.now(), ...message });
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
