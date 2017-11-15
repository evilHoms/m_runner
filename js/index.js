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

//Создали плейлист из переданных .json данных
const mainPlaylist = new Playlist(JSON.parse(jsonTrackArray));
//Добавили созданный ранее плейлист на страницу
player.addPlaylist(mainPlaylist);


//Упростить все эти действия


//Выбираем добавленные на страницу элементы и добавляем их в плеер для взаимодействия и инициализируем листенеры
const currentPlaylist = document.querySelectorAll(`.playlist__track`);
player.init(currentPlaylist);