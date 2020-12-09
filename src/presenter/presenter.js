import Profile from "../view/profile.js";
// import Navigation from "../view/navigation.js";
import Sort from "../view/sort.js";
import Films from "../view/films.js";
import FilmsList from "../view/films-list.js";
import FilmCard from "../view/film-card.js";
import ShowMoreButton from "../view/show-more.js";
import FilmsExtra from "../view/films-extra.js";
import PopUpFilmCard from "../view/popup.js";
import {RenderPosition, renderElement, remove} from '../helpers/render.js';

const CARDS_IN_ROW = 5;
const NUMBER_OF_EXTRA_CONTAINERS = 2;
const MOST_COMMENTED_FILMS = 2;
const TOP_RATED_FILMS = 2;
const siteBody = document.querySelector(`body`);

export default class MoviesList {
  constructor(container) {
    this._container = container;
    this._profileComponent = new Profile();
    this._filmsComponent = new Films();
    this._sortComponent = new Sort();
    this._filmsListComponent = new FilmsList();
  }

  init(films) {
    this._films = films.slice();

    renderElement(this._container, this._filmsComponent, RenderPosition.BEFOREEND);
    renderElement(this._filmsComponent, this._filmsListComponent, RenderPosition.BEFOREEND);

    this._renderBoard();
  }

  _renderSort() {
    renderElement(this._filmsComponent, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  _renderFilm(filmListElement, film) {
    this._filmCardComponent = new FilmCard(film);

    const closePopup = () => {
      this._popUpFilmCardComponent.getElement().remove();
      siteBody.classList.remove(`hide-overflow`);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        evt.preventDefault();
        closePopup();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    const openPopup = () => {
      this._popUpFilmCardComponent = new PopUpFilmCard(film); //  почему this._popUpFilmCardComponent не берется из замыкания
      renderElement(siteBody, this._popUpFilmCardComponent, RenderPosition.BEFOREEND);
      const closePopupBtn = this._popUpFilmCardComponent.getElement().querySelector(`.film-details__close-btn`);
      siteBody.classList.add(`hide-overflow`);
      closePopupBtn.addEventListener(`click`, closePopup);
      document.addEventListener(`keydown`, onEscKeyDown);
    };

    this._filmCardComponent.setPopupClickHandler(() => {
      openPopup();
    });

    const filmslistContainer = filmListElement.getElement().querySelector(`.films-list__container`); // сделал временно

    renderElement(filmslistContainer, this._filmCardComponent, RenderPosition.BEFOREEND);
  }

  _renderLoadMoreButton() {
    if (this._films.length > CARDS_IN_ROW) {
      const loadMoreButtonComponent = new ShowMoreButton();
      let showingFilmCardsCount = CARDS_IN_ROW;

      renderElement(this._filmsComponent, loadMoreButtonComponent, RenderPosition.BEFOREEND);

      loadMoreButtonComponent.loadMoreClickHandler(() => {
        this._films
          .slice(showingFilmCardsCount, showingFilmCardsCount + CARDS_IN_ROW)
          .forEach((film) => this._renderFilm(this._filmsListComponent, film));

        showingFilmCardsCount += CARDS_IN_ROW;

        if (showingFilmCardsCount > this._films.length) {
          remove(loadMoreButtonComponent);
        }
      });
    }
  }

  _renderBoard() {

    this._renderSort();
    this._renderMoviesList();
    this._renderExtraMoviesList();
  }

  _renderMoviesList() {
    for (let i = 0; i < CARDS_IN_ROW; i++) {
      this._renderFilm(this._filmsListComponent, this._films[i]);
    }

    if (this._films.length > CARDS_IN_ROW) {
      this._renderLoadMoreButton();
    }
  }

  _renderExtraMoviesList() {
    let headers = [`Top rated`, `Most recommended`];
    for (let i = 0; i < NUMBER_OF_EXTRA_CONTAINERS; i++) {
      renderElement(this._filmsComponent, new FilmsExtra(headers[i]), RenderPosition.BEFOREEND);
    }

    const topRated = document.querySelector(`.films-list--extra .films-list__container`);
    const mostCommented = document.querySelector(`.films-list--extra:last-child .films-list__container`);

    const topRatedFilms = [...this._films]
      .sort(function (a, b) {
        return a.rating - b.rating;
      })
      .slice(-TOP_RATED_FILMS);

    topRatedFilms
      .forEach((film) => this._renderFilm(topRated, film));

    this._films
      .slice(0, MOST_COMMENTED_FILMS)
      .forEach((film) => this._renderFilm(mostCommented, film));
  }
}
