playing_song_1 = "";
playing_song_2 = "";
harry_theme = "";
peter_theme = "";
leftwristX = 0;
leftwristY = 0;
rightwristX = 0;
rightwristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;

function preload(){
harry_theme = loadSound("music.mp3");
peter_theme = loadSound("music2.mp3");
}

function setup(){
canvas = createCanvas(600,500);
canvas.center();
video = createCapture(VIDEO);
video.hide();
poseNet = ml5.poseNet(video, modelLoaded);
poseNet.on('pose', gotPoses);
}

function draw(){
image(video,0,0,600,500);

playing_song_1 = harry_theme.isPlaying();

fill("#ff1100");
stroke("#ff1100");

if(scoreLeftWrist > 0.2){
    circle(leftwristX,leftwristY,20);
    peter_theme.stop();
    if(playing_song_1 == false){
        harry_theme.play();
        document.getElementById("song_name").innerHTML="Song : Harry Potter Theme";
    }
}

playing_song_2 = peter_theme.isPlaying();

if(scoreRightWrist > 0.2){
    circle(rightwristX,rightwristY,20);
    harry_theme.stop();
    if(playing_song_2 == false){
        peter_theme.play();
        document.getElementById("song_name").innerHTML="Song : Peter Pan Theme";
    }
}

}

function modelLoaded(){
    console.log("Posenet is initialized");
}

function gotPoses(results){
    if(results.length > 0){
    console.log(results);
    scoreLeftWrist =  results[0].pose.keypoints[9].score;
    console.log("Left wrist score = "+scoreLeftWrist);
    scoreRightWrist =  results[0].pose.keypoints[10].score;
    console.log("Right wrist score = "+scoreRightWrist);
    leftwristX = results[0].pose.leftWrist.x;
    leftwristY = results[0].pose.leftWrist.y;
    console.log("Left wrist X = "+leftwristX+" Left wrist Y = "+leftwristY);
    rightwristX = results[0].pose.rightWrist.x;
    rightwristY = results[0].pose.rightWrist.y;
    console.log("Right wrist X = "+rightwristX+" Right wrist Y = "+rightwristY);
    
    }
}
