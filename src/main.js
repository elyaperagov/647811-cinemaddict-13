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
import {RenderPosition, renderElement, getRandomArrayItem} from './helpers.js';

const CARDS_IN_ROW = 5;
const NUMBER_OF_EXTRA_CONTAINERS = 2;
const FILM_CARDS_QUANTITY = 15;

let showingFilmCardsCount = CARDS_IN_ROW;

const generatedCards = new Array(FILM_CARDS_QUANTITY).fill().map(generateCard);

const renderCards = (cards, container) => {
  for (let i = 0; i < cards.length; i++) {
    renderElement(container, new FilmCard(cards[i]).getElement(), RenderPosition.BEFOREEND);
  }
};

const favorCount = generatedCards.filter((card) => card.isFavorite).length;
const watchedCount = generatedCards.filter((card) => card.isWatched).length;
const isInWatchListCount = generatedCards.filter((card) => card.isInWatchList).length;

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteBody = document.querySelector(`body`);

renderElement(siteHeaderElement, new Profile().getElement(), RenderPosition.BEFOREEND);
renderElement(siteMainElement, new Navigation(isInWatchListCount, watchedCount, favorCount).getElement(), RenderPosition.BEFOREEND);
renderElement(siteMainElement, new Sort().getElement(), RenderPosition.BEFOREEND);
renderElement(siteMainElement, new Films().getElement(), RenderPosition.BEFOREEND);

const siteFilms = siteMainElement.querySelector(`.films`);

renderElement(siteFilms, new FilmsList().getElement(), RenderPosition.BEFOREEND);

const siteFilmsList = siteFilms.querySelector(`.films-list`);
const siteFilmsListContainer = siteFilmsList.querySelector(`.films-list__container`);

renderCards(generatedCards.slice(0, showingFilmCardsCount), siteFilmsListContainer);

renderElement(siteFilms, new ShowMoreButton().getElement(), RenderPosition.BEFOREEND);

let loadMoreButton = document.querySelector(`.films-list__show-more`);

const showMoreCards = () => {
  renderCards(generatedCards.slice(showingFilmCardsCount, showingFilmCardsCount + CARDS_IN_ROW), siteFilmsListContainer);

  showingFilmCardsCount += CARDS_IN_ROW;

  if (showingFilmCardsCount > generatedCards.length) {
    loadMoreButton.remove();
  }
};

loadMoreButton.addEventListener(`click`, showMoreCards);

let headers = [`Top rated`, `Most recommended`];

for (let i = 0; i < NUMBER_OF_EXTRA_CONTAINERS; i++) {
  renderElement(siteFilms, new FilmsExtra(headers[i]).getElement(), RenderPosition.BEFOREEND);
}

// const filmsExtraContainers = siteMainElement.querySelectorAll(`.films-list--extra .films-list__container`);
const topRated = document.querySelector(`.films-list--extra .films-list__container`);
const mostCommented = document.querySelector(`.films-list--extra:last-child .films-list__container`);


const getTopRatedFilms = () => {
  const topRatedFilms = generatedCards
  .sort(function (a, b) {
    return a.rating - b.rating;
  }).slice(generatedCards.length - 2, generatedCards.length);
  return topRatedFilms;
};

const filmTitles = siteFilmsList.querySelectorAll(`.film-card__title`);
const filmPosters = siteFilmsList.querySelectorAll(`.film-card__poster`);
const filmComments = siteFilmsList.querySelectorAll(`.film-card__comments`);

const closePopup = (evt) => {
  evt.preventDefault();
  // for (var i = 0; i < generatedCards.length; i++) {
  new PopUpFilmCard().getElement().remove();
  // debugger;
  // }
};

const openPopup = (evt) => {
  evt.preventDefault();
  // for (var i = 0; i < generatedCards.length; i++) {
  renderElement(siteBody, new PopUpFilmCard(generatedCards[0]).getElement(), RenderPosition.BEFOREEND);
  const closePopupBtn = document.querySelector(`.film-details__close-btn`);
  closePopupBtn.addEventListener(`click`, closePopup);
  // }
};

const renderPopup = (elements) => {
  for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener(`click`, openPopup);
  }
};

renderPopup(filmTitles);
renderPopup(filmPosters);
renderPopup(filmComments);

for (let i = 0; i < NUMBER_OF_EXTRA_CONTAINERS; i++) {
  renderElement(topRated, new FilmCard(getRandomArrayItem(getTopRatedFilms())).getElement(), RenderPosition.BEFOREEND);
  renderElement(mostCommented, new FilmCard(getRandomArrayItem(generatedCards)).getElement(), RenderPosition.BEFOREEND);
}

// renderElement(siteBody, new PopUpFilmCard(generatedCards[0]).getElement(), RenderPosition.BEFOREEND);
