// The functions the API server sees

CircularList = require('circular-list')
Assignment = require('Assignment')

var validGames = [];

module.exports = {

	validGames: validGames,

	/*****************************************
	 result = { 	error:false,
				 	errors:['none'],
					time:<time>};
	 */
	from_api_ajax_get_time: function() {
		var result = { 	error:false,
			errors:[],
			time: call_get_time()
		}
		return result;
	},
	/*****************************************/




	/*****************************************
	 incoming = {
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


	from_api_ajax_create_game:function(user_id, turn_length) {
		var the_game_id = call_create_ID();
		var listOfPlayers = [];
		listOfPlayers.push(user_id);
		var new_game = new game(the_game_id, listOfPlayers, turn_length, "NA", user_id);
		console.log(the_game_id);
		module.exports.validGames.push(new_game);
		console.log(JSON.stringify(module.exports.validGames));
		return the_game_id;
	},
	/*****************************************/


	/*****************************************
	 incoming = {
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
	from_api_ajax_join_game:function(user_id, game_id) {
		console.log("not implemented");
		return null;
		if (validate_ID_help === false) {
			console.log("Error: Invalid game ID. Please try again.");
		} else if (validate_ID_help) {
			joinGame(user_id, game_id);
			return our_socket.socket_player_joined_game(game_id, user_id);
		}
	},
	/*****************************************/

	get_game_instance:function(game_id){
		//DO STUFF!!!!!
		return null
	},

	turn_start:function(user_id, game_id){
		game = get_game_instance(game_id)
		game.whoseturn = user_id
		setTimeout(game.advance_turn,game.turnlimit)
	},




	/*****************************************
	 incoming = {
					game_id:<game_id>,
				};

	 returns
	 result = {
				error: <true/false>,
			 	errors:[list of errors],
				whatever the UI team wants
			};
	 */
	from_api_start_game:function(query){
		var game_id = query.game_id;
		distribute_fields(game_id);

		var ret = {};
		ret.error = "false";
		ret.errors = [];
		ret.players = findGame(game_id, validGames).listOfPlayers;
		return ret;

	},
	/*****************************************/


	/*****************************************
	 incoming = {
					game_id:<game_id>,
					user_id:<user_id>,
				};

	 returns null;
	 */
	from_api_player_is_done:function(incoming){
		console.log("not implemented");
	},

	createCircularList:function(user_id){
		var list = new CircularList
		for(var i = 0; i < user_id.length; i++) {
			list.append(new CircularList.Node(user_id[i]))
		}
		return list
	},


	/*
	 //createID returns a random GUID for use as a game ID
	 create_ID : function(){
	 return call_create_ID();
	 },

	 validate_ID : function(id) {
	 return validate_ID_help(id);
	 }
	 */

};

var validate_ID_help = function(id){
	for (i = 0; i < validGames.length; i++) {
		if (validGames[i].gameID == id) {
			return true;
		}
	}
	return false;
}

var createfields = function(smallfieldnum, bigfieldnum) {
	//Creates an array of fields based on the starting number of fields.

	var resultfields = [];

	resultfields.push(field("large", "silo"));
	resultfields.push(field("large", "building"));
	for (i = 0; i < (bigfieldnum - 2); i++) {
		resultfields.push(field("large", "irrigation"))
	}
	resultfields.push(field("large", "silo"));
	resultfields.push(field("large", "building"));
	for (i = 0; i < (smallfieldnum - 2); i++) {
		resultfields.push(field ("large", "irrigation"))
	}
	return resultfields;



}

