//This code is maintained by Prof. Patterson
//It provides methods to establish real-time connections with the engine
//It also calls the ui when messages come in from the engine
//This code should only be called from the api_code.js file


//****************************
// Variables
//****************************

//Create a url for the api server.
//Not necessary if the web server and api server are at the same location, but
//we're doing it anyway.
var socket_app_server_url = window.location.protocol + "//" + window.location.hostname + ":"+window.location.port+"/";

//socket connection, initialized below
var socket;

//Variables to maintain state
var socket_connected = false;
var socket_game_connected = false;

//****************************
//functions
//****************************

//Enable things when the game is connected (not socket connected!)
function socket_game_connect(){
	socket_game_connected = true;
	console.log('Connected to socket game channel');
}

//Disable things when the game is disconnected 
function socket_game_disconnect(){
	socket_game_connected = false;
	console.log('Disconnected from socket game channel');
}


//When we have a game_id subscribe to the real-time channel for that game
function socket_subscribe(game_id){
	if(socket != null){
		if(socket_connected){
			var guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    						var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
							return v.toString(16);
			});
			var data = {user_name:"Bob",
						user_id:guid,
						socket_game_id:game_id};

			socket.emit('join_room',data);
			socket_game_connect();
			return true;
		}
	}
	return false;
}

//Called by when there is a chat message to send
function socket_send_chat(game_id, from,the_message, test){
	if(socket_game_connected){
		var data ={ socket_game_id:game_id,
					from: from,
					message:the_message,
					test:test};
		socket.emit('chat_message', data);
	}
	else{
		alert('Not connected to game server, subscribe to chat first');
	}

}



//Called by when there is a player ends a turn
function socket_send_player_is_done(game_id,user_id,test){
	if(socket != null){
		var data ={ socket_game_id:game_id,
					user_id:user_id,
					test:test};
		socket.emit('player_is_done', data);
	}
	else{
		alert('Not connected to game server, subscribe to chat first');
	}

}



//Called by when a player plays a field tile 
function socket_play_field(game_id,user_id,field_tile,position,test){
	if(socket != null){
		var data ={ socket_game_id:game_id,
					user_id:user_id,
					field_tile: field_tile,
					position: position,
					test:test};
		socket.emit('play_field', data);
	}
	else{
		alert('Not connected to game server, subscribe to chat first');
	}

}




//Called to request test messages 
function socket_send_test_messages(game_id,ui_from_api_incoming_chat,ui_from_api_player_joined_game,ui_from_api_time_start,ui_from_api_timer_expired,test){
	if(socket != null){
		var data ={ game_id:game_id,
				    ui_from_api_incoming_chat:ui_from_api_incoming_chat,
					ui_from_api_player_joined_game:ui_from_api_player_joined_game,
					ui_from_api_time_start:ui_from_api_time_start,
					ui_from_api_timer_expired:ui_from_api_timer_expired,
					test:test};
		socket.emit('test_messages', data);
	}
	else{
		alert('Not connected to game server, subscribe to chat first');
	}

}



//****************************
//Initialize variables 
//****************************

//Establish a socket connection to the app server
//The default would be to establish with the server that sent this file (the web server)
socket = io(socket_app_server_url);


//****************************
//Register call backs and handlers
//****************************

socket.on('connect', function(){
	console.log('Connected to socket server');
	socket_connected = true;
});

//When we receive a new chat message, display it via the ui
socket.on('chat_message', function(msg){
	ui_from_api_incoming_chat(msg.from,msg.message);
});


socket.on('player_joined_game', function(msg){
	ui_from_api_player_joined_game(msg.player_id);
});

socket.on('time_start', function(msg){
	ui_from_api_time_start(msg.time_started,msg.turn_end);
});

socket.on('timer_expired', function(msg){
	ui_from_api_timer_expired(msg.which_turn_ended,msg.next_player);
});


//When we receive a new system message, display it via the ui
socket.on('system_message', function(msg){
	ui_from_api_incoming_system_message(msg.message);
});

socket.on('disconnect', function(){
	socket_connected = false;
	socket_game_disconnect();
	console.log('Disconnected from socket server');
});

//socket.emit('system_message','im alive');


