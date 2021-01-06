import CommentsModel from "./model/comments-model.js";

const Method = {
  GET: `GET`,
  PUT: `PUT`
};

const SuccessHTTPStatusRange = {
  MIN: 200,
  MAX: 299
};

export default class CommentsApi {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getComments(filmId) {
    return this._load({url: `comments/${filmId}`})
      .then(CommentsApi.toJSON)
      .then((comments) => comments.map(CommentsModel.adaptToClient));
  }

  updateComments(filmId) {
    return this._load({
      url: `comments/${filmId}`,
      method: Method.PUT,
      body: JSON.stringify(CommentsModel.adaptToServer(filmId)),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then(CommentsApi.toJSON)
      .then(CommentsModel.adaptToClient);
  }

  _load({
    url,
    method = Method.GET,
    body = null,
    headers = new Headers()
  }) {
    headers.append(`Authorization`, this._authorization);

    return fetch(
        `${this._endPoint}/${url}`,
        {method, body, headers}
    )
      .then(CommentsApi.checkStatus)
      .catch(CommentsApi.catchError);
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
