import {createUserProfileTemplate} from "./view/profile.js";
import {createNavigationTemplate} from "./view/navigation.js";
import {createSortTemplate} from "./view/sort.js";
import {createFilmsTemplate} from "./view/films.js";
import {createFilmsListTemplate} from "./view/films-list.js";
import {createFilmCardTemplate} from "./view/film-card.js";
import {createShowMoreButtonTemplate} from "./view/show-more.js";
import {createFilmsExtraContainersTemplate} from "./view/films-extra.js";
import {createFilmPopupTemplate} from "./view/popup.js";
import {generateCard, generateCards} from './mock/cards.js';

const CARDS_IN_ROW = 5;
const NUMBER_OF_EXTRA_CONTAINERS = 2;
const FILM_CARDS_QUANTITY = 15;

let showingFilmCardsCount = CARDS_IN_ROW;

const allFilms = generateCards(FILM_CARDS_QUANTITY);

const generatedCards = new Array(FILM_CARDS_QUANTITY).fill().map(generateCard);

const renderCards = (cards, container) => {
  let cardsRow = cards.slice(0, showingFilmCardsCount);
  for (let i = 0; i < cardsRow.length; i++) {
    render(container, createFilmCardTemplate(cardsRow[i]));
  }
};

const renderPopup = (card, container) => {
  render(container, createFilmPopupTemplate(card));
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

renderCards(allFilms, siteFilmsListContainer);

// for (let i = 0; i < NUMBER_OF_CARDS; i++) {
//   render(siteFilmsListContainer, createFilmCardTemplate());
// }

render(siteFilmsList, createShowMoreButtonTemplate());

let loadMoreButton = document.querySelector(`.films-list__show-more`);

const showMoreCards = () => {
  allFilms.slice(showingFilmCardsCount, showingFilmCardsCount + CARDS_IN_ROW).forEach((item) => {
    render(siteFilmsListContainer, createFilmCardTemplate(item));
  });

  showingFilmCardsCount += CARDS_IN_ROW;

  if (showingFilmCardsCount > allFilms.length) {
    loadMoreButton.remove();
  }
};

loadMoreButton.addEventListener(`click`, showMoreCards);

render(siteFilms, createFilmsExtraContainersTemplate());

const filmsExtraContainers = siteMainElement.querySelectorAll(`.films-list--extra .films-list__container`);

// filmsExtraContainers.forEach((item) => {
//   for (let i = 0; i < NUMBER_OF_EXTRA_CONTAINERS; i++) {
//     render(item, createFilmCardTemplate(generateCards(2)));
//   }
// });

for (let filmListExtra of filmsExtraContainers) {
  for (let i = 0; i < NUMBER_OF_EXTRA_CONTAINERS; i++) {
    render(filmListExtra, createFilmCardTemplate(generatedCards[i]));
  }
}

renderPopup(allFilms[0], siteBody);
