//The ui team can change this code at will
var ui_game_id;

var ui_main = function(){

	//***************************
	//Attach functions to buttons
	//***************************

	// Get_Time Button
    $("div#get_time button").click(function(){

		var callback_function = function(result){
			if(result.error == false){
            	$("div#get_time #test").html(result.time);
			}
			else{
				alert("We couldn't get time because:"+result.errors[0]);
			}

        };

		api_get_time(callback_function);

		return false; //Stop subsequent handling of this event
    });


	// Create Game 
    $("div#create_game_box button").click(function(){
		var user_id = "foo"; // needs to be set
		var turn_length = 5000; // needs to be set
			
		var callback_function = function(result){
			if(result.error == false){
            	$("div#create_game_box #response").html(result.game_id);
				ui_game_id = result.game_id;
			}
			else{
				alert("We couldn't register your game because:"+result.errors[0]);
			}
        }});

		api_create_game(user_id,turn_length,callback_function);

		return false; //Stop subsequent handling of this event
    });


	// Join Game 
    $("div#join_game_box button").click(function(){
		var game_id = "foo"; // needs to be set
		var user_id = "foo"; // needs to be set
			
		var callback_function = function(result){
			if(result.error == false){
            	$("div#join_game_box #response").html(result.game_id);
				ui_game_id = result.game_id;
			}
			else{
				alert("We couldn't register your game because:"+result.errors[0]);
			}
        }});

		api_create_game(user_id,turn_length,callback_function);

		return false; //Stop subsequent handling of this event
    });

	
	//Attach an action to the chatbox form that sends the message
	$('div.chatbox form').submit(function(){
		var the_message = $('div.chatbox #new_message').val();

		console.log('sending the message '+the_message);

		api_send_chat(ui_game_id,'Unknown person',the_message);

		$('div.chatbox #new_message').val('');
		ui_outgoing_chat(the_message);
		return false; //Stop subsequent handling of this event
	});
};	


//This is called by ui_code for a chat message that I send
function ui_outgoing_chat(msg){
	$('div.chatbox #messages').append($('<li>').text('me : '+msg));
}


//This is called by the api when a chat message arrives
function ui_from_api_incoming_chat(who,msg){
	$('div.chatbox #messages').append($('<li>').text(who+' : '+msg));
}



//This is called by the api when a new player joins the game
function ui_from_api_player_joined_game(player_id){
	console.log("ui_from_api_player_joined_game: "+player+id);
}


//This is called by the api when the engine starts the timer 
//time_started: milliseconds since epoch then the game started
//turn_end: time when the first turn is expected to end
function ui_from_api_time_start(time_started,turn_end){
	console.log("ui_from_api_time_start: time_started:"+time_started+", id:"+id);
}

//This is called by the api when the engine decides the turn is over 
//which_turn_ended: which turn ended
//next_player: who's turn is next 
function ui_from_api_timer_expired(which_turn_ended,next_player){
	console.log("ui_from_api_timer_expired: which_turn_ended:"+which_turn_ended+", next_player"+next_player);
}




$(document).ready(ui_main);
