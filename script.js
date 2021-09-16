let fighter = document.getElementById('fighter');
let leftKey = document.getElementById('left');
let rightKey = document.getElementById('right');
let gameArea = document.getElementById('gameArea');
let enemy1 = document.getElementById('enemeyDiv');
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


//-creating the enemy


const stop = ()=>{
    clearInterval(leftInterval)
    clearInterval(rightInterval)
}

//enemey position getting
let enemyTop = parseInt(window.getComputedStyle(enemy1,null).getPropertyValue('top'))
let enemyLeft = parseInt(window.getComputedStyle(enemy1,null).getPropertyValue('left'))
let enemyWidth = 50
let enemyHeight = 50

// checking blast
const checkBlast = (missileTop,missileLeft)=>{

    //map from all enemy position

    if(missileTop<=enemyTop+enemyHeight){
        console.log("enemetytop + heihgt ",enemyTop+enemyHeight," ",missileTop)
        if(missileTop>=enemyTop){
            console.log("enetop ",enemyTop," ",missileTop)
            if(missileLeft<=enemyLeft+enemyWidth){
                console.log("enemyleft + widht ",enemyLeft+enemyWidth," ",missileLeft)
                if(missileLeft>=enemyLeft){
                    console.log("enemyleft ",enemyLeft," ",missileLeft)
                    console.log('blasted')
                    document.body.removeChild(missile)
                    enemy1.style.animation = 'blast 0.2s linear'

                    setTimeout(() => {
                        enemy1.style.animation = ''
                    }, 500);
                    //giving the enemy to random position
                    // enemyTop = parseInt(window.getComputedStyle(enemy1,null).getPropertyValue('top'))
                    enemyLeft = parseInt(window.getComputedStyle(enemy1,null).getPropertyValue('left'))
                    enemyLeft = enemyLeft+100
                    enemy1.style.left = enemyLeft+"px"
                    
                }
            }
        }
    }
   
    
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

const activateMissile = ()=>{
    let fighterLeft = parseInt(window.getComputedStyle(fighter,null).getPropertyValue('left'))
    let missileLeftTarget = fighterLeft+24
    missile.style.left = missileLeftTarget+"px"
    missile.style.top = '220px'
    document.body.appendChild(missile)
}
const fire = ()=>{
    

    
    //fire sound
    let fireSound = new Audio('./shoot.wav')
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
}



/////////  LEARN LOGIC ////////

//==== 1 BLAST CASE -----  missile position is equal to enemy position