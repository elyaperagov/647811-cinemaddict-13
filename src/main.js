import Profile from "./view/profile.js";
import {generateCard} from './mock/cards.js';
import MoviesList from "./presenter/movies-list.js";
import MoviesModel from "./model/movies.js";
import {generateComment} from "./mock/cards";
import CommentsModel from "./model/comments-model.js";
import FilterModel from "./model/filter.js";
import FilterPresenter from "./presenter/filter.js";
import {RenderPosition, renderElement} from './helpers/render.js';

const FILM_CARDS_QUANTITY = 15;
const COMMENTS_QUANTITY = 50;

const commentsCollection = new Array(COMMENTS_QUANTITY).fill([]).map((arr, index) => {
  const filmComments = new Array(index + 1).fill().map(generateComment);
  return filmComments;
}) /* СПРОСИТЬ */

const generatedCards = new Array(FILM_CARDS_QUANTITY).fill().map(generateCard);
const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

const moviesModel = new MoviesModel();
const filterModel = new FilterModel();
const commentsModel = new CommentsModel();

moviesModel.setFilms(generatedCards);
commentsModel.setComments(commentsCollection);

// const favorCount = generatedCards.filter((card) => card.isFavorite).length;
// const watchedCount = generatedCards.filter((card) => card.isWatched).length;
// const isInWatchListCount = generatedCards.filter((card) => card.isInWatchList).length;

renderElement(siteHeaderElement, new Profile(), RenderPosition.BEFOREEND);

const moviesPresenter = new MoviesList(siteMainElement, moviesModel, filterModel, commentsModel);
const filterPresenter = new FilterPresenter(siteMainElement, filterModel, moviesModel);

filterPresenter.init();
moviesPresenter.render();
