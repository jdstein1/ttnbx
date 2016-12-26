const keys = document.querySelectorAll('.key'); // cache key elements
const audios = document.getElementsByTagName("audio"); // cache audio elements

/* play audio associated w key and start CSS transition */
function playAudio(e) {
  // console.group('START playAudio', e);
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
  if (!audio) return; // skip it if it is not a known key
  audio.currentTime = 0;
  audio.play().then(function(){
    key.classList.add("playing");
  });
  // console.groupEnd();
}

/* undo the CSS transition */
function undoTransition(e) {
  if (e.propertyName !== 'transform') return; // skip it if it's not a transform
  this.classList.remove("playing");
}

/* listen for key down event */
window.addEventListener("keydown", function(){
  console.log('key pressed: ', event.key);
  playAudio(event);
});

/* listen for transition event */
keys.forEach(key => key.addEventListener('transitionend', undoTransition));
