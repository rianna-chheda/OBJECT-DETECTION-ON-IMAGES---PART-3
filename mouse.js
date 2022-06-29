img = "";
status = "";
objects = [];

function preload() {
    img = loadImage("dog_cat.jpg");
}
function setup(){
    canvas = createCanvas(640, 420);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
}
    
function draw(){
    image(img, 0, 0, 640, 420);

    if(status != ""){
        for (i = 0; i <= objects.length-1; i++){
            document.getElementById("Status").innerHTML = "Status : Object Detected";
            fill("blue");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + "" + percent + "%", objects[i].x,objects[i].y);
            noFill();
            stroke("blue");
            rect(objects[i].x,objects[i].y,objects[i].height,objects[i].width);
        }
    }
}
function modelLoaded(){
    console.log("Model Loaded!");
    status = true;
    objectDetector.detect(img, gotResult);
}
function gotResult(error, results){
    if(error){
        console.error(error);
    }
    else {
        console.log(results);
        objects = results;
    }
}