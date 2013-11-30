var playerid;

function friendMatch(){
  window.location.href='friendlist.html';
}
function rankedMatch(){
  window.location.href='gameboard.html';
}
function compMatch(){
  window.location.href='compmatch.html';
}
function leaderboards(){
  window.location.href='leaderboards.html';
}
function record(){
  window.location.href='record.html';
}

function getsessionid(){ //get my player id
  var id;
    $.ajax({
	    type: 'POST',
	    url: 'session.php',
      async:false,
	    success: function(data) {
	    	playerid=data;
	    }
	});
}

$(document).ready( function(){
  getsessionid(); //assign playerid = to the session id
  });
  
  