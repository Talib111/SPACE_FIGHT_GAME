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

   function demo(){
       console.log('demo checking')
   }