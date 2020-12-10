import FilmCard from "../view/film-card.js";
import PopUpFilmCard from "../view/popup.js";
import FilmsList from "../view/films-list.js";
import {RenderPosition, renderElement, replace} from '../helpers/render.js';

const siteBody = document.querySelector(`body`);

export default class Movie {
  constructor(filmsContainer, changeData) {
    // debugger;
    this._filmsContainer = filmsContainer;
    this._changeData = changeData;

    this._filmCardComponent = null;
    this._popUpFilmCardComponent = null;

    this._popupClickHandler = this._popupClickHandler.bind(this);
    this._closePopupClickHandler = this._closePopupClickHandler.bind(this);

    this._handleWatchListClick = this._handleWatchListClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
  }

  init(container, film) {
    this._film = film;

    const prevFilmComponent = this._filmCardComponent;
    const prevPopupComponent = this._popUpFilmCardComponent;

    this._filmsListComponent = new FilmsList();
    this._filmCardComponent = new FilmCard(film);
    this._popUpFilmCardComponent = new PopUpFilmCard(film);

    const filmslistContainer = container.getElement().querySelector(`.films-list__container`); // сделал временно

    // if (prevFilmComponent === null || prevPopupComponent === null) {
    //   renderElement(filmslistContainer, this._filmCardComponent, RenderPosition.BEFOREEND);
    // } else {
    //   replace(this._filmCardComponent, prevFilmComponent);
    //   replace(this._popUpFilmCardComponent, prevPopupComponent);
    // }   почему эта конструк4ция не работает?

    this._filmCardComponent.setWatchListClickHandler(this._handleWatchListClick);
    this._filmCardComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._filmCardComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._filmCardComponent.setPosterClickHandler(this._popupClickHandler);
    this._filmCardComponent.setTitleClickHandler(this._popupClickHandler);
    this._filmCardComponent.setCommentsClickHandler(this._popupClickHandler);

    renderElement(filmslistContainer, this._filmCardComponent, RenderPosition.BEFOREEND);

    if (prevFilmComponent && prevPopupComponent) {
      replace(this._filmCardComponent, prevFilmComponent);
      replace(this._popUpFilmCardComponent, prevPopupComponent);
    } else {
      renderElement(filmslistContainer, this._filmCardComponent, RenderPosition.BEFOREEND);
    }

    // if (this._filmsListComponent.getElement().contains(prevFilmComponent.getElement())) {
    //   replace(this._filmCardComponent, prevFilmComponent);
    // }
    //
    // if (this._filmsListComponent.getElement().contains(prevPopupComponent.getElement())) {
    //   replace(this._filmCardComponent, prevPopupComponent);
    // }
    // remove(prevFilmComponent);
    // remove(prevPopupComponent);
  }

  // destroy() {
  //   remove(this._filmCardComponent);
  //   remove(this._popUpFilmCardComponent);
  // }

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
              isFavorite: !this._film.isFavorite
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
