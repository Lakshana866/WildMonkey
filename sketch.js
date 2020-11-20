var monkey, monkey_running
var banana, bananaImage, obstacle, obstacleImage
var FoodGroup, ObstacleGroup
var score

function preload() {
  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}



function setup() {
  createCanvas(500, 450);
  //creating monkey
  monkey = createSprite(80, 365, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;
  //creating ground
  ground = createSprite(500, 400, 1000, 10);
  ground.x = ground.width / 2;
  ground.velocityX = -4;
  //adding groups
  FoodGroup = createGroup();
  ObstacleGroup = createGroup();
  //setting score to zero
  score = 0;
}


function draw() {
  //setting baxckground colour
  background(230);
  //adding text
  stroke("white");
  textSize(20);
  fill("black");
  text("Survival Time: " + score, 190, 60);
  score = score + Math.round(getFrameRate() / 60);
  //making the scrolling ground
  if (ground.x < 0) {
    ground.x = ground.width / 2;
  }
  //making monkey jump to a certainn height
  if (keyDown("space") && monkey.y >= 350) {
    monkey.velocityY = -20;
  }
  //adding gravity
  monkey.velocityY = monkey.velocityY + 0.8;
  //making monkey to collide 
  monkey.collide(ground);
  //calling spawn functions
  spawnObstacles();
  spawnFruit();
  drawSprites();
}
//function to create obstacles
function spawnObstacles() {
  if (frameCount % 300 === 0) {
    var obstacle = createSprite(380, 380, 20, 20);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -4;
    obstacle.lifetime = 95;
    ObstacleGroup.add(obstacle);
  }

}
//creating function to create fruits
function spawnFruit() {
  if (frameCount % 100 === 0) {
    var fruit = createSprite(380, 300, 20, 20);
    fruit.y = Math.round(random(120, 200));
    fruit.addImage(bananaImage);
    fruit.scale = 0.1;
    fruit.velocityX = -4;
    fruit.lifetime = 95;
    FoodGroup.add(fruit);
  }

}