// The functions the API server sees

module.exports = {
	//get_time returns the system's current time
	get_time: function(){
		var currentTime = new Date();
		return currentTime.getHours().toString() + ":" + currentTime.getMinutes().toString() + ":" + currentTime.getSeconds().toString();
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