var distribute_fields = function(gameID){
	//*
	console.log("at the start of distribute_fields: "+gameID);
	console.log(JSON.stringify(module.exports.validGames));
	var tempGame = findGame(gameID, module.exports.validGames);
	var gamenum = findGamenum(gameID, module.exports.validGames);

	//Creates a game object with each player having the starting amount of fields

	console.log(JSON.stringify(tempGame));

	if (tempGame.listOfPlayers.size == 2) {
		tempGame.listOfPlayers[0] = new player(findGame(gameID, validGames).listOfPlayers[0].playerID, createfields(8,7));
		tempGame.listOfPlayers[1] = new player(findGame(gameID, validGames).listOfPlayers[1].playerID, createfields(8,7));
		validGames[gamenum] = tempGame;
	}
	else if (tempGame.listOfPlayers.size == 3) {
		tempGame.listOfPlayers[0] = new player(findGame(gameID, validGames).listOfPlayers[0].playerID, createfields(7,6).push(new field("small", "irrigation")));
		tempGame.listOfPlayers[1] = new player(findGame(gameID, validGames).listOfPlayers[1].playerID, createfields(7,6).push(new field("small", "irrigation")));
		tempGame.listOfPlayers[2] = new player(findGame(gameID, validGames).listOfPlayers[2].playerID, createfields(7,6));
		validGames[gamenum] = tempGame;
	}
	else if (tempGame.listOfPlayers.size == 4) {
		tempGame.listOfPlayers[0] = new player(findGame(gameID, validGames).listOfPlayers[0].playerID, createfields(6,5).push(new field("small", "irrigation")));
		tempGame.listOfPlayers[1] = new player(findGame(gameID, validGames).listOfPlayers[1].playerID, createfields(6,5).push(new field("small", "irrigation")));
		tempGame.listOfPlayers[2] = new player(findGame(gameID, validGames).listOfPlayers[2].playerID, createfields(6,5));
		tempGame.listOfPlayers[3] = new player(findGame(gameID, validGames).listOfPlayers[3].playerID, createfields(6,5));
		validGames[gamenum] = tempGame;
	}
	else if (tempGame.listOfPlayers.size == 5) {
		tempGame.listOfPlayers[0] = new player(findGame(gameID, validGames).listOfPlayers[0].playerID, createfields(5,4).push(new field("small", "irrigation")));
		tempGame.listOfPlayers[1] = new player(findGame(gameID, validGames).listOfPlayers[1].playerID, createfields(5,4).push(new field("small", "irrigation")));
		tempGame.listOfPlayers[2] = new player(findGame(gameID, validGames).listOfPlayers[2].playerID, createfields(5,4));
		tempGame.listOfPlayers[3] = new player(findGame(gameID, validGames).listOfPlayers[3].playerID, createfields(5,4));
		tempGame.listOfPlayers[4] = new player(findGame(gameID, validGames).listOfPlayers[4].playerID, createfields(5,4));
		validGames[gamenum] = tempGame;
	}
	//*/
};

var findGame = function(gameID, GameArray) {
	//This will find the game object in the game array given the id.
	for (i = 0; i < GameArray.length; i ++) {
		console.log(JSON.stringify(GameArray[i]));
		if (GameArray[i].gameID === gameID) {
			return GameArray[i];
		}
		else return null;
	}
};

var findGamenum = function(gameID, GameArray) {
	//this will find the position of the game object in a game array.
	for (i = 0; i < GameArray.size; i ++) {
		if (GameArray[i] === gameID) {
			return i;
		}
		else return null;
	}
};

get_valid_assignments = function(game_id){
	currentGame = findGame(game_id);
	var validAssignments = [];
	for(i = 0; i < currentGame.get_assignments(); i++){
		if(currentGame.get_assignments()[i].contains_tile_size(currentGame.get_fields())) {

		}
	}
	return validAssignments;
};

// creates a new GUID
function call_create_ID() {
	var id = helper_create_ID() + helper_create_ID(true) + helper_create_ID(true) + helper_create_ID();
	return id;
};

// helper function for the call_create_ID function
var helper_create_ID = function(s) {
	var p = (Math.random().toString(16)+"000000000").substr(2,8);
	return s ? "_" + p.substr(0,4) + "_" + p.substr(4,4) : p ;
};

var call_get_time = function() {
	var currentTime = new Date();
	return currentTime.getHours().toString()
		+ ":" + currentTime.getMinutes().toString()
		+ ":" + currentTime.getSeconds().toString();
};

var sysCurrentTime = call_get_time();

//creates new field object
function field(size, type){
	this.size = size;
	//need to specifiy size as either large or small
	this.type = type;
	//need to specify type as irrigation, silo, or building
	this.x = null;
	//The x coordinate will be filled in once played
	this.y = null;
	//The y coordinate will be filled in once played
}

//creates new game object
function game(gameID, listOfPlayers, turnLimit, startTime, whoseTurn) {
	//gameID randomly created when player creates new game, or specified when player joins game
	this.gameID = gameID;
	//array of all player objects within game - number of player objects created with specified gameID
	this.listOfPlayers = listOfPlayers;
	//time limit specified by gameCreator for maximum turn length
	this.turnLimit = turnLimit;
	//the time the game was started at - started playing, NOT time at which game was created
	this.startTime = startTime;
	//playerID of the player whose turn it is now
	this.whoseTurn = whoseTurn;
	//TODO: Jared, this is where field placement history should go
	this.fieldsPlayed = [];
}

//creates a new player object
function player(playerID) {
	//playerID specified when player creates new game or when player joins game
	this.playerID = playerID;
	//TODO: Ensure playerFields and playerAssignments are populated on game start
	this.playerFields = null;
	this.playerAssignments = null;
}


function get_player(targetPlayerID, gameID) {
	var theGame = findGame(gameID, validGames);
	for(i = 0; i < theGame.listOfPlayers.size; i++){
		if(theGame.listOfPlayers[i].playerID == targetPlayerID){
			return theGame.listOfPlayers[i];
		}
	}
	return null;
}

function get_current_player(gameID) {
	var theGame = findGame(gameID, validGames);
	return theGame.whoseTurn;
}

