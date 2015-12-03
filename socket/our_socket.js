// This is server-side socket code
// Functions to support real-time messaging 
// Maintained by Prof. Patterson


var games = {};

// This is a function that is used for providing feedback when a method is
// called for testing purposes
function test_response(socket,method,data){
	if(socket != null){
		var outgoing = {
			message:{
				note: "Your \""+method+"\" test message was received.  Test was true.",
				your_payload:data
			},
			from: "our_socket server module"
		};
		socket.emit('system_message',outgoing);
	}
	else{
		console.log("socket is null in test_response!");
	};
}


module.exports = {
	// socket variable
	io: null,
	// mapping of game_ids to sockets
	games:games,

	// This is called by the engine 
	socket_player_joined_game:function(game_id,player_id){
		socket = module.exports.games[game_id];
		if(socket != null){
			var outgoing={player_id:player_id};
			socket.emit("player_joined_game",outgoing);
		}
		else{
			console.log("socket_user_id is null!"+game_id);
		}
	},

	// This is called by the engine 
	socket_time_start:function(game_id,time_started,turn_end){
		socket = module.exports.games[game_id];
		if(socket != null){
			var outgoing={time_started:time_started,
						  turn_end:turn_end};
			socket.emit("time_start",outgoing);
		}
		else{
			console.log("socket_user_id is null!"+game_id);
		}
	},

	// This is called by the engine 
	socket_timer_expired:function(game_id,which_turn_ended,next_player){
		socket = module.exports.games[game_id];
		if(socket != null){
			var outgoing={which_turn_ended:which_turn_ended,
						  next_player:next_player};
			socket.emit("timer_expired",outgoing);
		}
		else{
			console.log("socket_user_id is null!"+game_id);
		}
	},



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
				module.exports.games[data.socket_game_id]=socket;
			});

			//Get chat messages and rebroadcast them
			socket.on('chat_message', function(data){
				console.log('Socket: chat message: '+data.message);
				console.log('Socket: relaying to : '+data.socket_game_id);
				var outgoing = {
					message:data.message,
					from: data.from
				};
				socket.broadcast.to(data.socket_game_id).emit('chat_message',outgoing);
				console.log(JSON.stringify(data,null,2));
				if(data.test == true){
					test_response(socket,'chat_messasge',data);
				}
			});

			

			//Player joined
			socket.on('player_is_done', function(data){
				console.log('Socket:   Player is done: '+JSON.stringify(data));
				if(data.test == true){
					test_response(socket,'play_is_done',data);
				}
					
			});



			//Field Tile is played 
			socket.on('play_field', function(data){
				console.log('Socket:   Field played: '+JSON.stringify(data));
				if(data.test == true){
					test_response(socket,'play_field',data);
				}
			});


			//test messages 
			socket.on('test_messages', function(data){
				console.log('Test Messages:  : '+JSON.stringify(data));
				if(data.test == true){
					if(data.ui_from_api_incoming_chat == true){
						var outgoing = {
							message:"Test Message",
							from: "Test User"
						};
						socket.emit('chat_message',outgoing);
					}
					if(data.ui_from_api_player_joined_game == true){
						console.log("3");
						module.exports.socket_player_joined_game(data.game_id,"random player");
					}
					if(data.ui_from_api_time_start == true){
						module.exports.socket_time_start(data.game_id,"random time 1","random time 2");
					}
					if(data.ui_from_api_timer_expired == true){
						module.exports.socket_timer_expired(data.game_id,"random turn index","next player id");
					}
				}
			});

			socket.on('disconnect', function(){
				console.log('Socket:    disconnect: '+socket.id);
			});
		});
	}
};

