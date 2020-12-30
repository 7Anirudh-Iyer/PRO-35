
var dog
var d1,d2,m,m1
var db
var va
var score=10
var feed='well fed'
function preload(){
  d1=loadAnimation('images/dogImg.png')
  d2=loadAnimation('images/dogImg1.png')
  m1=loadImage('images/milk.png')
}

function setup() {
  createCanvas(600, 590);

  db=firebase.database()
  var s1=db.ref('score')
  s1.on("value",readop)
  
  dog=createSprite(width/2,height/2,30,30)
  dog.addAnimation('bah',d1)
  dog.addAnimation('blah',d2)
  dog.scale=0.1

  m=createSprite(30,height/2,20,20)
  m.addImage('b',m1)
  m.scale=0.1
  
}


function draw() { 
  background('green') 

  if(keyDown('space')){
    m.velocityX=10
  }

  if(m.collide(dog)){
    m.velocityX=0
    m.x=30;m.y=height/2
    score=score+1
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

  continu()
  drawSprites();
  textSize(20)
  fill('black')
  text('Dog feeding status :'+score,30,20)
  text('Your dog is '+feed,30,40)
}

function continu(){
  db.ref('/').update({
      score: score
  })
}

function readop(data){
  va=data.val()
  score=va
}