function get_current_player_id(gameID) {
	var theGame = findGame(gameID, validGames);
	return theGame.whoseTurn.playerID;
}

function advance_turn(){
	//TODO: Find user_id of next player
	//TODO: Set whoseTurn equal to the user_id
	this.whoseTurn = listOfPlayers.indexOf(get_current_player()).next()
}

var joinGame = function(userID, gameID) {
	var gameIDString = gameID.gameID;
	console.log("TEST: " + gameIDString);
	if (validate_ID_help(gameIDString)) { //call_create_ID.validGames.indexOf(gameID.toString()) > -1) {
		gameID['listOfPlayers'].push(userID);
		console.log("All players: " + gameID.listOfPlayers);
	} else {
		console.log("Error: Invalid game ID. Please try again.");
	}
}

//Needs work
var startGame = function(game) {
	game.startTime = sysCurrentTime;
	console.log("The start time: " + game.startTime);
	return game.startTime;
}

//Needs work
var advanceTurn = function(game) {
	var currentPlayer = game.whoseTurn;
	console.log("Current time: " + call_get_time());
	if (game.startTime === game.currentTime) {
		currentPlayer = game.listOfPlayers[0];
	}
	//else if (sysCurrentTime >= game.startTime + game.turnLimit) {
	//	currentPlayer = game.listOfPlayers[]
	//}
	console.log("Current player: " + currentPlayer);
}


var minor_assignments = [[{type:"small", x:0, y:0}, {type:"small", x:1, y:0}, {type:"small", x:2, y:0}],
	[{type:"large", x:0, y:0}, {type:"small", x:2, y:0}, {type:"small", x:2, y:1}],
	[{type:"small", x:0, y:1}, {type:"small", x:0, y:2}, {type:"large", x:1, y:0}],
	[{type:"small", x:0, y:0}, {type:"small", x:0, y:1}, {type:"large", x:1, y:1}],
	[{type:"small", x:0, y:1}, {type:"small", x:1, y:0}, {type:"large", x:1, y:1}],
	[{type:"small", x:0, y:1}, {type:"small", x:2, y:0}, {type:"large", x:1, y:1}],
	[{type:"small", x:0, y:0}, {type:"large", x:1, y:0}, {type:"small", x:2, y:2}],
	[{type:"small", x:0, y:1}, {type:"large", x:1, y:0}, {type:"small", x:2, y:2}],
	[{type:"small", x:0, y:0}, {type:"small", x:0, y:1}, {type:"small", x:1, y:0}],
	[{type:"small", x:0, y:0}, {type:"small", x:1, y:0}, {type:"large", x:2, y:0}],
	[{type:"small", x:0, y:1}, {type:"small", x:1, y:1}, {type:"large", x:2, y:0}],
	[{type:"small", x:0, y:0}, {type:"large", x:1, y:0}, {type:"small", x:3, y:0}],
	[{type:"small", x:0, y:1}, {type:"large", x:1, y:0}, {type:"small", x:3, y:0}],
	[{type:"small", x:0, y:0}, {type:"large", x:1, y:0}, {type:"small", x:3, y:1}],
	[{type:"large", x:0, y:1}, {type:"large", x:2, y:1}, {type:"small", x:3, y:0}],
	[{type:"small", x:0, y:0}, {type:"large", x:0, y:1}, {type:"large", x:2, y:1}],
	[{type:"large", x:0, y:1}, {type:"large", x:2, y:1}, {type:"small", x:2, y:0}],
	[{type:"small", x:1, y:0}, {type:"large", x:0, y:1}, {type:"large", x:2, y:1}],
	[{type:"large", x:0, y:2}, {type:"large", x:2, y:0}, {type:"small", x:2, y:2}],
	[{type:"large", x:0, y:0}, {type:"large", x:2, y:1}, {type:"small", x:3, y:0}],
	[{type:"small", x:0, y:0}, {type:"large", x:0, y:1}, {type:"large", x:2, y:0}],
	[{type:"large", x:0, y:0}, {type:"small", x:2, y:0}, {type:"large", x:2, y:1}],
	[{type:"small", x:1, y:0}, {type:"large", x:0, y:1}, {type:"large", x:2, y:0}],
	[{type:"small", x:1, y:0}, {type:"large", x:0, y:1}, {type:"large", x:2, y:2}],
	[{type:"small", x:2, y:0}, {type:"large", x:0, y:2}, {type:"large", x:2, y:1}],
	[{type:"small", x:0, y:0}, {type:"large", x:0, y:1}, {type:"large", x:2, y:2}],
	[{type:"large", x:0, y:2}, {type:"large", x:2, y:1}, {type:"small", x:3, y:0}],
	[{type:"large", x:0, y:0}, {type:"large", x:2, y:0}, {type:"large", x:2, y:2}],
	[{type:"large", x:0, y:0}, {type:"large", x:2, y:0}, {type:"large", x:1, y:2}]
];


