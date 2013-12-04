var gameboard;
var gamestate = [];
var justwent = 1;
var player = 1;
var computer = 2;
var gameover = false;

$(document).ready(function(){
  gameboard = new Raphael(document.getElementById('board'), 500, 500);  
  initboard();
  $('#board').bind('click', mouseclick);
});

//called on body load
function initboard(){

   for (var i=1;i<3;i++){
    gameboard.path("M " + i*gameboard.height/3 + ", 0 l 0, " + gameboard.height).attr("stroke-width", "5");;
   }
  for (var i=1;i<3;i++){
    gameboard.path("M 0, " + i*gameboard.width/3 + " l " + gameboard.width + ", 0").attr("stroke-width", "5");;
   }
   for (var i=0; i<9;i++){
      gamestate[i] = 0;
   }
    moveAI(); //computer goes first
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
   canvasy = y - c.offsetTop;
   if (!gameover){
     if (justwent == player){
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
  justwent = player;
  gamestate[position]=player;
  drawx((position%3)*(gameboard.width/3) +gameboard.width/6, (Math.floor(position/3))*(gameboard.height/3) + gameboard.width/6);
  if (gameend()==1){
    gameover = true;
    document.getElementById("end").innerHTML = "You won!";
  }

  moveAI();
}

function moveAI(){

    while(justwent == player && !gameover){
    var moverandom = Math.floor(Math.random()*9);
    if (gamestate[moverandom]==0){
      justwent = computer;
      drawo((moverandom%3)*(gameboard.width/3) +gameboard.width/6, (Math.floor(moverandom/3))*(gameboard.height/3) + gameboard.width/6);
      gamestate[moverandom] = computer;
      if (gameend()==2){
        gameover = true;
        document.getElementById("end").innerHTML = "The computer has won";
      } else if (istie()){
        gameover=true;
        document.getElementById("end").innerHTML = "You tied the computer";
      }
    }
  }
}

function istie(){
  for (var i=0;i<9;i++){
    if (gamestate[i]==0){
      return false;
    }
  }
  return true;
}

function gameend(){
    for (var i = 1; i<3; i++){
    if (gamestate[0] == i && gamestate[1] == i && gamestate[2] == i || gamestate[3] == i && gamestate[4] == i && gamestate[5]==i || gamestate[6] == i && gamestate[7] == i && gamestate[8]==i){
      return i;
    } else if (gamestate[0] == i && gamestate[3] == i && gamestate[6] == i || gamestate[1] == i && gamestate[4] == i && gamestate[7]==i || gamestate[2] == i && gamestate[5] == i && gamestate[8]==i){
      return i;
    } else if (gamestate[0]==i && gamestate[4] ==i && gamestate[8]==i || gamestate[2]==i && gamestate[4] ==i && gamestate[6]==i ){
      return i;
    } else if (i==2){
      return 0;
    }
  }
}

function resetgame(){
  gameboard.clear();
  justwent = 1;
  gameover = false;
  initboard();
  document.getElementById("end").innerHTML = "";
}


function menu(){
  window.location.href='mainmenu.html';
}