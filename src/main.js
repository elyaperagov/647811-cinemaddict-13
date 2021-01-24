import Profile from "./view/profile.js";
import MoviesList from "./presenter/movies-list.js";
import MoviesModel from "./model/movies.js";
import FilterModel from "./model/filter.js";
import FilterPresenter from "./presenter/filter.js";
import {RenderPosition, renderElement} from './helpers/render.js';
import {UpdateType, MenuItem} from "./constants.js";
import Stats from "./view/stats.js";
import {remove} from "./helpers/render.js";
import Api from "./api.js";

export const AUTHORIZATION = `Basic 14211421`;
export const END_POINT = `https://13.ecmascript.pages.academy/cinemaddict`;

export const api = new Api(END_POINT, AUTHORIZATION);
// const apiComments = new ApiComments(END_POINT, AUTHORIZATION);

// const commentsCollection = new Array(COMMENTS_QUANTITY).fill([]).map((arr, index) => {
//     const filmComments = new Array(index + 1).fill().map(generateComment);
//     return filmComments;
// }); /* СПРОСИТЬ */

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

const moviesModel = new MoviesModel();
const filterModel = new FilterModel();

const moviesPresenter = new MoviesList(siteMainElement, moviesModel, filterModel, api);
const filterPresenter = new FilterPresenter(siteMainElement, filterModel, moviesModel);

filterPresenter.init();
moviesPresenter.render();

let statisticsComponent = null;

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.FILMS:
      remove(statisticsComponent);
      moviesPresenter.destroy();
      moviesPresenter.render();
      break;
    case MenuItem.STATISTICS:
      statisticsComponent = new Stats(moviesModel.getFilms());
      moviesPresenter.destroy();
      renderElement(siteMainElement, statisticsComponent, RenderPosition.BEFOREEND);
      break;
  }
};

filterPresenter.init(handleSiteMenuClick);

api.getMovies()
  .then((movies) => {
    const commentsCollection = movies.map((movie) => {
      return api.getComments(movie.id).then((comments) => {
        movie.comments = comments;
      });
    });
    Promise.all(commentsCollection).then(() => {
      moviesModel.setFilms(UpdateType.INIT, movies);
    });
    renderElement(siteHeaderElement, new Profile(), RenderPosition.BEFOREEND);
    // renderElement(siteMainElement, new Stats(), RenderPosition.BEFOREEND);
  })
.catch(() => {
  moviesModel.setFilms(UpdateType.INIT, []);
  renderElement(siteHeaderElement, new Profile(), RenderPosition.BEFOREEND);
});
