import Profile from "./view/profile.js";
import Navigation from "./view/navigation.js";
import Sort from "./view/sort.js";
import Films from "./view/films.js";
import FilmsList from "./view/films-list.js";
import FilmCard from "./view/film-card.js";
import ShowMoreButton from "./view/show-more.js";
import FilmsExtra from "./view/films-extra.js";
import PopUpFilmCard from "./view/popup.js";
import {generateCard} from './mock/cards.js';
import {RenderPosition, renderElement, remove} from './helpers/render.js';

const CARDS_IN_ROW = 5;
const NUMBER_OF_EXTRA_CONTAINERS = 2;
const FILM_CARDS_QUANTITY = 15;
const TOP_RATED_FILMS = 2;
const MOST_COMMENTED_FILMS = 2;

let showingFilmCardsCount = CARDS_IN_ROW;

const generatedCards = new Array(FILM_CARDS_QUANTITY).fill().map(generateCard);
const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteBody = document.querySelector(`body`);

const renderFilm = (filmListElement, film) => {
  const filmComponent = new FilmCard(film);
  const filmPopup = new PopUpFilmCard(film);

  const closePopup = () => {
    filmPopup.getElement().remove();
    siteBody.classList.remove(`hide-overflow`);
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      closePopup();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const openPopup = () => {
    renderElement(siteBody, filmPopup, RenderPosition.BEFOREEND);
    const closePopupBtn = filmPopup.getElement().querySelector(`.film-details__close-btn`);
    siteBody.classList.add(`hide-overflow`);
    closePopupBtn.addEventListener(`click`, closePopup);
    document.addEventListener(`keydown`, onEscKeyDown);
  };

  filmComponent.showPopupClickHandler(() => {
    openPopup();
  });

  renderElement(filmListElement, filmComponent, RenderPosition.BEFOREEND);
};

const favorCount = generatedCards.filter((card) => card.isFavorite).length;
const watchedCount = generatedCards.filter((card) => card.isWatched).length;
const isInWatchListCount = generatedCards.filter((card) => card.isInWatchList).length;

renderElement(siteHeaderElement, new Profile(), RenderPosition.BEFOREEND);
renderElement(siteMainElement, new Navigation(isInWatchListCount, watchedCount, favorCount), RenderPosition.BEFOREEND);
renderElement(siteMainElement, new Sort(), RenderPosition.BEFOREEND);
renderElement(siteMainElement, new Films(), RenderPosition.BEFOREEND);

const siteFilms = siteMainElement.querySelector(`.films`);

renderElement(siteFilms, new FilmsList(), RenderPosition.BEFOREEND);

const siteFilmsList = siteFilms.querySelector(`.films-list`);
const siteFilmsListContainer = siteFilmsList.querySelector(`.films-list__container`);

for (let i = 0; i < Math.min(generatedCards.length, CARDS_IN_ROW); i++) {
  renderFilm(siteFilmsListContainer, generatedCards[i]);
}

if (generatedCards.length > CARDS_IN_ROW) {
  const loadMoreButtonComponent = new ShowMoreButton();

  renderElement(siteFilms, loadMoreButtonComponent, RenderPosition.BEFOREEND);

  loadMoreButtonComponent.loadMoreClickHandler(() => {
    // evt.preventDefault();
    generatedCards
      .slice(showingFilmCardsCount, showingFilmCardsCount + CARDS_IN_ROW)
      .forEach((film) => renderFilm(siteFilmsListContainer, film));

    showingFilmCardsCount += CARDS_IN_ROW;

    if (showingFilmCardsCount > generatedCards.length) {
      remove(loadMoreButtonComponent);
    }
  });
}

let headers = [`Top rated`, `Most recommended`];

for (let i = 0; i < NUMBER_OF_EXTRA_CONTAINERS; i++) {
  renderElement(siteFilms, new FilmsExtra(headers[i]), RenderPosition.BEFOREEND);
}

// const filmsExtraContainers = siteMainElement.querySelectorAll(`.films-list--extra .films-list__container`);
const topRated = document.querySelector(`.films-list--extra .films-list__container`);
const mostCommented = document.querySelector(`.films-list--extra:last-child .films-list__container`);

const topRatedFilms = [...generatedCards]
  .sort(function (a, b) {
    return a.rating - b.rating;
  })
  .slice(-TOP_RATED_FILMS);

topRatedFilms
  .forEach((film) => renderElement(topRated, new FilmCard(film), RenderPosition.BEFOREEND));

generatedCards
  .slice(0, MOST_COMMENTED_FILMS)
  .forEach((film) => renderElement(mostCommented, new FilmCard(film), RenderPosition.BEFOREEND));


// for (let i = 0; i < NUMBER_OF_EXTRA_CONTAINERS; i++) {
//   renderElement(topRated, new FilmCard(topRatedFilms[i]).getElement(), RenderPosition.BEFOREEND);
//   renderElement(mostCommented, new FilmCard(getRandomArrayItem(generatedCards)).getElement(), RenderPosition.BEFOREEND);
// }
