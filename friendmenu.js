var myid;
var identifier =[];

function challengefriend(){

var friendname = document.getElementById("name").value;

$.ajax({
type: 'POST',
url: 'challengefriend.php',
data: {"friendname": friendname, "myid": myid},
async:false,
success: function(data) {
	if (data == "notfound"){
    	document.getElementById("playerturn").innerHTML = "Oops, your friend " + friendname +" doesn't seem to exist!";
	} else {
        identifier = data.split(" ");
        mystateid = 2;
        begingame(true, identifier);
        hidemenus();
		document.getElementById("playerturn").innerHTML = "Request Sent waiting for " + friendname + " to join...";
	}
	}
});
}

function acceptchallenge(from){
    document.getElementById("playerturn").innerHTML = "Connecting...";
    hidemenus();
    $.ajax({
        type: 'POST',
        url: 'acceptchallenge.php',
        data: {"friendname": from, "myid": myid},
        async:false,
        success: function(data){
            identifier = data.split(" ");
        }
    });
    mystateid = 1;
    begingame(false, identifier);
}

function hidemenus(){
    document.getElementById("menu").style.visibility='hidden'; //disable main menu button
    document.getElementById("form").style.visibility='hidden'; //disable challenging while in game
}



$(document).ready(function(){
    $.ajax({
        type: 'POST',
        url: 'session.php',
        async: false,
        success: function(data) {
            myid=data;
         }
    });


    $.ajax({
        type: 'POST',
        url: 'getchallenges.php',
        data: { "myid": myid},
        async: false,
        success: function(challengers) {
            if (challengers){
                var chall = (challengers.slice(0,-1)).split(" ");
                var challengelist = "Challenges:<br></br>";
                for (var i=0;i<chall.length;i++){
                    challengelist += '<button onClick="acceptchallenge(\''+chall[i]+'\')">'+chall[i]+'</button>';
                }
                document.getElementById("playerturn").innerHTML = challengelist;
            }
        }
    });
});


function menu(){
  window.location.href='mainmenu.html';
}