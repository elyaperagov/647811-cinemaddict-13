import FilmCard from "../view/film-card.js";
import PopUpFilmCard from "../view/popup.js";
import {UserAction, UpdateType} from "../constants.js";
import {RenderPosition, renderElement, replace, remove} from '../helpers/render.js';
import {getRandomInteger, getMeRandomElements} from '../helpers/common.js';
import CommentsView from '../view/comments-view.js';
import {COMMENTS_QUANTITY} from '../constants.js';

const Mode = {
  DEFAULT: `DEFAULT`,
  POPUP: `POPUP`
};

const siteBody = document.querySelector(`body`);

export default class Movie {
  constructor(movieContainer, changeData, changeMode, commentsModel) {
    this._movieContainer = movieContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;
    this._commentsModel = commentsModel;

    this._filmCardComponent = null;
    this._popUpFilmCardComponent = null;
    this._mode = Mode.DEFAULT;

    this._popupClickHandler = this._popupClickHandler.bind(this);
    this._handleWatchListClick = this._handleWatchListClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleClosePopupClick = this._handleClosePopupClick.bind(this);
    this._deleteCommentClick = this._deleteCommentClick.bind(this);
  }

  init(film) {
    this._film = film;

    const prevFilmComponent = this._filmCardComponent;
    const prevPopupComponent = this._popUpFilmCardComponent;

    const commentsCollection = getMeRandomElements(this._commentsModel, getRandomInteger(0, COMMENTS_QUANTITY));

    this._filmCardComponent = new FilmCard(film, commentsCollection);
    this._popUpFilmCardComponent = new PopUpFilmCard(film, commentsCollection);


    this._filmCardComponent.setWatchListClickHandler(this._handleWatchListClick);
    this._filmCardComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._filmCardComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._filmCardComponent.setPosterClickHandler(this._popupClickHandler);
    this._filmCardComponent.setTitleClickHandler(this._popupClickHandler);
    this._filmCardComponent.setCommentsClickHandler(this._popupClickHandler);

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
      replace(this._popUpFilmCardComponent, prevPopupComponent);
    }

    remove(prevPopupComponent);
    remove(prevFilmComponent);
  }

  destroy() {
    remove(this._filmCardComponent);
    remove(this._popUpFilmCardComponent);
  }

  _closePopup() {
    this._popUpFilmCardComponent.getElement().remove();
    siteBody.classList.remove(`hide-overflow`);
    this._mode = Mode.DEFAULT;
  }

  _onEscKeyDown(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._closePopup();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }

  // _renderComment() {
  //   const commentsView = new CommentsView();
  //   // commentsView.setDeleteCommentHandler(this._callback.deleteComment);
  //   console.log(commentsView);
  //   renderElement(this._popUpFilmCardComponent.getElement().querySelector(`.film-details__comments-list`), commentsView, RenderPosition.BEFOREEND);
  // }

  _openPopup() {
    renderElement(siteBody, this._popUpFilmCardComponent, RenderPosition.BEFOREEND);
    siteBody.classList.add(`hide-overflow`);
    document.addEventListener(`keydown`, (evt) => {
      this._onEscKeyDown(evt);
    });
    this._changeMode();
    this._mode = Mode.POPUP;
  }

  _popupClickHandler() {
    this._openPopup();
  }

  _handleClosePopupClick() {
    this._closePopup();
  }

  _deleteCommentClick(commentId) {
    this._changeData(
      UserAction.DELETE_COMMENT,
      UpdateType.PATCH,
      Object.assign({}, this._film, {comments: commentId})
    );
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._closePopup();
    }
  }

  _handleWatchListClick() {
    this._changeData(
        UserAction.UPDATE_FILM,
        UpdateType.PATCH,
        Object.assign(
            {},
            this._film,
            {
              isInWatchList: !this._film.isInWatchList
            }
        )
    );
  }

  _handleFavoriteClick() {
    this._changeData(
        UserAction.UPDATE_FILM,
        UpdateType.PATCH,
        Object.assign(
            {},
            this._film,
            {
              isFavorite: !this._film.isFavorite,
            }
        )
    );
  }

  _handleWatchedClick() {
    this._changeData(
        UserAction.UPDATE_FILM,
        UpdateType.PATCH,
        Object.assign(
            {},
            this._film,
            {
              isWatched: !this._film.isWatched
            }
        )
    );
  }
}
