var dog, sadDog, happyDog, database;
var foodS, foodStock;
var addFood;
var foodObj;
var feed, lastFed;


function preload() {
    sadDog = loadImage("Dog.png");
    happyDog = loadImage("happy dog.png");
}

function setup() {
    database = firebase.database();
    createCanvas(1000, 400);

    foodObj = new Food();

    foodStock = database.ref('Food');
    foodStock.on("value", readStock);

    dog = createSprite(800, 200, 150, 150);
    dog.addImage(sadDog);
    dog.scale = 0.15;

    feed = createButton("Feed the dog");
    feed.position(700, 95);
    feed.mousePressed(feedDog);

    addFood = createButton("Agregar Alimento");
    addFood.position(800, 95);
    addFood.mousePressed(addFoods);


}

function draw() {

    background(46, 139, 87);

    foodObj.display();

    fedTime = database.ref('FeedTime');
    fedTime.on("value", function(data) {
        lastFed = data.val();
    })

    fill(255, 255, 254);
    textSize(15);
    if (lastFed >= 12) {
        text("Last Feed: " + lastFed % 12 + "PM", 350, 30);
    } else if (lastFed == 0) {
        text("Last Feed: 12AM ", 350, 30);
    } else {
        text("Last Feed:  " + lastFed + "AM", 350, 30);
    }

    drawSprites();
}

//función para leer la Existencia de alimento
function readStock(data) {
    foodS = data.val();
    foodObj.updateFoodStock(foodS);
}


function feedDog() {
    dog.addImage(happyDog);


    //MIS: Agregar condición para iniciar el alimento de la mascota de la siguiente manera
    //if (foodObj.getFoodStock ()<=0){
    foodObj.updateFoodStock(foodObj.getFoodStock() - 1); // en lugar de -1 es *0
    //}
    /* else {
      foodObj.updateFoodStock(foodObj.getFoodStock()-1); // tu linea de arriba va en el else
    }*/

    database.ref('/').update({
        Food: foodObj.getFoodStock(),
        FeedTime: hour()
    })
}
//funcón para agregar alimento al almacén
function addFoods() {
    foodS++;
    database.ref('/').update({
        Food: foodS
    })
}