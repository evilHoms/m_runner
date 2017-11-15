'use strict';

//Тестовый Json объект, который должен отдаваться с сервера при авторизации
const jsonTrackArray = `{
  "Renegade": "https://cs1-49v4.vk-cdn.net/p8/faea22a85f1b05.mp3",
  "Flawless": "https://cs1-39v4.vk-cdn.net/p15/27de7467a87d71.mp3"
}`;

const timer = document.querySelector(`.player__play-time`);
const display = document.querySelector(`.player__screen`);
const progressBar = document.querySelector(`.player__progress-bar__bar`);
const controlBtns = document.querySelectorAll(`.ctrl-btn`);
const currentTrack = document.querySelector(`.current-track`);
const playlistWrapper = document.querySelector(`.playlist__tracklist`);

addPlaylist(convertToHtml(JSON.parse(jsonTrackArray)));

const playlist = document.querySelectorAll(`.playlist__track`);

let isPlaing = false;

initTracks(playlist);

controlBtns.forEach(btn => {
  btn.addEventListener(`click`, onControlBtnClick);
});


function onControlBtnClick(e) {
  if (this.classList.contains(`play-btn`)) {
    plaingSong();
    isPlaing = !isPlaing;
  }
  else if (this.classList.contains(`stop-btn`)) {
    currentTrack.currentTime = 0;
    currentTrack.pause();
    isPlaing = !isPlaing;
  }
  else if (this.classList.contains(`next-btn`)) {
    nextSong(playlist);
    if (isPlaing)
      currentTrack.play();
  }
  else if (this.classList.contains(`prev-btn`)) {
    prevSong(playlist);
    if (isPlaing)
      currentTrack.play();
  }
}


function plaingSong(song = currentTrack) {
  song.play();
  
  setInterval(() => {
    showCurrentTime();
    watchAudioProgressBar();
  }, 1000);
}

function showCurrentTime(display = timer, audio = currentTrack) {
  display.innerHTML = Math.round(audio.currentTime);
}

function watchAudioProgressBar(bar = progressBar , audio = currentTrack) {
  const maxTime = audio.duration;
  const curTime = audio.currentTime;
  
  bar.style.width = `${curTime / maxTime * 100}%`;
}

function nextSong(playlist = playlist) {
  for (let i = 0; i < playlist.length; i++) {
    if (playlist[i].classList.contains(`current`)) {
      playlist[i].classList.remove(`current`);
      if (i < playlist.length - 1) {
        playlist[i + 1].classList.add(`current`);
        break;
      }
      else {
        playlist[0].classList.add(`current`);
        break;
      }
    }
  }
  
  initTracks(playlist);
}

function prevSong(playlist) {
  for (let i = 0; i < playlist.length; i++) {
    if (playlist[i].classList.contains(`current`)) {
      playlist[i].classList.remove(`current`);
      if (i > 0) {
        playlist[i - 1].classList.add(`current`);
        break;
      }
      else {
        playlist[playlist.length - 1].classList.add(`current`);
        break;
      }
    }
  }
  
  initTracks(playlist);
}

function initTracks(playlist, audio = currentTrack) {
  const arrplaylist = Array.from(playlist);
  const currentTrack = arrplaylist.find(track => {
    return track.classList.contains(`current`);
  });
  
  audio.dataset.name = currentTrack.dataset.name;
  audio.src = currentTrack.dataset.url;
  display.innerHTML = audio.dataset.name;
  timer.innerHTML = audio.currentTime;
}

function convertToHtml(tracksObj) {
  const htmlList = [];
  let hasCurrent = false;

  for (let i in tracksObj) {
    if (tracksObj.hasOwnProperty(i))
      if (hasCurrent)
        htmlList.push(`<div class="playlist__track" data-url="${tracksObj[i]}" data-name="${i}">
                        ${i}
                      </div>`);
      else {
        hasCurrent = true;
        htmlList.push(`<div class="playlist__track current" data-url="${tracksObj[i]}" data-name="${i}">
                        ${i}
                      </div>`);
      }
  }

  return htmlList;
}

function addPlaylist(htmlPlaylist) {
  playlistWrapper.innerHTML = ``;
  htmlPlaylist.forEach(track => {
    playlistWrapper.innerHTML += track;
  });
}