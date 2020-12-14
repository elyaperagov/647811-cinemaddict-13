import FilmCard from "../view/film-card.js";
import PopUpFilmCard from "../view/popup.js";
import {RenderPosition, renderElement, replace} from '../helpers/render.js';

const Mode = {
  DEFAULT: `DEFAULT`,
  EDITING: `EDITING`
};

const siteBody = document.querySelector(`body`);

export default class Movie {
  constructor(movieContainer, changeData, changeMode) {
    // debugger;
    this._movieContainer = movieContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._filmCardComponent = null;
    this._popUpFilmCardComponent = null;
    this._mode = Mode.DEFAULT;

    this._popupClickHandler = this._popupClickHandler.bind(this);
    this._closePopupClickHandler = this._closePopupClickHandler.bind(this);

    this._handleWatchListClick = this._handleWatchListClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
  }

  init(film) {
    this._film = film;

    const prevFilmComponent = this._filmCardComponent;
    const prevPopupComponent = this._popUpFilmCardComponent;

    this._filmCardComponent = new FilmCard(film);
    this._popUpFilmCardComponent = new PopUpFilmCard(film);

    // const filmslistContainer = container.getElement().querySelector(`.films-list__container`); // сделал временно
    // const filmsElement = this._filmsComponent.getElement();
    // const filmsListElement = filmsElement.querySelector(`.films-list`);
    // const filmsListContainerElement = this._filmListContainerComponent.getElement();

    // if (prevFilmComponent && prevPopupComponent) {
    //   renderElement(filmslistContainer, this._filmCardComponent, RenderPosition.BEFOREEND);
    //   return;
    // }

    this._filmCardComponent.setWatchListClickHandler(this._handleWatchListClick);
    this._filmCardComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._filmCardComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._filmCardComponent.setPosterClickHandler(this._popupClickHandler);
    this._filmCardComponent.setTitleClickHandler(this._popupClickHandler);
    this._filmCardComponent.setCommentsClickHandler(this._popupClickHandler);


    if (prevFilmComponent && prevPopupComponent && this._mode === Mode.DEFAULT) {
      replace(this._filmCardComponent, prevFilmComponent);
      replace(this._popUpFilmCardComponent, prevPopupComponent);
    } else {
      renderElement(this._movieContainer, this._filmCardComponent, RenderPosition.BEFOREEND);
    }

    // renderElement(this._movieContainer, this._filmCardComponent, RenderPosition.BEFOREEND);

    // if (this._filmCardComponent.getElement().contains(prevFilmComponent.getElement())) {
    //   replace(this._filmCardComponent, prevFilmComponent);
    // }
    //
    // if (this._filmCardComponent.getElement().contains(prevPopupComponent.getElement())) {
    //   replace(this._filmCardComponent, prevPopupComponent);
    // }
    // remove(prevFilmComponent);
    // remove(prevPopupComponent);
  }

  _closePopup() {
    this._popUpFilmCardComponent.getElement().remove();
    siteBody.classList.remove(`hide-overflow`);
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
    const closePopupBtn = this._popUpFilmCardComponent.getElement().querySelector(`.film-details__close-btn`);
    siteBody.classList.add(`hide-overflow`);
    closePopupBtn.addEventListener(`click`, this._closePopupClickHandler);
    document.addEventListener(`keydown`, this._closePopupClickHandler);
  }

  _popupClickHandler() {
    this._openPopup();
  }

  _closePopupClickHandler() {
    this._closePopup();
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._removeDetails();
    }
  }

  _removeDetails() {
    this._popUpFilmCardComponent.reset();

    remove(this._popUpFilmCardComponent);
    this._mode = Mode.DEFAULT;
  }

  _renderDetails() {
    this._changeMode();
    debugger;
    render(siteBody, this._popUpFilmCardComponent, RenderPosition.BEFOREEND);
    this._mode = Mode.DETAILS;
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


  // closePopupBtn.addEventListener(`click`, (() => {
  //   this._closePopup();
  //   })
  // );
  //
  // closePopupBtn.addEventListener(`click`, this._closePopup);  // в чём разница??


}
