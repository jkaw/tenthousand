// The functions the API server sees

module.exports = {
	//get_time returns the system's current time
	get_time: function(){
		var currentTime = new Date();
		return currentTime.getHours().toString() + ":" + currentTime.getMinutes().toString() + ":" + currentTime.getSeconds().toString();
	},

	/*
		result = { 	error:false,
				 	errors:['none'],
					time:<time>};
	*/

	from_api_get_time(){
			console.log("not implemented");
	},




	/* 	incoming = {
					user_id:<user_id>,
					turn_length:<turn_length>
				};

		returns
		result = {
				error: <true/false>,
			 	errors:[list of errors],
			 	game_id: <game_id>
			};
*/

	from_api_create_game(incoming){
			console.log("not implemented");
	},


	/* 	incoming = {
					user_id:<user_id>,
					game_id:<game_id>,
				};

		returns
		result = {
				error: <true/false>,
			 	errors:[list of errors],
			 	players: [<player1_name>,<player2_name>,<player3_name>,<player4_name>]; //possibly null
			};
*/

	from_api_join_game(incoming){
			console.log("not implemented");
	},




	/* 	incoming = {
					game_id:<game_id>,
				};

		returns
		result = {
				error: <true/false>,
			 	errors:[list of errors],
			 	time_started: <absolute time when game started>
			};
*/

	from_api_start_game(incoming){
			console.log("not implemented");
	},


	
	//createID returns a random GUID for use as a game ID
	create_ID : function(){
    	return call_create_ID();
	},

	validate_ID : function(id){
		if (call_create_ID.validGames.indexOf(id) > -1){
			return true;
		}
		else{
			return false;
		}
	}
};

// stores all the valid games in a static array
call_create_ID.validGames = [];

// creates a new GUID and stores the new id in a static array
function call_create_ID(){
	var id = helper_create_ID() + helper_create_ID(true) + helper_create_ID(true) + helper_create_ID();
	call_create_ID.validGames.push(id);
	return id;
};

// helper function for the create_ID function
var helper_create_ID = function(s) {
	var p = (Math.random().toString(16)+"000000000").substr(2,8);
	return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;
}
