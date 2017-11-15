//Тестовый Json объект, который должен отдаваться с сервера при авторизации
const jsonTrackArray = `{
  "Renegade": "https://cs1-49v4.vk-cdn.net/p8/faea22a85f1b05.mp3",
  "Flawless": "https://cs1-39v4.vk-cdn.net/p15/27de7467a87d71.mp3"
}`;

//Создали объект плеера, передав основные его элементы со страницы (можно будет переделать создавая элементы не на html, а в js).
const player = new Player(
  document.querySelector(`.player__screen`),
  document.querySelector(`.player__play-time`),
  document.querySelector(`.player__progress-bar__bar`),
  document.querySelectorAll(`.ctrl-btn`),
  document.querySelector(`.playlist__tracklist`),
  document.querySelector(`.current-track`)
);



//Данные действия вызываются после получения данных от сервера с плейлистом
//Трансформируем Json файл и добаляем треки из него на страницу
player.updatePlaylist(jsonTrackArray);

//Создаем объект плейлиста и передаем его список в плеер для инициализации
const playlist = new Playlist(document.querySelectorAll(`.playlist__track`), jsonTrackArray);
player.init(playlist.htmlList);