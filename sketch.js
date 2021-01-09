
var dog
var d1,d2,m,m1
var db
var va
var score=10
var give
var add
var fs=10
var feed='well fed'
function preload(){
  d1=loadAnimation('dogImg.png')
  d2=loadAnimation('dogImg1.png')
  m1=loadImage('milk.png')
}

function setup() {
  createCanvas(600, 590);

  db=firebase.database()
  var s1=db.ref('score')
  s1.on("value",readop)

  var s2=db.ref('food')
  s2.on('value',readop1)
  
  dog=createSprite(width/1.3,height/2,30,30)
  dog.addAnimation('bah',d1)
  dog.addAnimation('blah',d2)
  dog.scale=0.1

  give=createButton('Feed')
  give.position(300,85)
  give.mousePressed(feedog)

  add=createButton('Add Food')
  add.position(300,115)
  add.mousePressed(addfood)

  m=createSprite(30,height/2,20,20)
  m.addImage('b',m1)
  m.scale=0.1
  
}


function draw() { 
  background('green') 

  if(m.collide(dog)){
    m.velocityX=0
    m.x=30;m.y=height/2
    score=score+1
    fs=fs-1
  }

  if(score<7&&score>0){
    feed='hungry!'
  }

  if(score<10&&score>7){
    feed='well fed.'
  }

  if(score>10&&score<15){
    feed='full!'
  }

  if(score>15){
    feed='overfed. Leave him alone!'
  }

  if(score<0){
    feed='running away for sure.'
  }

  if(frameCount%1000===0){
    score=score-1
  }

  if(score>10){
    dog.changeAnimation('blah',d2)
  }

  else{
    dog.changeAnimation('bah',d1)
  }

  if(fs<0){
    score=0
    dog.destroy()
    m.destroy()
    textSize(20)
    fill('blue')
    text('You cannot feed your dog anymore!',120,200)
  }

  else{
    textSize(20)
  fill('black')
  text('Dog feeding status :'+score,30,20)
  text('Food remaining: '+fs,30,60)
  text('Your dog is '+feed,30,40)
  }

  drawSprites();
  continu()
  continu1()
}

function feedog(){
  m.velocityX=20
}

function addfood(){
  fs=fs+1
}

function continu(){
  db.ref('/').update({
      score: score,
  })
}

function continu1(){
  db.ref('/').update({
    food:fs,
  })
}

function readop(data){
  va=data.val()
  score=va
}

function readop1(data){
  vari=data.val()
  fs=vari
}



