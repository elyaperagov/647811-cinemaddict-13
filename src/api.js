import MoviesModel from "./model/movies.js";

const Method = {
  GET: `GET`,
  PUT: `PUT`
};

const SuccessHTTPStatusRange = {
  MIN: 200,
  MAX: 299
};

export default class Api {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getMovies() {
    return this._load({
      url: `movies`
    })
      .then(Api.toJSON)
      .then((movies) => movies.map(MoviesModel.adaptToClient));
  }

  getComments(filmId) {
    return this._load({url: `comments/${filmId}`})
      .then(Api.toJSON)
      .then((comments) => comments.map(this._adaptToClient));
  }

  getUpdatedComments(filmId) {
    return new Promise((resolve) => {
      this._load({
        url: `comments/${filmId}`
      })
        .then(Api.toJSON)
        .then((comments) => {
          const result = comments.map(this._adaptToClient);
          resolve(result);
        });
    });
  }

  _adaptToClient(comments) {
    const adaptedComments = Object.assign({},
        comments, {
          id: comments.id,
          message: comments.comment,
          emoji: comments.emotion,
          author: comments.author,
          date: comments.date
        });
    return adaptedComments;
  }

  updateMovie(movie) {
    return this._load({
      url: `movies/${movie.id}`,
      method: Method.PUT,
      body: JSON.stringify(MoviesModel.adaptToServer(movie)),
      headers: new Headers({
        "Content-Type": `application/json`
      })
    })
      .then(Api.toJSON)
      .then(MoviesModel.updateToClient);
  }

  _load({
    url,
    method = Method.GET,
    body = null,
    headers = new Headers()
  }) {
    headers.append(`Authorization`, this._authorization);

    return fetch(
        `${this._endPoint}/${url}`, {
          method,
          body,
          headers
        }
    )
      .then(Api.checkStatus)
      .catch(Api.catchError);
  }

  static checkStatus(response) {
    if (
      response.status < SuccessHTTPStatusRange.MIN ||
      response.status > SuccessHTTPStatusRange.MAX
    ) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }

    return response;
  }

  static toJSON(response) {
    return response.json();
  }

  static catchError(err) {
    throw err;
  }
}
