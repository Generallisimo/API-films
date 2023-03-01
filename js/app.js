// создаем соед с кинопоиском API
const API_KEY = "58e35953-53b7-465d-9b3c-392f53b159b6"
// ссылку апи на топ
const API_URL_POPULAR = "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1"
// поисковик от апи по кино
const API_SEARCH_URL = "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword="
// запуск по полученной ссылке от апи
getMovies(API_URL_POPULAR);
// создаем фун-цию с которой проходим авторизацию
async function getMovies(url){
    const resp = await fetch(url, {
        // у каждого запроса есть headers
        headers:{
            // по стандарту запрос
            "Content-Type": "application/json",
            // то что написано в документации мы передаем наш ключ
            "X-API-KEY": API_KEY,
        }
    });
    // полученое переводим в json 
    const respData = await resp.json();
    showMovies(respData);
};
// фун-ия где мы подключаем разную стилистику к рейтингу
function getClassByRate(vote){
    if(vote>=7){
        return "green"
    }else if (vote>5){
        return "orange"        
    }else{
        return "red"
    }
}
// пишем отображение фильмов
function showMovies(data){
    // обозначаем куда класть
    const moviesEl = document.querySelector(".movies")
    // удаляем текущие для получение новых
    document.querySelector(".movies").innerHTML = "";
    // обращаемяс к data полученный массив films и через foreach проходимся по каждому элементу и возравщаем 
    data.films.forEach((movie) => {
        // создаем карточку через JS
        const movieEl = document.createElement("div");
        // создаем класс
        movieEl.classList.add("movie")
        // и очищаем и заносим нужые там HTML коснтруции и подставляем переменные с документации на нужные нам позиции map позваляет перебрать массив также подключаем фун-ию и проверку на наличие
        movieEl.innerHTML = `
        <div class="movie__cover-inner">
            <img src="${movie.posterUrlPreview}" class="movie__cover" alt="${movie.nameRu}">
            <div class="movie__cover--darkened"></div>
        </div>
        <div class="movie__info">
            <div class="movie__title">${movie.nameRu}</div>
            <div class="movie__category">${movie.genres.map(
                (genre) => ` ${genre.genre}`
            )}</div>
            ${movie.rating && `<div class="movie__average  movie__average--${getClassByRate(movie.rating)} ">${movie.rating}</div>`}            
        </div>
        `;
        // добавляем полученоное в наш новый див
        moviesEl.appendChild(movieEl);
    });
}
// даем имена для работы с поиском
const form = document.querySelector("form");
const search = document.querySelector(".header__search");
// создаем поиск
form.addEventListener("submit", (e)=>{
    // обнуляем перезагрузку стр
    e.preventDefault();
    // заномсим адрес, дальше из поля получаем значение
    const apiSearch = `${API_SEARCH_URL}${search.value}`
    // проверяем есть ли значение
    if (search.value){
        // вызываем фун-ию и передаем уже ссылку для поиска
        getMovies(apiSearch);
        // нужно удалить текущие 
        //  после чистим строку поиска
        search.value = "";
    }
})