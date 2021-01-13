import Profile from "../view/profile.js";
// import Navigation from "../view/navigation.js";
import SortView from "../view/sort.js";
import Films from "../view/films.js";
import FilmsList from "../view/films-list.js";
import ShowMoreButton from "../view/show-more.js";
import MostCommented from "../view/most-commented.js";
import FilmsListContainer from "../view/film-list-container.js";
import TopRated from "../view/top-rated.js";
import NoFilms from "../view/no-films.js";
import LoadingView from "../view/loading.js";
// import {FilterType} from "../constants.js";
import Movie from "./movie-card.js";
import {filter} from "../helpers/filter.js";
import {SortType, UpdateType, UserAction} from "../constants.js";
import {RenderPosition, renderElement, remove, getMostRatedFilms, getMostCommentedFilms, getDateSortedFilms} from '../helpers/render.js';

const CARDS_IN_ROW = 5;
const MOST_COMMENTED_FILMS = 2;
const TOP_RATED_FILMS = 2;

export default class MoviesList {
  constructor(container, moviesModel, filterModel, commentsModel) {
    this._moviesModel = moviesModel;
    this._filterModel = filterModel;
    this._commentsModel = commentsModel;
    this._container = container;
    this._renderedFilmsCount = CARDS_IN_ROW;
    this._filmsPresenter = {};
    this._isLoading = true;

    this._profileComponent = new Profile();
    this._filmsComponent = new Films();
    this._filmsListComponent = new FilmsList();
    this._noFilmsComponent = new NoFilms();
    this._filmListContainerComponent = new FilmsListContainer();
    this._loadingComponent = new LoadingView();
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleLoadMoreButtonClick = this._handleLoadMoreButtonClick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    // this._moviesModel.addObserver(this._handleModelEvent);
    // this._filterModel.addObserver(this._handleModelEvent);
  }

  render() {
    renderElement(this._container, this._filmsComponent, RenderPosition.BEFOREEND);
    renderElement(this._filmsComponent, this._filmsListComponent, RenderPosition.BEFOREEND);

    this._moviesModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);

    renderElement(this._filmsListComponent, this._filmListContainerComponent, RenderPosition.BEFOREEND);

