// The functions the API server sees

CircularList = require('circular-list');
//TODO: Sam, Assignment.js file needs to be fixed for the requirement to work
//Assignment = require('Assignment')

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
		};
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
		var new_game = new Game(the_game_id, listOfPlayers, turn_length, "NA", user_id);
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

	turn_start:function(user_id, game_id){
		var theGame = findGame(game_id, validGames);
		theGame.whoseturn = user_id;
		setTimeout(advance_turn(game_id),theGame.turnLimit * 1000)
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
		distribute_assignments_at_start(game_id);

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
		var list = new CircularList;
		for(var i = 0; i < user_id.length; i++) {
			list.append(new CircularList.Node(user_id[i]))
		}
		return list
	}
};

var validate_ID_help = function(id){
	for (var i = 0; i < validGames.length; i++) {
		if (validGames[i].gameID === id) {
			return true;
		}
	}
	return false;
};

var createFields = function(smallfieldnum, bigfieldnum) {
	//Creates an array of fields based on the starting number of fields.

	var resultFields = [];

	resultFields.push(new Field("large", "silo"));
	resultFields.push(new Field("large", "building"));
	for (var i = 0; i < (bigfieldnum - 2); i++) {
		resultFields.push(new Field("large", "irrigation"));
	}
	resultFields.push(new Field("small", "silo"));
	resultFields.push(new Field("small", "building"));
	for (var j = 0; j < (smallfieldnum - 2); j++) {
		resultFields.push(new Field ("small", "irrigation"));
	}
	return resultFields;
};

var distribute_fields = function(gameID){
	console.log("at the start of distribute_fields: "+gameID);
	console.log(JSON.stringify(module.exports.validGames));
	var tempGame = findGame(gameID, module.exports.validGames);
	var gameNum = findGameNum(gameID, module.exports.validGames);

	//Creates a game object with each player having the starting amount of fields
	console.log(JSON.stringify(tempGame));
	if (tempGame.listOfPlayers.length === 2) {
		tempGame.listOfPlayers[0] = new Player(findGame(gameID, validGames).listOfPlayers[0].playerID, createFields(8,7));
		tempGame.listOfPlayers[1] = new Player(findGame(gameID, validGames).listOfPlayers[1].playerID, createFields(8,7));
		validGames[gameNum] = tempGame;
	}
	else if (tempGame.listOfPlayers.length === 3) {
		tempGame.listOfPlayers[0] = new Player(findGame(gameID, validGames).listOfPlayers[0].playerID, createFields(7,6).push(new Field("small", "irrigation")));
		tempGame.listOfPlayers[1] = new Player(findGame(gameID, validGames).listOfPlayers[1].playerID, createFields(7,6).push(new Field("small", "irrigation")));
		tempGame.listOfPlayers[2] = new Player(findGame(gameID, validGames).listOfPlayers[2].playerID, createFields(7,6));
		validGames[gameNum] = tempGame;
	}
	else if (tempGame.listOfPlayers.length === 4) {
		tempGame.listOfPlayers[0] = new Player(findGame(gameID, validGames).listOfPlayers[0].playerID, createFields(6,5).push(new Field("small", "irrigation")));
		tempGame.listOfPlayers[1] = new Player(findGame(gameID, validGames).listOfPlayers[1].playerID, createFields(6,5).push(new Field("small", "irrigation")));
		tempGame.listOfPlayers[2] = new Player(findGame(gameID, validGames).listOfPlayers[2].playerID, createFields(6,5));
		tempGame.listOfPlayers[3] = new Player(findGame(gameID, validGames).listOfPlayers[3].playerID, createFields(6,5));
		validGames[gameNum] = tempGame;
	}
	else if (tempGame.listOfPlayers.length === 5) {
		tempGame.listOfPlayers[0].playerFields = createFields(5,4).push(new Field("small", "irrigation"));
		//tempGame.listOfPlayers[0] = new Player(findGame(gameID, module.exports.validGames).listOfPlayers[0].playerID, createFields(5,4).push(new Field("small", "irrigation")));
		tempGame.listOfPlayers[1] = new Player(findGame(gameID, module.exports.validGames).listOfPlayers[1].playerID, createFields(5,4).push(new Field("small", "irrigation")));
		tempGame.listOfPlayers[2] = new Player(findGame(gameID, module.exports.validGames).listOfPlayers[2].playerID, createFields(5,4));
		tempGame.listOfPlayers[3] = new Player(findGame(gameID, module.exports.validGames).listOfPlayers[3].playerID, createFields(5,4));
		tempGame.listOfPlayers[4] = new Player(findGame(gameID, module.exports.validGames).listOfPlayers[4].playerID, createFields(5,4));
		module.exports.validGames[gameNum] = tempGame;
	}
};

