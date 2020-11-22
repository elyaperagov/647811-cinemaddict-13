import {createUserProfileTemplate} from "./view/profile.js";
import {createNavigationTemplate} from "./view/navigation.js";
import {createSortTemplate} from "./view/sort.js";
import {createFilmsTemplate} from "./view/films.js";
import {createFilmsListTemplate} from "./view/films-list.js";
import {createFilmCardTemplate} from "./view/film-card.js";
import {createShowMoreButtonTemplate} from "./view/show-more.js";
import {createFilmsExtraContainersTemplate} from "./view/films-extra.js";
import {createFilmPopupTemplate} from "./view/popup.js";
import {generateCards} from './mock/cards.js';

const NUMBER_OF_CARDS = 5;
const NUMBER_OF_EXTRA_CONTAINERS = 2;
const FILM_CARDS_QUANTITY = 15;

const allFilms = generateCards(FILM_CARDS_QUANTITY);

const renderCardsAmount = (cards, container) => {
  for (var i = 0; i < cards.length; i++) {
    render(container, createFilmCardTemplate(cards[i]));
  }
};

const render = (container, template, place) => {
  place = `beforeend`;
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteBody = document.querySelector(`body`);

render(siteHeaderElement, createUserProfileTemplate());
render(siteMainElement, createNavigationTemplate());
render(siteMainElement, createSortTemplate());
render(siteMainElement, createFilmsTemplate());

const siteFilms = siteMainElement.querySelector(`.films`);

render(siteFilms, createFilmsListTemplate());

const siteFilmsList = siteFilms.querySelector(`.films-list`);
const siteFilmsListContainer = siteFilmsList.querySelector(`.films-list__container`);

let showingFilmCardsCount = NUMBER_OF_CARDS;

renderCardsAmount(allFilms, siteFilmsListContainer);

// for (let i = 0; i < NUMBER_OF_CARDS; i++) {
//   render(siteFilmsListContainer, createFilmCardTemplate());
// }

render(siteFilmsList, createShowMoreButtonTemplate());

render(siteFilms, createFilmsExtraContainersTemplate());

const filmsExtraContainers = siteMainElement.querySelectorAll(`.films-list--extra .films-list__container`);

// filmsExtraContainers.forEach((item) => {
//   for (let i = 0; i < NUMBER_OF_EXTRA_CONTAINERS; i++) {
//     render(item, createFilmCardTemplate());
//   }
// });

// render(siteBody, createFilmPopupTemplate());
