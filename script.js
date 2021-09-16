
let fighter = document.getElementById('fighter');
let leftKey = document.getElementById('left');
let rightKey = document.getElementById('right');
let gameArea = document.getElementById('gameArea');
let scoreElem = document.getElementById('score')
let score = 0
// let enemy1 = document.getElementById('enemeyDiv');

// gameArea.requestFullscreen().then(function(){
//     console.log('full screen enabled')
// }).catch(function(){
//     console.log('errrorr')
// })
var leftInterval,rightInterval

let enemyPosArray = []

//creating the enemy
// const createEnemy= (left,top)=>{
//     let enemy = document.createElement('img')
//     enemy.src='./enemy.svg'
//     enemy.alt = 'enemy'
//     enemy.style.width='50px'
//     enemy.style.height='50px'
//     enemy.style.position = 'absolute'
//     enemy.style.left = left +'px'
//     enemy.style.top = top + 'px'
//     gameArea.appendChild(enemy)
//     return {enemy: {left: left,top:top}}
// }



// let e2 =createEnemy(100,20)
// let e3 =createEnemy(200,20)
// let e4 =createEnemy(300,20)
// let e5 =createEnemy(400,20)
// let e6 =createEnemy(500,20)
// let globalEnemy =  document.getElementById('enemeyDiv')



// enemyPosArray = [...enemyPosArray,e2] 
// enemyPosArray = [...enemyPosArray,e3]
// enemyPosArray = [...enemyPosArray,e4]
// enemyPosArray = [...enemyPosArray,e5]
// enemyPosArray = [...enemyPosArray,e6]

// console.log(enemyPosArray)

//enemy constructor 

let enemyArray = ['50px','150px','250px','350px','450px','550px']
let enemyContainer;
const creatEnemy2 =()=>{
    enemyArray.map((data,index)=>{

        enemyContainer = document.createElement('div')
   let dynamicEnemy = document.createElement('img')
   enemyContainer.id = 'enemy'+index
   enemyContainer.style.position = 'absolute' 
   enemyContainer.style.width = '50px' 
   enemyContainer.style.height = '50px' 
   enemyContainer.style.left = data 
   enemyContainer.style.top = '20px' 
   
   dynamicEnemy.src="./enemy.svg"
   dynamicEnemy.style.width='50px'
   dynamicEnemy.style.height='50px'
   
   document.body.appendChild(enemyContainer)
   enemyContainer.appendChild(dynamicEnemy)
   })
}

creatEnemy2()
    // let enemyContainer,dynamicEnemy






// //-creating the dynamic enemy
// let enemyContainer = document.createElement('div')
// let dynamicEnemy = document.createElement('img')
// enemyContainer.style.position = 'absolute' 
// enemyContainer.style.width = '50px' 
// enemyContainer.style.height = '50px' 
// enemyContainer.style.left = '320px' 
// enemyContainer.style.top = '20px' 

// dynamicEnemy.src="./enemy.svg"
// dynamicEnemy.style.width='50px'
// dynamicEnemy.style.height='50px'

// document.body.appendChild(enemyContainer)
// enemyContainer.appendChild(dynamicEnemy)
//--creating the dynamic enemy


const stop = ()=>{
    clearInterval(leftInterval)
    clearInterval(rightInterval)
}

//enemey position getting
// let enemyTop = parseInt(window.getComputedStyle(enemyContainer,null).getPropertyValue('top'))
// let enemyLeft = parseInt(window.getComputedStyle(enemyContainer,null).getPropertyValue('left'))
let enemyWidth = 50
let enemyHeight = 50
let allenemyTop = 20

// checking blast
const checkBlast = (missileTop,missileLeft)=>{

    enemyArray.map((data,index)=>{
        if(missileTop<=allenemyTop+enemyHeight){
            console.log("enemetytop + heihgt ",allenemyTop+enemyHeight," ",missileTop)
            if(missileTop>=allenemyTop){
                console.log("enetop ",allenemyTop," ",missileTop)
                // scoreElem.innerHTML= score++
                if(missileLeft<=parseInt(data)+enemyWidth){
                    console.log("enemyleft + widht ",parseInt(data)+enemyWidth," ",missileLeft)
                    // scoreElem.innerHTML= score++
                    if(missileLeft>=parseInt(data)){
                        console.log("enemyleft ",parseInt(data)," ",missileLeft)
                        console.log('blasted')
                        document.body.removeChild(missile)
                        score++
                        scoreElem.innerHTML= score
                        document.body.removeChild(document.getElementById('enemy'+index))
                        if(score%6==0){
                            creatEnemy2()
                        }
                        //remove element from array
                        // enemyArray.splice(index,1)
                        // document.body.removeChild(enemyContainer)
                        //giving the enemy to random position
                        // enemyTop = parseInt(window.getComputedStyle(enemy1,null).getPropertyValue('top'))
                        // enemyLeft = parseInt(window.getComputedStyle(enemyContainer,null).getPropertyValue('left'))
                        // enemyLeft = enemyLeft+100
                        // enemyContainer.style.left = enemyLeft+"px"
                        
                    }
                }
            }
        }
    })

    //map from all enemy position

   
   
    
}
// checking blast


leftKey.addEventListener('touchstart',function (){
    clearInterval(leftInterval)
    clearInterval(rightInterval)
      leftInterval = setInterval(() => {
        let leftPos = parseInt(window.getComputedStyle(fighter,null).getPropertyValue('left'))
        if(leftPos==0){
            leftPos = window.innerWidth
        }
        let nextPosition = leftPos - 5
        fighter.style.left = nextPosition+"px"
    }, 10);
})

