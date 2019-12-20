const express = require("express")();
const server = require("http").createServer(express);
const io = require("socket.io")(server);


express.get('/', (req, res, next) => {
  res.send('hello world');
});

io.on("connection", socket => {
  console.log("new Client Connected: ");
  socket.on('join', data => {
      
  });
  socket.on('message', data => {
    console.log('message: ', data);
    io.emit('message', {from: socket.id, msg: data});
  });
  socket.on('changeName', data => {
      console.log('not implemented');
  });
  socket.on('disconnect', data => { 
      console.log('disconnect: ', data);
  })
});

server.listen(3000, () => {
  console.log("Listening at :3000");
});