var major_assignments = [[{type:"small", x:0, y:1}, {type:"small", x:1, y:0}, {type:"small", x:1, y:1}, {type:"small", x:2, y:1}],
	[{type:"small", x:0, y:0}, {type:"small", x:0, y:1}, {type:"small", x:1, y:1}, {type:"small", x:2, y:1}],
	[{type:"small", x:0, y:1}, {type:"small", x:1, y:1}, {type:"small", x:2, y:1}, {type:"small", x:2, y:0}],
	[{type:"small", x:0, y:0}, {type:"small", x:1, y:0}, {type:"small", x:1, y:1}, {type:"small", x:2, y:1}],
	[{type:"small", x:0, y:1}, {type:"small", x:1, y:1}, {type:"small", x:1, y:0}, {type:"small", x:2, y:0}],
	[{type:"large", x:0, y:1}, {type:"small", x:2, y:2}, {type:"small", x:2, y:1}, {type:"small", x:2, y:0}],
	[{type:"small", x:0, y:0}, {type:"small", x:0, y:1}, {type:"small", x:0, y:2}, {type:"large", x:1, y:1}],
	[{type:"large", x:0, y:0}, {type:"small", x:2, y:0}, {type:"small", x:2, y:1}, {type:"small", x:1, y:2}],
	[{type:"small", x:0, y:0}, {type:"small", x:0, y:1}, {type:"large", x:1, y:0}, {type:"small", x:1, y:2}],
	[{type:"large", x:0, y:0}, {type:"small", x:0, y:2}, {type:"small", x:2, y:0}, {type:"small", x:2, y:1}],
	[{type:"small", x:0, y:0}, {type:"small", x:0, y:1}, {type:"large", x:1, y:0}, {type:"small", x:2, y:2}],
	[{type:"small", x:0, y:1}, {type:"small", x:0, y:2}, {type:"large", x:1, y:0}, {type:"small", x:2, y:2}],
	[{type:"large", x:0, y:0}, {type:"small", x:0, y:2}, {type:"small", x:2, y:1}, {type:"small", x:2, y:2}],
	[{type:"small", x:0, y:1}, {type:"small", x:0, y:2}, {type:"large", x:1, y:0}, {type:"small", x:1, y:2}],
	[{type:"small", x:0, y:0}, {type:"small", x:1, y:0}, {type:"small", x:0, y:1}, {type:"small", x:1, y:1}],
	[{type:"small", x:0, y:0}, {type:"small", x:1, y:0}, {type:"small", x:2, y:0}, {type:"small", x:3, y:0}],
	[{type:"small", x:0, y:0}, {type:"small", x:0, y:1}, {type:"small", x:1, y:1}, {type:"large", x:2, y:1}],
	[{type:"large", x:0, y:1}, {type:"small", x:2, y:1}, {type:"small", x:3, y:1}, {type:"small", x:3, y:0}],
	[{type:"small", x:0, y:1}, {type:"small", x:1, y:1}, {type:"small", x:1, y:0}, {type:"large", x:2, y:1}],
	[{type:"large", x:0, y:1}, {type:"small", x:2, y:1}, {type:"small", x:2, y:0}, {type:"small", x:3, y:1}],
	[{type:"small", x:0, y:1}, {type:"small", x:1, y:1}, {type:"small", x:2, y:0}, {type:"large", x:2, y:1}],
	[{type:"large", x:0, y:1}, {type:"small", x:1, y:0}, {type:"small", x:2, y:1}, {type:"small", x:3, y:1}],
	[{type:"small", x:0, y:1}, {type:"small", x:1, y:1}, {type:"large", x:2, y:1}, {type:"small", x:3, y:0}],
	[{type:"small", x:0, y:0}, {type:"large", x:0, y:1}, {type:"small", x:2, y:1}, {type:"small", x:3, y:1}],
	[{type:"small", x:0, y:0}, {type:"small", x:1, y:0}, {type:"large", x:2, y:0}, {type:"small", x:3, y:2}],
	[{type:"large", x:0, y:0}, {type:"small", x:0, y:2}, {type:"small", x:2, y:0}, {type:"small", x:3, y:0}],
	[{type:"small", x:0, y:0}, {type:"small", x:1, y:0}, {type:"large", x:2, y:0}, {type:"small", x:2, y:2}],
	[{type:"large", x:0, y:0}, {type:"small", x:1, y:2}, {type:"small", x:2, y:0}, {type:"small", x:3, y:0}],
	[{type:"small", x:0, y:0}, {type:"small", x:1, y:0}, {type:"small", x:1, y:1}, {type:"large", x:2, y:0}],
	[{type:"large", x:0, y:0}, {type:"small", x:2, y:0}, {type:"small", x:2, y:1}, {type:"small", x:3, y:0}],
	[{type:"small", x:0, y:0}, {type:"small", x:1, y:0}, {type:"small", x:0, y:1}, {type:"large", x:2, y:0}],
	[{type:"large", x:0, y:0}, {type:"small", x:2, y:0}, {type:"small", x:3, y:0}, {type:"small", x:3, y:1}],
	[{type:"small", x:0, y:1}, {type:"large", x:1, y:0}, {type:"small", x:3, y:0}, {type:"small", x:3, y:1}],
	[{type:"small", x:0, y:0}, {type:"small", x:0, y:1}, {type:"large", x:1, y:0}, {type:"small", x:3, y:1}],
	[{type:"small", x:0, y:1}, {type:"small", x:1, y:0}, {type:"large", x:1, y:1}, {type:"small", x:3, y:1}],
	[{type:"small", x:0, y:1}, {type:"small", x:2, y:0}, {type:"large", x:1, y:1}, {type:"small", x:3, y:1}],
	[{type:"small", x:0, y:1}, {type:"small", x:3, y:1}, {type:"large", x:1, y:1}, {type:"small", x:3, y:0}],
	[{type:"small", x:0, y:0}, {type:"small", x:0, y:1}, {type:"large", x:1, y:1}, {type:"small", x:3, y:1}],
	[{type:"small", x:0, y:0}, {type:"large", x:1, y:0}, {type:"small", x:3, y:0}, {type:"small", x:2, y:2}],
	[{type:"small", x:0, y:0}, {type:"large", x:1, y:0}, {type:"small", x:3, y:0}, {type:"small", x:1, y:2}],
	[{type:"small", x:0, y:1}, {type:"large", x:1, y:0}, {type:"small", x:2, y:2}, {type:"small", x:3, y:0}],
	[{type:"small", x:0, y:0}, {type:"large", x:1, y:0}, {type:"small", x:1, y:2}, {type:"small", x:3, y:1}],
	[{type:"small", x:0, y:1}, {type:"large", x:1, y:0}, {type:"small", x:1, y:2}, {type:"small", x:3, y:0}],
	[{type:"small", x:0, y:0}, {type:"large", x:1, y:0}, {type:"small", x:2, y:2}, {type:"small", x:3, y:1}],
	[{type:"small", x:0, y:1}, {type:"small", x:0, y:2}, {type:"large", x:1, y:0}, {type:"small", x:3, y:0}],
	[{type:"small", x:0, y:0}, {type:"large", x:1, y:0}, {type:"small", x:3, y:1}, {type:"small", x:3, y:2}],
	[{type:"small", x:0, y:2}, {type:"small", x:0, y:3}, {type:"large", x:1, y:1}, {type:"small", x:1, y:0}],
	[{type:"large", x:0, y:1}, {type:"small", x:1, y:0}, {type:"small", x:2, y:2}, {type:"small", x:2, y:3}],
	[{type:"small", x:0, y:2}, {type:"small", x:0, y:3}, {type:"large", x:1, y:1}, {type:"small", x:2, y:0}],
	[{type:"small", x:0, y:0}, {type:"large", x:0, y:1}, {type:"small", x:2, y:2}, {type:"small", x:2, y:3}],
	[{type:"small", x:0, y:1}, {type:"large", x:1, y:0}, {type:"small", x:0, y:2}, {type:"small", x:0, y:3}],
	[{type:"large", x:0, y:0}, {type:"small", x:2, y:1}, {type:"small", x:2, y:2}, {type:"small", x:2, y:3}],
	[{type:"small", x:0, y:2}, {type:"large", x:2, y:0}, {type:"small", x:1, y:1}, {type:"small", x:1, y:2}],
	[{type:"large", x:0, y:1}, {type:"large", x:3, y:0}, {type:"large", x:2, y:2}, {type:"large", x:1, y:4}],
	[{type:"large", x:0, y:0}, {type:"large", x:1, y:2}, {type:"large", x:1, y:4}, {type:"large", x:3, y:1}],
	[{type:"large", x:0, y:1}, {type:"large", x:3, y:0}, {type:"large", x:2, y:2}, {type:"large", x:4, y:2}],
	[{type:"large", x:0, y:0}, {type:"large", x:0, y:2}, {type:"large", x:0, y:4}, {type:"large", x:2, y:3}],
	[{type:"large", x:0, y:0}, {type:"large", x:0, y:2}, {type:"large", x:2, y:1}, {type:"large", x:4, y:1}],
	[{type:"large", x:0, y:1}, {type:"large", x:2, y:0}, {type:"large", x:2, y:2}, {type:"large", x:4, y:3}],
	[{type:"large", x:0, y:1}, {type:"large", x:2, y:0}, {type:"large", x:2, y:2}, {type:"large", x:4, y:1}],
	[{type:"large", x:0, y:3}, {type:"large", x:2, y:0}, {type:"large", x:2, y:2}, {type:"large", x:4, y:2}],
	[{type:"large", x:0, y:3}, {type:"large", x:2, y:0}, {type:"large", x:2, y:2}, {type:"large", x:4, y:3}],
	[{type:"large", x:0, y:0}, {type:"large", x:0, y:2}, {type:"large", x:2, y:3}, {type:"large", x:4, y:3}],
	[{type:"large", x:0, y:4}, {type:"large", x:2, y:0}, {type:"large", x:2, y:2}, {type:"large", x:2, y:4}],
	[{type:"large", x:0, y:0}, {type:"large", x:0, y:2}, {type:"large", x:0, y:4}, {type:"large", x:2, y:2}],
	[{type:"large", x:0, y:2}, {type:"large", x:2, y:1}, {type:"large", x:4, y:0}, {type:"small", x:6, y:1}],
	[{type:"small", x:0, y:2}, {type:"large", x:1, y:1}, {type:"large", x:3, y:0}, {type:"large", x:5, y:0}],
	[{type:"large", x:0, y:1}, {type:"large", x:2, y:0}, {type:"large", x:4, y:1}, {type:"small", x:6, y:2}],
	[{type:"large", x:0, y:0}, {type:"large", x:2, y:0}, {type:"large", x:4, y:0}, {type:"small", x:6, y:0}],
	[{type:"large", x:0, y:0}, {type:"small", x:2, y:1}, {type:"large", x:3, y:1}, {type:"large", x:5, y:2}],
	[{type:"large", x:0, y:1}, {type:"large", x:2, y:0}, {type:"small", x:4, y:1}, {type:"large", x:5, y:0}],
	[{type:"large", x:0, y:0}, {type:"small", x:2, y:0}, {type:"large", x:3, y:0}, {type:"large", x:5, y:0}],
	[{type:"large", x:0, y:1}, {type:"large", x:2, y:2}, {type:"large", x:3, y:0}, {type:"large", x:5, y:1}],
	[{type:"large", x:0, y:0}, {type:"large", x:0, y:2}, {type:"large", x:0, y:4}, {type:"large", x:2, y:5}],
	[{type:"large", x:0, y:5}, {type:"large", x:2, y:2}, {type:"large", x:2, y:4}, {type:"large", x:3, y:0}],
	[{type:"large", x:0, y:0}, {type:"large", x:0, y:2}, {type:"large", x:2, y:3}, {type:"large", x:2, y:5}],
	[{type:"large", x:0, y:5}, {type:"large", x:1, y:3}, {type:"large", x:3, y:0}, {type:"large", x:3, y:2}]
];


