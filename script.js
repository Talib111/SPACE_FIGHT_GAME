let fighter = document.getElementById("fighter");
let leftKey = document.getElementById("left");
let rightKey = document.getElementById("right");
let gameArea = document.getElementById("gameArea");
let scoreElem = document.getElementById("score");
let score = 0;
var leftInterval, rightInterval;

//enemy constructor

let enemyArray = ["50px", "150px", "250px", "350px", "450px", "550px"];
let enemyContainer;
const creatEnemy2 = () => {
    enemyArray.map((data, index) => {
        enemyContainer = document.createElement("div");
        let dynamicEnemy = document.createElement("img");
        enemyContainer.id = "enemy" + index;
        enemyContainer.style.cssText = `position: absolute;
    width: 50px;
    height: 50px;
    left: ${data};
    top: 20px;`;

        dynamicEnemy.src = "./enemy.svg";
        dynamicEnemy.style.cssText = `width: 50px;
    height: 50px`;

        document.body.appendChild(enemyContainer);
        enemyContainer.appendChild(dynamicEnemy);
    });
};

creatEnemy2();

const stop = () => {
    clearInterval(leftInterval);
    clearInterval(rightInterval);
};

let enemyWidth = 50;
let enemyHeight = 50;
let allenemyTop = 20;

// checking blast
const checkBlast = (missileTop, missileLeft) => {
    enemyArray.map((data, index) => {
        if (missileTop <= allenemyTop + enemyHeight)
            if (missileTop >= allenemyTop)
                if (missileLeft <= parseInt(data) + enemyWidth)
                    if (missileLeft >= parseInt(data)) {
                        document.body.removeChild(missile);
                        score++;
                        scoreElem.innerHTML = score;
                        document.body.removeChild(document.getElementById("enemy" + index));
                        if (score % 6 == 0) {
                            creatEnemy2();
                        }
                    }
    });

    //map from all enemy position
};
// checking blast
let moveInterval;

function moveFighter(direction){

    clearInterval(moveInterval)
         moveInterval = setInterval(() => {
        let nextPosition
        let leftPos = parseInt(
            window.getComputedStyle(fighter, null).getPropertyValue("left")
        );
        if (leftPos == 0) {
            leftPos = window.innerWidth;
        }
        if(direction=='left'){
            nextPosition = leftPos - 5;
        }
        else{
            nextPosition = leftPos + 5;
        }
       
        fighter.style.left = nextPosition + "px";
        // scoreElem.innerHTML = score++
    }, 10);
}

leftKey.addEventListener("touchstart", function () {
    moveFighter('left')
});

rightKey.addEventListener("touchstart", function () {
    moveFighter('right')
});
rightKey.addEventListener("touchend", function () {
    clearInterval(moveInterval);
});
leftKey.addEventListener("touchend", function () {
    clearInterval(moveInterval);
});

//creating missile
let missile = document.createElement("div");
missile.style.width = "5px";
missile.style.height = "20px";
missile.style.backgroundColor = "yellow";
missile.style.position = "absolute";
//*creating missile

var fireInterval;
let fireSound = new Audio("./shoot.wav");

const activateMissile = () => {
    let fighterLeft = parseInt(
        window.getComputedStyle(fighter, null).getPropertyValue("left")
    );
    let missileLeftTarget = fighterLeft + 24;
    missile.style.left = missileLeftTarget + "px";
    missile.style.top = "300px";
    document.body.appendChild(missile);
};
const fire = () => {
    //fire sound
    fireSound.currentTime = 0;
    fireSound.play();
    //activating the missile
    activateMissile();
    clearInterval(fireInterval);
    fireInterval = setInterval(() => {
        let missileTop = parseInt(
            window.getComputedStyle(missile, null).getPropertyValue("top")
        );
        let missileLeft = parseInt(
            window.getComputedStyle(missile, null).getPropertyValue("left")
        );

        //checkblast call
        checkBlast(missileTop, missileLeft);
        if (missileTop == 0) {
            //destroy the element
            document.body.removeChild(missile);
            clearInterval(fireInterval);
        }
        let nextPosition = missileTop - 5;
        missile.style.top = nextPosition + "px";
    }, -5);

    // scoreElem.innerHTML = score++
};

let playButton;
let loadingBackground;
const splashScreen = () => {
    loadingBackground = document.createElement("div");
    loadingBackground.style.cssText = `
  height: 100vh;
  width: 100vw;
  background-image: linear-gradient(180deg,black,red,white);
  position: absolute;
  left: 0;
  top: 0;
  z-index: 100000;
  display: flex;
  justify-content: center;
  align-items: center;`;
    document.body.appendChild(loadingBackground);

    //text
    let introText = document.createElement("h1");
    introText.innerHTML = "Space Shooter";
    introText.style.cssText = `
  text-align: center;
  position: absolute;
  color: white;
  top: 100px;`;
    loadingBackground.appendChild(introText);

    //loadinbar div
    let loadinbar = document.createElement("div");
    loadinbar.style.cssText = `
  width: 400px;
  height: 30px;
  border: 2px solid white;
  position: absolute;
  border-radius: 10px`;

    loadingBackground.appendChild(loadinbar);

    //inside loadinbar div
    let loadinbarInside = document.createElement("div");
    loadinbarInside.style.cssText = `
height: 30px;
position: absolute;
background-image: linear-gradient(90deg,black,yellow);
textAlign: center;
color: white;
display: flex;
justify-content: center;
align-items: center;
border-radius: 10px
`;
    loadinbar.appendChild(loadinbarInside);

    let loadbarWidth = 0;
    let loadingInterval = setInterval(() => {
        console.log("working");
        loadbarWidth++;
        loadinbarInside.style.width = loadbarWidth + "px";
        loadinbarInside.innerHTML = loadbarWidth;
        if (loadbarWidth == 400) {
            clearInterval(loadingInterval);
            //call to create play button
            createPlay();
        }
    }, 5);

    //play button
    playButton = document.createElement("button");
    playButton.innerHTML = "PLAY";
    playButton.style.cssText = `textAlign: center;
color:black;
position: relative;
top: 70px;
background-color: yellow;
width: 120px;
height: 45px;
border-radius: 20px;
font-weight: 800px;
`;

    const createPlay = () => {
        loadingBackground.appendChild(playButton);
    };
};

splashScreen();

const removeSplash = () => {
    document.body.removeChild(loadingBackground);
    document.body
        .requestFullscreen()
        .then(function () {
            console.log("full screen enabled");
        })
        .catch(function () {
            console.log("errrorr");
        });
    screen.orientation.lock("landscape");
};

//play button call
playButton.addEventListener("click", function () {
    removeSplash();
});

/////////  LEARN LOGIC ////////

//==== 1 BLAST CASE -----  missile position is equal to enemy position
