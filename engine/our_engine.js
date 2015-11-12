// The functions the API server sees

CircularList = require('circular-list')

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
	createCircularList:function(user_id){
		var list = new CircularList
		for(var i = 0; i < user_id.length; i++) {
			list.append(new CircularList.Node(user_id[i]))
		}
		return list
	},

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
<<<<<<< HEAD
	}
	return false;
}

=======
	}
	return false;
}

createfields = function(smallfieldnum, bigfieldnum) {
	var resultfields = [];
	
	resultfields.push(field("big", "silo"));
	resultfields.push(field("big", "building"));
	for (i = 0; i < (bigfieldnum - 2); i++) {
		resultfields.push(field("big", "irrigation"))
	}
	resultfields.push(field("small", "silo"));
	resultfields.push(field("small", "building"));
	for (i = 0; i < (smallfieldnum - 2); i++) {
		resultfields.push(field ("small", "irrigation"))
	}
	return resultfields;


	
}

distribute_fields = function(gameID){
		//*
		var tempgame = findgame(gameID, validGames);
		var gamenum = findgamenum(gameID, validGames);

		//need to create new method to retrive game object. 

		if (findgame.listOfPlayers.size == 2) {
			findgame.listOfPlayers[0] = (findgame.listOfPlayers[0].playernum, createfields(8,7));
			findgame.listOfPlayers[1] = (findgame.listOfPlayers[1].playernum, createfields(8,7));
			validGames[gamenum] = tempgame;
		}
		else if (findgame.listOfPlayers.size == 3) {
			findgame.listOfPlayers[0] = (findgame.listOfPlayers[0].playernum, createfields(7,6).push(field("small", "irrigation")));
			findgame.listOfPlayers[1] = (findgame.listOfPlayers[1].playernum, createfields(7,6).push(field("small", "irrigation")));
			findgame.listOfPlayers[2] = (findgame.listOfPlayers[2].playernum, createfields(7,6));
			validGames[gamenum] = tempgame;
		}
		else if (findgame.listOfPlayers.size == 4) {
			findgame.listOfPlayers[0] = (findgame.listOfPlayers[0].playernum, createfields(6,5).push(field("small", "irrigation")));
			findgame.listOfPlayers[1] = (findgame.listOfPlayers[1].playernum, createfields(6,5).push(field("small", "irrigation")));
			findgame.listOfPlayers[2] = (findgame.listOfPlayers[2].playernum, createfields(6,5));
			findgame.listOfPlayers[3] = (findgame.listOfPlayers[3].playernum, createfields(6,5));
			validGames[gamenum] = tempgame;
		}
		else if (findgame.listOfPlayers.size == 5) {
			findgame.listOfPlayers[0] = (findgame.listOfPlayers[0].playernum, createfields(5,4).push(field("small", "irrigation")));
			findgame.listOfPlayers[1] = (findgame.listOfPlayers[1].playernum, createfields(5,4).push(field("small", "irrigation")));
			findgame.listOfPlayers[2] = (findgame.listOfPlayers[2].playernum, createfields(5,4));
			findgame.listOfPlayers[3] = (findgame.listOfPlayers[3].playernum, createfields(5,4));
			findgame.listOfPlayers[4] = (findgame.listOfPlayers[4].playernum, createfields(5,4));
			validGames[gamenum] = tempgame;
		}





		//*/
	}

findGame = function(gameID, GameArray) {
	for (i = 0; i < GameArray.size; i ++) {
		if (GameArray[i] == gameID) {
			return GameArray[i];
		}
		else return null;
	}

}

findGamenum = function(gameID, GameArray) {
	for (i = 0; i < GameArray.size; i ++) {
		if (GameArray[i] == gameID) {
			return i;
		}
		else return null;
	}

}




>>>>>>> 23b8e3cff6cff770fddc564d992cf7df2f07a436
// stores all the valid games in a static array
var validGames = [];

