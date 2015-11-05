// This is server-side socket code
// Functions to support real-time messaging 
// Maintained by Prof. Patterson

module.exports = {
	// socket variable
	io: null,
	// This sets up the websocket connections
	set_up_socket: function(server){
		this.io = require('socket.io')(server);

		//Register socket responses
		this.io.on('connection', function(socket){
			console.log('Socket:    connection: '+socket.id);

			//Register socket responses

			//Separate out chat channels by room
			socket.on('join_room', function(data){
				console.log('Socket:   join room : '+JSON.stringify(data));
				socket.join(data.socket_game_id);
			});

			//Get chat messages and rebroadcast them
			socket.on('chat_message', function(data){
				console.log('Socket: chat message: '+data.message);
				console.log('Socket: relaying to : '+data.socket_game_id);
				var outgoing = {message:data.message,
								from: data.from}
				socket.broadcast.to(data.socket_game_id).emit('chat_message',data);
			});

			socket.on('disconnect', function(){
				console.log('Socket:    disconnect: '+socket.id);
			});
		});
	}
};

