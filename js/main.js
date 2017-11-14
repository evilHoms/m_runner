'use strict';

const timer = document.querySelector(`.player__play-time`);
const display = document.querySelector(`.player__screen`);
const progressBar = document.querySelector(`.player__progress-bar__bar`);
const controlBtns = document.querySelectorAll(`.ctrl-btn`);
const currentTrack = document.querySelector(`.current-track`);
const playlistWrapper = document.querySelector(`.playlist__tracklist`);
const playlist = document.querySelectorAll(`.playlist__track`);

let isPlay = false;

initTracks(playlist);

controlBtns.forEach(btn => {
  btn.addEventListener(`click`, onControlBtnClick);
});


function onControlBtnClick(e) {
  if (this.classList.contains(`play-btn`)) {
    plaingSong();
    isPlay = !isPlay;
  }
  else if (this.classList.contains(`stop-btn`)) {
    currentTrack.currentTime = 0;
    currentTrack.pause();
    isPlay = !isPlay;
  }
  else if (this.classList.contains(`next-btn`)) {
    nextSong(playlist);
    if (isPlay)
      currentTrack.play();
  }
  else if (this.classList.contains(`prev-btn`)) {
    prevSong(playlist);
    if (isPlay)
      currentTrack.play();
  }
}


function plaingSong(song = currentTrack) {
  song.play();
  
  setInterval(() => {
    showCurrentTime();
    watchAudioProgressBar();
  }, 1000);
  //Следим за временем песни и заполнеяем прогресс бар.
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