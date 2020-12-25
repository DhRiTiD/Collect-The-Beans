//declare variables for different objects
var PLAY = 1;
var END = 0;
var gameState = PLAY;

var back, backI;

var girl, girlI;
var obs1, obs2;

var bean, beanI, beansGroup;

var groundGroup;

var restart, restartI;

var plus, powerGroup;

var time;
var score;

var sound;

function preload() {

  //load animation, images and sounds
  obs1 = loadImage("obs1.png");

  obs2 = loadImage("obs2.png");

  obs = loadImage("obs3.png");

  backI = loadImage("BG2.png");

  beanI = loadImage("bean.png");

  girlI = loadAnimation("Run (1).png", "Run (2).png", "Run (3).png", "Run (4).png", "Run (5).png", "Run (6).png", "Run (7).png", "Run (8).png", "Run (9).png", "Run (10).png", "Run (11).png", "Run (12).png", "Run (14).png", "Run (15).png", "Run (16).png", "Run (17).png", "Run (18).png", "Run (19).png", "Run (20).png");
  restartI = loadImage("RESTART.png");
  
  sound = loadSound("Alan Walker - Spectre [NCS Release].mp3");
}

function setup() {
  //create canvas
  createCanvas(600, 400);
  
  //add Sound
  sound.loop();

  //create a sprite for different variables, assign animation/image 
  back = createSprite(300, 200);
  back.addImage(backI);
  back.scale = 0.8;

  restart = createSprite(300, 200);
  restart.addImage(restartI);
  restart.scale = 1;
  restart.visible = false;

  girl = createSprite(160, 220, 10, 10);
  girl.addAnimation("girl", girlI);
  girl.scale = 0.2;
  //girl.debug=true;     

  //create new groups
  groundGroup = new Group();
  beansGroup = new Group();
  powerGroup = new Group();

  //let the initial time and score be 0
  time = 0;
  score = 0;
}

function draw() {
  //clear the background
  background("back");

  //assign a platform
  girl.collide(groundGroup);

  //PLAY
  if (gameState === PLAY) {

    //make the girl jump on pressing SPACE key
    if (keyDown("space")) {
      girl.velocityY = -12;
    }

    //gravity
    girl.velocityY = girl.velocityY + 1.5;

    //give condition for END state
    //END state, when the girl goes out of the canvas 
    if (girl.y > 400 || girl.y < 0 || girl.x > 600 || girl.x < 0) {
      gameState = END;
    }

    //calculate survival time
    time = time + Math.round(getFrameRate() / 60);

    //score +1
    if (beansGroup.isTouching(girl)) {
      beansGroup.destroyEach();
      score +=1 ;
    }
    //score +5
    if (powerGroup.isTouching(girl)) {
      powerGroup.destroyEach();
      score = score + 5;
    }

    //calling different user-defined functions
    Ground();
    BEANS();
    extra();

    //END
  } else if (gameState === END) {

    //destroy the objects to get clear background
    groundGroup.destroyEach();
    beansGroup.destroyEach();

    //restart image
    restart.visible = true;

    //RESTART
    if (keyDown("r") && gameState === END) {
      reset();
      restart.visible = false;
    }
  }

  //SURVIVAL TIME
  drawSprites();
  fill("#663399");
  textFont("domino")
  textSize(20);
  text("🅢U🅡V🅘V🅐L 🅣Y🅜 : " + time, 300, 30);

  //BEANS collected
  text("B🅔A🅝S : " + score, 110, 30)
}

function reset() {

  //change the gameState
  gameState = PLAY;

  //restet girl's position and velocity
  girl.x = 160;
  girl.y = 220;
  girl.velocityY = 0;
  girl.velocityX = 0;

  //initial score and time = 0
  score = 0;
  time = 0;
}

//Moving GROUNDS
function Ground() {
  if (frameCount % 55 === 0) {
    var ground = createSprite(750, 360, 10, 40);
    ground.velocityX = -(8 + time/ 100);

    //let the AI choose randomly
    var rand = Math.round(random(1, 2));
    switch (rand) {
      case 1:
        ground.addImage(obs1);
        break;
      case 2:
        ground.addImage(obs2);
        break;
      default:
        break;
    }
    //assign scale and lifetime to the obstacle           
    ground.scale = 1.2;
    ground.lifetime = 300;
    //obstacle.debug = true;

    //adjust the depth
    ground.depth = restart.depth;
    restart.depth += 1;

    //add each grounds to the group
    groundGroup.add(ground);
  }
}

//moving BEANS
function BEANS() {
  if (frameCount % 130 === 0) {
    bean = createSprite(800, 300);
    bean.y = Math.round(random(150, 250));
    bean.addImage(beanI);
    bean.scale = 0.3;
    bean.velocityX = -(8 + time / 100);

    //assign lifetime to the variable
    bean.lifetime = 250;
    //bean.debug = true;

    //adjust the depth
    bean.depth = restart.depth;
    restart.depth += 1;

    //add each beans to a group
    beansGroup.add(bean);
  }
}

//Moving EXTRA points
function extra() {

  if (frameCount % 555 === 0) {
    plus = createSprite(800, Math.round(random(100, 160)));
    plus.addImage(beanI);
    plus.scale = 0.45;
    plus.velocityX = -9;

    //assign lifetime to the variable
    plus.lifetime = 250;
    
        //adjust the depth
    plus.depth = restart.depth;
    restart.depth += 1;

    //add each powr to a group
    powerGroup.add(plus);
  }
}

// #DhRiTiD
// #DD