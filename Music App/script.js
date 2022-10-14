const previousBtn = document.querySelector('.previousBtn');
const nextBtn = document.querySelector('.nextBtn');
const pausePlay = document.querySelector('.pausePlay');
const musicBox = document.querySelector('.music-box');
let playAndPauseIcon = document.querySelector('.playAndPauseIcon');
let listOfSongs = document.querySelector('.listOfSongs');
const images = ['/images/a.jpg', '/images/b.jpg', '/images/c.jpg', '/images/d.jpg', '/images/e.jpg', '/images/f.jpg', '/images/g.jpg', '/images/h.jpg', '/images/i.jpg'];
let htmlSongsPreview = '';
let timeIndicator = document.querySelector('.songCurrentTime');
let thisTime = 0;
let songBoxes = '';
let musicLibrary = [];
let playingSounds = [];
let input = document.querySelector('.inputFiles');
let sound = '';
let status = false;
let k = 0;
let moveIndicId;
//let songName = '';
let gotFile = [];
let pathsArr = [];
input.addEventListener('dragover', (e) => {
  e.preventDefault();
  //input.files = e.dataTransfer.files;
  input.style.border = "1px dashed #262626";
})
input.addEventListener('drop', (e) => {
  e.preventDefault();
  input.style.border = "0px dashed grey";
})
input.addEventListener('change', (e) => {
 let objS = [];
 gotFile = input.files;
 let songsPaths = [];
 for (let i=0; i < gotFile.length; i++) {
   let songName = input.files.item(i).name.split('.');
   let fName = songName[0].replace(/\([ ]?\w+[ ]?\)/g, '');
   let songPath = URL.createObjectURL(gotFile[i]);
   let size = input.files.item(i).size;
   let randomCover = images[Math.floor(Math.random()*images.length)];
   musicLibrary.unshift({name: fName, path: songPath, cover: randomCover, size: size})
   //musicLibrary.push();
   songsPaths.unshift(songPath)
   htmlSongsPreview = musicLibrary.map((item) => {
     return `
     <div class="songBox">
     <div class="imageBox">
      <img src="${item.cover}" alt="" class="songCover">
     </div>
         <h2 class="nameOfSong ${item.path}">${item.name}</h2>
     </div>
     `
   }).join('');
   listOfSongs.innerHTML = htmlSongsPreview;
 }
   songBoxes = document.querySelectorAll('.nameOfSong');
   songBoxes.forEach((item) => {
   item.addEventListener('click', (e) => {
     for (let i = 0; i < musicLibrary.length; i++) {
          if (musicLibrary[i].path === e.target.classList[1]) {
            let thisPath = e.target.classList[1];
            sound = new Audio(thisPath);
            playingSounds.unshift(sound);
            k = i;
            for (let j = 0; j < playingSounds.length; j++) {
              if (j > 0) {
               playingSounds[j].pause()
              }
            }
            checkThisSong()
            sound.setAttribute('preload','metadata');
            sound.play();
            item.parentElement.style.backgroundColor = 'rgba(255, 92, 197, 0.7)';
            item.parentElement.style.color = "white";
            songBoxes[i].parentElement.style.filter = 'opacity(100%)';
            playAndPauseIcon.src = 'pause-solid.svg';
            sound.onloadedmetadata = () => {
              //getDuration(sound)
                currentT()
            }
              timeIndicator.style.animationName = 'none';
            thisTime = 0;
            status = true;

        }
      }
  })
})
// document.querySelector('audio').setAttribute('src',songPath)
  addSong(musicLibrary);
})
pausePlay.addEventListener('click', () => {
    if (!status) {
     sound.play();
     playAndPauseIcon.src = 'pause-solid.svg';
     timeIndicator.style.animationPlayState = 'running';
     status = true;
     if (moveIndicId === null) {
       moveIndicId = setInterval(moveIndic, 1000);
     }

   } else if (status){
     playAndPauseIcon.src = 'play-solid.svg';
     sound.pause();
     status = false;
     timeIndicator.style.animationPlayState = 'paused';
     clearInterval(moveIndicId);
     moveIndicId = null;
   }
      checkThisSong()
  })

nextBtn.addEventListener('click', (e) => {
  k += 1;
  if (k > musicLibrary.length - 1) {
     k =0;
  }
  sound = new Audio(musicLibrary[k].path);

  playingSounds.unshift(sound);
  for (var i = 0; i < playingSounds.length; i++) {
    if (i > 0) {
     playingSounds[i].pause();
    }
  }
  sound.play()
  sound.onloadedmetadata = () => {
    //getDuration(sound)
    thisTime = 0;
    moveIndic();

  }
  playAndPauseIcon.src = 'pause-solid.svg';
  checkThisSong()
})
previousBtn.addEventListener('click', (e) => {
    k -= 1;
  if (k < 0) {
     k = musicLibrary.length - 1;
  }
  sound = new Audio(musicLibrary[k].path);
  playingSounds.unshift(sound);
  for (var i = 0; i < playingSounds.length; i++) {
    if (i > 0) {
     playingSounds[i].pause();
    }
  }
  sound.setAttribute('preload','metadata')
  sound.play()
  sound.onloadedmetadata = () => {
    //getDuration(soound)
    thisTime = 0;
    moveIndic()
  }
  playAndPauseIcon.src = 'pause-solid.svg';
  checkThisSong()
})
let addSong = (library) => {
 sound = new Audio(library[0].path);
 playingSounds.unshift(sound);
}
function checkThisSong(){
   for (var i = 0; i < songBoxes.length; i++) {
           songBoxes[i].parentElement.style.backgroundColor = 'rgba(255, 253, 253, 0.93)';
           songBoxes[i].parentElement.style.color = "black";
           songBoxes[i].parentElement.style.filter = 'opacity(75%)';
    if (songBoxes[i].classList[1] === playingSounds[0].src) {
      songBoxes[i].parentElement.style.backgroundColor = 'rgba(255, 92, 197, 0.7)';
      songBoxes[i].parentElement.style.color = "white";
      songBoxes[i].parentElement.style.filter = 'opacity(100%)';
    }
   }
}
let d;
function getDuration(so){
  d = so.duration;

  // timeIndicator.style.width = '0px';
   timeIndicator.style.animation = `widthOfIndicator ${d}s linear`;
}
function currentT() {
  timeIndicator.setAttribute('min','0')
  timeIndicator.setAttribute('max',`${sound.duration}`);
  let intervalTime = parseInt(sound.duration *1000/timeIndicator.offsetWidth);
  moveIndicId = setInterval(moveIndic, 1000);

}
function moveIndic() {
  if (thisTime == parseInt(sound.duration)) {
   clearInterval(moveIndicId);
  }
 thisTime += 1;
 timeIndicator.value = thisTime;
}
timeIndicator.addEventListener('click', (e) => {
  thisTime = parseInt(e.target.value);
  timeIndicator.value = thisTime;
  sound.currentTime = thisTime;
  moveIndic();
})
