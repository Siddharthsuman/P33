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
var gameState="play";
var score= 0;

function preload(){
  backgroundImg=loadImage("g.png")
}

function setup() {
  createCanvas(700,780);

  
  engine=Engine.create();
  world=engine.world;
  ground1=new Ground(width/2,770,700,20);
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



for (var k=0;k<=width;k=k+80){
  divisions.push(new Divisions(k,height-divisionHeight/2,10,divisionHeight))
}



  Engine.run(engine);
}

function draw() {
background(backgroundImg);
Engine.update(engine);

stroke(4)
fill(230, 178, 247)
  textSize(25)
text("SCORE :"+score,40,40);

if (gameState==="end"){
  particle=null;
  textSize(100);
fill(246, 255, 0);
strokeWeight(4);
text("Game Over",350,350)
}

if(particle!=null){
  particle.display();
  if (particle.body.position.y>760){
    if(particle.body.position.x<300){
      score=score+500;
      particle=null;
      if (count>=5) gameState="end";
    }
  }
}

for (var j = 0; j < plinkos.length; j++) {
   
  plinkos[j].display();
}
for (var k = 0; k < divisions.length; k++) {
  divisions[k].display();
  }
/*for (var j = 0; j < particles.length; j++) {
   
  particles[j].display();
}*/




  ground1.display();
 
 
  //drawSprites();
}

function mousePressed(){
  if (gameState!=="end"){
    count++;
    particle=new Particle(mouseX,10,10)
  }
}