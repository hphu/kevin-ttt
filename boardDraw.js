var canvas = document.getElementById("gameboard");
  if (canvas.getContext) {
  var ctx = canvas.getContext("2d");
  }
  
var Xturn = true;

draw();

		

function draw() {

  drawGrid(ctx); // draws the frame

//  drawX(ctx,0,0);
//  drawX(ctx,2,2);
//  drawX(ctx,0,1);
//  drawX(ctx,0,2);
  
//  drawO(ctx,1,0);
//  drawO(ctx,1,1);
//  drawO(ctx,1,2);
}


// draw the game grid.
function drawGrid(ctx){
  drawSquare(ctx, 1,1);
  drawSquare(ctx, 101,1);
  drawSquare(ctx, 201,1);
  drawSquare(ctx, 1,101);
  drawSquare(ctx, 201,101);
  drawSquare(ctx, 201,201);
  drawSquare(ctx, 101,201);
  drawSquare(ctx, 1,201);
 }
  
// individual squares of the grid.
function drawSquare(ctx,x1,y1){
      ctx.beginPath();
      ctx.rect(x1, y1, 100, 100);
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'black';
      ctx.stroke();
}

// draw an X within one of the squares. Accepts the index on the grid of the space to fill.
function drawX(ctx, x, y){
  xSTART = (100 * x) + 10;
  ySTART = (100 * y) + 10;
  xEND = (100 * x) + 90;
  yEND = (100 * y) + 90;
  
  ctx.strokeStyle = "rgb(255,126,0)";
  ctx.beginPath();
  ctx.lineWidth = 3;
  
  ctx.moveTo(xSTART,ySTART);
  ctx.lineTo(xEND,yEND);
  ctx.stroke();
  
  ctx.beginPath();
  ctx.moveTo(xEND,ySTART);
  ctx.lineTo(xSTART,yEND);
  ctx.stroke();
 }
 
// draw a O within one of the squares. Accepts the index on the grid of the space to fill.
 function drawO(ctx, x, y){
  xSTART = (100 * x) + 52;
  ySTART = (100 * y) + 52;
  
  ctx.beginPath();
  ctx.strokeStyle = "rgb(126,0,255)";
  ctx.arc(xSTART,ySTART,40,0,2*Math.PI);
  ctx.stroke();
}

function drawMove(ctx,x,y){
  if(Xturn == true){
    drawX(ctx,x,y);
	}
  else{
    drawO(ctx,x,y);
	}
	Xturn = !(Xturn);
	}


function coordinates(e)
{
x=e.clientX;
y=e.clientY;
coor="Coordinates: (" + x + "," + y + ")";
document.getElementById("demo").innerHTML=coor
}

function clearCoor()
{
document.getElementById("mouse").innerHTML="";
}

function makeMove(e)
{
x=e.clientX;
y=e.clientY;

//Left Column
if (x > 810){
	if (y>346){
	document.getElementById("demo").innerHTML="Request move to (2,2).";
	drawMove(ctx,2,2);
	}
  else if (y>246){
	document.getElementById("demo").innerHTML="Request move to (2,1).";
	drawMove(ctx,2,1);
	}
	else{
	document.getElementById("demo").innerHTML="Request move to (2,0).";
	drawMove(ctx,2,0);
	}
}
else if (x > 710){
if (y>346){
	document.getElementById("demo").innerHTML="Request move to (1,2).";
	drawMove(ctx,1,2);
	}
  else if (y>246){
	document.getElementById("demo").innerHTML="Request move to (1,1).";
	drawMove(ctx,1,1);
	}
	else{
	document.getElementById("demo").innerHTML="Request move to (1,0).";
	drawMove(ctx,1,0);
	}
}
else if (x<=709){
  if (y>346){
	document.getElementById("demo").innerHTML="Request move to (0,2).";
	drawMove(ctx,0,2);
	}
  else if (y>246){
	document.getElementById("demo").innerHTML="Request move to (0,1).";
	drawMove(ctx,0,1);
	}
	else{
	document.getElementById("demo").innerHTML="Request move to (0,0).";
	drawMove(ctx,0,0);
	}
}
}

function myFunction(e)
{
var mousePos = getMousePos(e);
coor="Coordinates: (" + mousePos.x + "," + mousePos.y + ")";
document.getElementById("demo").innerHTML=coor
}

function getMousePos(evt) {
var rect = ctx.getBoundingClientRect();
return {
  x: evt.clientX - rect.left,
  y: evt.clientY - rect.top
  }
 }
// for testing: 
// onmousemove="myFunction(event)"
// onmouseout="clearCoor()" 


// button click ranges
//  x:  710 -> 810 
//  y:  246 -> 346

// top left -- (14,82) to (108,181)
// mid left -- (14,182) to (108, 281)
// bot left -- (14,282) to (108, 381)

// top mid -- (109,80) to (208,181)
// mid mid -- (109,182) to (208,281)
// bot mid -- (109,282) to (208,381)

// top right -- (208,82) to (308,181)
// top mid -- (208,182) to (308,281)
// bot mid -- (208,282) to (308,381)
