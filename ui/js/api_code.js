//This file contains functions that are called by the ui
//This is maintained by Prof. Patterson

var api_url_base = window.location.protocol + "//" + window.location.hostname + ":"+window.location.port+ "/api/";



// callback_function is a function that is called with the result of the request
/* result = {
				error: <true/false>,
			 	errors:[list of errors],
			 	time: <time>
			};
*/
function api_get_time(callback_function){
	$.ajax({url: url_base+'api_get_time', dataType:"json",success: callback_function);
}







// game_id is a string that uniquely identifies the game
// user_id is a string that uniquely identifies a user within a game
// turn_length is the length of a turn in milliseconds
// callback_function is a function that is called with the result of the request
/* result = {
				error: <true/false>,
			 	errors:[list of errors],
			 	game_id: <game_id>
			};
*/
function api_create_game(user_id,turn_length,callback_function){
	var api_data = {user_id:user_id,
					turn_length:turn_length};

	var wrapped_callback_function = function(result){
			callback_function(result);
			if(result.error == false){
				socket_subscribe(result.game_id);
			}
	}
	$.ajax({url: url_base+'api_create_game', dataType:"json",data:api_data,success: wrapped_callback_function);
}








// game_id is a string that uniquely identifies the game
// user_id is a string that uniquely identifies a user within a game
// callback_function is a function that is called with the result of the request
/* result = {
				error: <true/false>,
			 	errors:[list of errors],
			 	players: [<player1_name>,<player2_name>,<player3_name>,<player4_name>]; //possibly null
			};
*/
function api_join_game(game_id,user_id,callback_function){
	var api_data = {game_id:game_id,
					user_id:user_id};
	var wrapped_callback_function = function(result){
			callback_function(result);
			if(result.error == false){
				socket_subscribe(game_id);
			}
	}
	$.ajax({url: url_base+'api_join_game', dataType:"json",data:api_data,success: wrapped_callback_function);
}










// game_id is a string that uniquely identifies the game
// callback_function is a function that is called with the result of the request
/* result = {
				error: <true/false>,
			 	errors:[list of errors],
			 	time_started: <absolute time when game started>
			};
*/
function api_start_game(game_id,callback_function){
	var api_data = {game_id:game_id};
	$.ajax({url: url_base+'api_start_game', dataType:"json",data:api_data,success: callback_funciton);
}






// game_id is a string that uniquely identifies the game
// the_message is the string that should be sent
function api_send_chat(game_id,the_message){
	socket_send_chat(ui_game_id,the_message);
}
