// stores all the valid games in a static array
call_create_ID.validGames = [];

// creates a new GUID and stores the new id in validGames
function call_create_ID(timeLimit){
	var id = helper_create_ID() + helper_create_ID(true) + helper_create_ID(true) + helper_create_ID();
	call_create_ID.validGames.push(new Game(id,timeLimit));
	return id;
};

// helper function for the create_ID function
var helper_create_ID = function(s) {
	var p = (Math.random().toString(16)+"000000000").substr(2,8);
	return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;
}
//<<<<<<< HEAD:engine.js

//Proposed game state functions and objects follow:

//creates new game object

function Game(gameID, turnLimit) {
	//gameID randomly created when player creates new game, or specified when player joins game
	this.gameID = gameID;
	//time limit specified by gameCreator for maximum turn length
	this.turnLimit = turnLimit;
}

//=======
//>>>>>>> bce0683f140ac765c4e08ce0b4e9dc45bab510f4:engine/our_engine.js

// The functions the API server sees

module.exports = {
	//get_time returns the system's current time
	get_time: function(){
		var currentTime = new Date();
		return currentTime.getHours().toString() + ":" + currentTime.getMinutes().toString() + ":" + currentTime.getSeconds().toString();
	},

	//createID returns a random GUID for use as a game ID
	create_ID : function(timeLimit){
		return call_create_ID(timeLimit);
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