var balloon,backgroundImg;
var balloonImg;
var position,database;
function preload(){
  backgroundImg=loadImage("background.png")
  balloonImg=loadAnimation("HotAirBallon1.png","HotAirBallon2.png","HotAirBallon3.png")
}
function setup() {
  background(backgroundImg); 
  database = firebase.database();
  console.log(database);
  createCanvas(1400,900);
  balloon=createSprite(200,650,10,10)
  balloon.addAnimation("flying",balloonImg)
  balloon.scale=1
  var balloonPosition=database.ref("balloon/height");
    balloonPosition.on("value",readHeight,showError);
  
}

function draw() {
  background(backgroundImg);

  text ("use arrow keys to move the hot air balloon",400,400)
  if(keyDown(LEFT_ARROW)){
    balloon.x=balloon.x -10
}
else if(keyDown(RIGHT_ARROW)){
  balloon.x=balloon.x +10
}
else if(keyDown(UP_ARROW)){
  balloon.y=balloon.y -10
}
else if(keyDown(DOWN_ARROW)){
  balloon.y=balloon.y +10
}  
  drawSprites();
}

function updateHeight(x,y){

  database.ref("balloon/height").set( {
      'x': height.x + x,
      'y': height.y + y
  })
}

function readHeight(data)
{
  height=data.val();
  console.log(height.x);
  balloon.x=height.x;
  balloon.y=height.y;

}

function showError()
{
  console.log("Error in writing to the database");
}