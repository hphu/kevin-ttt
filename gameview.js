
var gameboard;
var gamestate = new Array();
var ctx;
var turn;

//called on body load, intiializes empty tic tac toe board and sets update interval
function initboard(){
  gameboard = document.getElementById("board");
   ctx = board.getContext("2d");

   gameboard.addEventListener('click', mouseclick, false);

   ctx.strokeStyle = '#000000'; 
   ctx.lineWidth = 5;

   for (var i=1;i<3;i++){
    ctx.beginPath();
    ctx.moveTo(i*board.height/3, 0);
    ctx.lineTo(i*board.height/3,board.height);
    ctx.stroke();
    ctx.closePath();
   }

    for (var i=1;i<3;i++){
    ctx.beginPath();
    ctx.moveTo(0,i*board.width/3);
    ctx.lineTo(board.width, i*board.width/3);
    ctx.stroke();
    ctx.closePath();
   }

   for (var i=0; i<9;i++){
      gamestate[i] = 0;
   }

    setInterval(update, 1000);

}

function drawx(ctx, x,y){
  this.ctx = ctx;
  this.x = x;
  this.y = y;

  ctx.strokeStyle = '#000000'; 
  ctx.lineWidth = 5;

  ctx.beginPath();
  ctx.moveTo(x-50,y-50);
  ctx.lineTo(x+50,y+50);
  ctx.stroke();
  ctx.closePath();

  ctx.beginPath();
  ctx.moveTo(x+50,y-50);
  ctx.lineTo(x-50,y+50);
  ctx.stroke();
  ctx.closePath();
}

function drawo(ctx,x,y){
  this.ctx = ctx;
  this.x = x;
  this.y = y;

  ctx.strokeStyle = '#000000'; 
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(x,y,50,0,2*Math.PI);
  ctx.stroke();
  ctx.closePath();
}

function mouseclick(e){
   x = e.clientX;
   y = e.clientY;
   canvasx = x-board.offsetLeft;
   canvasy = y-board.offsetTop;

   if (canvasy < board.height/3){

      if (canvasx < board.width/3 ){
        if(gamestate[0]==0){
          alert("topleft");
          } else {
            alert("invalid move");
          }
      } else if (canvasx < 2*board.width/3){
          if(gamestate[1]==0){
            alert("topmiddle");
          } else {
            alert("invalid move");
          }
      } else {
          if(gamestate[2]==0){
            alert("topright");
          } else {
            alert("invalid move");
          }
      }

    } else if (canvasy < 2*board.height/3){

      if (canvasx < board.width/3 ){
          if(gamestate[3]==0){
            alert("middleleft");
          } else {
            alert("invalid move");
          }
      } else if (canvasx < 2*board.width/3){
          if(gamestate[4]==0){
            alert("middle");
          } else {
            alert("invalid move");
          }
      } else {
          if(gamestate[5]==0){
            alert("middleright");
          } else {
            alert("invalid move");
          }
      }

    } else {
      if (canvasx < board.width/3 ){
          if(gamestate[6]==0){
            alert("bottomleft");
          } else {
            alert("invalid move");
          }
      } else if (canvasx < 2*board.width/3){
          if(gamestate[7]==0){
            alert("bottommiddle");
          } else {
            alert("invalid move");
          }
      } else {
          if(gamestate[8]==0){
            alert("bottomright");
          } else {
            alert("invalid move");
          }
      }
    }
}

//called every second
function update(){

  //query database
  //update gamestate
  for (var i=0;i<9;i++){
    switch(gamestate[i]){
      case 1:
        drawx(ctx, (i%3)*board.width/3 +board.width/6, (Math.floor(i/3))*(board.height/3) + board.width/6);
        break;
      case 2:
        drawo(ctx, (i%3)*board.width/3 +board.width/6, (Math.floor(i/3))*(board.height/3) + board.width/6);
        break;
    }
  }
}
