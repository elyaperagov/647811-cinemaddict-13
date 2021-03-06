import AbstractView from "./abstract.js";
import {getHours, getMinutes} from '../helpers/statistics-helpers.js';
import {getShortDescription} from '../helpers/common.js';

const createFilmCardTemplate = (filmCard) => {
  const {title, description, genre, year, rating, duration, isInWatchlist, isWatched, isFavorite, comments, poster} = filmCard;

  const releaseYear = year.getUTCFullYear();

  const isInWatchListClassName = isInWatchlist
    ? `film-card__controls-item--add-to-watchlist film-card__controls-item--active`
    : `film-card__controls-item--add-to-watchlist`;

  const isWatchedClassName = isWatched
    ? `film-card__controls-item--mark-as-watched  film-card__controls-item--active`
    : `film-card__controls-item--mark-as-watched`;

  const isfavoriteClassName = isFavorite
    ? `film-card__controls-item--favorite  film-card__controls-item--active`
    : `film-card__controls-item--favorite`;

  return `<article class="film-card">
    <h3 class="film-card__title">${title}</h3>
    <p class="film-card__rating">${rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${releaseYear}</span>
      <span class="film-card__duration">${getHours(duration)}h ${getMinutes(duration)}m</span>
      <span class="film-card__genre">${genre[0]}</span>
    </p>
    <img src="${poster}" alt="" class="film-card__poster">
    <p class="film-card__description">${getShortDescription(description)}</p>
    <a class="film-card__comments">${comments.length} comments</a>
    <div class="film-card__controls">
      <button class="film-card__controls-item button ${isInWatchListClassName}" type="button">Add to watchlist</button>
      <button class="film-card__controls-item button ${isWatchedClassName}" type="button">Mark as watched</button>
      <button class="film-card__controls-item button ${isfavoriteClassName}" type="button">Mark as favorite</button>
    </div>
  </article>`;
};


export default class FilmCard extends AbstractView {
  constructor(filmCard) {
    super();
    this._filmCard = filmCard;
    this._popupClickHandler = this._popupClickHandler.bind(this);
    this._watchListClickHandler = this._watchListClickHandler.bind(this);
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
  }

  getTemplate() {
    return createFilmCardTemplate(this._filmCard);
  }

  _popupClickHandler(evt) {
    evt.preventDefault();
    this._callback.popupClick();
  }

  _watchListClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchListClick();
  }

  _watchedClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchedClick();
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  setPosterClickHandler(callback) {
    this._callback.popupClick = callback;
    this.getElement().querySelector(`.film-card__poster`)
      .addEventListener(`click`, this._popupClickHandler);
  }

  setTitleClickHandler(callback) {
    this._callback.popupClick = callback;
    this.getElement().querySelector(`.film-card__title`)
      .addEventListener(`click`, this._popupClickHandler);
  }

  setCommentsClickHandler(callback) {
    this._callback.popupClick = callback;
    this.getElement().querySelector(`.film-card__comments`)
      .addEventListener(`click`, this._popupClickHandler);
  }

  setWatchListClickHandler(callback) {
    this._callback.watchListClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`).addEventListener(`click`, this._watchListClickHandler);
  }

  setWatchedClickHandler(callback) {
    this._callback.watchedClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`).addEventListener(`click`, this._watchedClickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--favorite`).addEventListener(`click`, this._favoriteClickHandler);
  }
}
