// The functions the API server sees

module.exports = {
	
	get_time: function(){
		var currentTime = new Date();
		return currentTime.getHours().toString() + ":" + currentTime.getMinutes().toString() + ":" + currentTime.getSeconds().toString();
	}
	
	var makeGUID = function() {
    	var helper = function(s) {
        	var p = (Math.random().toString(16)+"000000000").substr(2,8);
        	return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;
   		}
    //console.log(helper() + helper(true) + helper(true) + helper());
    return helper() + helper(true) + helper(true) + helper();
	}
	
};
