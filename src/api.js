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
    return this._load({url: `movies`})
      .then(Api.toJSON)
      .then((movies) => movies.map(MoviesModel.adaptToClient));
  }
  // getMovies() {
  //   return this._load({url: `movies`})
  //     .then(Api.toJSON)
  //     .then(async (movies) => {
  //       let adaptedFilms = [];
  //       for (let movie of movies) {
  //         let adaptedFilm = await MoviesModel.adaptToClient(movie)
  //         adaptedFilms.push(adaptedFilm);
  //       }
  //       return adaptedFilms;
  //     });
  // }

  getComments(filmId) {
    return this._load({url: `comments/${filmId}`})
      .then(Api.toJSON)
      .then((comments) => comments.map(this._adaptToClient));
  }

  _adaptToClient(comments) {
    const adaptedComments = Object.assign(
        {},
        comments,
        {
          id: comments.id,
          message: comments.comment,
          emoji: comments.emotion,
          author: comments.author,
          date: comments.date
        });
    return adaptedComments;
  }


  _adaptToServer(comments) {
    const adaptedComments = Object.assign(
        {},
        comments,
        {
          "id": comments.id,
          "comment": comments.message,
          "emotion": comments.emoji,
          "date": comments.date,
          "author": comments.author
        });

        delete adaptedComments.author;
        delete adaptedComments.comment;
        delete adaptedComments.date;
        delete adaptedComments.emotion;
        delete adaptedComments.id;

    return adaptedComments;
  }

  updateMovie(movie) {
    return this._load({
      url: `movies/${movie.id}`,
      method: Method.PUT,
      // body: JSON.stringify(MoviesModel.adaptToServer(movie), this._adaptToServer(movie.comments)),
      body: JSON.stringify(MoviesModel.adaptToServer(movie)),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then(Api.toJSON)
      .then(MoviesModel.adaptToClient);
  }

  _load({
    url,
    method = Method.GET,
    body = null,
    headers = new Headers()
  }) {
    headers.append(`Authorization`, this._authorization);
    console.log(body)

    return fetch(
        `${this._endPoint}/${url}`,
        {method, body, headers}
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

    console.log(response.status)
    return response;
  }

  static toJSON(response) {
    return response.json();
  }

  static catchError(err) {
    throw err;
  }
}
