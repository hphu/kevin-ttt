
var gameboard;
var gamestate = new Array();
var ctx;
var justwent;
var playerid;
var gameid; //id of the game's creator
var gamebegun = false;
var mystateid; //id used in gamestate string 1 or 2

var opponentname;
var myname;
var gameover = false;

var drawngamestate = new Array(); //array to keep track of what spaces have been drawn so we don't draw ontop of symbols.

$(document).ready( function(){
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


      if (parseInt(playerid) === parseInt(gameid)){
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

function getsessionid(){ //get my player id
    $.ajax({
	    type: 'POST',
	    url: 'session.php',
      async:false,
	    success: function(data) {
	    	playerid=data;

	    }
	});


}

//called on body load, intiializes empty tic tac toe board and sets update interval
function initboard(){

  //document.getElementById('board').addEventListener('click', mouseclick, false);
  $('#board').bind('click', mouseclick);
    

   for (var i=1;i<3;i++){
    gameboard.path("M " + i*gameboard.height/3 + ", 0 l 0, " + gameboard.height).attr("stroke-width", "5");;
   }

  for (var i=1;i<3;i++){
    gameboard.path("M 0, " + i*gameboard.width/3 + " l " + gameboard.width + ", 0").attr("stroke-width", "5");;
   }

   for (var i=0; i<9;i++){
      gamestate[i] = 0;
      drawngamestate[i] = false;
   }


    window.setInterval(update, 1000);

}

function drawx(x,y){
  this.x = x;
  this.y = y;
  var stroke1 = gameboard.path("M " + (this.x-50) + ", " + (this.y-50));
  var stroke2 = gameboard.path("M " + (this.x+50) + ", " + (this.y-50));
  stroke1.attr({
     stroke: '#6666FF',  
     'stroke-width': 5
  });

  stroke2.attr({
     stroke: '#6666FF',  
     'stroke-width': 5 
  });
  stroke1.animate({path:"M " + (this.x-50) + ", " + (this.y-50) + " l 100 ,100"}, 500);
  stroke2.animate({path:"M " + (this.x+50) + ", " + (this.y-50) + " l -100 ,100"}, 500);
}

function drawo(x,y){
  this.x = x;
  this.y = y;

  //animating circle code references Raphael polar clock demo code
  gameboard.customAttributes.arc = function (x,y, val, total, radius){
    var alpha = 360/ total*val,
    a = (90- alpha)*Math.PI /180,
    ax = x + radius*Math.cos(a),
    ay = y - radius*Math.sin(a),
    path;
    if (total == val){ //if arc has reached circle, leave path starting from 12o clock of circle to 11:59.99 of circle
        path = [["M", x, y - radius],["A", radius, radius, 0, 1, 1, x-.01, y - radius]];
    } else {
      path = [["M", x, y - radius],["A", radius, radius, 0, +(alpha > 180), 1, ax, ay]];
    }
    return {
      path: path
    };
  };
  var circle = gameboard.path().attr({
      stroke: '#FF3300',  
      'stroke-width': 5,  
      arc: [x, y, 0, 100, 50]
     });

  circle.animate({
      arc: [x, y, 100, 100, 50]
  }, 1000);
}

function mouseclick(e){
   x = e.clientX;
   y = e.clientY;
   c = document.getElementById('board');
   canvasx = x-c.offsetLeft;
   canvasy = y-c.offsetTop;
   if (gamebegun && !gameover){
     if (justwent == mystateid){
      alert("Not your turn");
     } else {
     if (canvasy < gameboard.height/3){

        if (canvasx < gameboard.width/3 ){
          if(gamestate[0]==0){
            move(0);
            } else {
              alert("invalid move");
            }
        } else if (canvasx < 2*gameboard.width/3){
            if(gamestate[1]==0){
              move(1);
            } else {
              alert("invalid move");
            }
        } else {
            if(gamestate[2]==0){
              move(2);
            } else {
              alert("invalid move");
            }
        }

      } else if (canvasy < 2*gameboard.height/3){

        if (canvasx < gameboard.width/3 ){
            if(gamestate[3]==0){
              move(3);
            } else {
              alert("invalid move");
            }
        } else if (canvasx < 2*gameboard.width/3){
            if(gamestate[4]==0){
              move(4);
            } else {
              alert("invalid move");
            }
        } else {
            if(gamestate[5]==0){
              move(5);
            } else {
              alert("invalid move");
            }
        }

      } else {
        if (canvasx < gameboard.width/3 ){
            if(gamestate[6]==0){
              move(6);
            } else {
              alert("invalid move");
            }
        } else if (canvasx < 2*gameboard.width/3){
            if(gamestate[7]==0){
              move(7);
            } else {
              alert("invalid move");
            }
        } else {
            if(gamestate[8]==0){
              move(8);
            } else {
              alert("invalid move");
            }
        }
      }
    }

  }
}

function move(position){
  gamestate[position]=mystateid;
  var newboard = gamestate.toString();

  newboard = newboard.replace(/,/g ,'');
    console.log(newboard);
  $.ajax({
    type: 'POST',
    url: 'makemove.php',
    data: {"gameid": gameid, "move": newboard, "justwent": mystateid},
    async:false,
  });
}

//called every second
function update(){
    //query database
  //update gamestate

    if (!gamebegun){
      startgame();
      document.getElementById("playerturn").innerHTML = "Waiting for opponent to join...";
    } else if (!gameover){
      if (justwent == mystateid){
        document.getElementById("playerturn").innerHTML = opponentname + "'s turn";
      } else {
        document.getElementById("playerturn").innerHTML = myname + "'s turn";
      }
    } else if (gameover){

    }
    $.ajax({
      type: 'POST',
      url: 'gamestate.php',
      data: {"gameid": gameid},
      async:false,
      success: function(data) {
        for (var i=0; i<9;i++){
          gamestate[i] = data.charAt(i);
        }
        justwent = (data.charAt(9));

        if (data.charAt(10)  == 'w'){
          gameover = true;
          if (parseInt(data.charAt(16)) == mystateid){
            console.log(mystateid);
            document.getElementById("playerturn").innerHTML = myname + " has won!";
          } else {
            document.getElementById("playerturn").innerHTML = opponentname + " has won!";
          }
        } else if (data.indexOf('0')  === -1){
            gameover = true; 
            document.getElementById("playerturn").innerHTML = "Tie";
        }
      }
  });
  for (var i=0;i<9;i++){
    if (drawngamestate[i]== false){
      if(parseInt(gamestate[i]) === 2){ //game creator is always X
          drawx((i%3)*(gameboard.width/3) +gameboard.width/6, (Math.floor(i/3))*(gameboard.height/3) + gameboard.width/6);
          drawngamestate[i]=true;
        } else if (gamestate[i] != 0) {
          drawo((i%3)*(gameboard.width/3) +gameboard.width/6, (Math.floor(i/3))*(gameboard.height/3) + gameboard.width/6);
          drawngamestate[i]=true;
        }
      }
    }
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
          //console.log(names[0] + "ismyname");
          myname = names[0];
          opponentname = names[1];
        } else {
          //console.log(names[1] + "is my name");
          myname = names[1];
          opponentname = names[0];
        }
      }
    }
   });

  }
