const Engine=Matter.Engine;
const World=Matter.World;
const Body=Matter.Body;
const Bodies=Matter.Bodies;

var world,engine,body;
var particles=[];
var plinkos=[];
var divisions=[];
var divisionHeight=300;
var ground1,backgroundImg;
var particle;
var gameState="play",count=0;
var score= 0;

function preload(){
  backgroundImg=loadImage("g.png")
}

function setup() {
  createCanvas(700,800);

  //ENGINE AND WORLD
  engine=Engine.create();
  world=engine.world;

  //GROUND VAR
  ground1=new Ground(width/2,788,700,20);
  
  //PLINKOS GROUP
 for(var j=65; j<=width;j=j+75)
  {
    plinkos.push(new Plinko(j,75));
  }
  for (var j=20;j<=width-10;j=j+50)
 {
   plinkos.push(new Plinko(j,175));
 }
for (var j=45;j<=width;j=j+70)
{
  plinkos.push(new Plinko(j,275));
}
for (var j=25;j<=width;j=j+60)
{
  plinkos.push(new Plinko(j,375));
}


//DIVISIONS GROUP
for (var k=0;k<=width;k=k+70){
  divisions.push(new Divisions(k,height-divisionHeight/2,10,divisionHeight))
}



  Engine.run(engine);
}

function draw() {
background(backgroundImg);
Engine.update(engine);

//SCORE OF DOWN
//500 GROUP
push();
fill(255, 91, 91)
text("500",15,600);
text("500",85,600);
text("500",155,600);
text("500",225,600);
pop()
//100 GROUP
push();
fill(255, 239, 66);
text("100",295,600);
text("100",360,600);
text("100",430,600);
pop();
//200 GROUP
push();
fill(16, 170, 232);
text("200",505,600);
text("200",575,600);
text("200",645,600);
pop();


//TEXT SCORE GROUP
stroke(4)
fill(230, 178, 247)
  textSize(25)
text("SCORE :"+score,40,40);

//GAME END GROUP
push();
if (gameState==="end"){
  particle=null;
  textSize(100);
fill(219, 224, 65);
strokeWeight(4);
if(gameState=="end"){
  textSize(100);
  text("GAME OVER!",20,250);
}
}
pop();
//SCORE GROUP
if(particle!=null){
  particle.display();
  if (particle.body.position.y>760){
    if(particle.body.position.x<300){
      score=score+500;
      particle=null;
      if (count>=5) gameState="end";
}
else if (particle.body.position.x<400&& particle.body.position.x>300){
      score=score+100;
      particle=null;
      if (count>=5) gameState="end";
}
else if(particle.body.position.x<800 &&particle.body.position.x>501){ 
      score=score+200;
      particle=null;
      if (count>=5) gameState="end";
}
}
}

//DISPLAYING PLINKOS
for (var j = 0; j < plinkos.length; j++) {
   
  plinkos[j].display();
}
for (var k = 0; k < divisions.length; k++) {
  divisions[k].display();
  }
for (var j = 0; j < particles.length; j++) {
   
  particles[j].display();
}

//DISPLAYING GROUND
  ground1.display();
 
 

}

//CREATING MOUSEPRESSED FUNCTION
function mousePressed(){
  if (gameState!=="end"){
    count++;
    particle=new Particle(mouseX,10,10,10)
  }
}