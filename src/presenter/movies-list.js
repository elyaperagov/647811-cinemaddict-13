import Profile from "../view/profile.js";
// import Navigation from "../view/navigation.js";
import Sort from "../view/sort.js";
import Films from "../view/films.js";
import FilmsList from "../view/films-list.js";
import ShowMoreButton from "../view/show-more.js";
import MostCommented from "../view/most-commented.js";
import TopRated from "../view/top-rated.js";
import Movie from "./movie-card.js";
import {RenderPosition, renderElement, remove} from '../helpers/render.js';

const CARDS_IN_ROW = 5;
const MOST_COMMENTED_FILMS = 2;
const TOP_RATED_FILMS = 2;

export default class MoviesList {
  constructor(container) {
    this._container = container;
    this._renderedFilmsCount = CARDS_IN_ROW;

    this._profileComponent = new Profile();
    this._filmsComponent = new Films();
    this._sortComponent = new Sort();
    this._filmsListComponent = new FilmsList();
    this._filmsTopRatedComponent = new TopRated();
    this._filmsMostCommentedComponent = new MostCommented();
    this._showMoreButtonComponent = new ShowMoreButton();

    this._handleLoadMoreButtonClick = this._handleLoadMoreButtonClick.bind(this);
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

  _renderMoviesList() {
    for (let i = 0; i < this._renderedFilmsCount; i++) {
      this._renderFilm(this._filmsListComponent, this._films[i]);
    }

    if (this._films.length > this._renderedFilmsCount) {
      this._renderLoadMoreButton();
    }
  }

  _renderFilm(filmListElement, film) {
    const moviePresenter = new Movie(this._filmsListComponent);
    moviePresenter.init(filmListElement, film);
  }

  _handleLoadMoreButtonClick() {
    this._films
      .slice(this._renderedFilmsCount, this._renderedFilmsCount + CARDS_IN_ROW)
      .forEach((film) => this._renderFilm(this._filmsListComponent, film));

    this._renderedFilmsCount += CARDS_IN_ROW;

    if (this._renderedFilmsCount > this._films.length) {
      remove(this._showMoreButtonComponent);
    }
  }

  _renderLoadMoreButton() {
    renderElement(this._filmsComponent, this._showMoreButtonComponent, RenderPosition.BEFOREEND);

    this._showMoreButtonComponent.loadMoreClickHandler(this._handleLoadMoreButtonClick);
  }

  _renderBoard() {
    this._renderSort();
    this._renderMoviesList();
    this._renderExtraMoviesList();
  }

  _renderExtraMoviesList() {
    renderElement(this._filmsComponent, this._filmsTopRatedComponent, RenderPosition.BEFOREEND);
    renderElement(this._filmsComponent, this._filmsMostCommentedComponent, RenderPosition.BEFOREEND);

    const topRatedFilms = [...this._films]
      .sort(function (a, b) {
        return a.rating - b.rating;
      })
      .slice(-TOP_RATED_FILMS);

    topRatedFilms
      .forEach((film) => this._renderFilm(this._filmsTopRatedComponent, film));

    this._films
      .slice(0, MOST_COMMENTED_FILMS)
      .forEach((film) => this._renderFilm(this._filmsMostCommentedComponent, film));
  }
}
