//This file contains functions that are called by the ui to get information from
//the engine

//This is maintained by Prof. Patterson

// Internal variable to manage ajax calls
var api_url_base = window.location.protocol + "//" + window.location.hostname + ":"+window.location.port+ "/api/";



// This is a function to get the current time
// 	callback_function is a function that is called with the result of the request
/* 	result = {
				error: <true/false>,
			 	errors:[list of errors],
			 	time: <time>
			};
*/
function api_ajax_get_time(callback_function,test){
	var api_data = {test:test};
	$.ajax({url: api_url_base+'api_ajax_get_time', dataType:"json",data:api_data,success: callback_function});
}






// This is called when a player wants to host a game
// 	user_id is a string that uniquely identifies a user within a game
// 	turn_length is the length of a turn in milliseconds
// 	callback_function is a function that is called with the result of the request
/* 	result = {
				error: <true/false>,
			 	errors:[list of errors],
			 	game_id: <game_id>
			};
*/
function api_create_game(user_id,turn_length,callback_function,test){
	var api_data = {user_id:user_id,
					turn_length:turn_length,
					test:test};

	$.ajax({url: api_url_base+'api_create_game', dataType:"json",data:api_data,success: callback_function});
}






// This is called to subscribe to a chat channel 
// 	game_id is a string that uniquely identifies a user within a game
function api_subscribe_to_chat(game_id,test){
	socket_subscribe(game_id);
}








// This is called when a player wants to join a game
// 	game_id is a string that uniquely identifies the game
// 	user_id is a string that uniquely identifies a user within a game
// 	callback_function is a function that is called with the result of the request
/* 	result = {
				error: <true/false>,
			 	errors:[list of errors],
			 	players: [<player1_name>,<player2_name>,<player3_name>,<player4_name>]; //possibly null
			};
*/
function api_join_game(game_id,user_id,callback_function,test){
	var api_data = {game_id:game_id,
					user_id:user_id,
					test:test};
	var wrapped_callback_function = function(result){
			callback_function(result);
			if(result.error == false){
				socket_subscribe(game_id);
			}
	}
	$.ajax({url: api_url_base+'api_join_game', dataType:"json",data:api_data,success: wrapped_callback_function});
}









// This is sent when the host of a game is ready to start it
// 	game_id is a string that uniquely identifies the game
// 	callback_function is a function that is called with the result of the request
/* 	result = {
				error: <true/false>,
			 	errors:[list of errors],
			 	time_started: <absolute time when game started>
			};
*/
function api_start_game(game_id,callback_function,test){
	var api_data = {game_id:game_id,
					test:test};
	$.ajax({url: api_url_base+'api_start_game', dataType:"json",data:api_data,success: callback_function});
}






// This function is called to send a chat message to everyone in the game
// 	game_id is a string that uniquely identifies the game
// 	the_message is the string that should be sent
function api_send_chat(game_id,from,the_message,test){
	socket_send_chat(game_id,from,the_message,test);
}






// This function is called by the ui when the player ends his/her turn
// 	game_id is a string that uniquely identifies the game
// 	user_id is a string that uniquely identifies the user
function api_send_player_is_done(game_id,user_id,test){
	socket_send_player_is_done(game_id,user_id,test);
}





// This function is called by the ui when the player plays a field tile
// 	game_id is a string that uniquely identifies the game
// 	user_id is a string that uniquely identifies the user
// 	field_tile is a tile object that looks like:
//			{ 	size: "L" or "S",
//				type: "S", "B", "J"
//			}
//	position is the location of the upper left corner of the tile:
//			{	x: 0 - max_x,
//				y: 0 - max_y
//			}
//  test: true or false if testing or not



function api_socket_play_field(game_id,user_id,field_tile,position, test){
	socket_play_field(game_id,user_id,field_tile,position, test);
}






// This function is called by the ui to cause a bunch of test messages to be
// sent by the server 
// 	ui_from_api_incoming_chat, true if you want one of these 
function
api_send_test_messages(game_id,ui_from_api_incoming_chat,ui_from_api_player_joined_game,ui_from_api_time_start,ui_from_api_timer_expired){
	socket_send_test_messages(game_id,ui_from_api_incoming_chat,ui_from_api_player_joined_game,ui_from_api_time_start,ui_from_api_timer_expired,true);
}
