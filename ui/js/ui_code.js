//The ui team can change this code at will
var ui_game_id;
var ui_turnTime = 60;
var ui_main = function(){

	//***************************
	//Attach functions to buttons
	//***************************

	// Get_Time Button
    $("div#api_ajax_get_time_box button").click(function(){

		var callback_function = function(result){
			if(result.error == false){
            	$("div#api_ajax_get_time_box #test").html(result.time);
			}
			else{
				alert("We couldn't get time because:"+result.errors[0]);
			}

        };

		api_ajax_get_time(callback_function);

		return false; //Stop subsequent handling of this event
    });


	// Create Game 
    $("div#cg-form-wrapper button#createGame").click(function(){
		var user_id = $("div#cg-form-wrapper #user").val(); // needs to be set
			
		var callback_function = function(result){
			if(result.error == false){
            	$("div#create_game_box #user").html(result.game_id);
				ui_game_id = result.game_id;
				window.location = "page.html";
			}
			else{
				alert("We couldn't register your game because:"+result.errors[0]);
			}
        };

		api_create_game(user_id,ui_turnTime,callback_function);

		return false; //Stop subsequent handling of this event
    });


	// Joing Game 
    $("div#jg-form-wrapper button").click(function(){
		var game_id = $("div#cg-form-wrapper #host").val(); // needs to be set
		var user_id = $("div#cg-form-wrapper #user").val(); // needs to be set
			
		var callback_function = function(result){
			if(result.error == false){
            	$("div#jg-form-wrapper #host").html(result.game_id);
				ui_game_id = result.game_id;
			}
			else{
				alert("We couldn't register your game because:"+result.errors[0]);
			}
        };

		api_join_game(game_id,user_id,callback_function,false);

		return false; //Stop subsequent handling of this event
    });

	
	//Attach an action to the chatbox form that sends the message
	$('div.chatbox form').submit(function(){
		var the_message = $('div.chatbox #new_message').val();

		console.log('sending the message '+the_message);

		api_send_chat(ui_game_id,the_message);

		$('div.chatbox #new_message').val('');
		ui_outgoing_chat(the_message);
		return false; //Stop subsequent handling of this event
	});
};	

function assignTurnLength(time){
ui_turnTime=time;}

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
	console.log("ui_from_api_player_joing_game: "+player+id);
}



$(document).ready(ui_main);