function coordinates(x, y) {
	this.x = x;
	this.y = y;
}


var allCoordinates = [];
for (i = 50; i > -51; i--) {
	for (j = 50; j > -51; j--) {
		allCoordinates.push(coordinates(i,j));
		//Below will print array of all existing coordinates in a 50x50 board
		//console.log(i + ", " + j);
	}
}

var greaterFieldBound = function(fieldArray) {
	var theGreaterBound = coordinates(0, 0);
	for (i = 0; i < fieldArray.length; i++) {
		if (fieldArray[i].size === "small") {
			theGreaterBound.x = Math.max(theGreaterBound.x, (fieldArray[i].x + 1));
			theGreaterBound.y = Math.max(theGreaterBound.y, (fieldArray[i].y + 1));
		}
		else if (fieldArray[i].size === "large") {
			theGreaterBound.x = Math.max(theGreaterBound.x, (fieldArray[i].x + 2));
			theGreaterBound.y = Math.max(theGreaterBound.y, (fieldArray[i].y + 2));
		}
	}
	return theGreaterBound;
};

var lesserFieldBound = function(fieldArray) {
	var theLesserBound = coordinates.length(0, 0);
	for (i = 0; i < fieldArray.length; i++) {
		if (fieldArray[i].size === "small") {
			theLesserBound.x = Math.min(theLesserBound.x, (fieldArray[i].x - 1));
			theLesserBound.y = Math.min(theLesserBound.y, (fieldArray[i].y - 1));
		}
		else if (fieldArray[i].size === "large") {
			theLesserBound.x = Math.min(theLesserBound.x, (fieldArray[i].x - 2));
			theLesserBound.y = Math.min(theLesserBound.y, (fieldArray[i].y - 2));
		}
	}
	return theLesserBound;
};

