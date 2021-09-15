let fighter = document.getElementById('fighter');
let leftKey = document.getElementById('left');
let rightKey = document.getElementById('right');
let gameArea = document.getElementById('gameArea');
let enemy1 = document.getElementById('enemy1');
var leftInterval,rightInterval

//creating the enemy
const createEnemy= (left,top)=>{
    let enemy = document.createElement('img')
    enemy.src='./enemy.svg'
    enemy.alt = 'enemy'
    enemy.style.width='50px'
    enemy.style.height='50px'
    enemy.style.position = 'absolute'
    enemy.style.left = left +'px'
    enemy.style.top = top + 'px'
    gameArea.appendChild(enemy)
}
createEnemy(100,20)
createEnemy(200,20)
createEnemy(300,20)
createEnemy(400,20)
createEnemy(500,20)
//-creating the enemy


const stop = ()=>{
    clearInterval(leftInterval)
    clearInterval(rightInterval)
}

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

let missile = document.createElement('div')
missile.style.width='5px'
missile.style.height='20px'
missile.style.backgroundColor='yellow'
missile.style.position = 'absolute'
missile.style.left = '47%'


var fireInterval

const activateMissile = ()=>{
    missile.style.top = 0
    fighter.appendChild(missile)
}
const fire = ()=>{
    enemy1.style.animation = 'blast 0.5s linear'
    setTimeout(() => {
        enemy1.style.animation = ''
    }, 500);

    //fire sound
    let fireSound = new Audio('./shoot.wav')
    fireSound.play()
    //activating the missile
   activateMissile()
   clearInterval(fireInterval)
      fireInterval = setInterval(() => {
        let topPos = parseInt(window.getComputedStyle(missile,null).getPropertyValue('top'))
        if(topPos== -200){
            //destroy the element
            fighter.removeChild(missile)
            clearInterval(fireInterval)

        }
        let nextPosition = topPos -3 
        missile.style.top = nextPosition+"px"
    }, -5);
}
rightKey.addEventListener('click',fire)