// creates a new GUID and stores the new id in a static array
<<<<<<< HEAD
function call_create_ID() {
=======
function call_create_ID(){
>>>>>>> 23b8e3cff6cff770fddc564d992cf7df2f07a436
	var id = helper_create_ID() + helper_create_ID(true) + helper_create_ID(true) + helper_create_ID();
	validGames.push(new game(id));
	return id;
};

// helper function for the create_ID function
var helper_create_ID = function(s) {
	var p = (Math.random().toString(16)+"000000000").substr(2,8);
	return s ? "_" + p.substr(0,4) + "_" + p.substr(4,4) : p ;
}
<<<<<<< HEAD
=======

var call_get_time = function() {
	var currentTime = new Date();
	return currentTime.getHours().toString()
		+ ":" + currentTime.getMinutes().toString()
		+ ":" + currentTime.getSeconds().toString();
};



var sysCurrentTime = call_get_time();

console.log(call_get_time());


>>>>>>> 23b8e3cff6cff770fddc564d992cf7df2f07a436

var call_get_time = function() {
	var currentTime = new Date();
	return currentTime.getHours().toString()
		+ ":" + currentTime.getMinutes().toString()
		+ ":" + currentTime.getSeconds().toString();
};

<<<<<<< HEAD


var sysCurrentTime = call_get_time();

console.log(call_get_time());



=======
>>>>>>> 23b8e3cff6cff770fddc564d992cf7df2f07a436
//creates new game object
function game(gameID, listOfPlayers, turnLimit, startTime, whoseTurn) {
	//gameID randomly created when player creates new game, or specified when player joins game
	this.gameID = gameID;
	//array of all player objects within game - number of player objects created with specified gameID
<<<<<<< HEAD
=======
	//should be in order of time joined and will determine turn sequence?
>>>>>>> 23b8e3cff6cff770fddc564d992cf7df2f07a436
	this.listOfPlayers = listOfPlayers;
	//time limit specified by gameCreator for maximum turn length
	this.turnLimit = turnLimit;
	//the time the game was started at - started playing, NOT time at which game was created
	this.startTime = startTime;
	//playerID of the player whose turn it is now
	this.whoseTurn = whoseTurn;
<<<<<<< HEAD
<<<<<<< HEAD
=======
	this.currentTime = null;
>>>>>>> 23b8e3cff6cff770fddc564d992cf7df2f07a436
}

//creates a new player object
function player(playerNum, playerFields) {
	//playerID specified when player creates new game or when player joins game
<<<<<<< HEAD
	this.playerNum = playerNum;
	// an array of Field objects representing the fields owned by each player
	this.playerFields = playerFields;
=======
	this.currentTime = sysCurrentTime;
	function get_player(playerID){
		for(i = 0; i < listOfPlayers.size; i++){
			if(listOfPlayers[i].id == playerID){
				return listOfPlayers[i];
			}
		}
		return null;
	}
	function get_current_player(){
		return get_player(get_current_player_id());
	}
	function get_current_player_id(){
		return whoseTurn;
	}
	function advance_turn(){
		//TODO: Find user_id of next player
		//TODO: Set whoseTurn equal to the user_id
		this.whoseTurn = listOfPlayers.indexOf(get_current_player()).next()
	}
>>>>>>> 237020284d4ed78a28a8bbe5ea64f3c316be6ec8
=======
	//may need different player ID number separate from this one to allow players of same ID in different games
	//possibly make var name concatenation of gameID and playerID
	this.playerNum = playerNum;
	// an array of Field objects representing the fields owned by each player
	this.playerFields = playerFields;
>>>>>>> 23b8e3cff6cff770fddc564d992cf7df2f07a436
}

//var name should be gameID with all dashes replaced with underscores
var xxxxxxxx_xxxx_xxxx_xxxx_xxxxxxxxxxxx = new game("xxxxxxxx_xxxx_xxxx_xxxx_xxxxxxxxxxxx",
<<<<<<< HEAD
	"player1", ["player1", "player2", "player3", "player4", "player5"], 3.5, "NA", "player1");

//var name should be gameID with all dashes replaced with underscores
var yyyyyyyy_yyyy_yyyy_yyyy_yyyyyyyyyyyy = new game("yyyyyyyy_yyyy_yyyy_yyyy_yyyyyyyyyyyy",
	"player6", ["player6"], 5.0, "NA", "player6");
=======
	"player1", ["player1", "player2", "player3", "player4", "player5"], 3.5, "NA", "player1", sysCurrentTime);

//var name should be gameID with all dashes replaced with underscores
var yyyyyyyy_yyyy_yyyy_yyyy_yyyyyyyyyyyy = new game("yyyyyyyy_yyyy_yyyy_yyyy_yyyyyyyyyyyy",
	"player6", ["player6"], 5.0, "NA", "player6", sysCurrentTime);
>>>>>>> 23b8e3cff6cff770fddc564d992cf7df2f07a436

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
