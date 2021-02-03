import FilmCard from "../view/film-card.js";
import PopUpFilmCard from "../view/popup.js";
import {UserAction, UpdateType} from "../constants.js";
import {RenderPosition, renderElement, disablePopup, shake, replace, remove} from '../helpers/render.js';

const Mode = {
  DEFAULT: `DEFAULT`,
  POPUP: `POPUP`
};

const siteBody = document.querySelector(`body`);

export default class Movie {
  constructor(movieContainer, changeData, changeMode) {
    this._movieContainer = movieContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._filmCardComponent = null;
    this._popUpFilmCardComponent = null;
    this._mode = Mode.DEFAULT;

    this._popupClickHandler = this._popupClickHandler.bind(this);
    this._handleWatchListClick = this._handleWatchListClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleClosePopupClick = this._handleClosePopupClick.bind(this);
    this._deleteCommentClick = this._deleteCommentClick.bind(this);
    this._addCommentClick = this._addCommentClick.bind(this);
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  init(film) {
    this._film = film;

    const prevFilmComponent = this._filmCardComponent;
    const prevPopupComponent = this._popUpFilmCardComponent;
    this._popUpFilmCardComponent = new PopUpFilmCard(film);
    this._filmCardComponent = new FilmCard(film);

    this._filmCardComponent.setWatchListClickHandler(this._handleWatchListClick);
    this._filmCardComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._filmCardComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._filmCardComponent.setPosterClickHandler(this._popupClickHandler);
    this._filmCardComponent.setTitleClickHandler(this._popupClickHandler);
    this._filmCardComponent.setCommentsClickHandler(this._popupClickHandler);

    this._popUpFilmCardComponent.setAddCommentHandler(this._addCommentClick);
    this._popUpFilmCardComponent.setDeleteCommentHandler(this._deleteCommentClick);
    this._popUpFilmCardComponent.setClosePopupClickHandler(this._handleClosePopupClick);
    this._popUpFilmCardComponent.setWatchListClickHandler(this._handleWatchListClick);
    this._popUpFilmCardComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._popUpFilmCardComponent.setWatchedClickHandler(this._handleWatchedClick);

    if (prevFilmComponent === null || prevPopupComponent === null) {
      renderElement(this._movieContainer, this._filmCardComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (siteBody.contains(prevFilmComponent.getElement())) {
      replace(this._filmCardComponent, prevFilmComponent);
    }

    if (siteBody.contains(prevPopupComponent.getElement())) {
      const currentScroll = prevPopupComponent._scrollTop;
      replace(this._popUpFilmCardComponent, prevPopupComponent);
      this._popUpFilmCardComponent.getElement().scrollTo(0, currentScroll);
    }

    remove(prevPopupComponent);
    remove(prevFilmComponent);
  }

  destroy() {
    remove(this._filmCardComponent);
    remove(this._popUpFilmCardComponent);
    document.removeEventListener(`keydown`, this._addCommentClick);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _closePopup() {
    this._popUpFilmCardComponent.getElement().remove();
    siteBody.classList.remove(`hide-overflow`);
    this._popUpFilmCardComponent.getElement().querySelector(`.film-details__comment-input`).value = ``;
    this._mode = Mode.DEFAULT;
    document.removeEventListener(`keydown`, this._addCommentClick);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _onEscKeyDown(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._closePopup();
    }
  }

  _popupClickHandler() {
    this._openPopup();
  }

  openModal(film, prevElement, callback) {
    this._film = film;
    this._popUpFilmCardComponent = new PopUpFilmCard(film);
    callback(this._popUpFilmCardComponent, this._addCommentClick, this._onEscKeyDown);

    document.removeEventListener(`keydown`, prevElement[1]);
    document.removeEventListener(`keydown`, prevElement[2]);

    this._popUpFilmCardComponent.setAddCommentHandler(this._addCommentClick);
    this._popUpFilmCardComponent.setDeleteCommentHandler(this._deleteCommentClick);
    this._popUpFilmCardComponent.setClosePopupClickHandler(this._handleClosePopupClick);
    this._popUpFilmCardComponent.setWatchListClickHandler(this._handleWatchListClick);
    this._popUpFilmCardComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._popUpFilmCardComponent.setWatchedClickHandler(this._handleWatchedClick);

    this._openPopup(prevElement[0]);
  }

  _openPopup(prevElement) {
    if (prevElement && siteBody.contains(prevElement.getElement())) {
      const currentScroll = prevElement._scrollTop;
      replace(this._popUpFilmCardComponent, prevElement);
      this._popUpFilmCardComponent.getElement().scrollTo(0, currentScroll);

    } else {
      renderElement(siteBody, this._popUpFilmCardComponent, RenderPosition.BEFOREEND);
    }
    siteBody.classList.add(`hide-overflow`);
    document.addEventListener(`keydown`, this._addCommentClick);
    document.addEventListener(`keydown`, this._onEscKeyDown);
    this._changeMode();
    this._mode = Mode.POPUP;
  }

  _handleClosePopupClick() {
    this._closePopup();
  }

  _deleteCommentClick(commentId) {
    this._changeData(
        UserAction.DELETE_COMMENT,
        UpdateType.PATCH,
        Object.assign({}, {id: this._film.id}, {comment: commentId, isPopup: this._mode === `POPUP`})
    );
  }

  _addCommentClick(evt) {
    this._addCommentClickPromise(evt)
    .catch(() => {
      disablePopup(false, this._popUpFilmCardComponent.getElement().querySelector(`form`));
      shake(this._popUpFilmCardComponent.getElement().querySelector(`form`));
    });
  }

  _addCommentClickPromise(evt) {
    return new Promise((resolve, reject) => {
      const message = this._popUpFilmCardComponent.getElement().querySelector(`.film-details__comment-input`);
      const emoji = this._popUpFilmCardComponent.getElement().querySelector(`.film-details__emoji-item[checked]`);
      if (evt.key === `Enter` && evt.metaKey || evt.ctrlKey && evt.key === `Enter`) {
        disablePopup(true, this._popUpFilmCardComponent.getElement().querySelector(`form`));
        if (message.value && emoji) {
          this._changeData(
              UserAction.ADD_COMMENT,
              UpdateType.PATCH,
              Object.assign({}, {id: this._film.id}, {comment: {emoji: emoji.value, message: message.value, date: new Date()}, isPopup: this._mode === `POPUP`})
          );
          resolve();
        } else {
          reject();
        }
      }
    });
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._closePopup();
    }
  }

  _handleWatchListClick() {
    this._changeData(
        UserAction.UPDATE_FILM,
        UpdateType.MINOR,
        Object.assign(
            {},
            this._film,
            {
              isInWatchlist: !this._film.isInWatchlist,
              isPopup: this._mode === `POPUP`,
            }
        )
    );
  }

  _handleFavoriteClick() {
    this._changeData(
        UserAction.UPDATE_FILM,
        UpdateType.MINOR,
        Object.assign(
            {},
            this._film,
            {
              isFavorite: !this._film.isFavorite,
              isPopup: this._mode === `POPUP`
            }
        )
    );
  }

  _handleWatchedClick() {
    this._changeData(
        UserAction.UPDATE_FILM,
        UpdateType.MINOR,
        Object.assign(
            {},
            this._film,
            {
              isWatched: !this._film.isWatched,
              isPopup: this._mode === `POPUP`
            }
        )
    );
  }
}
