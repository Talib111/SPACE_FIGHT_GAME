let fighter = document.getElementById('fighter');
let leftKey = document.getElementById('left');
let rightKey = document.getElementById('right');
let gameArea = document.getElementById('gameArea');
let enemy1 = document.getElementById('enemy1');
let enemy2 = document.getElementById('enemy2');
let enemy3 = document.getElementById('enemy3');
let enemy4 = document.getElementById('enemy4');
let enemy5 = document.getElementById('enemy5');
let enemy6 = document.getElementById('enemy6');
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
let enemyArray = [{enemyTop: 20,enemyLeft: 50,enemey: 'enemy1'},{enemyTop: 20,enemyLeft: 150,enemey: 'enemy2'},{enemyTop: 20,enemyLeft: 250,enemey: 'enemy3'},{enemyTop: 20,enemyLeft: 350,enemey: 'enemy4'},{enemyTop: 20,enemyLeft: 450,enemey: 'enemy5'},{enemyTop: 20,enemyLeft: 550,enemey: 'enemy6'}]

// checking blast
const checkBlast = (missileTop,missileLeft)=>{

    //map from all enemy position
enemyArray.map((data,index)=>{

    if(missileTop<=data.enemyTop+enemyHeight){
        console.log("enemetytop + heihgt ",data.enemyTop+enemyHeight," ",missileTop)
        if(missileTop>=data.enemyTop){
            console.log("enetop ",data.enemyTop," ",missileTop)
            if(missileLeft<=data.enemyLeft+enemyWidth){
                console.log("enemyleft + widht ",data.enemyLeft+enemyWidth," ",missileLeft)
                if(missileLeft>=data.enemyLeft){
                    console.log("enemyleft ",data.enemyLeft," ",missileLeft)
                    console.log('blasted')
                    document.body.removeChild(missile)
                    console.log('index no ',index)

                    //removing child with index number
                    if(index==0){
                        enemy1.style.animation = 'blast 0.5s linear'
    
                        setTimeout(() => {
                            enemy1.style.animation = ''
                        }, 500);
                    }
                    else if(index==1){
                        enemy2.style.animation = 'blast 0.5s linear'
    
                        setTimeout(() => {
                            enemy1.style.animation = ''
                        }, 500);
                    }
                    else if(index==2){
                        enemy3.style.animation = 'blast 0.5s linear'
    
                        setTimeout(() => {
                            enemy1.style.animation = ''
                        }, 500);
                    }
                    else if(index==3){
                        enemy4.style.animation = 'blast 0.5s linear'
    
                        setTimeout(() => {
                            enemy1.style.animation = ''
                        }, 500);
                    }
                    else if(index==4){
                        enemy5.style.animation = 'blast 0.5s linear'
    
                        setTimeout(() => {
                            enemy1.style.animation = ''
                        }, 500);
                    }
                    else {
                        enemy6.style.animation = 'blast 0.5s linear'
    
                        setTimeout(() => {
                            enemy1.style.animation = ''
                        }, 500);
                    }
                   
                    
                }
            }
        }
    }
})
    
   
    
}
// checking blast


leftKey.addEventListener('click',function (){
    clearInterval(leftInterval)
    clearInterval(rightInterval)
      leftInterval = setInterval(() => {
        let leftPos = parseInt(window.getComputedStyle(fighter,null).getPropertyValue('left'))
        if(leftPos==0){
            leftPos = window.innerWidth
        }
        let nextPosition = leftPos - 2
        fighter.style.left = nextPosition+"px"
    }, 10);
})

rightKey.addEventListener('click',function (){
    clearInterval(leftInterval)
    clearInterval(rightInterval)
      leftInterval = setInterval(() => {
        let leftPos = parseInt(window.getComputedStyle(fighter,null).getPropertyValue('left'))
        if(leftPos==window.innerWidth){
            leftPos = 0
        }
        let nextPosition = leftPos + 2
        fighter.style.left = nextPosition+"px"
    }, 10);
})

//creating missile
let missile = document.createElement('div')
missile.style.width='5px'
missile.style.height='20px'
missile.style.backgroundColor='yellow'
missile.style.position = 'absolute'
missile.style.left = '44.5%'
// missile.style.top = '200px'
//     document.body.appendChild(missile)
//*creating missile

var fireInterval

const activateMissile = ()=>{
    missile.style.top = '200px'
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
rightKey.addEventListener('click',fire)



/////////  LEARN LOGIC ////////

//==== 1 BLAST CASE -----  missile position is equal to enemy position