var main = function(){
    $("button").click(function(){
		var newurl = window.location.protocol + "//" + window.location.hostname + ":8081/";
        $.ajax({url: newurl, dataType: "jsonp", success: function(result){
            $("#test").html(result);
        }});
    });
};

$(document).ready(main);
