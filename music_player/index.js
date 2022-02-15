"use strict"
// Controllers 
let clickCount = 1, isPlaying = false;
const playListModal = document.querySelector('#playListModal');
const playPause = document.querySelector("#playPause");
const playSong = document.querySelector("#playSong");
const pauseSong = document.querySelector("#pauseSong");
const repeatSong = document.querySelector("#repatSong");
const nextSong = document.querySelector("#nextSong");
const prevSong = document.querySelector("#prevSong");
const fastForward = document.querySelector("#fastForward");
const fastBackward = document.querySelector("#backForward");
const shuffleSongList = document.querySelector("#shuffleSongList");
const progressOfSong = document.querySelector("#progressOfSong");
const likeThisSong = document.querySelectorAll(".likeThisSong");
const resetDuration = document.querySelector("#resetDuration");
const volumeControl = document.querySelector("#volumeControl");
const playlistContainer = document.querySelector("#playlistContainer");
const playlistbackdrop = document.querySelector(".playlist-backdrop");
const playListSongName = document.querySelectorAll(".playlist-song-name");
const playlistSongBar = document.querySelector(".song-text").clientWidth;
const audio = document.querySelector("audio");
let songStartDuration = document.querySelector("#songStartDuration");
let songEndDuration = document.querySelector("#songEndDuration");
// CSS Changes

const handleAddingMovingAnimation = (ele) =>{
   const parentDivSize = ele.currentTarget.getBoundingClientRect().width;
   const size = getTextWidth(ele.currentTarget.textContent,"16px");   
   const animationStyle = animate_moveText(parentDivSize,size);
   var styleSheet = document.createElement("style")
   styleSheet.innerHTML = animationStyle;
   ele.currentTarget.children[1].appendChild(styleSheet);
   ele.currentTarget.children[0].classList.add("songAnimate");
};
const handleRemoveMovingAnimation = (ele) => { 
   ele.currentTarget.children[1].innerHTML = "";
   ele.currentTarget.children[0].classList.remove("songAnimate")
};

const getTextWidth = (text, font) => {
   // re-use canvas object for better performance
   const canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
   const context = canvas.getContext("2d");
   context.font = font;
   const metrics = context.measureText(text);
   return metrics.width;
};

const animate_moveText = (parentDivSize,size) =>{
   let newparentDivSize = parentDivSize / 12 ;
   let newSize = newparentDivSize > 10 ? newparentDivSize - 3 : newparentDivSize;
   const animationStyle = `
      .songAnimate{
         animation:moveText ${newSize}s linear 0.0s infinite forwards;
         
      }
      @keyframes moveText{
         0%{
            transform:translateX(${size / 3}px);
            left:${size/3}px;
         }
         100%{
            left:-${size/3}px;
            transform:translateX(-${size / 3}px);
         }
      }
   `;
   return animationStyle;
};

const handleHeartIcon = (ele) => {
   const myIcon = ele.currentTarget.classList;
   if(myIcon.contains("fa-heart-o") === true){
      myIcon.remove("fa-heart-o");
      myIcon.add("fa-heart");
      myIcon.add("theme-red");
   }else{
      myIcon.add("fa-heart-o");
      myIcon.remove("fa-heart");
      myIcon.remove("theme-red");
   }
};

const audioPlaySpeed = (fun,speed) => {
   let new_speed;
   switch (fun){
      case "add":
         new_speed = speed + 0.25; 
         return new_speed;
      case "reduce":
         new_speed = speed - 0.25; 
         return new_speed;

   }
};

const updateAudioProgress = (e) => {
   const audioFile = e.srcElement;
   const {currentTime,duration} = audioFile;
   let minutes,seconds;
   if(isPlaying){
      const progressPercent = ( currentTime/ duration) * 100;
      progressOfSong.value  = progressPercent;
      minutes = Math.floor(currentTime/ 60);
      seconds = Math.floor(currentTime % 60);
      songStartDuration.textContent = `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
   }
   else{
      minutes = Math.floor( duration / 60);
      seconds = Math.floor( duration % 60);
      if(isPlaying === false && audio.currentTime > 0){
         let minutes1 = Math.floor(currentTime/ 60);
         let seconds1 = Math.floor(currentTime % 60);
         songStartDuration.textContent = `${minutes1}:${seconds1 < 10 ? `0${seconds1}` : seconds1}`;
      }else{
         songStartDuration.textContent = `0:00`;

      }
      songEndDuration.textContent = `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
   }

}

const setAudioProgress = (e) => {
   const value = e.currentTarget.value;
   if(isPlaying){
      audio.currentTime = ( value * audio.duration ) / 100;
      console.log(audio.currentTime , value * audio.duration )
   }
}

playListSongName.forEach(ele => {
   ele.addEventListener("mouseenter",handleAddingMovingAnimation);
   ele.addEventListener("mouseleave",handleRemoveMovingAnimation);
});
likeThisSong.forEach(ele => {
   ele.children[0].addEventListener("click",handleHeartIcon);
})


playlistbackdrop.addEventListener("click", () =>   {
   if(playlistContainer.classList.contains("open")){
      playlistContainer.classList.remove("open");
      playlistbackdrop.style.display = "none";
   }
});

playListModal.addEventListener("click", () => {   
   if(playlistContainer.classList.contains("open")){
      playlistContainer.classList.remove("open");
      playlistbackdrop.style.display = "none";
   }
   else{
      playlistContainer.classList.add('open');
      playlistbackdrop.style.display = "block";
   }
});

playPause.addEventListener("click",(e) => {
   if(pauseSong.style.display === "none"){
      pauseSong.style.display = "inline-block";
      playSong.style.display = "none";
      isPlaying = true;
      audio.play();
      audio.playbackRate = 1;
   }
   else{
      playSong.style.display = "inline-block";
      pauseSong.style.display = "none"
      audio.pause();
      isPlaying = false;
   }
});
resetDuration.addEventListener("click" , () => {
   audio.currentTime = 0;
   audio.pause();
   audio.playbackRate = 1;
});
fastForward.addEventListener("click", (e) => {
   let currentRate = audio.playbackRate;
   let newRate;
   clickCount++;
   if(clickCount <= 5){
      newRate = audioPlaySpeed("add",currentRate);
      audio.playbackRate = newRate;
   }
   else if(audio.playbackRate >= 2){
      audio.playbackRate = 2;
      alert("maximum playback rate reached");
      clickCount = 5;
   }
   else{
      alert("maximum playback rate reached");
      clickCount = 5;
   }
});
fastBackward.addEventListener("click", (e) => {
   let currentRate = audio.playbackRate;
   let newRate;
   if(clickCount <= 5 && clickCount >= 2){
      clickCount--;
      newRate = audioPlaySpeed("reduce",currentRate);
      audio.playbackRate = newRate;
   }
   else{
      audio.playbackRate = 1;
      clickCount = 1;
      alert("minimum playback rate reached");
   }
});
progressOfSong.addEventListener("click",setAudioProgress);
audio.addEventListener("loadeddata",updateAudioProgress);
audio.addEventListener("timeupdate",updateAudioProgress);