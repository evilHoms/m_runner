class Player {
  constructor(display, timer, progressBar, controlBtns, playlistWrapper, audioTag) {
    this.display = display;
    this.timer = timer;
    this.progressBar = progressBar;
    this.controlBtns = controlBtns;
    this.playlistWrapper = playlistWrapper;
    this.audio = audioTag;
    
    this.playlist = undefined;
    
    this.isPlaing = false;
  }
  
  init(playlist) {
    this.playlist = playlist;
    this.initTracks();
    this.controlBtns.forEach(btn => {
      //Из за использования стрелочной функции теряется контектст нажатой клавиши и в обработчике доступен контекст объекта
      btn.addEventListener(`click`, (e) => {this.onControlBtnClick(e)});
    });
  }
  
  updatePlaylist(playlist) {
    
  }
  
  onControlBtnClick(e) {
    if (e.target.classList.contains(`play-btn`)) {
      this.play();
    }
    else if (e.target.classList.contains(`stop-btn`)) {
      this.stop();
    }
    else if (e.target.classList.contains(`next-btn`)) {
      this.next();
      if (this.isPlaing)
        this.play();
    }
    else if (e.target.classList.contains(`prev-btn`)) {
      this.prev();
      if (this.isPlaing)
        this.play();
    }
  }
  
  play() {
    this.audio.play();
    this.isPlaing = true;
  
    setInterval(() => {
      this.showCurrentTime();
      this.watchAudioProgressBar();
    }, 1000);
  }
  
  stop() {
    this.audio.currentTime = 0;
    this.audio.pause();
    this.isPlaing = false;
  }
  
  pause() {
    
  }
  
  next() {
    for (let i = 0; i < this.playlist.length; i++) {
      if (this.playlist[i].classList.contains(`current`)) {
        this.playlist[i].classList.remove(`current`);
        if (i < this.playlist.length - 1) {
          this.playlist[i + 1].classList.add(`current`);
          break;
        }
        else {
          this.playlist[0].classList.add(`current`);
          break;
        }
      }
    }

    this.initTracks(this.playlist);
  }
  
  prev() {
    for (let i = 0; i < this.playlist.length; i++) {
      if (this.playlist[i].classList.contains(`current`)) {
        this.playlist[i].classList.remove(`current`);
        if (i > 0) {
          this.playlist[i - 1].classList.add(`current`);
          break;
        }
        else {
          this.playlist[this.playlist.length - 1].classList.add(`current`);
          break;
        }
      }
    }

    this.initTracks(this.playlist);
  }
  
  showCurrentTime() {
    this.timer.innerHTML = Math.round(this.audio.currentTime);
  }

  watchAudioProgressBar() {
    const maxTime = this.audio.duration;
    const curTime = this.audio.currentTime;

    this.progressBar.style.width = `${curTime / maxTime * 100}%`;
  }
  
  updatePlaylist(json) {
    const playlist = transformJson(json);
    this.playlistWrapper.innerHTML = ``;
    playlist.forEach(track => {
      this.playlistWrapper.innerHTML += track;
    });
    
    function transformJson(json) {
      const objFromJson = JSON.parse(json);
      const htmlList = [];
      let hasCurrent = false;

      for (let i in objFromJson) {
        if (objFromJson.hasOwnProperty(i))
          if (hasCurrent)
            htmlList.push(`<div class="playlist__track" data-url="${objFromJson[i]}" data-name="${i}">
                            ${i}
                          </div>`);
          else {
            hasCurrent = true;
            htmlList.push(`<div class="playlist__track current" data-url="${objFromJson[i]}" data-name="${i}">
                            ${i}
                          </div>`);
          }
      }

      return htmlList;
    }
  }
  
  initTracks() {
    const arrplaylist = Array.from(this.playlist);
    const currentTrack = arrplaylist.find(track => {
      return track.classList.contains(`current`);
    });

    this.audio.dataset.name = currentTrack.dataset.name;
    this.audio.src = currentTrack.dataset.url;
    this.display.innerHTML = this.audio.dataset.name;
    this.timer.innerHTML = this.audio.currentTime;
  }
  
}