var valid_large_fields = function(gameID) {
	var theGame = findGame(gameID, validGames);
	//array validMoves stores coordinates objects
	var validMoves = [];
	//calculates theGreaterBound of a current game board
	var theGreaterBound = greaterFieldBound(theGame.fieldsPlayed);
	//calculates theLesserBound of a current game board
	var theLesserBound = lesserFieldBound(theGame.fieldsPlayed);

	//this if returns (0, 0) if no fields have yet been played
	if (theGame.fieldsPlayed.length < 1) {
		validMoves.push(coordinates(0,0));
	}
	//else checks for every instance other than above base case
	else {
		validMoves = allCoordinates;
		//this for loop moves through all coordinates on board
		for (i = 0; i < validMoves; i++) {
			//this if checks to remove all coordinates that contain an x or y > 48
			if (validMoves[i].x > 48
				|| validMoves[i].y > 48) {
				validMoves.splice(i, 1);
			}
			//this if checks to remove all coordinates greater than the current greaterFieldBound
			if (validMoves[i].x > theGreaterBound.x
				|| validMoves[i].y > theGreaterBound.y) {
				validMoves.splice(i, 1);
			}
			//this if checks to remove all coordinates lower than the current lesserFieldBound
			if (validMoves[i].x < theLesserBound.x
				|| validMoves[i].y < theLesserBound.y) {
				validMoves.splice(i, 1);
			}
			//this for loop moves through the array of all fields that have already been placed
			for (j = 0; j < theGame.fieldsPlayed.length; j++) {
				//this if checks to remove all coordinates that have already been played
				if (
					validMoves[i].x === theGame.fieldsPlayed[j].x
					&& validMoves[i].y === theGame.fieldsPlayed[j].y
				) {
					validMoves.splice(i, 1);
				}
				//this if checks to remove all coordinates that would be inside an already placed large field
				if (
					(
						theGame.fieldsPlayed[j].size === "large"
						&& validMoves[i].x === (theGame.fieldsPlayed[j].x + 1)
						&& validMoves[i].y === (theGame.fieldsPlayed[j].y + 1)
					)
					|| (theGame.fieldsPlayed[j].size === "large"
						&& validMoves[i].x === theGame.fieldsPlayed[j].x
						&& validMoves[i].y === (theGame.fieldsPlayed[j].y + 1)
					)
					|| (theGame.fieldsPlayed[j].size === "large"
						&& validMoves[i].x === (theGame.fieldsPlayed[j].x + 1)
						&& validMoves[i].y === theGame.fieldsPlayed[j].y
					)
				) {
					validMoves.splice(i, 1);
				}
				//this if checks to remove all coordinates that would allow a placed large field to overlap an existing
				//large field's upper right or lower left corner (i.e. non-coordinate or non-boundary corners)
				if (
					(
						theGame.fieldsPlayed[j].size === "large"
						&& validMoves[i].x === (theGame.fieldsPlayed[j].x + 1)
						&& validMoves[i].y === (theGame.fieldsPlayed[j].y - 1)
					)
					|| (theGame.fieldsPlayed[j].size === "large"
						&& validMoves[i].x === (theGame.fieldsPlayed[j].x - 1)
						&& validMoves[i].y === (theGame.fieldsPlayed[j].y + 1)
					)
					|| (theGame.fieldsPlayed[j].size === "large"
						&& validMoves[i].x === (theGame.fieldsPlayed[j].x - 1)
						&& validMoves[i].y === (theGame.fieldsPlayed[j].y - 1)
					)
				) {
					validMoves.splice(i, 1);
				}
			}
		}
	}
	return validMoves;
};