rightKey.addEventListener('touchstart',function (){
    clearInterval(leftInterval)
    clearInterval(rightInterval)
      leftInterval = setInterval(() => {
        let leftPos = parseInt(window.getComputedStyle(fighter,null).getPropertyValue('left'))
        if(leftPos==window.innerWidth){
            leftPos = 0
        }
        let nextPosition = leftPos + 5
        fighter.style.left = nextPosition+"px"
    }, 10);
})
rightKey.addEventListener('touchend',function(){
    clearInterval(leftInterval)
    clearInterval(rightInterval)
})
leftKey.addEventListener('touchend',function(){
    clearInterval(leftInterval)
    clearInterval(rightInterval)
})

//creating missile
let missile = document.createElement('div')
missile.style.width='5px'
missile.style.height='20px'
missile.style.backgroundColor='yellow'
missile.style.position = 'absolute'
// missile.style.top = '200px'
//     document.body.appendChild(missile)
//*creating missile

var fireInterval
let fireSound = new Audio('./shoot.wav')

const activateMissile = ()=>{
    let fighterLeft = parseInt(window.getComputedStyle(fighter,null).getPropertyValue('left'))
    let missileLeftTarget = fighterLeft+24
    missile.style.left = missileLeftTarget+"px"
    missile.style.top = '220px'
    document.body.appendChild(missile)
}
const fire = ()=>{
    

    
    //fire sound
    fireSound.currentTime = 0
    fireSound.play()
    //activating the missile
   activateMissile()
   clearInterval(fireInterval)
      fireInterval = setInterval(() => {
        let missileTop = parseInt(window.getComputedStyle(missile,null).getPropertyValue('top'))
        let missileLeft = parseInt(window.getComputedStyle(missile,null).getPropertyValue('left'))

        //checkblast call
        checkBlast(missileTop,missileLeft)
        if(missileTop== 0){
            //destroy the element
            document.body.removeChild(missile)
            clearInterval(fireInterval)

        }
        let nextPosition = missileTop -2
        missile.style.top = nextPosition+"px"
    }, -5);

    // scoreElem.innerHTML = score++
}


let playButton;
let loadingBackground;
const splashScreen = ()=>{
 loadingBackground = document.createElement('div')
loadingBackground.style.height= '100vh'
loadingBackground.style.width = '100vw'
loadingBackground.style.backgroundImage='linear-gradient(180deg,black,red,white)'
loadingBackground.style.position = 'absolute'
loadingBackground.style.left = '0'
loadingBackground.style.top = '0'
loadingBackground.style.zIndex = 100000
loadingBackground.style.display = 'flex'
loadingBackground.style.justifyContent = 'center'
loadingBackground.style.alignItems = 'center'
document.body.appendChild(loadingBackground)


//text
let introText = document.createElement('h1')
introText.style.textAlign = 'center'
introText.style.position = 'absolute'
introText.style.color = 'white'
introText.style.top = '100px'
introText.innerHTML = 'Space Shooter'
loadingBackground.appendChild(introText)




//loadinbar div
let loadinbar = document.createElement('div')
loadinbar.style.width = '400px'
loadinbar.style.height = '30px'
loadinbar.style.border = '2px solid white'
loadinbar.style.position = 'absolute'
loadinbar.style.borderRadius = '10px'


loadingBackground.appendChild(loadinbar)

//inside loadinbar div
let loadinbarInside = document.createElement('div')
// loadinbarInside.style.width = '200px'
loadinbarInside.style.height = '30px'
loadinbarInside.style.position = 'absolute'
loadinbarInside.style.backgroundImage='linear-gradient(90deg,black,yellow)'
loadinbarInside.style.textAlign = 'center'
loadinbarInside.style.color = 'white'
loadinbarInside.style.display = 'flex'
loadinbarInside.style.justifyContent = 'center'
loadinbarInside.style.alignItems = 'center'
loadinbarInside.style.borderRadius = '10px'


let loadbarWidth =0
loadinbar.appendChild(loadinbarInside)
let loadingInterval = setInterval(() => {
    console.log('working')
    loadbarWidth++
    loadinbarInside.style.width = loadbarWidth + "px"
    loadinbarInside.innerHTML=loadbarWidth
    if(loadbarWidth==400){
        clearInterval(loadingInterval)
        //call to create play button
        createPlay()
    }
}, 5);


//play button
 playButton = document.createElement('button')
playButton.style.textAlign = 'center'
playButton.style.color = 'black'
playButton.innerHTML = 'PLAY'
playButton.style.position = 'relative'
playButton.style.top = '70px'
playButton.style.backgroundColor = 'yellow'
playButton.style.width = '120px'
playButton.style.height = '45px'
playButton.style.borderRadius = '20px'
playButton.style.fontWeight = 800

const createPlay = ()=>{
    loadingBackground.appendChild(playButton)

}
}

splashScreen()

const removeSplash = ()=>{
    document.body.removeChild(loadingBackground)
    document.body.requestFullscreen().then(function(){
        console.log('full screen enabled')
    }).catch(function(){
        console.log('errrorr')
    })
    screen.orientation.lock("landscape")
}

//play button call
playButton.addEventListener('click',function(){
    removeSplash()
})

/////////  LEARN LOGIC ////////

//==== 1 BLAST CASE -----  missile position is equal to enemy position