var findGame = function(gameID, GameArray) {
	//This will find the game object in the game array given the id.
	for (var i = 0; i < GameArray.length; i++) {
		console.log(JSON.stringify(GameArray[i]));
		if (GameArray[i].gameID === gameID) {
			return GameArray[i];
		}
		//else return null;
	}
};

var findGameNum = function(gameID, GameArray) {
	//this will find the position of the game object in a game array.
	for (var i = 0; i < GameArray.size; i++) {
		if (GameArray[i] === gameID) {
			return i;
		}
		//else return null;
	}
};

get_valid_assignments = function(game_id){
	var currentGame = findGame(game_id);
	var validAssignments = [];
	for(var i = 0; i < currentGame.get_assignments(); i++){
		if(currentGame.get_assignments()[i].contains_tile_size(currentGame.get_fields())) {
		}
	}
	return validAssignments;
};

// creates a new GUID
var call_create_ID = function() {
	var helper_create_ID = function(s) {
		var p = (Math.random().toString(16) + "000000000").substr(2, 8);
		return s ? "_" + p.substr(0, 4) + "_" + p.substr(4, 4) : p;
	};
	return helper_create_ID() + helper_create_ID(true) + helper_create_ID(true) + helper_create_ID();
};

var call_get_time = function() {
	var currentTime = new Date();
	return currentTime.getHours().toString()
		+ ":" + currentTime.getMinutes().toString()
		+ ":" + currentTime.getSeconds().toString();
};

var sysCurrentTime = call_get_time();

//creates new Field object
function Field(size, type, x, y) {
	//need to specifiy size as either large or small
	this.size = size;
	//need to specify type as irrigation, silo, or building
	this.type = type;
	//The x coordinate will be filled in once played	
	this.x = x;
	//The y coordinate will be filled in once played
	this.y = y;
}

