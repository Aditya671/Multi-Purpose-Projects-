"use strict"
// Elements Controllers 
const appMenuButton = document.querySelector("#app-menu-button");
const playListModal = document.querySelector('#playListModal');
const playPause = document.querySelector("#playPause");
const playVideo = document.querySelector("#playVideo");
const pauseVideo = document.querySelector("#pauseVideo");
const repeatVideo = document.querySelector("#repatVideo");
const nextVideo = document.querySelector("#nextVideo");
const prevVideo = document.querySelector("#prevVideo");
const fastForward = document.querySelector("#fastForward");
const fastBackward = document.querySelector("#backForward");
const shuffleVideoList = document.querySelector("#shuffleVideoList");
const progressOfVideo = document.querySelector("#progressOfVideo");
const likeThisVideo = document.querySelectorAll(".likeThisVideo");
const resetDuration = document.querySelector("#resetDuration");
const volumeControl = document.querySelector("#volumeControl");
const volumeOfVideo = document.querySelector("#volumeOfVideo");
const playlistModal = document.querySelector(".playlist-modal");
const backdrop = document.querySelector(".backdrop");
const playListContainer = document.querySelector("#playlistContainer");
const playListVideoName = document.querySelectorAll(".playlist-video-name");
const playlistVideoBar = document.querySelector(".video-text").clientWidth;
const audio = document.querySelector("audio");
let videoStartDuration = document.querySelector("#videoStartDuration");
let videoEndDuration = document.querySelector("#videoEndDuration");
const reqFullScreen = document.getElementById('reqFullScreen');
let muteKey = 0; 
let setCloseTime;
const changeTheme = document.querySelector("#changeTheme");
const timer = document.querySelector("#timer");

// CSS Animations Handler
const handleAddingMovingAnimation = (ele) => {
   const parentDivSize = ele.currentTarget.getBoundingClientRect().width;
   const size = getTextWidth(ele.currentTarget.textContent,"16px");   
   const animationStyle = animate_moveText(parentDivSize,size);
   var styleSheet = document.createElement("style")
   styleSheet.innerHTML = animationStyle;
   ele.currentTarget.children[1].appendChild(styleSheet);
   ele.currentTarget.children[0].classList.add("videoAnimate");
};

const handleRemoveMovingAnimation = (ele) => { 
   ele.currentTarget.children[1].innerHTML = "";
   ele.currentTarget.children[0].classList.remove("videoAnimate")
};

