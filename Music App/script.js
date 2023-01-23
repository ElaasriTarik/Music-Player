const openMenu = document.querySelector('.openMenu');
let playlistTable = document.querySelector('.playlistTbale');
let playlistBtn = document.querySelector('.playlistBtn');
let pickBtn = document.querySelector('.pickThis');
let dialogBox = document.querySelector('.pickPlayName');
let playlistInputName;
let menu = document.querySelector('.playlistAndMore');
const previousBtn = document.querySelector('.previousBtn');
const nextBtn = document.querySelector('.nextBtn');
const pausePlay = document.querySelector('.pausePlay');
const musicBox = document.querySelector('.music-box');
let playAndPauseIcon = document.querySelector('.playAndPauseIcon');
let listOfSongs = document.querySelector('.listOfSongs');
const images = ['/images/a.jpg', '/images/b.jpg', '/images/c.jpg', '/images/d.jpg', '/images/e.jpg', '/images/f.jpg', '/images/g.jpg', '/images/h.jpg', '/images/i.jpg'];
let songDur;
let currentSongTime = document.querySelector('.currentSongTime');
let songDurationHtml = document.querySelector('.songDurationHtml')
let htmlSongsPreview = '';
let timeIndicator = document.querySelector('.songCurrentTime');
let playlistChoiceListState = false;
let pickAplaylist = document.querySelector('.pickAplaylist');
let thisTime;
let songBoxes;
let musicLibrary = [];
let playingSounds = [];
let input = document.querySelector('.inputFiles');
let sound;
let status = false;
let k = 0;
let moveIndicId;
//let songName = '';
let gotFile = [];
let pathsArr = [];
let playlistsNamesAndVals = [];;
const heartCheck = `
<path d="M9 11.2857L10.8 13L15 9M12 6.59097L11.8456 6.42726C9.86801 4.33053 6.59738 4.57698 4.91934 6.94915C3.42999 9.05459 3.78668 12.0335 5.725 13.6776L12 19L18.275 13.6776C20.2133 12.0335 20.57 9.05459 19.0807 6.94915C17.4026 4.57697 14.132 4.33053 12.1544 6.42726L12 6.59097Z" stroke="#464455" stroke-linecap="round" stroke-linejoin="round" data-heart-checked="false"/>`;
const heartRemove = `
<path d="M19 5L18.0864 5.91358M5 19L8.21252 15.7875M18.0864 5.91358C16.3142 4.5616 13.7913 4.69173 12.1544 6.42726L12 6.59097L11.8456 6.42726C9.86801 4.33053 6.59738 4.57698 4.91934 6.94915C3.42999 9.05459 3.78668 12.0335 5.725 13.6776L8.21252 15.7875M18.0864 5.91358L8.21252 15.7875M9.64206 17L12 19L18.275 13.6776C19.9081 12.2924 20.4185 9.95956 19.6479 8" stroke="#464455" stroke-linecap="round" stroke-linejoin="round" data-heart-checked="false"/>`
const heart = `
<path d="M11.8456 6.42726L12 6.59097L12.1544 6.42726C14.132 4.33053 17.4026 4.57697 19.0807 6.94915C20.57 9.05459 20.2133 12.0335 18.275 13.6776L12 19L5.725 13.6776C3.78668 12.0335 3.42999 9.05459 4.91934 6.94915C6.59738 4.57698 9.86801 4.33053 11.8456 6.42726Z" stroke="#464455" stroke-linecap="round" stroke-linejoin="round" data-heart-checked="false"/>`;
let playlistName = document.querySelectorAll('.playlistName');
let menuState = false;
let dialogState = false;
openMenu.addEventListener('click', (e) => {
   if (!menuState) {
     menuState = true;
     menu.style.right = "0";
   } else {
     menuState = false;
     menu.style.right = "-70%";
   }
})
const optionsIcon = `<path d="M0 0h48v48H0z" fill="none"/>
<g id="Shopicon">
	<circle cx="24" cy="24" r="5"/>
	<circle cx="24" cy="11" r="5"/>
	<circle cx="24" cy="37" r="5"/>
</g>`;
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
   let num = 0;
   htmlSongsPreview = musicLibrary.map((item) => {
     let bbb = `<svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-heart-checked="false">
     <path d="M11.8456 6.42726L12 6.59097L12.1544 6.42726C14.132 4.33053 17.4026 4.57697 19.0807 6.94915C20.57 9.05459 20.2133 12.0335 18.275 13.6776L12 19L5.725 13.6776C3.78668 12.0335 3.42999 9.05459 4.91934 6.94915C6.59738 4.57698 9.86801 4.33053 11.8456 6.42726Z" stroke="#464455" stroke-linecap="round" stroke-linejoin="round" data-heart-checked="false"/>`;
     return `
     <div class="songBox">
     <div class="imageBox">
      <img src="${item.cover}" alt="" class="songCover">
     </div>
         <h2 class="nameOfSong ${item.path}">${item.name}</h2>
         <div class="heartOptionIcons">
           <div class="heartIcon emptyHeart emptyHeart${num++}" data-heart-checked="false">
              ${bbb}
              </svg>
           </div>
           <div class="optionIcon">
               <svg width="800px" height="800px" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" class="options">${optionsIcon}
           </div>
         </div>
     </div>
     `
   }).join('');

   listOfSongs.innerHTML = htmlSongsPreview;
 }
 let thoseHearts = document.querySelectorAll('.emptyHeart');
 choosingFavourites(thoseHearts)
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
                clearInterval(moveIndicId);
                currentT()
                moveIndic()
                displaySongDuration(sound)
                songDur = sound.duration;
            }
              //timeIndicator.style.animationName = 'none';
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
     //timeIndicator.style.animationPlayState = 'running';
     status = true;
     if (moveIndicId === null) {
       moveIndicId = setInterval(moveIndic, 1000);
     }
   } else if (status){
     playAndPauseIcon.src = 'play-solid.svg';
     sound.pause();
     status = false;
     //timeIndicator.style.animationPlayState = 'paused';
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
    clearInterval(moveIndicId);
    currentT();
    moveIndic();
    displaySongDuration(sound)
    songDur = sound.duration;

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
    clearInterval(moveIndicId);
    currentT()
    moveIndic()
    displaySongDuration(sound)
    songDur = sound.duration;
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
function getDuration(){
  d = sound.duration;
}
let newDuration
function currentT() {
  timeIndicator = document.querySelector('.songCurrentTime')
  thisTime = 0;
  newDuration = sound.duration;
  timeIndicator.setAttribute('min','0')
  timeIndicator.setAttribute('max', `${newDuration}`);
  timeIndicator.setAttribute('value','0')
  //let intervalTime = parseInt(sound.duration *1000/timeIndicator.offsetWidth);
  moveIndicId = setInterval(moveIndic, 1000);
}
function moveIndic() {
  if (thisTime === parseInt(newDuration)) {
   clearInterval(moveIndicId);
 } else {
   thisTime += 1;
   timeIndicator.value = thisTime;
 }
}
let curMins = 0;
let curSec = 0;
let mins = 0;
let sec = 0;
timeIndicator.addEventListener('click', (e) => {
  thisTime = parseInt(e.target.value);
  //timeIndicator.value = thisTime;
  sound.currentTime = thisTime;
  moveIndic();
    mins = 0;
    sec = 0;
    curMins = 0;
    curSec = thisTime;
    for (var i = 0; i < curSec; i++) {
      if (curSec >= 59) {
        curSec -= 59;
        curMins += 1;
        if (mins < 10) {
          mins = '0' + mins;
        }
      } else if(curSec < 60) {
        if (curSec < 10) {
          sec = '0' + curSec.toFixed()
        } else {
          sec = parseInt(curSec.toFixed());
        }
      }
    }
       currentSongTime.innerHTML = `${(curMins<10)?'0'+curMins:curMins}:${(curSec<10)?'0'+curSec:curSec}`;
})
function displaySongDuration(song) {
     curMins = 0;
     curSec = 0;
     mins = 0;
     sec = 0;
    let ss = song.duration;
    for (var i = 0; i < ss; i++) {
      if (ss > 60) {
        ss -= 60;
        mins += 1;
      } else if(ss < 60) {
        if (ss < 10) {
          sec = ss.toFixed()
          sec = '0' + sec;
        } else {
          sec = parseInt(ss.toFixed());
        }
      }
    }
    songDurationHtml.innerHTML = `${(mins<10)? '0'+mins:mins}:${(sec==0)?'0'+sec:sec}`;

    let inter = setInterval(() => {
      //console.log(curSec, thisTime, Math.floor(song.currentTime), Math.floor(song.duration));
      if (song.duration === song.currentTime) {
        return null;
      }
        //let dur = song.duration.toFixed();
        curSec += 1;
        if (curSec >= 59) {
          curMins += 1;
          curSec = 0;
        }
        currentSongTime.innerHTML = `${(curMins<10)? '0'+curMins:curMins}:${(curSec<10)?'0'+curSec:curSec}`;
    },1000)
    songBoxes = document.querySelectorAll('.nameOfSong');
    [...songBoxes, pausePlay, nextBtn, previousBtn].forEach((item, i) => {
      item.addEventListener('click', () => {
        clearInterval(inter)
      })
    });
}
let listOfPlaylists = [];
function choosingFavourites(heartsBoxes) {
  let heartsOptions=  document.querySelectorAll('.emptyHeart');
  console.log(heartsBoxes);
  heartsOptions.forEach((item, i) => {
    item.addEventListener('click', (e) => {
      if (e.target.dataset.heartChecked == "false") {
        e.target.dataset.heartChecked = "true";
        e.target.innerHTML = `${heartCheck}`;
        pickAplaylist.style.display = 'flex';
        let parent = e.target.parentElement;
        clickingOnPlaylist(parent.parentNode.parentNode)
      }
      else {
        e.target.innerHTML = `${heart}`;
        e.target.dataset.heartChecked = "false";
        pickAplaylist.style.display = 'none';
      }
      getFavourites(document.querySelectorAll('.heartIcon'));
    })
  });
}
let filteredHearts;
function getFavourites(dt) {
  filteredHearts = [...dt].filter((item) => {
     return (item.childNodes[1].dataset.heartChecked == "true")? item:null
  })
  //addToPlaylist(filteredHearts)
}
playlistBtn.addEventListener('click', () => {
  if (!dialogState) {
    dialogBox.style.display = 'flex';
    dialogState = true;
  } else {
    dialogBox.style.display = 'none';
    dialogState = false;
  }
})
pickBtn.addEventListener('click', (e) => {
  playlistInputName = document.querySelector('.playlistInputName').value;
  if (listOfPlaylists.indexOf(playlistInputName) < 0) {
    const playlistChoicesHTML = `
    <div class="playlistChoices">
    <div>
    <img src="icons/playlist-svgrepo-com.svg">
    <div>
    <h1 class="playlistName">${playlistInputName}</h1>
    <p class="items">xx songs</p>
    </div>
    </div>
    </div>
    </div>
    `;
    listOfPlaylists.push(playlistInputName);
    pickAplaylist.innerHTML += playlistChoicesHTML;
    createPlaylist(playlistInputName)
  } else {
    dialogBox.style.display = 'none';
    dialogState = false;
    return null;
  }

})
function createPlaylist(nameOFplaylist) {
  const htmlString = `<div class="playlistBox">
       <div class="playlistInfo">
       <div>
       <img src="icons/playlist-svgrepo-com.svg">
       <div>
       <h1>${nameOFplaylist}</h1>
       <p class="items">xx items.</p>
       </div>
       </div>
       <img src="icons/arrow-down-2-svgrepo-com.svg" class="arrowDown">
       </img>
       </div>
       <div class="mySongs">

       </div>
  </div>`;
  let b = 0;
  let arr = [];
  for (var i = 0; i < playlistsNamesAndVals.length; i++) {
    arr.push(playlistsNamesAndVals[i].playlistName);
  }
  if (!arr.includes(nameOFplaylist)) {
    playlistsNamesAndVals.push({'playlistName':nameOFplaylist, 'songs': []})
    arr =[]
  }
  playlistTable.innerHTML += htmlString;
  //let playlistNames = document.querySelectorAll('.playlistInfo');
  //playlistNames.childNodes[1].childNodes[3].childNodes[1].innerText)
  dialogBox.style.display = 'none';
  dialogState = false;
  displayPlaylist()
}
let playlistDisplay = false;
function displayPlaylist() {
  let arrow = document.querySelectorAll('.arrowDown')
  let playlistSongs = document.querySelectorAll('.mySongs');
//close all playlists

      // open the targeted playlist.
  arrow.forEach((item, i) => {
    item.addEventListener('click', (e) => {
      let target = e.target.parentElement.parentElement.childNodes[3];
      if (!playlistDisplay) {
        target.style.height = "145px";
        target.style.transition = "height 0.3s linear";
        playlistDisplay = true;
      } else {
        target.style.height = "0px";
        playlistDisplay = false;
      }
    })
  });
}

function clickingOnPlaylist(parent) {
  let choices = document.querySelectorAll('.playlistChoices')
  choices.forEach((item) => {
    item.addEventListener('click', (e) => {
       let thisPlaylist = listOfPlaylists.indexOf(e.target.childNodes[0].parentNode.innerText)
       if (thisPlaylist === -1) return null;
       let chosenPlaylist = playlistTable.children[thisPlaylist];
       //let sp = source.splice(source.length-12, source.length);
         //for (var i = 0; i < playlistsNamesAndVals.length; i++) {
           //for (var x = 0; x < playlistsNamesAndVals.songs[i].length; x++) {
             if (!playlistsNamesAndVals[thisPlaylist].songs.includes(parent)) {
                  playlistsNamesAndVals[thisPlaylist].songs.push(parent);
               }
           //}
        // }

       const playlistString = playlistsNamesAndVals[thisPlaylist].songs.map((item) => {
         return `
         <div class="favouriteSong">
            <div class="chosenSongImage">
               <img src="${item.children[0].children[0].src}">
            </div>
            <h4 class="chosenSongName">${item.children[1].textContent}</h4>
      </div>
         `
       }).join('');
       let itemsCount = playlistsNamesAndVals[thisPlaylist].songs.length;
       add(chosenPlaylist, playlistString, itemsCount)

    })
  })
}
function add(chosenPlaylist, item, itemsCount) {
  chosenPlaylist.children[0].children[0].children[1].children[1].innerText = (itemsCount === 1)? `${itemsCount} song`:`${itemsCount} songs`;
  chosenPlaylist.children[1].innerHTML = item;
  pickAplaylist.style.display = 'none';
  console.log(chosenPlaylist);

}
let dialogs = document.querySelectorAll('dialog')
function toCloseDialogs() {
  window.addEventListener('click', () => {
    dialogs.forEach((item, i) => {
      if (dialogState === true) {
        item.style.display = 'none';
        dialogState === false;
      }
    });
  })
}