//creates new Game object
function Game(gameID, listOfPlayers, turnLimit, startTime, whoseTurn) {
	//gameID randomly created when player creates new Game, or specified when player joins game
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

//creates a new Player object
function Player(playerID) {
	//playerID specified when player creates new Game or when player joins game
	this.playerID = playerID;
	this.playerFields = [];
	this.playerAssignments = [];
}


function get_player(targetPlayerID, gameID) {
	var theGame = findGame(gameID, validGames);
	for(var i = 0; i < theGame.listOfPlayers.size; i++){
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

function advance_turn(gameID){
	var theGame = findGame(gameID, validGames);
	//TODO: Find user_id of next player
	//TODO: Set whoseTurn equal to the user_id
	theGame.whoseTurn = theGame.listOfPlayers.indexOf(get_current_player()).next();
}

var joinGame = function(userID, gameID) {
	var gameIDString = gameID.gameID;
	console.log("TEST: " + gameIDString);
	if (validate_ID_help(gameIDString)) {
		gameID['listOfPlayers'].push(userID);
		console.log("All players: " + gameID.listOfPlayers);
	} else {
		console.log("Error: Invalid game ID. Please try again.");
	}
};

//Needs work
var startGame = function(game) {
	game.startTime = sysCurrentTime;
	console.log("The start time: " + game.startTime);
	return game.startTime;
};

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
};


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


var distribute_assignments_at_start = function(gameID){
	var global_small_assignments_chosen = [];
	var global_large_assignments_chosen = [];
	var tempGame = findGame(gameID, module.exports.validGames);
	for (var i = 0; i < tempGame.listOfPlayers.size; i++) {
		var small_assignments_chosen = distribute_small_assignments_for_player(tempGame.listOfPlayers.size, global_small_assignments_chosen);
		var large_assignments_chosen = distribute_large_assignments_for_player(tempGame.listOfPlayers.size, global_large_assignments_chosen);
		// keep track of the small and large assignments already chosen
		for (var j = 0; j < small_assignments_chosen.size; j++){
			global_small_assignments_chosen.push(small_assignments_chosen[j]);
		}
		for (var k = 0; k < large_assignments_chosen.size; k++){
			global_large_assignments_chosen.push(large_assignments_chosen[j]);
		}
		tempGame.listOfPlayers[i].playerAssignments = small_assignments_chosen.concat(large_assignments_chosen);
	}
};

var distribute_small_assignments_for_player = function(size_of_game, assignments_already_chosen){
	var tempRandomNum = -1;
	var small_assignments = [];
	var assignments_chosen = assignments_already_chosen;
	if (size_of_game == 3){
		for (var i = 0; i < 6; i++){
			tempRandomNum = getRandomInt(0,minor_assignments.size);
			if (assignments_chosen.indexOf(minor_assignments[tempRandomNum]) > -1){
				i--;
			}
			else {
				small_assignments.push(minor_assignments[tempRandomNum]);
				assignments_chosen.push(minor_assignments[tempRandomNum]);
			}
		}
	}
	if (size_of_game == 4){
		for (var j = 0; j < 5; j++){
			tempRandomNum = getRandomInt(0,minor_assignments.size);
			if (assignments_chosen.indexOf(minor_assignments[tempRandomNum]) > -1){
				j--;
			}
			else {
				small_assignments.push(minor_assignments[tempRandomNum]);
				assignments_chosen.push(minor_assignments[tempRandomNum]);
			}
		}
	}
	if (size_of_game == 5){
		for (var k = 0; k < 4; k++){
			tempRandomNum = getRandomInt(0,minor_assignments.size);
			if (assignments_chosen.indexOf(minor_assignments[tempRandomNum]) > -1){
				k--;
			}
			else {
				small_assignments.push(minor_assignments[tempRandomNum]);
				assignments_chosen.push(minor_assignments[tempRandomNum]);
			}
		}
	}
	return small_assignments;
};

var distribute_large_assignments_for_player = function(size_of_game, assignments_already_chosen){
	var tempRandomNum = -1;
	var large_assignments = [];
	var assignments_chosen = assignments_already_chosen;
	if (size_of_game == 3){
		for (var i = 0; i < 7; i++){
			tempRandomNum = getRandomInt(0,major_assignments.size);
			if (assignments_chosen.indexOf(major_assignments[tempRandomNum]) > -1){
				i--;
			}
			else {
				large_assignments.push(major_assignments[tempRandomNum]);
				assignments_chosen.push(major_assignments[tempRandomNum]);
			}
		}
	}
	if (size_of_game == 4){
		for (var j = 0; j < 6; j++){
			tempRandomNum = getRandomInt(0,major_assignments.size);
			if (assignments_chosen.indexOf(major_assignments[tempRandomNum]) > -1){
				j--;
			}
			else {
				large_assignments.push(major_assignments[tempRandomNum]);
				assignments_chosen.push(major_assignments[tempRandomNum]);
			}
		}
	}
	if (size_of_game == 5){
		for (var k = 0; k < 5; k++){
			tempRandomNum = getRandomInt(0,major_assignments.size);
			if (assignments_chosen.indexOf(major_assignments[tempRandomNum]) > -1){
				k--;
			}
			else {
				large_assignments.push(major_assignments[tempRandomNum]);
				assignments_chosen.push(major_assignments[tempRandomNum]);
			}
		}
	}
	return large_assignments;
};

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}



function Coordinates(x, y) {
	this.x = x;
	this.y = y;
}

var allCoordinates = function() {
	var theCoordinates = [];
	for (var i = 50; i > -51; i--) {
		for (var j = 50; j > -51; j--) {
			theCoordinates.push(new Coordinates(i, j));
			//Below will print array of all existing coordinates in a 50x50 board
			//console.log(i + ", " + j);
		}
	}
	return theCoordinates;
};

var greaterFieldBound = function(fieldArray) {
	var theGreaterBound = new Coordinates(0, 0);
	for (var i = 0; i < fieldArray.length; i++) {
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

var lesserFieldBoundLarge = function(fieldArray) {
	var theLesserBound = new Coordinates (0, 0);
	for (var i = 0; i < fieldArray.length; i++) {
		theLesserBound.x = Math.min(theLesserBound.x, (fieldArray[i].x - 2));
		theLesserBound.y = Math.min(theLesserBound.y, (fieldArray[i].y - 2));
	}
	return theLesserBound;
};

var lesserFieldBoundSmall = function(fieldArray) {
	var theLesserBound = new Coordinates (0, 0);
	for (var i = 0; i < fieldArray.length; i++) {
		theLesserBound.x = Math.min(theLesserBound.x, (fieldArray[i].x - 1));
		theLesserBound.y = Math.min(theLesserBound.y, (fieldArray[i].y - 1));
	}
	return theLesserBound;
};

var checkAdjacentLarge = function(proposedCoordinates, placedFields) {
	var adjacentCoordinates = [];
	for (var i = 0; i < proposedCoordinates.length; i++) {
		for (var j = 0; j < placedFields.length; j++) {
			if (placedFields[j].size == "large") {
				for (var k = 2; k >= 0; k--) {
					for (var l = 2; l >= 0; l--) {
						if (proposedCoordinates[i].x == (placedFields[j].x + k)
							&& proposedCoordinates[i].y == (placedFields[j].y + l)) {
							adjacentCoordinates.push(proposedCoordinates[i]);
						}
						else if (proposedCoordinates[i].x == (placedFields[j].x - k)
							&& proposedCoordinates[i].y == (placedFields[j].y - l)) {
							adjacentCoordinates.push(proposedCoordinates[i]);
						}
						else if (proposedCoordinates[i].x == (placedFields[j].x + k)
							&& proposedCoordinates[i].y == (placedFields[j].y - l)) {
							adjacentCoordinates.push(proposedCoordinates[i]);
						}
						else if (proposedCoordinates[i].x == (placedFields[j].x - k)
							&& proposedCoordinates[i].y == (placedFields[j].y + l)) {
							adjacentCoordinates.push(proposedCoordinates[i]);
						}
					}
				}
			}
			else if (placedFields[j].size == "small") {
				for (var m = 1; m >= 0; m--) {
					for (var n = 1; n >= 0; n--) {
						if (proposedCoordinates[i].x == (placedFields[j].x + m)
							&& proposedCoordinates[i].y == (placedFields[j].y + n)) {
							adjacentCoordinates.push(proposedCoordinates[i]);
						}
						else if (proposedCoordinates[i].x == (placedFields[j].x - m)
							&& proposedCoordinates[i].y == (placedFields[j].y - n)) {
							adjacentCoordinates.push(proposedCoordinates[i]);
						}
						else if (proposedCoordinates[i].x == (placedFields[j].x + m)
							&& proposedCoordinates[i].y == (placedFields[j].y - n)) {
							adjacentCoordinates.push(proposedCoordinates[i]);
						}
						else if (proposedCoordinates[i].x == (placedFields[j].x - m)
							&& proposedCoordinates[i].y == (placedFields[j].y + n)) {
							adjacentCoordinates.push(proposedCoordinates[i]);
						}
					}
				}
			}
		}
	}
	//The following will loop through the array that results from the above code and remove duplicate values
	var cleanedArray = [];
	for (var g = 0; g < adjacentCoordinates.length; g++) {
		var valueIsInArray = false;
		for (var h = 0; h < cleanedArray.length; h++) {
			if (cleanedArray[h] == adjacentCoordinates[g]) {
				valueIsInArray = true;
			}
		}
		if (valueIsInArray) {
			adjacentCoordinates.splice(g--, 1);
		}
		else {
			cleanedArray.push(adjacentCoordinates[g]);
		}
	}
	return cleanedArray;
};

var checkAdjacentSmall = function(proposedCoordinates, placedFields) {
	var adjacentCoordinates = [];
	for (var i = 0; i < proposedCoordinates.length; i++) {
		for (var j = 0; j < placedFields.length; j++) {
			if (placedFields[j].size == "large") {
				for (k = 2; k >= 0; k--) {
					for (l = 2; l >= 0; l--) {
						if (proposedCoordinates[i].x == (placedFields[j].x + k)
							&& proposedCoordinates[i].y == (placedFields[j].y + l)) {
							adjacentCoordinates.push(proposedCoordinates[i]);
						}
						else if (proposedCoordinates[i].x == (placedFields[j].x - 1)
							&& proposedCoordinates[i].y == (placedFields[j].y - 1)) {
							adjacentCoordinates.push(proposedCoordinates[i]);
						}
						else if (proposedCoordinates[i].x == (placedFields[j].x + k)
							&& proposedCoordinates[i].y == (placedFields[j].y - 1)) {
							adjacentCoordinates.push(proposedCoordinates[i]);
						}
						else if (proposedCoordinates[i].x == (placedFields[j].x - 1)
							&& proposedCoordinates[i].y == (placedFields[j].y + l)) {
							adjacentCoordinates.push(proposedCoordinates[i]);
						}
					}
				}
			}
			else if (placedFields[j].size == "small") {
				for (var k = 1; k >= 0; k--) {
					for (var l = 1; l >= 0; l--) {
						if (proposedCoordinates[i].x == (placedFields[j].x + k)
							&& proposedCoordinates[i].y == (placedFields[j].y + l)) {
							adjacentCoordinates.push(proposedCoordinates[i]);
						}
						else if (proposedCoordinates[i].x == (placedFields[j].x - k)
							&& proposedCoordinates[i].y == (placedFields[j].y - l)) {
							adjacentCoordinates.push(proposedCoordinates[i]);
						}
						else if (proposedCoordinates[i].x == (placedFields[j].x + k)
							&& proposedCoordinates[i].y == (placedFields[j].y - l)) {
							adjacentCoordinates.push(proposedCoordinates[i]);
						}
						else if (proposedCoordinates[i].x == (placedFields[j].x - k)
							&& proposedCoordinates[i].y == (placedFields[j].y + l)) {
							adjacentCoordinates.push(proposedCoordinates[i]);
						}
					}
				}
			}
		}
	}
	//The following will loop through the array that results from the above code and remove duplicate values
	var cleanedArray = [];
	for (var m = 0; m < adjacentCoordinates.length; m++) {
		var valueIsInArray = false;
		for (var n = 0; n < cleanedArray.length; n++) {
			if (cleanedArray[n] == adjacentCoordinates[m]) {
				valueIsInArray = true;
			}
		}
		if (valueIsInArray) {
			adjacentCoordinates.splice(m--, 1);
		}
		else {
			cleanedArray.push(adjacentCoordinates[m]);
		}
	}
	return cleanedArray;
};



var valid_large_fields = function(gameID) {
	var theGame = findGame(gameID, module.exports.validGames);
	//array validMoves stores coordinates objects
	var validMoves = allCoordinates();
	//array containing only (0, 0)
	var firstValidMove = [].push(new Coordinates(0, 0));
	//calculates theGreaterBound of a current game board
	var theGreaterBound = greaterFieldBound(theGame.fieldsPlayed);
	//calculates theLesserBound of a current game board
	var theLesserBound = lesserFieldBoundLarge(theGame.fieldsPlayed);

	//this if returns (0, 0) if no fields have yet been played
	if (theGame.fieldsPlayed.length < 1) {
		return firstValidMove;
	}
	//else checks for every instance other than above base case
	else {
		//this for loop moves through all coordinates on board
		for (var i = 0; i < validMoves.length; i++) {
			var theX = validMoves[i].x;
			var theY = validMoves[i].y;
			//this if checks to remove all coordinates that contain an x or y > 48
			if (theX > 48) {
				delete(validMoves[i]);
			}
			else if (theY > 48) {
				delete(validMoves[i]);
			}
			//this if checks to remove all coordinates greater than the current greaterFieldBound
			else if (theX > theGreaterBound.x
				|| theY > theGreaterBound.y) {
				delete (validMoves[i]);
			}
			//this if checks to remove all coordinates lower than the current lesserFieldBound
			else if (theX < theLesserBound.x
				|| theY < theLesserBound.y) {
				delete (validMoves[i]);
			}
			//this for loop moves through the array of all fields that have already been placed
			for (var j = 0; j < theGame.fieldsPlayed.length; j++) {
				var playedX = theGame.fieldsPlayed[j].x;
				var playedY = theGame.fieldsPlayed[j].y;
				//this if checks to remove all coordinates that have already been played
				if (
					theX == theGame.fieldsPlayed[j].x
					&& theY == theGame.fieldsPlayed[j].y
				) {
					delete (validMoves[i]);
				}
				//this if checks to remove all coordinates that would be inside an already placed large field
				else if (
					(
						theGame.fieldsPlayed[j].size == "large"
						&& theX == (playedX + 1)
						&& theY == (playedY + 1)
					)
					|| (theGame.fieldsPlayed[j].size == "large"
						&& theX == playedX
						&& theY == (playedY + 1)
					)
					|| (theGame.fieldsPlayed[j].size == "large"
						&& theX == (playedX + 1)
						&& theY == playedY
					)
				) {
					delete (validMoves[i]);
				}
				else if (
					(
						theGame.fieldsPlayed[j].size == "small"
						&& theX == (playedX - 1)
						&& theY == (playedY - 1)
					)
					|| (theGame.fieldsPlayed[j].size == "small"
						&& theX == (playedX - 1)
						&& theY == (playedY)
					)
					|| (theGame.fieldsPlayed[j].size == "small"
						&& theX == (playedX)
						&& theY == (playedY - 1)
					)
				) {
					delete (validMoves[i]);
				}
				//this if checks to remove all coordinates that would allow a placed large field to overlap an existing
				//large field's upper right or lower left corner (i.e. non-coordinate or non-boundary corners)

				else if (
					(
						theGame.fieldsPlayed[j].size == "large"
						&& theX == (playedX + 1)
						&& theY == (playedY - 1)
					)
					|| (theGame.fieldsPlayed[j].size == "large"
						&& theX == (playedX - 1)
						&& theY == (playedY + 1)
					)
					|| (theGame.fieldsPlayed[j].size == "large"
						&& theX == (playedX - 1)
						&& theY == (playedY - 1)
					)
					|| (theGame.fieldsPlayed[j].size == "large"
						&& theX == playedX
						&& theY == (playedY - 1)
					)
					|| (theGame.fieldsPlayed[j].size == "large"
						&& theX == playedX
						&& theY == (playedY + 1)
					)
					|| (theGame.fieldsPlayed[j].size == "large"
						&& theX == (playedX + 1)
						&& theY == playedY
					)
					|| (theGame.fieldsPlayed[j].size == "large"
						&& theX == (playedX - 1)
						&& theY == playedY
					)
				) {
					delete (validMoves[i]);
				}
			}
		}
		validMoves = validMoves.filter(function(n){ return n != undefined});
		return checkAdjacentLarge(validMoves, theGame.fieldsPlayed);
	}
};





var valid_small_fields = function(gameID) {
	var theGame = findGame(gameID, module.exports.validGames);
	//array validMoves stores coordinates objects
	var validMoves = allCoordinates();
	//array containing only (0, 0)
	var firstValidMove = [].push(new Coordinates(0, 0));
	//calculates theGreaterBound of a current game board
	var theGreaterBound = greaterFieldBound(theGame.fieldsPlayed);
	//calculates theLesserBound of a current game board
	var theLesserBound = lesserFieldBoundSmall(theGame.fieldsPlayed);

	//this if returns (0, 0) if no fields have yet been played
	if (theGame.fieldsPlayed.length < 1) {
		return firstValidMove;
	}
	//else checks for every instance other than above base case
	else {
		//this for loop moves through all coordinates on board
		for (var i = 0; i < validMoves.length; i++) {
			var theX = validMoves[i].x;
			var theY = validMoves[i].y;
			//this if checks to remove all coordinates that contain an x or y > 48
			if (theX > 49) {
				delete(validMoves[i]);
			}
			else if (theY > 49) {
				delete(validMoves[i]);
			}
			//this if checks to remove all coordinates greater than the current greaterFieldBound
			else if (theX > theGreaterBound.x
				|| theY > theGreaterBound.y) {
				delete (validMoves[i]);
			}
			//this if checks to remove all coordinates lower than the current lesserFieldBound
			else if (theX < theLesserBound.x
				|| theY < theLesserBound.y) {
				delete (validMoves[i]);
			}
			//this for loop moves through the array of all fields that have already been placed
			for (var j = 0; j < theGame.fieldsPlayed.length; j++) {
				var playedX = theGame.fieldsPlayed[j].x;
				var playedY = theGame.fieldsPlayed[j].y;
				//this if checks to remove all coordinates that have already been played
				if (
					theX == theGame.fieldsPlayed[j].x
					&& theY == theGame.fieldsPlayed[j].y
				) {
					delete (validMoves[i]);
				}
				//this if checks to remove all coordinates that would be inside an already placed large field
				else if (
					(
						theGame.fieldsPlayed[j].size == "large"
						&& theX == (playedX + 1)
						&& theY == (playedY + 1)
					)
					|| (theGame.fieldsPlayed[j].size == "large"
						&& theX == playedX
						&& theY == (playedY + 1)
					)
					|| (theGame.fieldsPlayed[j].size == "large"
						&& theX == (playedX + 1)
						&& theY == playedY
					)
				) {
					delete (validMoves[i]);
				}
			}
		}
		validMoves = validMoves.filter(function(n){ return n != undefined});
		return checkAdjacentSmall(validMoves, theGame.fieldsPlayed);
	}
};



var player1 = new Player("firstp");
var player2 = new Player("secondp");
var player3 = new Player("thirdp");
var player4 = new Player("fourthp");
var player5 = new Player("fifthp");

var field1 = new Field("large", "silo", 0, 0);
var field2 = new Field("large", "silo", 1, 2);
var field3 = new Field("large", "building", 2, 0);
var field4 = new Field("small", "building", 0, 3);
var field5 = new Field("small", "silo", 0, 2);
var field6 = new Field("large", "irrigation", -2, 2);

var xxxxxxxx_xxxx_xxxx_xxxx_xxxxxxxxxxxx = new Game("xxxxxxxx_xxxx_xxxx_xxxx_xxxxxxxxxxxx",
	[player1, player2, player3, player4, player5], 3.5, "NA", player1);
validGames.push(xxxxxxxx_xxxx_xxxx_xxxx_xxxxxxxxxxxx);

//distribute_fields("xxxxxxxx_xxxx_xxxx_xxxx_xxxxxxxxxxxx");

xxxxxxxx_xxxx_xxxx_xxxx_xxxxxxxxxxxx.fieldsPlayed.push(field1);
xxxxxxxx_xxxx_xxxx_xxxx_xxxxxxxxxxxx.fieldsPlayed.push(field2);
xxxxxxxx_xxxx_xxxx_xxxx_xxxxxxxxxxxx.fieldsPlayed.push(field3);
xxxxxxxx_xxxx_xxxx_xxxx_xxxxxxxxxxxx.fieldsPlayed.push(field4);
//xxxxxxxx_xxxx_xxxx_xxxx_xxxxxxxxxxxx.fieldsPlayed.push(field5);
xxxxxxxx_xxxx_xxxx_xxxx_xxxxxxxxxxxx.fieldsPlayed.push(field6);


console.log("Valid small fields:");
console.log(valid_small_fields("xxxxxxxx_xxxx_xxxx_xxxx_xxxxxxxxxxxx"));
console.log("Number of valid small fields: "
	+ valid_small_fields("xxxxxxxx_xxxx_xxxx_xxxx_xxxxxxxxxxxx").length);
console.log("Valid large fields:");
console.log(valid_large_fields("xxxxxxxx_xxxx_xxxx_xxxx_xxxxxxxxxxxx"));
console.log("Number of valid large fields: "
	+ valid_large_fields("xxxxxxxx_xxxx_xxxx_xxxx_xxxxxxxxxxxx").length);


/* Likely not necessary

 function contains(theArray, item) {
 for (var i = 0; i < theArray.length; i++) {
 if (theArray[i] === item) {
 return true;
 }
 }
 return false;
 }

 var fieldHistoryCoordinates = function(gameID) {
 var coordinatesArray = [];
 var theGame = findGame(gameID, validGames);
 for (var i = 0; i < theGame.fieldsPlayed.length; i++) {
 coordinatesArray.push(coordinates(theGame.fieldsPlayed[i].x, theGame.fieldsPlayed[i].y));
 }
 return coordinatesArray;
 };

 */




/* Commenting out so we can compile -djp3


 //var name should be gameID with all dashes replaced with underscores
 var xxxxxxxx_xxxx_xxxx_xxxx_xxxxxxxxxxxx = new Game("xxxxxxxx_xxxx_xxxx_xxxx_xxxxxxxxxxxx",
 "player1", ["player1", "player2", "player3", "player4", "player5"], 3.5, "NA", "player1");

 //var name should be gameID with all dashes replaced with underscores
 var yyyyyyyy_yyyy_yyyy_yyyy_yyyyyyyyyyyy = new Game("yyyyyyyy_yyyy_yyyy_yyyy_yyyyyyyyyyyy",
 "player6", ["player6"], 5.0, "NA", "player6");


 call_create_ID.validGames.push("yyyyyyyy_yyyy_yyyy_yyyy_yyyyyyyyyyyy", ["player6"], 5.0, "NA", "player6");
 call_create_ID.validGames.push("yyyyyyyy_yyyy_yyyy_yyyy_yyyyyyyyyyyy");
 >>>>>>> f39b44b6c4419cae64cb49c8c85e2163860b220d
 console.log("Should be true: " + validate_ID_help("yyyyyyyy_yyyy_yyyy_yyyy_yyyyyyyyyyyy"));
 //yyyyyyyy_yyyy_yyyy_yyyy_yyyyyyyyyyyy.listOfPlayers.push("test player");
 joinGame("test player", yyyyyyyy_yyyy_yyyy_yyyy_yyyyyyyyyyyy);
 console.log("Test players: " + yyyyyyyy_yyyy_yyyy_yyyy_yyyyyyyyyyyy.listOfPlayers);
 //joinGame("new Player", yyyyyyyy_yyyy_yyyy_yyyy_yyyyyyyyyyyy)
 advanceTurn(yyyyyyyy_yyyy_yyyy_yyyy_yyyyyyyyyyyy);
 */


/*

 var player1 = new Player("xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
 "Player 1", "red", true);

 var player2 = new Player("xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
 "Player 2", "blue", false);

 var player3 = new Player("xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
 "Player 3", "green", false);

 var player4 = new Player("xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
 "Player 4", "yellow", false);

 var player5 = new Player("xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
 "Player 5", "purple", false);

 //var names for players must be unique across all games
 //var names could be concatenation of gameID and playerID to allow two players of same IDs in different games
 var player6 = new Player("yyyyyyyy-yyyy-yyyy-yyyy-yyyyyyyyyyyy",
 "Player 1", "red", true);

 */
