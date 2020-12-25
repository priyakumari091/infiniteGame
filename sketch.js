var back_image,ground,mario_img,mario,invisibleGround,climber,climber_img,climberGroup,climberInvisibleGround,climberInvisibleGrndGrp, jump,gameOverSound;

var gameState;

function preload(){
  
  back_image = loadImage("backGround.png");
  mario_img = loadAnimation("RedBall.png", "RedBall2.png", "RedBall3.png", "RedBall4.png",   "RedBall5.png", "RedBall6.png", "RedBall7.png", "RedBall8.png", "RedBall9.png",           "RedBall10.png");
  
  climber_img = loadImage("climber.png");

  jump = loadSound("Mario-jump-sound.mp3");
  gameOverSound = loadSound("mixkit-video-game-bomb-alert-2803.wav");
}

function setup() {
  createCanvas(680, 400);
  gameState = 'Play';
  ground = createSprite(350, 200, 20, 20);
  mario = createSprite(70,395,30,30);
  mario.addAnimation("mario",mario_img);
  mario .scale = 0.09;
  
  invisibleGround = createSprite(320,395,680,10);
  invisibleGround.visible = false;
  
  climberGroup = new Group();
  climberInvisibleGrndGrp = new Group();
}

function draw() {
  background("#99ffff");
  ground.addImage(back_image);
  ground.scale = 0.52;
  if(gameState === 'Play'){
    
    ground.velocityX = -3;
     if(ground.x < 130)
     {
        ground.x = 350;
    }
    
    if(keyDown(RIGHT_ARROW))
    {
      mario.x = mario.x +5;
    }
    else  if(keyDown(LEFT_ARROW))
    {
        mario.x = mario.x -5;
    }
    else if (keyDown("space") ) 
    {
        mario.velocityY = -14;
        jump.play();
    }
    mario.velocityY =mario.velocityY + 0.7;
    
    spawnWall();
   if(climberGroup.isTouching(mario))
   {
      mario.velocityY = 0;
   }
    
  if(climberInvisibleGrndGrp.isTouching(mario))
    {
        
        mario.destroy();
        gameOverSound.play()
        gameState = 'End';
    }  
  
  }
  
  
   drawSprites();
   if(gameState === "End"){
      
      stroke("yellow");
      fill("yellow");
      textSize(30);
      text("Game Over", 230,250);
      ground.velocityX = 0;
    }
  
  mario.collide(invisibleGround);
  
  
  
}

function spawnWall(){
  if(frameCount% 240 === 0){
     climber = createSprite(300,300,40,20);
    climber.addImage(climber_img);
    climber.y = Math.round(random(250,300));
    climber.x = Math.round(random(250,350));
    climber.velocityX = -2;
    climberInvisibleGround = createSprite(300,290);
    climberInvisibleGround.visible = false;
    climberInvisibleGround.width = climber.width;
    climberInvisibleGround.height = 2;
    climberInvisibleGround.y = climber.y+10;
    climberInvisibleGround.x = climber.x;
    climberInvisibleGround.velocityX = -2;
    climber.depth = mario.depth;
    mario.depth = mario.depth+1;
    climber.Lifetime = 320;
    climberInvisibleGround.Lifetime = 320;
    climberGroup.add(climber);
    climberInvisibleGrndGrp.add(climberInvisibleGround)
    
  }
 
  
}