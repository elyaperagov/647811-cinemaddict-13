import Profile from "./view/profile.js";
import Navigation from "./view/navigation.js";
import {generateCard} from './mock/cards.js';
import MoviesList from "./presenter/movies-list.js";
import {RenderPosition, renderElement} from './helpers/render.js';

const FILM_CARDS_QUANTITY = 15;

const generatedCards = new Array(FILM_CARDS_QUANTITY).fill().map(generateCard);
const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

const favorCount = generatedCards.filter((card) => card.isFavorite).length;
const watchedCount = generatedCards.filter((card) => card.isWatched).length;
const isInWatchListCount = generatedCards.filter((card) => card.isInWatchList).length;

renderElement(siteHeaderElement, new Profile(), RenderPosition.BEFOREEND);
renderElement(siteMainElement, new Navigation(isInWatchListCount, watchedCount, favorCount), RenderPosition.BEFOREEND);

const moviesPresenter = new MoviesList(siteMainElement);

moviesPresenter.render(generatedCards);