const openPlaylistContainer = () => {
   if(playlistContainer.classList.contains("open")){
      playlistContainer.classList.remove("open");
   }
   else{
      playlistContainer.classList.add('open');
   }
};
const toggleDisplay = (e) => {
   if(e.style.display === "inline-block"){
      e.style.display = "none";
   }else{
      e.style.display = "inline-block";
   }
}
const changeVolume = (method) => {
   const currentVol = audio.volume;
   if(currentVol < 1.00 && currentVol > 0.00){
      if(method === "add"){
         audio.volume = currentVol + 0.02;
      }
      if(method === "subtract"){
         audio.volume = currentVol + 0.02;
      }
      volumeOfVideo.value = audio.volume * 100;
   }else{
      alert("Final Volume Reched");
   }

}
const openVolumeBar = () => {
   if(!volumeControl.classList.contains("zIndex0")){
      volumeControl.classList.add("zIndex0");
      document.querySelector(".volumne-panel").style.display = "inline-block";
   }else{
      volumeControl.classList.remove("zIndex0");
      document.querySelector(".volumne-panel").style.display = "none";
   }
};
const getTextWidth = (text, font) => {
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
      .videoAnimate{
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
   if(myIcon.contains("fa-heart-o")){
      myIcon.remove("fa-heart-o");
      myIcon.add("fa-heart");
      myIcon.add("theme-red");
   }else{
      myIcon.add("fa-heart-o");
      myIcon.remove("fa-heart");
      myIcon.remove("theme-red");
   }
};
const handleVolumeIcon = (volumeValue) => {
   if(volumeValue === "0"){
      document.querySelector("#volumeControl i").classList.add("fa-volume-off");
      document.querySelector("#volumeControl i").classList.remove("fa-volume-up");
      
   }else{
      document.querySelector("#volumeControl i").classList.remove("fa-volume-off");
      document.querySelector("#volumeControl i").classList.add("fa-volume-up");
   }
}

const enableFullScreen = (event) => {
   if(!document.fullscreenEnabled){
      document.exitFullscreen()
   }
   else{
      video.requestFullscreen()
   }
}
// Audio Functionality Handlers
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

const handlePlayRate = (speed) => {
   let currentPlayRate = localStorage.getItem("playRate") === null ? 1 : parseFloat(localStorage.getItem("playRate"));
   let currentRate = currentPlayRate != 1 ? currentPlayRate : audio.playbackRate;
   let newRate;
   if(currentPlayRate < 2.00 && speed === "increase"){
      newRate = audioPlaySpeed("add",currentRate);
      localStorage.setItem("playRate",newRate);
      audio.playbackRate = newRate;
      fastForward.children[0].dataset['nextrate'] = newRate;
      return true;
   }else if(currentPlayRate > 1.00 && speed === "decrease"){
      newRate = audioPlaySpeed("reduce",currentRate);
      audio.playbackRate = newRate;
      localStorage.setItem("playRate",newRate);
      fastBackward.children[0].dataset['nextrate'] = newRate;
      return true;
   }
   else{
      alert("Playback speed reached");
      return false;
   }
};

const updateAudioProgress = (e) => {
   const isPlaying = localStorage.getItem("isPlaying");
   const audioFile = e.srcElement;
   const {currentTime,duration} = audioFile;
   let minutes,seconds;
   
   if(isPlaying === "true"){
      const progressPercent = ( currentTime/ duration) * 100;
      progressOfVideo.value  = progressPercent;
      minutes = Math.floor(currentTime/ 60);
      seconds = Math.floor(currentTime % 60);
      const secDuration = `0${seconds}`;
      videoStartDuration.textContent = `${minutes}:${seconds < 10 ? secDuration : seconds}`;
   }
   else{
      minutes = Math.floor( duration / 60);
      seconds = Math.floor( duration % 60);
      const secDuration = `0${seconds}`;
      if(isPlaying === "false" && audio.currentTime > 0){
         let minutes1 = Math.floor(currentTime/ 60);
         let seconds1 = Math.floor(currentTime % 60);
         const secDuration = `0${seconds}`;
         videoStartDuration.textContent = `${minutes1}:${seconds1 < 10 ? secDuration : seconds1}`;
      }else{
         videoStartDuration.textContent = `0:00`;
      }
      videoEndDuration.textContent = `${minutes}:${seconds < 10 ? secDuration : seconds}`;
   }
};

const setAudioProgress = (e) => {
   const isPlaying = localStorage.getItem("isPlaying");
   const value = e.currentTarget.value;
   if(isPlaying === "true"){
      audio.currentTime = ( value * audio.duration ) / 100;
   }
   else{
      audio.currentTime = (audio.duration / 60 ) * progressOfVideo.value ;
   }
}
const resetAudio = () => {
   audio.currentTime = 0;
   audio.playbackRate = 1;
   pauseAudio();
   progressOfVideo.value = 0;
}
const playAudio = () => {
   localStorage.setItem("isPlaying",true);
   audio.play();
   toggleDisplay(playVideo);
   toggleDisplay(pauseVideo);
}
const pauseAudio = () => {
   localStorage.setItem("isPlaying",false);
   audio.pause();
   if(pauseVideo.style.display === "inline-block"){
      toggleDisplay(playVideo);
      toggleDisplay(pauseVideo);
   }
}

// Elements Events Listeners and their methods
playListVideoName.forEach(ele => {
   ele.addEventListener("mouseenter",handleAddingMovingAnimation);
   ele.addEventListener("mouseleave",handleRemoveMovingAnimation);
});

likeThisVideo.forEach(ele => {
   ele.children[0].addEventListener("click",handleHeartIcon);
});

playPause.addEventListener("click",(e) => {
   if(pauseVideo.style.display === "none"){
      playAudio();
      audio.playbackRate = 1;
   }
   else{
      pauseAudio();
   }
});

resetDuration.addEventListener("click" ,resetAudio);

volumeOfVideo.addEventListener("change",() => {
   audio.volume = ( volumeOfVideo.value) / 100;
   handleVolumeIcon(volumeOfVideo.value);
});

volumeControl.addEventListener("dblclick", () => {
   if(muteKey === 0){
      audio.muted = true;
      muteKey = 1;
      handleVolumeIcon("0");
      
   }else{
      muteKey = 0;
      audio.muted = false;
      handleVolumeIcon(volumeOfVideo.value);
   }
});

backdrop.addEventListener("click", () =>{
   if(playlistModal.style.display === "inline-block"){
      openPlaylistContainer();
      toggleDisplay(playlistModal)
   }
   if(document.querySelector(".app-menu-container").style.display === "inline-block"){
      toggleDisplay(document.querySelector(".app-menu-container"))
   }
   toggleDisplay(backdrop);
}); 

playListModal.addEventListener("click",() => {
   toggleDisplay(playlistModal);
   toggleDisplay(backdrop);
   openPlaylistContainer()
});

fastForward.addEventListener("click",() => handlePlayRate("increase"));

fastBackward.addEventListener("click",() =>  handlePlayRate("decrease"));

volumeControl.addEventListener("click", openVolumeBar);

progressOfVideo.addEventListener("click",setAudioProgress);

audio.addEventListener("loadeddata",updateAudioProgress);

audio.addEventListener("timeupdate",updateAudioProgress);

reqFullScreen.addEventListener('click',enableFullScreen);

appMenuButton.addEventListener("click",() => {
   toggleDisplay(document.querySelector(".app-menu-container"))
   toggleDisplay(backdrop)
});

// KeyBoard keys and Window handlers
changeTheme.addEventListener("click",() =>{
   const localTheme = localStorage.getItem("setTheme")
   const docBody = document.body.classList;
   if(localTheme === "dark"){
      docBody.remove('dark');
      localStorage.setItem("setTheme","");
      document.querySelector("#changeTheme i").classList.add("fa-sun-o");
      document.querySelector("#changeTheme i").classList.remove("fa-moon-o");
      document.querySelector("#changeTheme #app-theme").textContent = "Light"; 
      
   }
   else{
      docBody.add('dark');
      localStorage.setItem("setTheme","dark");
      document.querySelector("#changeTheme i").classList.remove("fa-sun-o");
      document.querySelector("#changeTheme i").classList.add("fa-moon-o");
      document.querySelector("#changeTheme #app-theme").textContent = "Dark";
   }
});

timer.addEventListener("change",() => {
   const selectedOption = timer.value;
   clearTimeout(setCloseTime);
   alert("The Player will automatically reset in " + timer.selectedOptions[0].innerHTML);
   closeApp(selectedOption);
});

const closeApp = (selectedOption) => {
   clearTimeout(setCloseTime);
   setCloseTime = setTimeout(() => {
      resetAudio();
      volumeOfVideo.value = 0;
      handleVolumeIcon(volumeOfVideo.value)
   },selectedOption);
};
