( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {
   "use strict";
   window.addEventListener("keydown", (e) => {
      const isShift = e.shiftKey;
      const altKey = e.altKey;
      let muteKey = 0; 
      // const ctrlKey = e.ctrlKey;
      if(e.key.toString() === "AudioVolumeMute"  && muteKey === 0){
         audio.muted = true;
         muteKey = 1;
      }
   
      if(e.key.toString() === "AudioVolumeMute"  && muteKey === 1){
         muteKey = 0;
         audio.muted = false;
      }
   
      if(e.code.toString() === "Space"){
         let isPlay = localStorage.getItem("isPlaying");
         if(isPlay === "true"){
            pauseAudio();
         }else{
            playAudio();
         }
      }
   
      if(isShift){
         switch(e.code.toString()){
            case "Comma":
               handlePlayRate("decrease");
               break;
            case "Period":
               handlePlayRate("increase");
               break;
            default:
               handlePlayRate("");
         }
      }
      if(altKey){
         switch(e.code.toString()){
            case "KeyP":
               toggleDisplay(playlistModal);
               openPlaylistModal();
               break;
            case "KeyV":   
               openVolumeBar();
               break;
            case "ArrowLeft":
               break;
            case "ArrowRight":
               break;
            case "ArrowUp":
               // changeVolume("add");
               break;
            case "ArrowDown":
               // changeVolume("subtract");
               break;
         }
      }
   });
   
   window.onload = () => {
      localStorage.removeItem("isPlaying");
      localStorage.removeItem("playRate");
   };
   window.onunload = () => {
      localStorage.removeItem("isPlaying");
      localStorage.removeItem("playRate");
   };
})(window)