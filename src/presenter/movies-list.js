import SortView from "../view/sort.js";
import Films from "../view/films.js";
import FilmsList from "../view/films-list.js";
import ShowMoreButton from "../view/show-more.js";
import FilmsListContainer from "../view/film-list-container.js";
import NoFilms from "../view/no-films.js";
import LoadingView from "../view/loading.js";
import Profile from "../view/profile.js";
import Movie from "./movie-card.js";
import {filter} from "../helpers/filter.js";
import {SortType, UpdateType, UserAction} from "../constants.js";
import {RenderPosition, renderElement, remove, getMostRatedFilms, shake, disablePopup, disableDeleteButton, getDateSortedFilms} from '../helpers/render.js';

const siteBody = document.querySelector(`body`);
const siteHeaderElement = document.querySelector(`.header`);
const CARDS_IN_ROW = 5;

export default class MoviesList {
  constructor(container, moviesModel, filterModel, api) {
    this._moviesModel = moviesModel;
    this._filterModel = filterModel;
    this._container = container;
    this._renderedFilmsCount = CARDS_IN_ROW;
    this._filmsPresenter = {};
    this._isLoading = true;
    this._api = api;

    this._profile = null;

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

  destroy() {
    this._clearBoard({resetRenderedFilmsCount: true, resetSortType: true});

    remove(this._filmsListComponent);
    remove(this._filmsComponent);

    this._moviesModel.removeObserver(this._handleModelEvent);
    this._filterModel.removeObserver(this._handleModelEvent);
  }

  _handleModeChange() {
    Object.values(this._filmsPresenter).forEach((presenter) => presenter.resetView());
  }

  _clearBoard({resetRenderedFilmsCount = false, resetSortType = false} = {}) {
    // const filmsCount = this._getFilms().length;

    Object
      .values(this._filmsPresenter)
      .forEach((presenter) => presenter.destroy());
    this._filmsPresenter = {};

    remove(this._sortComponent);
    remove(this._noFilmsComponent);
    if (this._showMoreButtonComponent) {
      remove(this._showMoreButtonComponent);
    }

    if (resetRenderedFilmsCount) {
      this._renderedFilmsCount = CARDS_IN_ROW;
    // } else {
    //   this._renderedFilmsCount = Math.min(filmsCount, this._renderedFilmsCount);
    }

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  _disablePopupForm(isFormDisabled, container) {
    const elements = container.elements;
    const [...allElements] = elements;

    allElements.forEach((element) => {
      element.disabled = isFormDisabled;
    });
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_FILM:
        this._api.updateMovie(update)
          .then((response) => {
            this._id = update.isPopup ? update.id : null;
            this._moviesModel.updateFilm(updateType, response);
            this._renderProfile();
          });
        break;
      case UserAction.ADD_COMMENT:
        this._api.addComment(update).then((response) => {
          this._moviesModel.addComment(updateType, response);
        })
        .catch(() => {
          shake(siteBody.querySelector(`form`));
          disablePopup(false, siteBody.querySelector(`form`));
        });
        break;
      case UserAction.DELETE_COMMENT:
        this._api.deleteComment(update).then(() => {
          this._moviesModel.deleteComment(updateType, update);
        })
        .catch(() => {
          const comments = Array.from(siteBody.querySelectorAll(`.film-details__comment`));
          const activeComment = comments.filter((movie) => movie.dataset.commentId === update.comment);
          shake(activeComment[0]);
          const currentDeleteButton = activeComment[0].getElementsByClassName(`film-details__comment-delete`)[0];
          disableDeleteButton(currentDeleteButton, false);
        });
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        // if (this._filmsPresenter[data.id]._mode === `POPUP`) {
        //   this._filmsPresenter[data.id].openModal(data);
        // } else {
        this._filmsPresenter[data.id].init(data);
        // }
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

    this._renderFilms(films);
    this._renderedFilmsCount = newRenderedFilmsCount;

    if (this._renderedFilmsCount >= filmsCount) {
      remove(this._showMoreButtonComponent);
    }
  }

  _renderLoadMoreButton() {
    if (this._loadMoreButtonComponent !== null) {
      this._loadMoreButtonComponent = null;
    }

    this._showMoreButtonComponent = new ShowMoreButton();
    this._showMoreButtonComponent.loadMoreClickHandler(this._handleLoadMoreButtonClick);

    renderElement(this._filmsListComponent, this._showMoreButtonComponent, RenderPosition.BEFOREEND);
  }

  _renderProfile() {
    const films = this._moviesModel.getFilms().filter((film) => film.isWatched);
    const prevProfileComponent = this._profile;
    this._profile = new Profile(films);
    renderElement(siteHeaderElement, this._profile, RenderPosition.BEFOREEND);

    if (prevProfileComponent !== null) {
      remove(prevProfileComponent);
    }
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

    if (this._renderedFilmsCount < filmsCount) {
      this._renderLoadMoreButton();
    }
    this._restorePopup();
  }

  _restorePopup() {
    if (this._id) {
      const film = this._moviesModel.getFilms().find((filmItem) => {
        return filmItem.id === this._id;
      });

      const moviePresenter = new Movie(this._filmListContainerComponent, this._handleViewAction, this._handleModeChange);
      // if (film.isFavorite && this._filterModel.getFilter() === `Favorite`) {
      //   moviePresenter.init(film);
      // }
      // console.log(this._filterModel.getFilter());
      moviePresenter.openModal(film);
    }
  }
}
