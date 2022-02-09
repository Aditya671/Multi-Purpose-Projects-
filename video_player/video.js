"use strict"
const video = document.getElementById('videoBox');
const playBtn = document.getElementById('playBtn');
const stopBtn = document.getElementById('stopBtn');
const progress = document.getElementById('progress');
const timeStamp = document.getElementById('timeStamp');
const reqFullScreen = document.getElementById('reqFullScreen');

const enableFullScreen = (event) => {
   if(!document.fullscreenEnabled){
      document.exitFullscreen()
   }
   else{
      video.requestFullscreen()
   }
}
window.addEventListener('keydown',function (event) { 
   if(event.key === 'Escape'){
      enableFullScreen()
   }
})
const toggleVideoPlay = () => {
   if(video.paused)
      return video.play();
   else 
      return video.pause()
};
const updateProgressTime = () => {
   progress.value = ((+video.currentTime) * video.duration) / 100;
   let min = Math.floor(video.currentTime / 60);
   if(min < 10){
      min = '0'+ String(min)
   }
   let sec = Math.floor(video.currentTime % 60);
   if(sec < 10){
      sec = '0'+ String(sec)
   }
   timeStamp.innerHTML = `${min}:${sec}`;
};
// Event Listener for Video =  Click
video.addEventListener('click',toggleVideoPlay);
video.addEventListener('dblclick',enableFullScreen);
reqFullScreen.addEventListener('click',enableFullScreen);
// Event Listener for Play Btn = click 
playBtn.addEventListener('click',toggleVideoPlay);


// Event Listener for Pause and Play of Video
// video.addEventListener('pause',(state = false) =>  !state)
// // Event Listener for Video =  play
// video.addEventListener('play',(state = false) =>  !state);

['play','pause'].forEach(function(value){
   video.addEventListener(value,() =>  { 
      if(video.paused)
         return playBtn.innerHTML = `<i class='fa fa-play'></i>`;
      else  
         return playBtn.innerHTML = `<i class='fa fa-pause'></i>`;
   });
});


// Event Listener for Video =  timeStamp
video.addEventListener('timeupdate',updateProgressTime);

// Event Listener for Pause Btn = click 
stopBtn.addEventListener('click',() => {
   video.currentTime = 0;
   video.pause();
});

// Event Listener for Progress Bar = change 
progress.addEventListener('change',() =>  video.currentTime = ((+progress.value) * video.duration) / 100);
setTimeout(() => {
   video.onloadeddata = (function(){
      if(video.currentSrc !== ''){
         let min = Math.floor(video.duration / 60);
         if(min < 10){
            min = '0'+ String(min)
         }
         let sec = Math.floor(video.duration % 60);
         if(sec < 10){
            sec = '0'+ String(sec)
         }
         timeStamp.innerHTML = `${min}:${sec}`;
      }
   })()
},200)
