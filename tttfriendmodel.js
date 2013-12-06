var gameidentifier;

function begingame(isplayer1, identifier){

  gameidentifier = identifier;
  gameboard = new Raphael(document.getElementById('board'), 500, 500);  

  getsessionid(); //assign playerid = to the session id
  gameid = gameidentifier[0];
  initboard();
}

  function gameend(winner, loser, tie){
    document.getElementById("menu").style.visibility='visible';

  }


  function startgame(){
    if (myname == null){
      $.ajax({
      type: 'POST',
      url: 'startgame.php',
      data: {"gameid": gameid},
      async:false,
      success: function(data) {
        var names = data.split("-separator!@#$-");
          if(parseInt(playerid) === parseInt(gameid)){
            myname = names[0];
            opponentname = names[1];
          } else {
            myname = names[1];
            opponentname = names[0];
          }
        }
     });
    }

        $.ajax({
        type: 'POST',
        url: 'startfriendgame.php',
        data: {"player1": gameidentifier[0], "player2":gameidentifier[1]},
        async:false,
        success: function(data) {
          if (data > 0){
            gamebegun = true;
          }
        }
   });
  }


