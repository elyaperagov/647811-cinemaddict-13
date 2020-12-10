import FilmCard from "../view/film-card.js";
import PopUpFilmCard from "../view/popup.js";
import {RenderPosition, renderElement} from '../helpers/render.js';

const siteBody = document.querySelector(`body`);

export default class Movie {
  constructor(filmsContainer) {
    this._filmsContainer = filmsContainer;
  }

  init(container, film) {
    this._film = film;
    this._filmCardComponent = new FilmCard(film);
    this._popUpFilmCardComponent = new PopUpFilmCard(film);
    this._popupClickHandler = this._popupClickHandler.bind(this);
    this._closePopupClickHandler = this._closePopupClickHandler.bind(this);

    this._filmCardComponent.setPosterClickHandler(this._popupClickHandler);
    this._filmCardComponent.setTitleClickHandler(this._popupClickHandler);
    this._filmCardComponent.setCommentsClickHandler(this._popupClickHandler);
    const filmslistContainer = container.getElement().querySelector(`.films-list__container`); // сделал временно
    renderElement(filmslistContainer, this._filmCardComponent, RenderPosition.BEFOREEND);
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


  // closePopupBtn.addEventListener(`click`, (() => {
  //   this._closePopup();
  //   })
  // );
  //
  // closePopupBtn.addEventListener(`click`, this._closePopup);  // в чём разница??


}
