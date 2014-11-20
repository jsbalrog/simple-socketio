var io = require('socket.io').listen(4000);

io.sockets.on('connection', function(socket) {
  // Listen for join events. When a join event occurs, send
  // a 'userJoined' event to all clients, and include the
  // data that was received with the join event.
  socket.on('join', function(data) {
    io.sockets.emit('userJoined', data);
    socket.username = data.username;
  });

  // Listen for ping events. When a ping event occurs, send
  // a 'ping' event, and include a username object.
  socket.on('ping', function(data, done) {
    console.log(done);
    io.sockets.emit('ping', {username: socket.username});
    done('ack');
  });
});