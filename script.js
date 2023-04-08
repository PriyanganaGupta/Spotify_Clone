console.log("Welcome to Spotify");

//initialize the variables
let songIndex = 0;
let audioElement = new Audio('songs/2.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let masterSongName = document.getElementById('masterSongName')

let songs = [
    {songName: "Warriyo - Mortals [NCS Release]", filePath: "songs/1.mp3", coverPath: "covers/2.jpg"},
    {songName: "Cielo - Huma-Huma", filePath: "songs/2.mp3", coverPath: "covers/3.jpg"},
    {songName: "DEAF KEV - Invincible [NCS Release]-320k", filePath: "songs/3.mp3", coverPath: "covers/4.jpg"},
    {songName: "Different Heaven & EH!DE - My Heart [NCS Release]", filePath: "songs/4.mp3", coverPath: "covers/5.jpg"},
    {songName: "Janji-Heroes-Tonight-feat-Johnning-NCS-Release", filePath: "songs/5.mp3", coverPath: "covers/6.jpg"},
    {songName: "Rabba - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/7.jpg"},
    {songName: "Sakhiyaan - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/8.jpg"},
  
]

songItems.forEach((element,i)=>{
  
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;


}) 


//handle play/pause

masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        console.log("click");
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause')
        gif.style.opacity = 1;
    }

    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play')
        gif.style.opacity = 0;
    }
})


//listen to events
audioElement.addEventListener('timeupdate', ()=>{
    //update seekbar

    progress = parseInt((audioElement.currentTime/audioElement.duration)*100)
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime =  (myProgressBar.value * audioElement.duration)/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
      
        element.classList.add('fa-circle-play');
        element.classList.remove('fa-circle-pause');
        
    }) 
    
}



Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
    
        makeAllPlays();
       console.log(e);
        songIndex = parseInt(e.target.id);
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.src = `songs/${songIndex+2}.mp3`;
        audioElement.currentTime = 0;
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');        
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;  
             
       })
})


document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=6){
        songIndex = 0;
    }
    else{
        songIndex+=1;
    }
    audioElement.src = `songs/${songIndex+2}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause')
})

document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex = 0;
    }
    else{
        songIndex -=1;
    }
    audioElement.src = `songs/${songIndex+2}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause')
})