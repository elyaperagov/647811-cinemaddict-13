import Profile from "./view/profile.js";
import MoviesList from "./presenter/movies-list.js";
import MoviesModel from "./model/movies.js";
// import { generateComment } from "./mock/cards";
import CommentsModel from "./model/comments-model.js";
import FilterModel from "./model/filter.js";
import FilterPresenter from "./presenter/filter.js";
import {RenderPosition, renderElement} from './helpers/render.js';
import {UpdateType} from "./constants.js";
// import ApiComments from "./api-comments.js";
import Api from "./api.js";

const AUTHORIZATION = `Basic 14211421`;
const END_POINT = `https://13.ecmascript.pages.academy/cinemaddict`;

const api = new Api(END_POINT, AUTHORIZATION);
// const apiComments = new ApiComments(END_POINT, AUTHORIZATION);

// const commentsCollection = new Array(COMMENTS_QUANTITY).fill([]).map((arr, index) => {
//     const filmComments = new Array(index + 1).fill().map(generateComment);
//     return filmComments;
// }); /* СПРОСИТЬ */

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

const moviesModel = new MoviesModel();
const filterModel = new FilterModel();
const commentsModel = new CommentsModel();

// commentsModel.setComments(commentsCollection);

renderElement(siteHeaderElement, new Profile(), RenderPosition.BEFOREEND);

const moviesPresenter = new MoviesList(siteMainElement, moviesModel, filterModel, commentsModel);
const filterPresenter = new FilterPresenter(siteMainElement, filterModel, moviesModel);

filterPresenter.init();
moviesPresenter.render();

api.getMovies()
  .then((movies) => {
    moviesModel.setFilms(UpdateType.INIT, movies);
  })
.catch(() => {
  moviesModel.setFilms(UpdateType.INIT, []);
});

// api.getMovies()
//   .then((movies) => {
//     moviesModel.setFilms(UpdateType.INIT, movies);
//     const promises = movies.map((movie) => {
//       return api.getComments(movie.id);
//     });
//     return Promise.all(promises);
//   })
//   .then((comments) => {
//     commentsModel.setComments(comments);
//   });

// api.getMovies()
//   .then((movies) => {
//     const commentsCollection = movies.map((movie) => {
//       return api.getComments(movie.id).then((comments) => {
//         movie.comments = comments;
//       });
//     });
//     Promise.all(commentsCollection).then(() => {
//       moviesModel.setFilms(UpdateType.INIT, movies);
//     });
//   })
// .catch(() => {
//   moviesModel.setFilms(UpdateType.INIT, []);
// });
