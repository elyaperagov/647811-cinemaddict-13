import Profile from "../view/profile.js";
// import Navigation from "../view/navigation.js";
import Sort from "../view/sort.js";
import Films from "../view/films.js";
import FilmsList from "../view/films-list.js";
import ShowMoreButton from "../view/show-more.js";
import MostCommented from "../view/most-commented.js";
import FilmsListContainer from "../view/film-list-container.js";
import TopRated from "../view/top-rated.js";
import Movie from "./movie-card.js";
import {updateItem} from "../helpers/common.js";
import {RenderPosition, renderElement, remove, getMostRatedFilms, getMostCommentedFilms} from '../helpers/render.js';

const CARDS_IN_ROW = 5;
const MOST_COMMENTED_FILMS = 2;
const TOP_RATED_FILMS = 2;

export default class MoviesList {
  constructor(container) {
    this._container = container;
    this._renderedFilmsCount = CARDS_IN_ROW;
    this._filmsPresenter = {};

    this._profileComponent = new Profile();
    this._filmsComponent = new Films();
    this._sortComponent = new Sort();
    this._filmsListComponent = new FilmsList();
    this._filmListContainerComponent = new FilmsListContainer();

    this._showMoreButtonComponent = new ShowMoreButton();

    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleFilmChange = this._handleFilmChange.bind(this);
    this._handleLoadMoreButtonClick = this._handleLoadMoreButtonClick.bind(this);
  }

  render(films) {
    this._films = films.slice();

    renderElement(this._container, this._filmsComponent, RenderPosition.BEFOREEND);
    renderElement(this._filmsComponent, this._filmsListComponent, RenderPosition.BEFOREEND);

    const filmsElement = this._filmsComponent.getElement();
    const filmsListElement = filmsElement.querySelector(`.films-list`);

    renderElement(filmsListElement, this._filmListContainerComponent, RenderPosition.BEFOREEND);

    this._renderBoard();
  }

  _handleFilmChange(updatedFilm) {
    this._films = updateItem(this._films, updatedFilm);
    this._filmsPresenter[updatedFilm.id].init(updatedFilm);
  }

  _handleModeChange() {
    Object.values(this._filmsPresenter).forEach((presenter) => presenter.resetView());
  }

  _renderSort() {
    renderElement(this._filmsComponent, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  _renderMoviesList() {
    for (let i = 0; i < this._renderedFilmsCount; i++) {
      this._renderFilm(this._filmListContainerComponent, this._films[i]);
    }

    if (this._films.length > this._renderedFilmsCount) {
      this._renderLoadMoreButton();
    }
  }

  _renderFilm(container, film) {
    const moviePresenter = new Movie(container, this._handleFilmChange, this._handleModeChange);
    moviePresenter.init(film);
    this._filmsPresenter[film.id] = moviePresenter;
  }

  _handleLoadMoreButtonClick() {
    this._films
      .slice(this._renderedFilmsCount, this._renderedFilmsCount + CARDS_IN_ROW)
      .forEach((film) => this._renderFilm(this._filmListContainerComponent, film));

    this._renderedFilmsCount += CARDS_IN_ROW;

    if (this._renderedFilmsCount > this._films.length) {
      remove(this._showMoreButtonComponent);
    }
  }

  _renderLoadMoreButton() {
    renderElement(this._filmsComponent, this._showMoreButtonComponent, RenderPosition.BEFOREEND);

    this._showMoreButtonComponent.loadMoreClickHandler(this._handleLoadMoreButtonClick);
  }

  _clearMoviesList() {
    Object
      .values(this._filmsPresenter)
      .forEach((presenter) => presenter.destroy());
    this._filmsPresenter = {};
    this._renderedFilmsCount = CARDS_IN_ROW;
    remove(this._showMoreButtonComponent);
  }

  _renderBoard() {
    this._renderSort();
    this._renderMoviesList();
    this._renderExtraMoviesList();
  }

  _renderExtraMoviesList() {
    this._filmsTopRatedComponent = new TopRated();
    this._filmsMostCommentedComponent = new MostCommented();

    renderElement(this._filmsComponent, this._filmsTopRatedComponent, RenderPosition.BEFOREEND);
    renderElement(this._filmsComponent, this._filmsMostCommentedComponent, RenderPosition.BEFOREEND);

    const topRatedContainerElements = this._filmsTopRatedComponent.getElement().querySelector(`.films-list--extra .films-list__container`);
    const mostCommentedContainerElements = this._filmsMostCommentedComponent.getElement().querySelector(`.films-list--extra:last-child .films-list__container`);

    const topRatedFilms = getMostRatedFilms(this._films);

    const mostCommentedFilms = getMostCommentedFilms(this._films);

    topRatedFilms
      .slice(0, TOP_RATED_FILMS)
      .forEach((film) => this._renderFilm(topRatedContainerElements, film));

    mostCommentedFilms
      .slice(0, MOST_COMMENTED_FILMS)
      .forEach((film) => this._renderFilm(mostCommentedContainerElements, film));
  }
}
