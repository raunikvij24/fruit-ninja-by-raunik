var play=1;
var end=0;
var gameState=1;

var sword,enemy,fruit,fruitGroup,enemygroup;
var swordImage,virusImage,fruit1,fruit2,fruit3,fruit4,gameoverImage


function preload(){
  
swordImage=loadImage("sword.png");
virusImage= loadAnimation("alien1.png","alien2.png");
fruit1=loadImage("fruit1.png");
fruit2=loadImage("fruit2.png");
fruit3=loadImage("fruit3.png");
fruit4=loadImage("fruit4.png");
gameoverImage=loadImage("gameover.png");
  
sound=loadSound("knifeSwooshSound.mp3");
sound1=loadSound("gameover.mp3");
}



function setup() {
  createCanvas(400, 400);
  sword=createSprite(40,200,20,20);
  sword.addImage(swordImage);
  sword.setCollider("rectangle",0,0,40,40);
  sword.scale=0.7;
  sword.debug = false;
  
  fruitGroup = createGroup();
  enemyGroup = createGroup();
  
  score=0;
}

function draw() {
  background(220);
  
  if(gameState===play){
    spawnfruits();
    spawnenemy();
    sword.y=World.mouseY;
    sword.x=World.mouseX;
    
    if(fruitGroup.isTouching(sword)){
      fruitGroup.destroyEach();
      sound.play();
      score=score+2
      
    }
  else 
 {  
  
   if(enemyGroup.isTouching(sword)){
     gameState = end;
     
     fruitGroup.destroyEach();
     enemyGroup.destroyEach();
     fruitGroup.setVelocityXEach(0);
     enemyGroup.setVelocityYEach(0);
     
     sword.addImage(gameoverImage);
     sound1.play();
     sword.x =200;
     sword.y=200;
   }

}
  
  
  
  }
  
  
  drawSprites();
  text("score"+score,300,30);
  
}
function spawnfruits(){
if(World.frameCount%80===0){
fruit = createSprite(400,200,20,20);
fruit.scale=0.2;
  
  r = Math.round(random(1,4));
  if(r == 1){
  fruit.addImage(fruit1);
    
  }else if(r == 3){
   fruit.addImage(fruit2);
  }else if(r == 3){
  fruit.addImage(fruit3);
  }else{
    fruit.addImage(fruit4);
  }
  
  
  fruit.y = Math.round(random(50,340));
  
  fruit.velocityX =-7;
  fruit.setLifetime= 100
  
  fruitGroup.add(fruit);
}
 }
 function spawnenemy(){
if(World.frameCount%200===0){
virus = createSprite(400,200,20,20);
virus.addAnimation("moving",virusImage);
virus.y = Math.round(random(100,300));
virus.velocityX=-8;
virus.setLifetime=50;

enemyGroup.add(virus);
}
}