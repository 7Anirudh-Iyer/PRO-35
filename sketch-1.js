var ball;
var db;
var variable

function setup(){
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";

    db=firebase.database();
    var location=db.ref("ball/position");
    location.on("value",readop)
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        changePosition(-10,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(10,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-10);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+10);
    }
    drawSprites();
}

function changePosition(x,y){
    db.ref("ball/position").update({
        x:ball.x+x,
        y:ball.y+y
    })
}

function readop(data){
    variable=data.val()
    ball.x=variable.x
    ball.y=variable.y
}
