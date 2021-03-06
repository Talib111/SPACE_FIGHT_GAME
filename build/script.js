let fighter = document.getElementById("fighter");
let leftKey = document.getElementById("left");
let rightKey = document.getElementById("right");
let gameArea = document.getElementById("gameArea");
let scoreElem = document.getElementById("score");
let score = 0;
var leftInterval, rightInterval;
let moveInterval;
let enemyWidth = 50;
let enemyHeight = 50;
let allenemyTop = 20;
var fireInterval;
let playButton;
let loadingBackground;
let fireSound = new Audio("./shoot.wav");


///////// element constructor function//////////////////
function elementCreator (elementType,style){
    this.elem = document.createElement(elementType)
    this.elem.style.cssText = `${style}`
}
/////////////// element constructor function/////////////

//Moving background creationg


//enemy constructor
let enemyArray = ["50px", "150px", "250px", "350px", "450px", "550px"];
let enemyContainer;
const creatEnemy2 = () => {
    enemyArray.map((data, index) => {
        enemyContainer = new elementCreator('div',`position: absolute;width: 50px;height: 50px;left: ${data};top: 20px;`)
        enemyContainer.elem.id = "enemy" + index;
        document.body.appendChild(enemyContainer.elem);

    let dynamicEnemy = new elementCreator('img',`width: 50px;height: 50px;`)
        dynamicEnemy.elem.src = "./enemy.svg";
        enemyContainer.elem.appendChild(dynamicEnemy.elem);
    });
};

creatEnemy2();


// checking blast
const checkBlast = (missileTop, missileLeft) => {
    //map for all enemy
    enemyArray.map((data, index) => {
        if (missileTop <= allenemyTop + enemyHeight)
            if (missileTop >= allenemyTop)
                if (missileLeft <= parseInt(data) + enemyWidth)
                    if (missileLeft >= parseInt(data)) {
                        document.body.removeChild(missile.elem);
                        score++;
                        scoreElem.innerHTML = score;
                        document.body.removeChild(document.getElementById("enemy" + index));
                        if (score % 6 == 0) {
                            creatEnemy2();
                        }
                    }
    });

    
};

//fighter movement
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
let missile = new elementCreator('div',`width: 5px;height: 20px;background-color: yellow;position: absolute;`)

//activate missile function
const activateMissile = () => {
    let fighterLeft = parseInt(
        window.getComputedStyle(fighter, null).getPropertyValue("left")
    );
    let missileLeftTarget = fighterLeft + 24;
    missile.elem.style.left = missileLeftTarget + "px";
    missile.elem.style.top = "300px";
    document.body.appendChild(missile.elem);
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
            window.getComputedStyle(missile.elem, null).getPropertyValue("top")
        );
        let missileLeft = parseInt(
            window.getComputedStyle(missile.elem, null).getPropertyValue("left")
        );

        //checkblast call
        checkBlast(missileTop, missileLeft);
        if (missileTop == 0) {
            //destroy the missile
            document.body.removeChild(missile.elem);
            clearInterval(fireInterval);
        }
        let nextPosition = missileTop - 5;
        missile.elem.style.top = nextPosition + "px";
    }, -5);

};


const splashScreen = () => {
    let loadbarWidth = 0;

    //splash screen background
    loadingBackground = new elementCreator('div',`height: 100vh;width: 100vw;background-image: linear-gradient(180deg,black,red,white);position: absolute;left: 0;top: 0;z-index: 100000;display: flex;justify-content: center;align-items: center;`)
    document.body.appendChild(loadingBackground.elem)

    //text
    let introText = new elementCreator('h1',`text-align: center;position: absolute;color: white;top: 100px;`)
    introText.elem.innerHTML = 'SPACE SHOOTER'
    loadingBackground.elem.appendChild(introText.elem);


    //loadinbar div
    let loadinbar = new elementCreator('div',`width: 400px;height: 30px;border: 2px solid white;position: absolute;border-radius: 10px;`)
    loadingBackground.elem.appendChild(loadinbar.elem);

    //inside loadinbar div
    let loadinbarInside = new elementCreator('div',`height: 30px;position: absolute;background-image: linear-gradient(90deg,black,yellow);textAlign: center;color: white;display: flex;justify-content: center;align-items: center;border-radius: 10px;`)
    loadinbar.elem.appendChild(loadinbarInside.elem);

    let loadingInterval = setInterval(() => {
        console.log("working");
        loadbarWidth++;
        loadinbarInside.elem.style.width = loadbarWidth + "px";
        loadinbarInside.elem.innerHTML = loadbarWidth;
        if (loadbarWidth == 400) {
            clearInterval(loadingInterval);
            //call to create play button
            createPlay();
        }
    }, 5);

    //play button
    playButton = new elementCreator('button',`textAlign: center;color:black;position: relative;top: 70px;background-color: yellow;width: 120px;height: 45px;border-radius: 20px;font-weight: 800px;`)
    playButton.elem.innerHTML = 'PLAY'

    const createPlay = () => {
        loadingBackground.elem.appendChild(playButton.elem);
    };
};

splashScreen();

const removeSplash = () => {
    document.body.removeChild(loadingBackground.elem);
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
playButton["elem"].addEventListener("click", function () {
    removeSplash();
});

