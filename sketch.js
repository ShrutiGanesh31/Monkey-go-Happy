
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score, survialTime;
var ground;
var backImage,backgr;
//GameStates
var PLAY = 1;
var END = 0;
var gameState = PLAY;

//Preload
function preload(){
  
  //jungle
 backImage=loadImage("jungle.jpg");
  
  
  //Monkey
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  //Banana
  bananaImage = loadImage("banana.png");
  //Obstacle
  obstacleImage = loadImage("obstacle.png");
 
}


//Setup
function setup() {
  //Canvas
  createCanvas(800,400);
  
  //jungle
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  //Groups
  FoodGroup = createGroup();
  obstacleGroup = createGroup();
  TimeGroup = createGroup();
  
  //Monkey
 monkey = createSprite(100,340,20,50);
  monkey.addAnimation("Running",monkey_running);
  monkey.scale = 0.1;
  
 //Ground
  ground = createSprite(400,350,800,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  ground.visible=false;
  
  FoodGroup = new Group();
  obstaclesGroup = new Group();
  
  
  //score
  score = 0;
  survialTime = 0;
  
}

//Draw
function draw() {
  
  //Background
  background ("jungle.jpg");
  
  
 if(ground.x<0) {
    ground.x=ground.width/2;
  }
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(FoodGroup.isTouching(monkey)){
      FoodGroup.destroyEach();
    score = score + 2;
    }
    switch(score){
        case 10: monkey.scale=0.12;
                break;
        case 20: monkey.scale=0.14;
                break;
        case 30: monkey.scale=0.16;
                break;
        case 40: monkey.scale=0.18;
                break;
        default: break;
    }
  
    if(keyDown("space") ) {
      monkey.velocityY = -12;
    }
    monkey.velocityY = monkey.velocityY + 0.8;
  
    monkey.collide(ground);
  
    spawnFood();
  
    spawnObstacles();
 
    if(obstaclesGroup.isTouching(monkey)){ 
        monkey.scale=0.08;
     // score=score-2;
    }
  
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 400,50);  
}

function spawnFood() {
  //code for spawn the food
  if (frameCount % 80 === 0) {
    var banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -5;
    
     // lifetime to the var
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    
    // banana to the group
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    var obstacle = createSprite(800,350,10,40);
    obstacle.velocityX = -6;
    
    
    // scale and lifetime to the obstacle     
    obstacle.scale = 0.3;
    obstacle.lifetime = 300;
    
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}


  
 
   