    this._renderBoard();
  }

  _getFilms() {
    const filterType = this._filterModel.getFilter();
    const films = this._moviesModel.getFilms();
    const filtredFilms = filter[filterType](films);

    // const updatedFilms = filtredFilms.map((film) => {
    //   film.comments = comments[getRandomInteger(0, comments.length - 1)];

    //   return film;
    // });

    switch (this._currentSortType) {
      case SortType.DATE:
        return getDateSortedFilms(filtredFilms);
      case SortType.RATING:
        return getMostRatedFilms(filtredFilms);
    }

    return filtredFilms;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearBoard({resetRenderedFilmsCount: true});
    this._renderBoard();
  }

  // destroy() {
  //   this._clearBoard({resetRenderedFilmsCount: true, resetSortType: true});

  //   remove(this._filmsComponent);
  //   remove(this._filmsComponent);

  //   this._moviesModel.removeObserver(this._handleModelEvent);
  //   this._filterModel.removeObserver(this._handleModelEvent);
  // }

  _handleModeChange() {
    Object.values(this._filmsPresenter).forEach((presenter) => presenter.resetView());
  }

  _clearBoard({resetRenderedFilmsCount = false, resetSortType = false} = {}) {
    const filmsCount = this._getFilms().length;

    Object
      .values(this._filmsPresenter)
      .forEach((presenter) => presenter.destroy());
    this._filmsPresenter = {};

    remove(this._sortComponent);
    remove(this._noFilmsComponent);
    remove(this._showMoreButtonComponent);

    if (resetRenderedFilmsCount) {
      this._renderedFilmsCount = CARDS_IN_ROW;
    } else {
      this._renderedFilmsCount = Math.min(filmsCount, this._renderedFilmsCount);
    } /*  СПРОСИТЬ НА СОЗВОНЕ */

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_FILM:
        this._moviesModel.updateFilm(updateType, update);
        break;
      case UserAction.ADD_COMMENT:
        this._moviesModel.addComment(updateType, update);
        break;
      case UserAction.DELETE_COMMENT:
        this._moviesModel.deleteComment(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._filmsPresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        this._clearBoard();
        this._renderBoard();
        break;
      case UpdateType.MAJOR:
        this._clearBoard({resetRenderedFilmsCount: true, resetSortType: true});
        this._renderBoard();
        break;
      case UpdateType.INIT:
        this._isLoading = false;
        remove(this._loadingComponent);
        this._renderBoard();
        break;
    }
  }

  _renderLoading() {
    renderElement(this._filmsComponent, this._loadingComponent, RenderPosition.AFTERBEGIN);
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._sortComponent = new SortView(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);

    renderElement(this._filmsComponent, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  _renderFilms(films) {
    films.forEach((film) => this._renderFilm(this._filmListContainerComponent, film));
  }

  _renderNoFilms() {
    renderElement(this._filmsComponent, this._noFilmsComponent, RenderPosition.AFTERBEGIN);
  }

  _renderFilm(container, film) {
    const moviePresenter = new Movie(container, this._handleViewAction, this._handleModeChange);

    moviePresenter.init(film);
    this._filmsPresenter[film.id] = moviePresenter;
  }

  _handleLoadMoreButtonClick() {
    const filmsCount = this._getFilms().length;
    const newRenderedFilmsCount = Math.min(filmsCount, this._renderedFilmsCount + CARDS_IN_ROW);
    const films = this._getFilms().slice(this._renderedFilmsCount, newRenderedFilmsCount);

    // СПРОСИТЬ НА СОЗВОНЕ ПРО ЛОГИКУ newRenderedFilmsCount
    this._renderFilms(films);
    this._renderedFilmsCount = newRenderedFilmsCount;

    if (this._renderedFilmsCount >= filmsCount) {
      remove(this._showMoreButtonComponent);
    }
  }

  _renderLoadMoreButton() {
    if (this._loadMoreButtonComponent !== null) {
      this._loadMoreButtonComponent = null;
    } /*  НЕ ПОНЯЛ ЭТО УСЛОВИЕ  */

    this._showMoreButtonComponent = new ShowMoreButton();
    this._showMoreButtonComponent.loadMoreClickHandler(this._handleLoadMoreButtonClick);

    renderElement(this._filmsListComponent, this._showMoreButtonComponent, RenderPosition.BEFOREEND);
  }

  _renderBoard() {
    if (this._isLoading) {
      this._renderLoading();
      return;
    }

    const films = this._getFilms();
    const filmsCount = films.length;

    if (filmsCount === 0) {
      this._renderNoFilms();
      return;
    }

    this._renderSort();

    this._renderFilms(films.slice(0, Math.min(filmsCount, this._renderedFilmsCount)));

    if (filmsCount > this._renderedFilmsCount) {
      this._renderLoadMoreButton();
    }

    // this._renderExtraMoviesList();
  }

  _renderExtraMoviesList() {
    this._filmsTopRatedComponent = new TopRated();
    this._filmsMostCommentedComponent = new MostCommented();

    renderElement(this._filmsComponent, this._filmsTopRatedComponent, RenderPosition.BEFOREEND);
    renderElement(this._filmsComponent, this._filmsMostCommentedComponent, RenderPosition.BEFOREEND);

    const topRatedContainerElements = this._filmsTopRatedComponent.getElement().querySelector(`.films-list--extra .films-list__container`);
    const mostCommentedContainerElements = this._filmsMostCommentedComponent.getElement().querySelector(`.films-list--extra:last-child .films-list__container`);

    const topRatedFilms = getMostRatedFilms(this._getFilms());
    const mostCommentedFilms = getMostCommentedFilms(this._getFilms());

    topRatedFilms
      .slice(0, TOP_RATED_FILMS)
      .forEach((film) => this._renderFilm(topRatedContainerElements, film));

    mostCommentedFilms
      .slice(0, MOST_COMMENTED_FILMS)
      .forEach((film) => this._renderFilm(mostCommentedContainerElements, film));
  }
}
