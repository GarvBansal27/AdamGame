var adam, bush, key, score, enemy,life, gameState, lestArrow, rightArrow;
var groundGroup, platformGroup, invisiblePlatformGroup, bushGroup, keyGroup,coinGroup, bubbleGroup;

function preload(){
  BGImage=loadImage("images/BG.png");
  RunImage=loadAnimation("images/Run/Run1.png","images/Run/Run2.png","images/Run/Run3.png","images/Run/Run4.png","images/Run/Run5.png",
  "images/Run/Run6.png","images/Run/Run7.png","images/Run/Run8.png","images/Run/Run9.png","images/Run/Run10.png"
  );
  /*DeadImage=loadAnimation("images/Dead/Dead1.png","images/Dead/Dead2.png","images/Dead/Dead3.png","images/Dead/Dead4.png","images/Dead/Dead5.png",
  "images/Dead/Dead6.png","images/Dead/Dead7.png","images/Dead/Dead8.png","images/Dead/Dead9.png","images/Dead/Dead10.png",
  );*/
  JumpImage=loadAnimation("images/Jump/Jump1.png","images/Jump/Jump2.png","images/Jump/Jump3.png","images/Jump/Jump4.png","images/Jump/Jump5.png",
  "images/Jump/Jump6.png","images/Jump/Jump7.png","images/Jump/Jump8.png","images/Jump/Jump9.png","images/Jump/Jump10.png"
  );
  IdleImage=loadAnimation("images/Idle/Idle1.png","images/Idle/Idle2.png","images/Idle/Idle3.png","images/Idle/Idle4.png","images/Idle/Idle5.png",
  "images/Idle/Idle6.png","images/Idle/Idle7.png","images/Idle/Idle8.png","images/Idle/Idle9.png","images/Idle/Idle10.png",
  );
  /*SlideImage=loadAnimation("images/Slide/Slide1.png","images/Slide/Slide2.png","images/Slide/Slide3.png","images/Slide/Slide4.png","images/Slide/Slide5.png",
  "images/Slide/Slide6.png","images/Slide/Slide7.png","images/Slide/Slide8.png","images/Slide/Slide9.png","images/Slide/Slide10.png",
  );*/

  CoinImage=loadAnimation("images/Coin/Coin1.png","images/Coin/Coin2.png","images/Coin/Coin3.png","images/Coin/Coin4.png","images/Coin/Coin5.png",
  "images/Coin/Coin6.png",)

  enemyImage=loadAnimation("images/Jinn/Flight1.png","images/Jinn/Flight2.png","images/Jinn/Flight3.png","images/Jinn/Flight4.png")

  groundImage=loadImage("images/Tile/1.png"); 

  platformImage=loadImage("images/Tile/14.png");

  bushImage=loadImage("images/objects/Bush.png");

  keyImage=loadImage("images/objects/Key.png");

  lifeImage=loadImage("images/objects/Life.png");

  bubbleImage=loadImage("images/objects/Bubble.png");
}
function setup() {
  createCanvas(displayWidth, displayHeight-170);
  console.log(displayWidth);
  adam=createSprite(displayWidth/2,displayHeight/2,100,100);
  adam.addAnimation("Run",RunImage);
  adam.addAnimation("idle",IdleImage);
  adam.addAnimation("Jump",JumpImage);
  adam.scale=0.3;
  adam.debug=true;

  groundGroup =new Group(); 
  platformGroup= new Group();
  invisiblePlatformGroup= new Group();
  bushGroup= new Group();
  keyGroup = new Group();
  coinGroup= new Group();
  bubbleGroup = new Group();

    ground=createSprite(displayWidth/2,740,displayWidth,50);
    ground.addImage("groundImage", groundImage);
    ground.velocityX=-6;
    ground.scale=2.2;

    score=0;

    life1=createSprite(100,70,40,40);
    life1.addImage('life', lifeImage);
    life1.scale=0.5;

    life2=createSprite(160,70,40,40);
    life2.addImage('life', lifeImage);
    life2.scale=0.5;

    life3=createSprite(220,70,40,40);
    life3.addImage('life', lifeImage);
    life3.scale=0.5;
    life=3;

    enemy=createSprite(500,500);
    enemy.addAnimation("Jinn", enemyImage);
    enemy.scale=2;
    enemy.velocityX=-10
    enemy.velocityY=-10
    enemy.debug=true;
    enemy.setCollider('rectangle',0,0,20,50);

    gameState="play";
}

