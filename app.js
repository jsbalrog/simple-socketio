var io = require('socket.io').listen(4000);

io.sockets.on('connection', function(socket) {
  // Listen for client-side join events. When a join event occurs, send
  // a broadcast 'userJoined' event to all other clients, and include the
  // data that was received with the join event.
  socket.on('join', function(data) {
    socket.broadcast.emit('userJoined', data);
    socket.username = data.username;
  });

  // Listen for client-side ping events. When a ping event occurs, send
  // a broadcast 'ping' event to all other clients, and include a 
	// username object.
  socket.on('ping', function(data, done) {
    socket.broadcast.emit('ping', {username: socket.username});
    done('ack');
  });
	
	// Listen for client-side disconnect events (this will happen on a refresh).
	socket.on('disconnect', function() {
		socket.broadcast.emit('userDisconnect', { username: socket.username });
	});
});