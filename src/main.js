import MoviesList from "./presenter/movies-list.js";
import MoviesModel from "./model/movies.js";
import FilterModel from "./model/filter.js";
import FilterPresenter from "./presenter/filter.js";
import {RenderPosition, renderElement} from './helpers/render.js';
import {UpdateType, MenuItem} from "./constants.js";
import Stats from "./view/stats.js";
import Footer from "./view/footer.js";
import {remove} from "./helpers/render.js";
import Api from "./api.js";

export const AUTHORIZATION = `Basic sorrowbringer`;
export const END_POINT = `https://13.ecmascript.pages.academy/cinemaddict`;
const footerContainer = document.querySelector(`.footer__statistics`);

export const api = new Api(END_POINT, AUTHORIZATION);
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
      if (statisticsComponent) {
        remove(statisticsComponent);
        moviesPresenter.destroy();
        moviesPresenter.render();
      }
      break;
    case MenuItem.STATISTICS:
      moviesPresenter.destroy();
      const prevStatisticsComponent = statisticsComponent;
      statisticsComponent = new Stats(moviesModel.getFilms());
      renderElement(siteMainElement, statisticsComponent, RenderPosition.BEFOREEND);
      if (prevStatisticsComponent === null) {
        renderElement(siteMainElement, statisticsComponent, RenderPosition.BEFOREEND);
        return;
      }
      remove(prevStatisticsComponent);
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
    renderElement(footerContainer, new Footer(movies), RenderPosition.BEFOREEND);
  })
.catch(() => {
  moviesModel.setFilms(UpdateType.INIT, []);
  renderElement(footerContainer, new Footer(), RenderPosition.BEFOREEND);
});
