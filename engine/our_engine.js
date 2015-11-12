// The functions the API server sees

module.exports = {

	/*****************************************
		result = { 	error:false,
				 	errors:['none'],
					time:<time>};
	*/
	from_api_get_time: function() {
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
	from_api_create_game:function(user_id, turn_length) {
		var the_game_id = call_create_ID();
		var new_game = new game(the_game_id, [user_id], turn_length, "NA", user_id);
		console.log(the_game_id);
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
	from_api_join_game:function(user_id, game_id) {
		if (validate_ID === false) {
			console.log("Error: Invalid game ID. Please try again.");
		} else if (validate_ID) {
// code to join game
		}
		console.log("not implemented");
	},
	/*****************************************/




	/*****************************************
	 	incoming = {
					game_id:<game_id>,
				};

		returns
		result = {
				error: <true/false>,
			 	errors:[list of errors],
			 	time_started: <absolute time when game started>
			};
	*/
	from_api_start_game:function(incoming){
		console.log("not implemented");
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


	
	//createID returns a random GUID for use as a game ID
	create_ID : function(){
		return call_create_ID();
	},

	validate_ID : function(id) {
		return validate_ID_help(id);
	}
};

validate_ID_help = function(id){
	for (i = 0; i < validGames.length; i++) {
		if (validGames[i].gameID == id) {
			return true;
		}
	}
	return false;
}

// stores all the valid games in a static array
var validGames = [];

// creates a new GUID and stores the new id in a static array
function call_create_ID() {
	var id = helper_create_ID() + helper_create_ID(true) + helper_create_ID(true) + helper_create_ID();
	validGames.push(new game(id));
	return id;
};

// helper function for the create_ID function
var helper_create_ID = function(s) {
	var p = (Math.random().toString(16)+"000000000").substr(2,8);
	return s ? "_" + p.substr(0,4) + "_" + p.substr(4,4) : p ;
}

var call_get_time = function() {
	var currentTime = new Date();
	return currentTime.getHours().toString()
		+ ":" + currentTime.getMinutes().toString()
		+ ":" + currentTime.getSeconds().toString();
};



var sysCurrentTime = call_get_time();

console.log(call_get_time());



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
}

//creates a new player object
function player(playerNum, playerFields) {
	//playerID specified when player creates new game or when player joins game
	this.playerNum = playerNum;
	// an array of Field objects representing the fields owned by each player
	this.playerFields = playerFields;
}

//var name should be gameID with all dashes replaced with underscores
var xxxxxxxx_xxxx_xxxx_xxxx_xxxxxxxxxxxx = new game("xxxxxxxx_xxxx_xxxx_xxxx_xxxxxxxxxxxx",
	"player1", ["player1", "player2", "player3", "player4", "player5"], 3.5, "NA", "player1");

//var name should be gameID with all dashes replaced with underscores
var yyyyyyyy_yyyy_yyyy_yyyy_yyyyyyyyyyyy = new game("yyyyyyyy_yyyy_yyyy_yyyy_yyyyyyyyyyyy",
	"player6", ["player6"], 5.0, "NA", "player6");

var createGame = function(playerID, turnLimit) {
	//will initialize a game object and transition creator to "join game" lobby,
	//where other players will appear when they submit appropriate gameID
	//will also declare gameID to the creator so others can join
}

var joinGame = function(userID, gameID) {
	if (validate_ID_help(gameID) === true) { //call_create_ID.validGames.indexOf(gameID.toString()) > -1) {
		gameID.listOfPlayers.push(userID);
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

//startGame(yyyyyyyy_yyyy_yyyy_yyyy_yyyyyyyyyyyy);
//fix valid id array so that id pushing does not occur only when random GUID is generated

call_create_ID.validGames.push("yyyyyyyy_yyyy_yyyy_yyyy_yyyyyyyyyyyy", ["player6"], 5.0, "NA", "player6");
call_create_ID.validGames.push("yyyyyyyy_yyyy_yyyy_yyyy_yyyyyyyyyyyy");
console.log("Should be true: " + validate_ID_help("yyyyyyyy_yyyy_yyyy_yyyy_yyyyyyyyyyyy"));
//yyyyyyyy_yyyy_yyyy_yyyy_yyyyyyyyyyyy.listOfPlayers.push("test player");
console.log("Test players: " + yyyyyyyy_yyyy_yyyy_yyyy_yyyyyyyyyyyy.listOfPlayers);
joinGame("new player", yyyyyyyy_yyyy_yyyy_yyyy_yyyyyyyyyyyy)
advanceTurn(yyyyyyyy_yyyy_yyyy_yyyy_yyyyyyyyyyyy);







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
