var ui_game_id;

var ui_main = function(){

	//***************************
	//Attach functions to buttons
	//***************************
	var url_base = window.location.protocol + "//" + window.location.hostname + ":"+window.location.port+ "/api/";

	// Get_Time Button
    $("div#get_time button").click(function(){
        $.ajax({url: url_base+'get_time', dataType:"json",success: function(result){
			if(result.error == false){
            	$("div#get_time #test").html(result.time);
			}
			else{
				alert("We couldn't get time because:"+result.errors[0]);
			}

        }});
		return false; //Stop subsequent handling of this event
    });


	// Register Game 
    $("div#game_id_box button").click(function(){
		var proposed_game_id = $("div#game_id_box #register_id").val();
        $.ajax({url: url_base+'register_game_id', dataType:"json", data:{game_id:proposed_game_id},success: function(result){
            $("div#game_id_box #response").html(result);
			if(result.error == false){
				ui_game_id = result.game_id;
				socket_subscribe(ui_game_id);

			}
			else{
				alert("We couldn't register your game because:"+result.errors[0]);
			}
        }});
		return false; //Stop subsequent handling of this event
    });

	
	//Attach an action to the chatbox form that sends the message
	$('div.chatbox form').submit(function(){
		var the_message = $('div.chatbox #new_message').val();
		console.log('sending the message '+the_message);
		socket_send_chat(ui_game_id,the_message);
		$('div.chatbox #new_message').val('');
		ui_outgoing_chat(the_message);
		return false; //Stop subsequent handling of this event
	});
};	

//This is called by socket_code when a chat message arrives
function ui_incoming_chat(who,msg){
	$('div.chatbox #messages').append($('<li>').text(who+' : '+msg));
}

//This is called by ui_code for a chat message that I send
function ui_outgoing_chat(msg){
	$('div.chatbox #messages').append($('<li>').text('me : '+msg));
}


$(document).ready(ui_main);
