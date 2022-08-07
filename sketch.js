const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope, fish, ground;
var fish_con;
var fish_con_2;

var bg_img;
var food;
var shark;

var button;
var sharky;
var blower;

function preload() {
  bg_img = loadImage('assets/bg.jpg');
  food = loadImage('assets/fish.png');
  shark = loadImage('assets/shark.png');
}

function setup() {
  createCanvas(500, 700);
  frameRate(80);
  engine = Engine.create();
  world = engine.world;

  button = createImg('assets/cut_btn.png');
  button.position(130, 30);
  button.size(55, 55);
  button.mouseClicked(drop);

  blower = createImg('assets/balloon.png');
  blower.position(5,250);
  blower.size(140,90);
  blower.mouseClicked(blowAir);

  sharky = createSprite(350, 550, 100, 100);
  sharky.scale = 3;
  sharky.addImage(shark);

  rope = new Rope(7, { x: 150, y: 30 });
  ground = new Ground(200, 690, 600, 20);

  fish = Bodies.circle(300, 300, 20);
  Matter.Composite.add(rope.body, fish);

  fish_con = new Link(rope, fish);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER);

}

function draw() {
  background(51);
  image(bg_img, width / 2, height / 2, 490, 690);

  if (fish != null) {
    image(food, fish.position.x, fish.position.y, 70, 70);
  }

  if(collide(fish,sharky)){
  sharky.scale += 1
  }

  if(collide(fish,ground.body)){
    sharky.scale -= 1
  }
  rope.show();
  Engine.update(engine);
  ground.show();

  drawSprites();
}

function drop() {
  rope.break();
  fish_con.detach();
  fish_con = null;
}

function collide(body,sprite){
if(body!=null){
  var distance = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y)
  if(distance<=80){
    World.remove(world,fish)
    fish=null
    return true
  }
  else{
return false
  }
}
}

function blowAir(){
  Matter.Body.applyForce(fish,{x:0,y:0},{x:0.01,y:0})
  airS.play()
}

function keyPressed(){
  if(keyCode == 32){
    blowAir()
  }
}
