import Smart from "./smart.js";
import {EMOJIES} from "../constants.js";
import he from "he";
import dayjs from "dayjs";
import {disableDeleteButton} from '../helpers/render.js';
import {getHours, getMinutes} from '../helpers/statistics-helpers.js';

const createPopupCommentsTemplate = (commentaries) => {
  const commentsList = commentaries.map((comment) => createCommentsTemplate(comment)).join(``);
  return commentsList;
};

const createCommentsTemplate = (message) => {
  const {id, comment, emotion, author, date} = message;
  return `<li class="film-details__comment" data-comment-id="${id}">
  <span class="film-details__comment-${emotion}">
    <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">
  </span>
  <div>
    <p class="film-details__comment-text">${he.encode(comment)}</p>
    <p class="film-details__comment-info">
      <span class="film-details__comment-author">${author}</span>
      <span class="film-details__comment-day">${dayjs(date).format(`DD/MM/YYYY HH:mm`) }</span>
      <button class="film-details__comment-delete">Delete</button>
    </p>
  </div>
</li>`;
};

export const createFilmPopupTemplate = (data) => {
  const {title, age, description, genre, year, rating, actors, duration, isInWatchlist, isWatched, comments, isFavorite, emojies, poster, writers, director, alternativeTitle, releaseCountry, newComment} = data;

  const isInWatchListButton = isInWatchlist ? `checked` : ``;
  const isWatchedButton = isWatched ? `checked` : ``;
  const isFavoriteButton = isFavorite ? `checked` : ``;

  const generateEmoji = (currentEmoji) => {
    return EMOJIES.map((emoji) => {
      return `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emoji}" value="${emoji}" ${currentEmoji === emoji ? `checked` : ``}>
      <label class="film-details__emoji-label" for="emoji-${emoji}">
        <img src="./images/emoji/${emoji}.png" width="30" height="30" alt="${emoji}">
      </label>`;
    }).join(``);
  };

  const generateEmojiesTemplate = generateEmoji(emojies);

  return `<section class="film-details">
    <form class="film-details__inner" action="" method="get">
      <div class="film-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src="${poster}" alt="">

            <p class="film-details__age">${age}+</p>
          </div>

          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${title}</h3>
                <p class="film-details__title-original">Original: ${alternativeTitle}</p>
              </div>

              <div class="film-details__rating">
                <p class="film-details__total-rating">${rating}</p>
              </div>
            </div>

            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">${director}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td class="film-details__cell">${writers}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">${actors}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">${dayjs(year).format(`DD MMMM YYYY`)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${getHours(duration)}h ${getMinutes(duration)}m</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">${releaseCountry}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Genres</td>
                <td class="film-details__cell">
                  <span class="film-details__genre">${genre}</span>
                  </td>
              </tr>
            </table>

            <p class="film-details__film-description">
              ${description}
            </p>
          </div>
        </div>

        <section class="film-details__controls">
          <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${isInWatchListButton}>
          <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

          <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${isWatchedButton}>
          <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

          <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${isFavoriteButton}>
          <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
        </section>
      </div>

      <div class="film-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

          <ul class="film-details__comments-list">
            ${createPopupCommentsTemplate(comments)}
          </ul>

          <div class="film-details__new-comment">
            <div class="film-details__add-emoji-label">${emojies ? `<img src="images/emoji/${emojies}.png" width="55" height="55" alt="emoji-${emojies}">` : ``}</img></div>

            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${newComment ? `${newComment}` : ``}</textarea>

            </label>

            <div class="film-details__emoji-list">
              ${generateEmojiesTemplate}
            </div>
          </div>
        </section>
      </div>
    </form>
  </section>`;
};


export default class PopUpFilmCard extends Smart {
  constructor(filmCard) {
    super();
    this._filmCard = filmCard;
    this._data = PopUpFilmCard.parseFilmToData(filmCard);
    this._closePopupClickHandler = this._closePopupClickHandler.bind(this);
    this._watchListClickHandler = this._watchListClickHandler.bind(this);
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._emojiChangeHandler = this._emojiChangeHandler.bind(this);
    this._textInputHandler = this._textInputHandler.bind(this);
    this._deleteCommentHandler = this._deleteCommentHandler.bind(this);
    this._setInnerHandlers();
  }

  restoreHandlers() {
    this._setInnerHandlers();
  }

  getTemplate() {
    return createFilmPopupTemplate(this._data);
  }

  _emojiChangeHandler(evt) {
    evt.preventDefault();
    this.updateData({
      emojies: evt.target.value
    });
  }

  _setInnerHandlers() {
    this.getElement().querySelector(`.film-details__emoji-list`).addEventListener(`change`, this._emojiChangeHandler);
  }

  _watchListClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchListClick();
    this.updateData({
      isInWatchlist: !this._data.isInWatchlist
    }, true);
    this._scrollTop = this.getElement().scrollTop;
  }

  _watchedClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchedClick();
    this.updateData({
      isWatched: !this._data.isWatched
    }, true);
    this._scrollTop = this.getElement().scrollTop;
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
    this.updateData({
      isFavorite: !this._data.isFavorite
    }, true);
    this._scrollTop = this.getElement().scrollTop;
  }

  _closePopupClickHandler(evt) {
    evt.preventDefault();
    this._callback.closePopupClick(PopUpFilmCard.parseDataToFilm(this._data));
  }

  _deleteCommentHandler(evt) {
    const deleteButton = evt.target;
    evt.preventDefault();
    disableDeleteButton(deleteButton, true);
    const commentId = evt.target.closest(`.film-details__comment`).dataset.commentId;
    this._callback.deleteCommentClick(commentId);
    this._scrollTop = this.getElement().scrollTop;
  }

  _textInputHandler(evt) {
    evt.preventDefault();
    this.updateData({
      newComment: evt.target.value
    }, true);
    this._callback.addCommentClick(evt);
    this._scrollTop = this.getElement().scrollTop;
  }

  setWatchListClickHandler(callback) {
    this._callback.watchListClick = callback;
    this.getElement().querySelector(`.film-details__control-label--watchlist`).addEventListener(`click`, this._watchListClickHandler);
  }

  setWatchedClickHandler(callback) {
    this._callback.watchedClick = callback;
    this.getElement().querySelector(`.film-details__control-label--watched`).addEventListener(`click`, this._watchedClickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector(`.film-details__control-label--favorite`).addEventListener(`click`, this._favoriteClickHandler);
  }

  setClosePopupClickHandler(callback) {
    this._callback.closePopupClick = callback;
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, this._closePopupClickHandler);
  }

  setDeleteCommentHandler(callback) {
    this._callback.deleteCommentClick = callback;
    const comments = this.getElement().querySelectorAll(`.film-details__comment-delete`);
    comments.forEach((element) => {
      element.addEventListener(`click`, this._deleteCommentHandler);
    });
  }

  setAddCommentHandler(callback) {
    this._callback.addCommentClick = callback;
    this.getElement().querySelector(`.film-details__comment-input`).addEventListener(`input`, this._textInputHandler);
  }

  static parseFilmToData(film) {
    return Object.assign(
        {},
        film,
        {
          isInWatchlist: film.isInWatchlist,
          isWatched: film.isWatched,
          isFavorite: film.isFavorite
        }
    );
  }

  static parseDataToFilm(film) {
    film = Object.assign({}, film);

    return film;
  }
}
