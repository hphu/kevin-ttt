$(document).ready(function(){
  gameboard = new Raphael(document.getElementById('board'), 500, 500);  
  initboard();
  getsessionid(); //assign playerid = to the session id

    $.ajax({
    type: 'POST',
    url: 'initializegame.php',
    data: { "playerid": playerid},
    async: false,
    success: function(fromphp) { //get result from php
      gameid = fromphp;

      if (parseInt(playerid) === parseInt(gameid)){ //game creator = 2
        mystateid = 2;
      } else {
        mystateid = 1;
      }

    },
    error: function(xhr, one, two) {
        alert("ERROR");
    }
  });

});

  function gameend(winner, loser, tie){
    if (parseInt(playerid) === parseInt(gameid)){
       $.ajax({
        type: 'POST',
        url: 'gameend.php',
        data: { "winner": winner, "loser": loser, "tie": tie, "gameid": gameid},
        async: false
      });
     }
     document.getElementById("menu").style.visibility='visible';
  }


  function startgame(){
    $.ajax({
    type: 'POST',
    url: 'startgame.php',
    data: {"gameid": gameid},
    async:false,
    success: function(data) {
      var names = data.split("-separator!@#$-");
      if(names[1]){
        gamebegun= true;
        if(parseInt(playerid) === parseInt(gameid)){
          myname = names[0];
          opponentname = names[1];
        } else {
          myname = names[1];
          opponentname = names[0];
        }
      }
    }
   });

  }

function menu(){
  window.location.href='mainmenu.html';
}