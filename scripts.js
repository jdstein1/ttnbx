const keys = document.querySelectorAll('.key'); // cache key elements
const audios = document.getElementsByTagName("audio"); // cache audio elements
const codes = []; // array of codes

/* push each code into codes array */
for (let i = 0; i < audios.length; i++) {
  codes.push(parseInt(audios[i].dataset.key));
}

/* get index of key with specific code */
function isMyKey(arr,key,val) {
  for (let i = 0; i < arr.length; i++) {
    const myCode = parseInt(arr[i].dataset[key]);
    if (myCode === val) {
      const index = i;
      return index;
    }
  }
}

/* play audio associated w key and start CSS transition */
function playAudio(e) {
  // console.group('START playAudio');
  const myKey = e.keyCode;
  const myIndex = isMyKey(audios,"key",myKey);
  console.log('audio played: ', keys[myIndex].children[1].innerHTML);
  audios[myIndex].currentTime = 0;
  audios[myIndex].play().then(function(){
    keys[myIndex].classList.add("playing");
  });
  // console.groupEnd();
}

/* undo the CSS transition */
function undoTransition(e) {
  if (e.propertyName !== 'transform') return; // skip it if it's not a transform
  this.classList.remove("playing");
}

/* listen for key down event */
document.addEventListener("keydown", function(){
  console.log('key pressed: ', event.key);
  // play audio only if it is one of our key codes
  if (codes.indexOf(event.keyCode) < 0) return;
  playAudio(event);
});

/* listen for transition event */
keys.forEach(key => key.addEventListener('transitionend', undoTransition));