function draw() {
  background(BGImage);
  edges=createEdgeSprites();
  adam.collide(edges[0]);
  adam.collide(edges[1]);
  adam.collide(edges[2]);
  adam.collide(edges[3]);

  enemy.bounceOff(edges[0]);
  enemy.bounceOff(edges[1]);
  enemy.bounceOff(edges[2]);
  enemy.bounceOff(edges[3]);
  //enemy.bounceOff(bubbleGroup);
  

  textFont('Jokerman');
  textSize(40);
  fill('black');
  stroke('white');
  text('SCORE: '+score, 1000,100);

  if(gameState==="play"){
  
  if(ground.x<0){
    ground.x=ground.width/2;
  }

  if(keyDown(LEFT_ARROW)){
    adam.x=adam.x-10
    adam.changeAnimation("Run",RunImage);
  }

  if(keyDown(RIGHT_ARROW)){
    adam.x=adam.x+10;
    adam.changeAnimation("Run",RunImage);
  }

  /*if (touches.length > 0 && adam.y >= displayHeight - 300 || keyDown("space")) { 
     //if (touches.length > 0) { 
       adam.velocityY=-15;
       adam.changeAnimation("Jump",JumpImage);
       touches = []; 
      //}
    }*/

    if(touches.length>0){
      if(adam.overlapPoint(touches[0].x,touches[0].y)){
      adam.velocityY=-15;
      adam.changeAnimation("Jump",JumpImage);
      touches = []; 
    }
  }

 adam.velocityY=adam.velocityY+1;

 for (var i=0;i<coinGroup.length;i=i+1){
   if(coinGroup.get(i).isTouching(adam)){
     coinGroup.get(i).destroy()
     score=score+1
   }
 }

 if(enemy.collide(adam)){
  
   life=life-1;
   console.log("life " + life);
   enemy.velocityX=-10;
   enemy.velocityY=-10;
 }

if(bushGroup.collide(adam)){
   life=life-1;
}

 if(life===3){
  life1.visible=true;
  life2.visible=true;
  life3.visible=true;
  }
  if(life===2){
   life1.visible=true;
   life2.visible=true;
   life3.visible=false;
  }

  if(life===1){
   life1.visible=true;
  life2.visible=false;
  life3.visible=false;
  }
  if(life===0){
   life1.visible=false;
  life2.visible=false;
  life3.visible=false;
  gameState='end';
  }

  spawnPlatform();
  //spawnGround();
  spawnBush();
  spawnCoin();
}else if(gameState==='end'){

adam.velocityX=0;
adam.velocityY=0;
adam.changeAnimation('idle', IdleImage);
ground.velocityX=0;
platformGroup.destroyEach();
coinGroup.destroyEach();
enemy.velocityX=0;
enemy.velocityY=0;
enemy.animation.looping=false;
invisiblePlatformGroup.destroyEach();
bubbleGroup.destroyEach();
bushGroup.destroyEach();


}

  drawSprites();
  adam.collide(ground);
  adam.collide(platformGroup);
  adam.collide(bushGroup);
  if(adam.isTouching(invisiblePlatformGroup)){
    adam.changeAnimation("idle",IdleImage);
  }
}

function spawnGround(){
  if(frameCount%100===0){
    var ground=createSprite(0,700,70,50);
    ground.addImage("groundImage", groundImage);
    ground.velocityX=-1;
    groundGroup.add(ground);
  }
}

function spawnPlatform(){
  if(frameCount%300===0){
    var platform=createSprite(displayWidth,350,40,30);
    platform.addImage("Platform", platformImage);
    platform.velocityX=-3;
    platform.y=Math.round(random(250,400));
    platform.scale=0.4;
    platformGroup.add(platform);

    var invisiblePlatform=createSprite(displayWidth,platform.y-40,250,30);
    invisiblePlatform.velocityX=-3;
    invisiblePlatform.visible=false;
    invisiblePlatformGroup.add(invisiblePlatform);

   var bubble=createSprite(platform.x,platform.y-50,50,50);
   bubble.addImage('bubble', bubbleImage);
   bubble.velocityX=-3;
   bubble.scale=2;
   bubbleGroup.add(bubble);
   

    /*var key=createSprite(displayWidth,platform.y-40,250,30);
    key.addImage("key",keyImage);
    key.velocityX=-3;
    key.scale=0.5;
    keyGroup.add(key);*/
  }
}

function spawnBush(){
  if(frameCount%200===0){
    var bush=createSprite(displayWidth,600,20,20);
    bush.addImage("Bush", bushImage);
    bush.velocityX=-6;
    bush.scale=1.5;
    bushGroup.add(bush);
  }
}

function spawnCoin(){
  if(frameCount%40===0){
var coin=createSprite(displayWidth/2,0,20,20);
coin.addAnimation("coin",CoinImage);
coin.scale=0.3;
coin.x=Math.round(random(100,displayWidth-100));
coin.velocityY=4;
coin.depth=ground.depth;
coin.depth=coin.depth-1;
coinGroup.add(coin);
}}