var valid_small_fields = function(gameID) {
	var theGame = findGame(gameID, validGames);
	//array validMoves stores coordinates objects
	var validMoves = [];
	//calculates theGreaterBound of a current game board
	var theGreaterBound = greaterFieldBound(theGame.fieldsPlayed);
	//calculates theLesserBound of a current game board
	var theLesserBound = lesserFieldBound(theGame.fieldsPlayed);

	//this if returns (0, 0) if no fields have yet been played
	if (theGame.fieldsPlayed.length < 1) {
		validMoves.push(coordinates(0,0));
	}
	//else checks for every instance other than above base case
	else {
		validMoves = allCoordinates;
		//this for loop moves through all coordinates on board
		for (i = 0; i < validMoves; i++) {
			//this if checks to remove all coordinates that contain an x or y > 48
			if (validMoves[i].x > 49
				|| validMoves[i].y > 49) {
				validMoves.splice(i, 1);
			}
			//this if checks to remove all coordinates greater than the current greaterFieldBound
			if (validMoves[i].x > theGreaterBound.x
				|| validMoves[i].y > theGreaterBound.y) {
				validMoves.splice(i, 1);
			}
			//this if checks to remove all coordinates lower than the current lesserFieldBound
			if (validMoves[i].x < theLesserBound.x
				|| validMoves[i].y < theLesserBound.y) {
				validMoves.splice(i, 1);
			}
			//this for loop moves through the array of all fields that have already been placed
			for (j = 0; j < theGame.fieldsPlayed.length; j++) {
				//this if checks to remove all coordinates that have already been played
				if (
					validMoves[i].x === theGame.fieldsPlayed[j].x
					&& validMoves[i].y === theGame.fieldsPlayed[j].y
				) {
					validMoves.splice(i, 1);
				}
				//this if checks to remove all coordinates that would be inside an already placed large field
				if (
					(
						theGame.fieldsPlayed[j].size === "large"
						&& validMoves[i].x === (theGame.fieldsPlayed[j].x + 1)
						&& validMoves[i].y === (theGame.fieldsPlayed[j].y + 1)
					)
					|| (theGame.fieldsPlayed[j].size === "large"
						&& validMoves[i].x === theGame.fieldsPlayed[j].x
						&& validMoves[i].y === (theGame.fieldsPlayed[j].y + 1)
					)
					|| (theGame.fieldsPlayed[j].size === "large"
						&& validMoves[i].x === (theGame.fieldsPlayed[j].x + 1)
						&& validMoves[i].y === theGame.fieldsPlayed[j].y
					)
				) {
					validMoves.splice(i, 1);
				}
				//this if checks to remove all coordinates that would allow a placed large field to overlap an existing
				//large field's upper right or lower left corner (i.e. non-coordinate or non-boundary corners)
				/* This section not necessary for checking valid placement of small fields
				 if (
				 (
				 theGame.fieldsPlayed[j].size === "large"
				 && validMoves[i].x === (theGame.fieldsPlayed[j].x + 1)
				 && validMoves[i].y === (theGame.fieldsPlayed[j].y - 1)
				 )
				 || (theGame.fieldsPlayed[j].size === "large"
				 && validMoves[i].x === (theGame.fieldsPlayed[j].x - 1)
				 && validMoves[i].y === (theGame.fieldsPlayed[j].y + 1)
				 )
				 || (theGame.fieldsPlayed[j].size === "large"
				 && validMoves[i].x === (theGame.fieldsPlayed[j].x - 1)
				 && validMoves[i].y === (theGame.fieldsPlayed[j].y - 1)
				 )
				 ) {
				 validMoves.splice(i, 1);
				 }
				 */
			}
		}
	}
	return validMoves;
};





