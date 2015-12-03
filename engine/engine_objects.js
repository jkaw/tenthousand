/**
 * Created by Hunter on 11/12/15.
 */

//Load other engine files
var our_engine = require('./our_engine');
var engine_timing = require('./engine_timing');

//creates new game object
    function game(gameID, listOfPlayers, turnLimit, startTime, whoseTurn)
{
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
    this.currentTime = null;
}

//creates a new player object
function player(playerNum, playerFields) {
    //playerID specified when player creates new game or when player joins game
    this.playerNum = playerNum;
    // an array of Field objects representing the fields owned by each player
    this.playerFields = playerFields;
    this.currentTime = sysCurrentTime;
}