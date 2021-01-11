import Smart from "./smart.js";
import {EMOJIES} from "../constants.js";


const createPopupCommentsTemplate = (commentaries) => {
  const commentsList = commentaries.map((comment) => createCommentsTemplate(comment)).join(``);
  return commentsList;
};

const createCommentsTemplate = (comment) => {
  const {id, message, emoji, author, date} = comment;
  return `<li class="film-details__comment" data-comment-id="${id}">
  <span class="film-details__comment-${emoji}">
    <img src="./images/emoji/${emoji}.png" width="55" height="55" alt="emoji-${emoji}">
  </span>
  <div>
    <p class="film-details__comment-text">${message}</p>
    <p class="film-details__comment-info">
      <span class="film-details__comment-author">${author}</span>
      <span class="film-details__comment-day">${date}</span>
      <button class="film-details__comment-delete">Delete</button>
    </p>
  </div>
</li>`;
};

export const createFilmPopupTemplate = (data) => {
  let {title, age, description, genre, year, rating, actors, duration, isInWatchList, isWatched, comments, isFavorite, emojies, poster, writers, director, alternativeTitle, releaseCountry, newComment} = data;

  const isInWatchListButton = isInWatchList ? `checked` : ``;
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
                <td class="film-details__cell">${year}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${duration}</td>
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
    // this.setFormSubmitHandler(this._callback.formSubmit);
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
    this.setClosePopupClickHandler(this._callback.closePopupClick);
    this.setFavoriteClickHandler(this._callback.favoriteClick);
    this.setWatchListClickHandler(this._callback.watchListClick);
    this.setWatchedClickHandler(this._callback.watchedClick);
    this.setDeleteCommentHandler(this._callback.deleteCommentClick);
    this.setAddCommentHandler(this._callback.addCommentClick);
    this.getElement().querySelector(`.film-details__emoji-list`).addEventListener(`change`, this._emojiChangeHandler);
  }

  _watchListClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchListClick();
    this.updateData({
      isInWatchList: !this._data.isInWatchList
    });
  }

  _watchedClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchedClick();
    this.updateData({
      isWatched: !this._data.isWatched
    });
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
    this.updateData({
      isFavorite: !this._data.isFavorite
    });
  }

  _closePopupClickHandler(evt) {
    evt.preventDefault();
    this._callback.closePopupClick(PopUpFilmCard.parseDataToFilm(this._data));
    // this._callback.formSubmit(TaskEdit.parseDataToTask(this._data));
  }

  _deleteCommentHandler(evt) {
    evt.preventDefault();
    const commentId = evt.target.closest(`.film-details__comment`).dataset.commentId;
    this._callback.deleteCommentClick(commentId);
  }

  // _textInputHandler(evt) {
  //   evt.preventDefault();
  //   this.updateData({
  //     newComment: evt.target.value
  //   });
  // }

  _textInputHandler(evt) {
    evt.preventDefault();
    this._callback.addCommentClick(evt);
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
          isInWatchList: film.isInWatchList,
          isWatched: film.isWatched,
          isFavorite: film.isFavorite,
        }
    );
  }

  static parseDataToFilm(film) {
    film = Object.assign({}, film);

    return film;
  }
}
