import FilmCard from "../view/film-card.js";
import PopUpFilmCard from "../view/popup.js";
import {RenderPosition, renderElement, replace} from '../helpers/render.js';

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
  }

  _getCardData(film) {
    this._film = film;
  }

  init(film) {
    this._getCardData(film);

    this._filmCardComponent = new FilmCard(film);
    this._popUpFilmCardComponent = new PopUpFilmCard(film);

    this._filmCardComponent.setWatchListClickHandler(this._handleWatchListClick);
    this._filmCardComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._filmCardComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._filmCardComponent.setPosterClickHandler(this._popupClickHandler);
    this._filmCardComponent.setTitleClickHandler(this._popupClickHandler);
    this._filmCardComponent.setCommentsClickHandler(this._popupClickHandler);
    this._popUpFilmCardComponent.setClosePopupClickHandler(this._handleClosePopupClick);

    renderElement(this._movieContainer, this._filmCardComponent, RenderPosition.BEFOREEND);
  }

  update(film) {
    const prevFilmComponent = this._filmCardComponent;
    const prevPopupComponent = this._popUpFilmCardComponent;

    this._getCardData(film);
    if (this._mode === Mode.DEFAULT) {
      replace(this._filmCardComponent, prevFilmComponent);
    }
    if (this._mode === Mode.POPUP) {
      replace(this._popUpFilmCardComponent, prevPopupComponent);
    }
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

  _openPopup() {
    renderElement(siteBody, this._popUpFilmCardComponent, RenderPosition.BEFOREEND);
    siteBody.classList.add(`hide-overflow`);
    document.addEventListener(`keydown`, this._handleClosePopupClick);
    this._popUpFilmCardComponent.setClosePopupClickHandler(this._handleClosePopupClick);
    this._popUpFilmCardComponent.setWatchListClickHandler(this._handleWatchListClick);
    this._popUpFilmCardComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._popUpFilmCardComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._changeMode();
    this._mode = Mode.POPUP;
  }

  _popupClickHandler() {
    this._openPopup();
  }

  _handleClosePopupClick() {
    this._closePopup();
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._closePopup();
    }
  }

  _handleWatchListClick() {
    this._changeData(
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
