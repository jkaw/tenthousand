//This code is maintained by Prof. Patterson
//It provides methods to establish real-time connections with the engine
//It also calls the ui when messages come in from the engine


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

//Called by the ui when there is a chat message to send
function socket_send_chat(game_id, the_message){
	if(socket_game_connected){
		var data ={ socket_game_id:game_id,
					from: 'Unknown person',
					message:the_message};
		socket.emit('chat_message', data);
	}
	else{
		alert('Not connected to game server');
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
	ui_incoming_chat(msg.from,msg.message);
});

socket.on('disconnect', function(){
	socket_connected = false;
	socket_game_disconnect();
	console.log('Disconnected from socket server');
});


