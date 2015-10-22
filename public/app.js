var main = function(){
    $("button").click(function(){
        $.ajax({url: "http://localhost:8081", dataType: "jsonp", success: function(result){
            $("#test").html(result);
        }});
    });
};

$(document).ready(main);