/* Likely not necessary

 function contains(theArray, item) {
 for (i = 0; i < theArray.length; i++) {
 if (theArray[i] === item) {
 return true;
 }
 }
 return false;
 }

 var fieldHistoryCoordinates = function(gameID) {
 var coordinatesArray = [];
 var theGame = findGame(gameID, validGames);
 for (i = 0; i < theGame.fieldsPlayed.length; i++) {
 coordinatesArray.push(coordinates(theGame.fieldsPlayed[i].x, theGame.fieldsPlayed[i].y));
 }
 return coordinatesArray;
 };

 */




/* Commenting out so we can compile -djp3


 //var name should be gameID with all dashes replaced with underscores
 var xxxxxxxx_xxxx_xxxx_xxxx_xxxxxxxxxxxx = new game("xxxxxxxx_xxxx_xxxx_xxxx_xxxxxxxxxxxx",
 "player1", ["player1", "player2", "player3", "player4", "player5"], 3.5, "NA", "player1");

 //var name should be gameID with all dashes replaced with underscores
 var yyyyyyyy_yyyy_yyyy_yyyy_yyyyyyyyyyyy = new game("yyyyyyyy_yyyy_yyyy_yyyy_yyyyyyyyyyyy",
 "player6", ["player6"], 5.0, "NA", "player6");


 call_create_ID.validGames.push("yyyyyyyy_yyyy_yyyy_yyyy_yyyyyyyyyyyy", ["player6"], 5.0, "NA", "player6");
 call_create_ID.validGames.push("yyyyyyyy_yyyy_yyyy_yyyy_yyyyyyyyyyyy");
 >>>>>>> f39b44b6c4419cae64cb49c8c85e2163860b220d
 console.log("Should be true: " + validate_ID_help("yyyyyyyy_yyyy_yyyy_yyyy_yyyyyyyyyyyy"));
 //yyyyyyyy_yyyy_yyyy_yyyy_yyyyyyyyyyyy.listOfPlayers.push("test player");
 joinGame("test player", yyyyyyyy_yyyy_yyyy_yyyy_yyyyyyyyyyyy);
 console.log("Test players: " + yyyyyyyy_yyyy_yyyy_yyyy_yyyyyyyyyyyy.listOfPlayers);
 //joinGame("new player", yyyyyyyy_yyyy_yyyy_yyyy_yyyyyyyyyyyy)
 advanceTurn(yyyyyyyy_yyyy_yyyy_yyyy_yyyyyyyyyyyy);
 */


/*

 var player1 = new player("xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
 "Player 1", "red", true);

 var player2 = new player("xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
 "Player 2", "blue", false);

 var player3 = new player("xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
 "Player 3", "green", false);

 var player4 = new player("xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
 "Player 4", "yellow", false);

 var player5 = new player("xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
 "Player 5", "purple", false);

 //var names for players must be unique across all games
 //var names could be concatenation of gameID and playerID to allow two players of same IDs in different games
 var player6 = new player("yyyyyyyy-yyyy-yyyy-yyyy-yyyyyyyyyyyy",
 "Player 1", "red", true);

 */
