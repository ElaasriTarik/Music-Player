const previousBtn = document.querySelector('.previousBtn');
const nextBtn = document.querySelector('.nextBtn');
const pausePlay = document.querySelector('.pausePlay');
const musicBox = document.querySelector('.music-box');
let playAndPauseIcon = document.querySelector('.playAndPauseIcon');
let listOfSongs = document.querySelector('.listOfSongs');
const images = ['/images/a.jpg', '/images/b.jpg', '/images/c.jpg', '/images/d.jpg', '/images/e.jpg', '/images/f.jpg', '/images/g.jpg', '/images/h.jpg', '/images/i.jpg'];
let htmlSongsPreview = '';
let songBoxes = '';
let musicLibrary = [];
let playingSounds = [];
let input = document.querySelector('input');
let sound = '';
let status = false;
let k = 0;
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
     <div class="songBox ${item.path}">
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
            for (let j = 0; j < playingSounds.length; j++) {
              if (j > 0) {
               playingSounds[j].pause()
              }
            }
            sound.play();
          for (var k = 0; k < songBoxes.length; k++) {
                songBoxes[k].parentElement.style.backgroundColor = 'rgba(100%, 100%, 100%, 60%)';
                songBoxes[k].parentElement.style.color = "black";
                songBoxes[i].parentElement.style.filter = 'opacity(75%)';
          }
            item.parentElement.style.backgroundColor = 'rgba(100, 100, 100, 80%)';
            item.parentElement.style.color = "white";
            songBoxes[i].parentElement.style.filter = 'opacity(100%)';
            playAndPauseIcon.src = 'pause-solid.svg';
            status = true;
        }
      }
  })
})
// document.querySelector('audio').setAttribute('src',songPath)
  addSong(musicLibrary);
})
let spaceBar =false;
pausePlay.addEventListener('click', () => {
    if (!status) {
     sound.play();
     playAndPauseIcon.src = 'pause-solid.svg';
     status = true;
   } else if (status){
     playAndPauseIcon.src = 'play-solid.svg';
     sound.pause();
     status = false;
   }
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
  sound.play()
  playAndPauseIcon.src = 'pause-solid.svg';
  checkThisSong()
})
let addSong = (library) => {
 sound = new Audio(library[0].path);
 playingSounds.unshift(sound);
}
function checkThisSong(){
   for (var i = 0; i < songBoxes.length; i++) {
           songBoxes[i].parentElement.style.backgroundColor = 'rgba(100%, 100%, 100%, 60%)';
           songBoxes[i].parentElement.style.color = "black";
           songBoxes[i].parentElement.style.filter = 'opacity(75%)';
    if (songBoxes[i].classList[1] === playingSounds[0].src) {
      songBoxes[i].parentElement.style.backgroundColor = 'rgba(100, 100, 100, 100%)';
      songBoxes[i].parentElement.style.color = "white";
      songBoxes[i].parentElement.style.filter = 'opacity(100%)';
      status = true;
    }
   }
}
let body = document.querySelector('body');
body.addEventListener('dblclick', (e) => {
  if (!sound) {
    console.log('hello world');
  }
})
